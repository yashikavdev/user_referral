import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { invitationSchema } from "../../utils";
import Error from "./Error";
import axios from "axios";

type HeadersInit = Headers | string[][] | { [key: string]: string };

interface Invitation {
  email: string;
}

interface PropsType {
  setOpen: (param:boolean)=>void;
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#7cb342",
    },
  },
});

export default function UserInvitation({setOpen}:PropsType) {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: invitationSchema,
    onSubmit: (values: Invitation) => {
      axios
        .post(
          "/user_invitations.json",
          { user_invitation: values },
          { headers: headers }
        )
        .then(() => {
          setOpen(false);
        })
        .catch((error:Error) => {
          setOpen(false);
          console.error(error);
        });
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;

  return (
    <>
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
            <Typography component="h1" variant="h5">
              User Invitation
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              <Error error={errors?.email} touched={touched?.email} />
              <Button
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Invite
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
