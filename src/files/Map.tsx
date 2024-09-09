// // src/Map.js
// import React, { useRef, useEffect, useState } from 'react';

// const Map = ({ imageSrc }) => {
//   const canvasRef = useRef(null);
//   const [pois, setPois] = useState([]);
//   const [path, setPath] = useState([]);
//   const [drawing, setDrawing] = useState(false);
//   const [currentPath, setCurrentPath] = useState([]);

//   const handleCanvasClick = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const label = prompt('Enter label for this POI:');
//     if (label) {
//       setPois([...pois, { x, y, label }]);
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (drawing) {
//       const canvas = canvasRef.current;
//       const rect = canvas.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       setCurrentPath([{ x, y }]);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (drawing && currentPath.length > 0) {
//       const canvas = canvasRef.current;
//       const rect = canvas.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       setCurrentPath([...currentPath, { x, y }]);
//     }
//   };

//   const handleMouseUp = () => {
//     if (drawing) {
//       setPath([...path, currentPath]);
//       setCurrentPath([]);
//     }
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const img = new Image();
//     img.src = imageSrc;
//     img.onload = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//       // Draw POIs
//       pois.forEach(poi => {
//         ctx.beginPath();
//         ctx.arc(poi.x, poi.y, 5, 0, 2 * Math.PI);
//         ctx.fillStyle = 'red';
//         ctx.fill();
//         ctx.stroke();
//         ctx.fillText(poi.label, poi.x + 10, poi.y + 10);
//       });

//       // Draw Paths
//       path.forEach(p => {
//         ctx.beginPath();
//         ctx.moveTo(p[0].x, p[0].y);
//         p.forEach(point => {
//           ctx.lineTo(point.x, point.y);
//         });
//         ctx.strokeStyle = 'blue';
//         ctx.stroke();
//       });

//       // Draw Current Path
//       if (currentPath.length > 0) {
//         ctx.beginPath();
//         ctx.moveTo(currentPath[0].x, currentPath[0].y);
//         currentPath.forEach(point => {
//           ctx.lineTo(point.x, point.y);
//         });
//         ctx.strokeStyle = 'blue';
//         ctx.stroke();
//       }
//     };
//   }, [pois, path, currentPath, imageSrc]);

//   const toggleDrawingMode = () => {
//     setDrawing(!drawing);
//   };

//   return (
//     <div>
//       <button style={{ position:'absolute', top:0}} onClick={toggleDrawingMode}>
//         {drawing ? 'Stop Drawing Path' : 'Start Drawing Path'}
//       </button>
//       <canvas
//         ref={canvasRef}
//         width={800}
//         height={600}
//         onClick={drawing ? undefined : handleCanvasClick}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         style={{ border: '1px solid black' }}
//       />
//     </div>
//   );
// };

// export default Map;
