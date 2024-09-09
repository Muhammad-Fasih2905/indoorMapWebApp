import React from 'react'
import { Paper, Typography } from '@mui/material';
import Layout from '../../components/Layout'
import { FaRoute } from "react-icons/fa6";

const Portal: React.FC = () => {
    return (
        <Layout showHeader={true} showHeaderText={'Patrols'} showPatrol={true}>
            <Paper className="w-full max-w-2xl mx-auto h-[18vh] flex flex-col items-center my-4 p-6 text-center">
                <FaRoute size={30} className='text-red-500 mb-4' />
                <Typography variant="h6" className="text-gray-800 mb-2">
                    There are no patrols.
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                    Please use the button above to create one
                </Typography>
            </Paper>
        </Layout>
    )
}

export default Portal
