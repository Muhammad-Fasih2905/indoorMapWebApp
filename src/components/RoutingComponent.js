import React, { useState } from 'react';

function RoutingComponent({ pois, onFindRoute }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleFindRoute = () => {
    onFindRoute(start, end);
  };

  return (
    <div>
      <select value={start} onChange={(e) => setStart(e.target.value)}>
        <option value="">Select Start</option>
        {pois.map((poi, index) => (
          <option key={index} value={poi.name}>{poi.name}</option>
        ))}
      </select>
      <select value={end} onChange={(e) => setEnd(e.target.value)}>
        <option value="">Select End</option>
        {pois.map((poi, index) => (
          <option key={index} value={poi.name}>{poi.name}</option>
        ))}
      </select>
      <button onClick={handleFindRoute}>Find Route</button>
    </div>
  );
}

export default RoutingComponent;
