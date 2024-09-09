import React, { useEffect, useRef, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import FloorDeletionModal from './FloorDeletionModal';
import NewFloorModal from './NewFloorModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    FiZoomIn,
    FiZoomOut,
    FiRotateCcw,
    FiSquare,
    FiMapPin,
    FiSave,
    FiX,
    FiPenTool,
} from 'react-icons/fi';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { VscColorMode } from "react-icons/vsc";
import { FaArrowsAltH } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import markerImage from '../assets/marker.png';
import { resetBuilding } from '../store/features/createBuilding/createBuildingSlice';
import MarkerLabelModal from './MarkerLabelModal';
import { deleteFloorApi } from '../store/features/createFloor/createFloorAction';
import { AppDispatch, RootState } from '../store/store';

type FloorData = {
    id: number;
    building_id: number;
    floor_name: string;
    order_number: number;
    pos_numbers: string[] | null;
    image: string;
};
interface FloorsProps {
    setAddress?: (address: string) => void;
}
const Floor: React.FC<FloorsProps> = ({ setAddress }) => {
    // const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
    const [activeFloor, setActiveFloor] = useState<number | null>(null);
    const [deleteFloor, setDeleteFloor] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewFloorModalOpen, setIsNewFloorModalOpen] = useState(false);
    const [selectedFloor, setSelectedFloor] = useState<FloorData | null>(null);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [editData, setEditData] = useState(false);
    const [placingMarker, setPlacingMarker] = useState(false);
    const [markerPositions, setMarkerPositions] = useState<{ top: number, left: number, label: string }[]>([]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
    const [pendingPosition, setPendingPosition] = useState<{ top: number, left: number } | null>(null);
    const [pois, setPois] = useState<{ x: number, y: number, label: string }[]>([]);
    const [path, setPath] = useState<{ x: number, y: number }[][]>([]);
    const [drawing, setDrawing] = useState(false);
    const [crossBtn, setCrossBtn] = useState(false);
    const [currentPath, setCurrentPath] = useState<{ x: number, y: number }[]>([]);
    const [currentCoords, setCurrentCoords] = useState<{ x: number; y: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const token = useSelector((state: RootState) => state.auth?.token)
    const buildingIdData = useSelector((state: RootState) => state.building?.buildingDataById);
    const floors = buildingIdData?.get_floors ?? []
    const dispatch = useDispatch<AppDispatch>();
    const id = buildingIdData?.id ?? null

    const openModal = (floor: FloorData, id: number) => {
        setSelectedFloor(floor);
        setDeleteFloor(id)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDeletion = () => {
        closeModal();
        dispatch(deleteFloorApi({ deleteFloor, token, id }))
    };

    const openNewFloorModal = () => {
        setIsNewFloorModalOpen(true);
    };

    const closeNewFloorModal = () => {
        setIsNewFloorModalOpen(false);
    };
    const handleNewFloorSubmit = (newFloorData: { name: string; order: number; image: File | null }) => {
        console.log('New floor data:', newFloorData);
        closeNewFloorModal();
    };
    const handleFloorClick = (floor: FloorData, floorId: number) => {
        setActiveFloor(floorId);
        setSelectedFloor(floor);
    };
    console.log(selectedFloor)

    const handleZoomIn = () => {
        if (zoomLevel < 100) {
            setZoomLevel(zoomLevel + 10);
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > 30) {
            setZoomLevel(zoomLevel - 10);
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawing) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (placingMarker) {
                setIsLabelModalOpen(true);
            }
            setCurrentCoords({ x, y });
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (drawing) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            setCurrentPath([{ x, y }]);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (drawing && currentPath.length > 0) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            setCurrentPath([...currentPath, { x, y }]);
        }
    };

    const handleMouseUp = () => {
        if (drawing) {
            setPath([...path, currentPath]);
            setCurrentPath([]);
        }
    };

    const handleLabelSubmit = (label: string) => {
        setPlacingMarker(true);
        if (pendingPosition) {
            setMarkerPositions([...markerPositions, { ...pendingPosition, label }]);
            setPendingPosition(null);
        }
        if (currentCoords) {
            setPois([...pois, { x: currentCoords.x, y: currentCoords.y, label }]);
            setCurrentCoords(null);
        }
        setIsLabelModalOpen(false);
    };

    const handleButtonClick = () => {
        setPlacingMarker(!placingMarker);
        setDrawing(false);
        setCrossBtn(false);
    };

    const toggleDrawingMode = () => {
        setDrawing(!drawing);
        setPlacingMarker(false);
        setCrossBtn(false);
    };

    const handleSave = () => {
        setEditData(true);
    };

    const handleEdit = () => {
        setEditData(false);
    };

    const handleCross = () => {
        dispatch(resetBuilding());
        setCrossBtn(!crossBtn);
        setAddress?.('');
    };

    const hanldeAllReset2 = () => {
        setMarkerPositions([]);
        setPois([])
    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !selectedFloor?.image) return;
        const img = new Image();
        img.src = selectedFloor?.image;
        img.onload = () => {
            canvas.width = img.width;  // Ensure canvas matches image width
            canvas.height = img.height;  // Ensure canvas matches image height
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Draw POIs
            // pois.forEach(poi => {
            //     ctx.beginPath();
            //     ctx.arc(poi.x, poi.y, 5, 0, 2 * Math.PI);
            //     // ctx.fillStyle = 'red';
            //     ctx.fill();
            //     ctx.stroke();
            //     ctx.fillText(poi.label, poi.x + 10, poi.y + 10);
            // });

            // Draw Paths
            ctx.lineWidth = 7;
            path.forEach(p => {
                ctx.beginPath();
                ctx.moveTo(p[0].x, p[0].y);
                p.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.strokeStyle = 'blue';
                ctx.stroke();
            });

            // Draw Current Path
            if (currentPath.length > 0) {
                ctx.beginPath();
                ctx.moveTo(currentPath[0].x, currentPath[0].y);
                currentPath.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.strokeStyle = 'blue';
                ctx.stroke();
            }
        };
    }, [pois, path, currentPath]);
    useEffect(() => {
        if (selectedFloor?.image) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(true)
        }
    })
    useEffect(() => {
        if (floors && floors.length > 0) {
            const firstFloor = floors[0];
            handleFloorClick(firstFloor, firstFloor.id);
        }
    }, [floors]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (canvasRef.current && !canvasRef.current.contains(event.target as Node)) {
                setPlacingMarker(false);
                setDrawing(false);
                setCrossBtn(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [canvasRef]);
    return (
        <div className="w-full mx-auto flex flex-row">
            <div className="w-[25%] mx-auto">
                <div className="bg-gray-800 text-white p-3 text-lg font-semibold">
                    Floors {floors?.length}
                </div>
                <div className="bg-white border border-gray-300">
                    {floors.map((floor, index) => (
                        <div key={floor.id} className={`flex items-center justify-between p-3 border-b border-gray-300 ${activeFloor === floor.id ? 'bg-[#0D1B3E]' : ''
                            }`} onClick={() => {
                                if (selectedFloor) {
                                    setSelectedFloor(null);
                                    setCurrentCoords(null)
                                    setMarkerPositions([]);
                                    setPois([])
                                    setPath([])
                                    setCurrentPath([])
                                }
                                handleFloorClick(floor, floor?.id);
                            }
                            }>
                            <p className={`${activeFloor === floor.id ? 'text-white' : 'text-black'}`}>{index + 1}</p>
                            <span className={`${activeFloor === floor.id ? 'text-white' : 'text-black'}`}>{floor.floor_name}</span>
                            <div className="flex items-center space-x-3">
                                <button className="text-gray-500 hover:text-gray-700" onClick={() => openModal(floor, floor?.id)}>
                                    <FiTrash2 size={18} style={{ color: activeFloor === floor.id ? 'white' : 'grey' }} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-2 flex items-center justify-between" onClick={openNewFloorModal}>
                        <span className="mr-1">New floor</span>
                        <FiPlus size={18} />
                    </button>
                </div>
            </div>
            <div className="map-container flex flex-col justify-center items-center h-[70vh] w-full">
                <div className="flex items-center justify-start bg-gray-200 p-2 space-x-2 w-full lg:w-auto">
                    {editData ? null : (
                        <button className="p-2 hover:bg-gray-300 rounded">
                            <VscColorMode size={20} />
                        </button>
                    )}
                    <div className="flex items-center bg-white rounded">
                        <button className="p-2 hover:bg-gray-100" onClick={handleZoomOut}>
                            <FiZoomOut size={20} />
                        </button>
                        <span className="px-2">{zoomLevel}%</span>
                        <button className="p-2 hover:bg-gray-100" onClick={handleZoomIn}>
                            <FiZoomIn size={20} />
                        </button>
                    </div>
                    {editData ? (
                        <button className="p-2" onClick={handleEdit}>
                            <HiOutlinePencilSquare size={20} />
                        </button>
                    ) : (
                        <>
                            <button className="p-2 hover:bg-gray-300 rounded">
                                <FaArrowsAltH size={20} />
                            </button>
                            <button className="p-2 hover:bg-gray-300 rounded" onClick={hanldeAllReset2}>
                                <FiRotateCcw size={20} />
                            </button>
                            <button className="p-2 hover:bg-gray-300 rounded">
                                <FiSquare size={20} />
                            </button>
                            <button className="p-2 hover:bg-gray-300 rounded" onClick={handleButtonClick}>
                                <FiMapPin size={20} color={!placingMarker ? '' : 'blue'} />
                            </button>
                            <button className="p-2 hover:bg-gray-300 rounded" onClick={handleSave}>
                                <FiSave size={20} />
                            </button>
                            <button className="p-2 hover:bg-gray-300 rounded" onClick={toggleDrawingMode}>
                                <FiPenTool size={20} color={!drawing ? "" : 'blue'} />
                            </button>
                            <button className="p-2 hover:bg-gray-300 rounded" color={!crossBtn ? "" : 'blue'} onClick={handleCross}>
                                <FiX size={20} />
                            </button>
                        </>
                    )}
                </div>
                <div
                    className="floor flex justify-center items-center mt-4 w-full"
                    style={{ opacity: zoomLevel === 100 ? 1 : 0.3 }}
                >
                    <div className="relative w-full lg:w-auto h-[79vh]">
                        <div className="relative">
                            <div className="relative w-full h-[50vh] lg:h-[75vh]">
                                {isLoading ? (
                                    <CircularProgress style={{ color: '#0D1B3E' }} />
                                ) : (
                                    <img
                                        src={selectedFloor?.image || ''}
                                        className=" inset-0 w-full h-full object-cover"
                                    />
                                )}
                                <canvas
                                    ref={canvasRef}
                                    width={800}
                                    height={600}
                                    onClick={handleCanvasClick}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    className="absolute inset-0 w-full h-full opacity-50"
                                />
                            </div>

                            {pois.map((poi, idx) => (
                                <div
                                    key={idx}
                                    className="absolute"
                                    style={{
                                        top: poi.y,
                                        left: poi.x,
                                        width: '30px',
                                        height: '30px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <img
                                        src={markerImage}
                                        alt="Marker"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            padding: '0',
                                            margin: '0',
                                            display: 'block',
                                        }}
                                    />
                                    <span
                                        className="absolute text-white text-xs"
                                        style={{
                                            top: '35px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            padding: '2px 5px',
                                            borderRadius: '3px',
                                        }}
                                    >
                                        {poi.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FloorDeletionModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDeletion}
            />
            <NewFloorModal
                isOpen={isNewFloorModalOpen}
                onClose={closeNewFloorModal}
                onSubmit={handleNewFloorSubmit}
            />
            <MarkerLabelModal
                isOpen={isLabelModalOpen}
                onClose={() => setIsLabelModalOpen(false)}
                onSubmit={handleLabelSubmit}
            />
        </div>
    );
};

export default Floor;