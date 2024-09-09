import React, { useState } from 'react';
import InputField from '../../components/CustomInput';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import Button from '../../components/CustomButton';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [useCase, setUseCase] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted', { email, password, useCase });
    };
    const handleLoginNavigate = () => {
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-[#0D1B3E] flex items-center justify-center p-4">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row">
                {/* Left side */}
                <div className="lg:w-1/2 text-white mb-5 lg:mb-0 lg:pr-8 flex flex-col justify-evenly">
                    <div className="text-white mb-5 lg:mb-0 lg:pr-8 w-full">
                        <h1 className="text-3xl font-bold mb-4">Start now your 30-day Free Trial</h1>
                        <p className="mb-6">You are 3 steps away from testing :</p>
                        <ol className="space-y-4">
                            <li className="flex items-center">
                                <span className="bg-white text-[#0D1B3E] rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                                Register and upload the floor plans of your building
                            </li>
                            <li className="flex items-center">
                                <span className="bg-white text-[#0D1B3E] rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                                Follow the instructions to calibrate your building
                            </li>
                            <li className="flex items-center">
                                <span className="bg-white text-[#0D1B3E] rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">3</span>
                                Test the indoor geolocation with our App or create your own
                            </li>
                        </ol>
                        <p className="mt-6">
                            Already have a Vegas Navication account? <a className="text-blue-300 hover:underline cursor-pointer" onClick={handleLoginNavigate}>Sign in</a>
                        </p>
                    </div>
                    <footer className="left-4 text-xs">
                        <span className='text-white'>© 2024 Vegas Navication Technologies · </span><span className='text-[#6B7280]'>support@VegasNavication.com</span>
                        <br />
                        <span className="space-x-2">
                            <a href="#" className="text-white hover:text-[#6B7280]">Platform status</a>
                            <a href="#" className="text-white hover:text-[#6B7280]">Privacy</a>
                            <a href="#" className="text-white hover:text-[#6B7280]">Legal</a>
                            <a href="#" className="text-white hover:text-[#6B7280]">Cookie policy</a>
                        </span>
                    </footer>
                </div>

                {/* Right side */}
                <div className="lg:w-1/2">
                    <Card className="bg-white shadow-lg rounded-lg">
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h4" color="textPrimary" gutterBottom className="mb-4">
                                    Create your account
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <InputField
                                            label="Email address"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter your email"
                                            className='w-full'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputField
                                            label="Password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Enter your password"
                                            className='w-full'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Select your use case
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Card
                                                    variant="outlined"
                                                    className={`cursor-pointer ${useCase === 'Wayfinding' ? 'border-blue-500' : ''}`}
                                                    onClick={() => setUseCase('Wayfinding')}
                                                >
                                                    <CardContent>
                                                        <Typography sx={{ fontSize: 17 }}>Wayfinding</Typography>
                                                        <Typography sx={{ fontSize: 13 }}>
                                                            Add an indoor map with wayfinding instructions to your visitor APP.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Card
                                                    variant="outlined"
                                                    className={`cursor-pointer ${useCase === 'Workforce tracking' ? 'border-blue-500' : ''}`}
                                                    onClick={() => setUseCase('Workforce tracking')}
                                                >
                                                    <CardContent>
                                                        <Typography sx={{ fontSize: 17, color: 'grey' }}>Workforce tracking</Typography>
                                                        <Typography sx={{ fontSize: 13, color: 'grey' }}>
                                                            Audit the service level and optimize your facility management services.
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                                            label={<Typography style={{ fontSize: '0.75rem' }}>I have read and agree to the terms and conditions of Master Subscription Agreement and Legal Notice.</Typography>}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />}
                                            label={<Typography style={{ fontSize: '0.75rem' }}>I agree to the processing of my personal data according to the Privacy Policy of Situm Technologies S.L.</Typography>}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={newsletterSubscribed} onChange={(e) => setNewsletterSubscribed(e.target.checked)} />}
                                            label={<Typography style={{ fontSize: '0.75rem' }}>I would like to subscribe to Vegas Navication Newsletter and accept the processing of my personal data as set forth in the Privacy Policy.</Typography>}
                                        />
                                    </Grid>

                                </Grid>
                                <Typography variant="body2" className="mt-4 text-center">
                                    <a href="#" className="text-grey-500 hover:underline">How will we treat your data?</a>
                                </Typography>
                                <Button type="submit" className="md:w-[95%] h-[45px] mt-4 bg-[#0D1B3E] text-white py-2 rounded">
                                    Create account
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
};

export default SignUp;