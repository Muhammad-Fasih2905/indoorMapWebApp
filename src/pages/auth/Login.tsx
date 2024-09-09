import React, { useState } from "react";
import InputField from "../../components/CustomInput";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import Button from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { login } from "../../store/features/auth/authAction";
import CircularProgress from '@mui/material/CircularProgress';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { email, password } = formData;
      setLoading(true)
      const res = await dispatch(login({ email, password })).unwrap();
      if (res?.success === true) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSignUpNavigate = () => {
  //   navigate("/sign_up");
  // };

  return (
    <div className="min-h-screen bg-[#0D1B3E] flex items-center flex-col gap-6 justify-center p-4">
      <div className="w-full max-w-7xl flex justify-center">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    label="Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full"
                    conditionlabel={false}
                    endText="Forgot your password?"
                  />
                </Grid>
              </Grid>
              <CardActions>
                <Button
                  type="submit"
                  className={`md:w-[95%] ms-3 h-[45px] mt-4`}
                >
                  {loading ? <CircularProgress size={24} style={{ color: '#fff' }} /> : 'Sign in'}
                </Button>
              </CardActions>
              {/* <CardContent>
                <Typography
                  variant="subtitle2"
                  className="mt-2 text-center text-[#808080]"
                >
                  Don't have an account?
                  <a
                    className="text-blue-500"
                    onClick={handleSignUpNavigate}
                    style={{ cursor: "pointer" }}
                  >
                    Join now!
                  </a>
                </Typography>
              </CardContent> */}
            </form>
          </CardContent>
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

export default Login;
