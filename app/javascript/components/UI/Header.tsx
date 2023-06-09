import React, { MouseEvent, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import UserInvitation from "./UserInvitation";
import Model from "./Model";
interface pageProp {
  title: string;
  handleClick: Function;
}

function Header({ open = false, setOpen = (param) => {} }) {
  const navigate = useNavigate();
  const [pages, setpages] = useState<pageProp []>([]);
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      setpages([
        {
          title: "Home",
          handleClick: () => {
            navigate("/dashboard");
          },
        },
        {
          title: "Invite Friend",
          handleClick: () => {
            setOpen(true);
          },
        },
        {
          title: "Logout",
          handleClick: () => {
            navigate("/signin");
            localStorage.removeItem("token");
          },
        },
      ]);
    } else {
      setpages([
        {
          title: "Login",
          handleClick: () => {
            navigate("/signin");
          },
        },
        {
          title: "Register",
          handleClick: () => {
            navigate("/signup");
          },
        },
      ]);
    }
  }, [isLoggedIn]);

  const handleClose =()=> setOpen(false);

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: pageProp) => (
              <Button
                key={page.title}
                onClick={() => page.handleClick()}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>

      <Model handleClose={handleClose} open={open}>
        <UserInvitation setOpen={setOpen} />
      </Model>
    </AppBar>
  );
}
export default Header;
