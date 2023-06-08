import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { signUpSchema } from "../utils";
import Error from "../components/error";
import axiosInstance from "../api";
import { AxiosResponse } from "axios";
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import Header from "./UI/Header";
interface SignUp {
  email: string;
  password: string;
  password_confirmation: string;
}

const defaultTheme = createTheme();

export default function SignUp() {
  localStorage.removeItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const formik = useFormik({
    initialValues:{
      email: params.get('email') || "",
      password: "",
      password_confirmation: ""
    },
    validationSchema:signUpSchema,
    onSubmit: (values: SignUp) => {
      axiosInstance.post('/users', {
        "user": values,
        "user_invitation_token": params.get('user_invitation_token')
      })
      .then((response: AxiosResponse) => {
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
    }
  })

  const {values, handleChange, handleBlur, handleSubmit, errors, touched} = formik;
  return (
    <>
      <Header />
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  id="email"
                  label="Email Address"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                />
              </Grid>
              <Error error={errors?.email} touched={touched?.email}/>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
              </Grid>
              <Error error={errors?.password} touched={touched?.password}/>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password_confirmation"
                  type="password"
                  id="password_confirmation"
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password_confirmation}
                />
              </Grid>
              <Error error={errors?.password_confirmation} touched={touched?.password_confirmation}/>
            </Grid>
            <Button
              color="secondary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}
