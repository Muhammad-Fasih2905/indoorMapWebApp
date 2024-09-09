import React, { useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapComponent({ blueprint, pois, route, onAddPOI }) {
  const [bounds, setBounds] = useState([[0, 0], [100, 100]]); // Adjust bounds as needed

  useEffect(() => {
    if (blueprint) {
      setBounds([[0, 0], [100, 100]]); // Adjust bounds as per the actual image aspect ratio and size
    }
  }, [blueprint]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const name = prompt('Enter POI name:');
        if (name) {
          onAddPOI({ name, x: lng, y: lat });
        }
      }
    });
    return null;
  };

  return (
    <MapContainer bounds={bounds} style={{ height: '500px', width: '100%' }}>
      {blueprint && <ImageOverlay url={blueprint} bounds={bounds} />}
      {pois.map((poi, index) => (
        <Marker key={index} position={[poi.y, poi.x]}>
          <Popup>{poi.name}</Popup>
        </Marker>
      ))}
      {route.length > 0 && (
        <Polyline positions={route.map(point => [point.y, point.x])} color="blue" />
      )}
      <MapClickHandler />
    </MapContainer>
  );
}

export default MapComponent;
