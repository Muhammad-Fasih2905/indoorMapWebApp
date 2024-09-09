import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

interface ImageModalProps {
    open: boolean;
    setOpen: any;
    image: string
}

const ImageModal: React.FC<ImageModalProps> = ({ open, setOpen, image }) => {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <CardMedia
                        sx={{ height: 600, width: 600 }}
                        image={image}
                    />
                </Box>
            </Modal>
        </div>
    );
}

export default ImageModal