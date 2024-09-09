import React, { useCallback, useState } from 'react'
import { GoogleMap, useGoogleMap, useJsApiLoader } from '@react-google-maps/api';
import 'leaflet/dist/leaflet.css';
import MapWorkComponent from '../../components/MapWorkComponent';
import Layout from '../../components/Layout';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 51.505,
    lng: -0.09,
};
const Dashboard: React.FC = () => {
    const [pickAddressPlace, setPickAddressPlace] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [address, setAddress] = useState('');
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    });

    const handleChange = (newAddress: string) => {
        setAddress(newAddress);
    };
    const handleSelect = useCallback(async (selectedAddress: string) => {
        setAddress(selectedAddress);
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setSelectedLocation({ lat: latLng.lat, lng: latLng.lng });
            setPickAddressPlace(true);
        } catch (error) {
            console.error('Geocoding failed:', error);
        }
    }, []);

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        console.log("Map clicked at", e.latLng?.lat(), e.latLng?.lng());
        if (e.latLng) {
            setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            setPickAddressPlace(true);
        }
    };
    const MapViewUpdater = () => {
        const map = useGoogleMap();

        React.useEffect(() => {
            if (map && selectedLocation) {
                map.setCenter(selectedLocation);
                map.setZoom(25);
            }
        }, [selectedLocation, map]);

        return null;
    };

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const mapRef = React.useRef<google.maps.Map | null>(null);
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <Layout showHeader={true}>
            <div className="flex-1 relative flex">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedLocation || center}
                    zoom={13}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                    options={{
                        mapTypeId: 'hybrid',
                        disableDefaultUI: true,
                    }}
                >
                    <MapViewUpdater />
                </GoogleMap>
                <div className={`absolute top-4 left-12 z-[1000] p-2 flex flex-col gap-3 w-full md:w-[90%]`}>
                    <div className="flex justify-center items-center h-full w-full md:w-[86%]">
                        <MapWorkComponent pickAddressPlace={pickAddressPlace} setPickAddressPlace={setPickAddressPlace} address={address}
                            setAddress={setAddress}
                            handleChange={handleChange}
                            handleSelect={handleSelect} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
