import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';

const RequestPasswordReset: React.FC = () => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        // console.log('Form submitted', { email, password, useCase });
    };
    const handleBack = () => {
        navigate('/forget_password')
    }
    return (
        <div className="min-h-screen bg-[#0D1B3E] flex items-center flex-col gap-6 justify-center p-4">
            <div className="w-full max-w-7xl flex justify-center">
                <Card sx={{ width: '100%', maxWidth: '480px', p: 3, boxShadow: 3, }}>
                    <CardHeader
                        title="Reset Your Password"
                        titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                        sx={{ textAlign: 'start', mb: 2 }}
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit} className='ms-2'>
                            <Grid container spacing={2}>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
                                    We have sent you an email with a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                                </Typography>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-start', }}>
                        <button type="submit" onClick={handleBack} className="w-full text-[#4BADDE] text-start md:w-[95%]">
                            I haven't received the email
                        </button>
                    </CardActions>
                </Card>
            </div>
            <footer className="text-[#808080] text-xs">
                © 2024 Vegas Navication Technologies · support@VegasNavication.com
                <br />
                Platform status · Privacy · Legal · Cookie policy
            </footer>
        </div>
    );
};

export default RequestPasswordReset;
