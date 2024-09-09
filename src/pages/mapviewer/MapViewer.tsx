import { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Layout from '../../components/Layout';
const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 51.505,
    lng: -0.09,
};
const MapViewer = () => {
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number, lng: number } | null>(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    });
    const onMapClick = (e: google.maps.MapMouseEvent) => {
        console.log("Map clicked at", e.latLng?.lat(), e.latLng?.lng());
        if (e.latLng) {
            setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
    };
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <Layout showHeader={false}>
            <div className="flex-1 relative flex">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={selectedLocation || center}
                    zoom={13}
                    onClick={onMapClick}
                    options={{
                        mapTypeId: 'hybrid',
                        disableDefaultUI: true,
                    }}
                >
                </GoogleMap>
            </div>
        </Layout>
    )
}

export default MapViewer
