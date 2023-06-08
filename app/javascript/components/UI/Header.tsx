import React, { MouseEvent, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
interface pageProp {
  title:string,
  handleClick : Function
}

function Header() {
  const navigate = useNavigate();
  const [pages, setpages] = useState<any>([]);
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (isLoggedIn) {
      setpages([
        {
          title: "DashBoard",
          handleClick: () => {
            navigate("/dashboard");
          },
        },
        {
          title: "New Invitation",
          handleClick: () => {
            navigate("/new-invitation");
          },
        },
        {
          title: "Logout",
          handleClick: () => {
            navigate("/signin");
            localStorage.removeItem('token');
          },
        },
      ]);
    } else {
      setpages([{
          title: "Sign In",
          handleClick: () => {
            navigate("/signin");
          },
        },
        {
          title: "Sign Up",
          handleClick: () => {
            navigate("/signup");
          },
        },
      ]);
    }
  }, [isLoggedIn]);

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page:pageProp) => (
              <Button
                key={page.title}
                onClick={()=>page.handleClick()}
                sx={{ my: 2, color: 'white', display: 'block'}}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;