import React, { useState } from 'react';
import InputField from '../../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, Grid } from '@mui/material';
import Button from '../../components/CustomButton';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate('/request_password_reset')
    };
    return (
        <div className="min-h-screen bg-[#0D1B3E] flex items-center flex-col gap-6 justify-center p-4">
            <div className="w-full max-w-7xl flex justify-center">
                <Card sx={{ width: '100%', maxWidth: '480px', }}>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputField
                                        name="email"
                                        label="Enter your email address and we will send you a link to reset your password."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                        className='w-full'
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" onClick={handleSubmit} className={`md:w-[95%] ms-3 h-[45px]`}>
                            Send
                        </Button>
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

export default ForgetPassword;
