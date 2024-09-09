import React, { useState } from 'react';

function POIManager({ onAddPOI }) {
  const [poi, setPoi] = useState({ name: '', x: 0, y: 0 });

  const handleAddPOI = () => {
    onAddPOI(poi);
    setPoi({ name: '', x: 0, y: 0 });
  };

  return (
    <div>
      <input
        type="text"
        value={poi.name}
        onChange={(e) => setPoi({ ...poi, name: e.target.value })}
        placeholder="POI Name"
      />
      <input
        type="number"
        value={poi.x}
        onChange={(e) => setPoi({ ...poi, x: Number(e.target.value) })}
        placeholder="X Coordinate"
      />
      <input
        type="number"
        value={poi.y}
        onChange={(e) => setPoi({ ...poi, y: Number(e.target.value) })}
        placeholder="Y Coordinate"
      />
      <button onClick={handleAddPOI}>Add POI</button>
    </div>
  );
}

export default POIManager;
