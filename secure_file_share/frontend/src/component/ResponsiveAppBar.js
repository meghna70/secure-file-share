import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import shield from "../shield.svg"
import styled from 'styled-components';


const pages = ['My Files', 'Shared Files', 'Doc Summarization ✨'];
const settings = ['Profile', 'Logout'];


const ResponsiveImg = styled.img`
  display: block;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

const AlterResponsiveImg = styled.img`
  display: none;
  
  @media (max-width: 900px) {
    display: block;
  }
`;

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOnClickMenu = (item) => {
    item === "My Files" ?
      navigate("/my-files") :
      item === "Shared Files" ?
        navigate("/shared-files") : navigate("/doc");
  }


  return (
    <AppBar className='responsive_nav_conatiner'
      style={{
        // ...styles.responsive_nav
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "2px solid rgb(232, 232, 232)"
      }}
      position="fixed">

      <Container className='responsive_nav' maxWidth="xl">
        <Toolbar disableGutters>
          {/* <SecurityTwoToneIcon sx={{ display: { xs: 'none', md: 'flex', color: '#1b1c1b' }, mr: 1 }} /> */}

          <ResponsiveImg  
          onClick={() => navigate("/home")}
          src={shield} alt="logo" />

          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/home")}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: "20px",
              fontFamily: "Lexend, serif" , 
              color: '#1b1c1b',
              textDecoration: 'none',
              cursor:"pointer",
            }}
          >
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#1b1c1b"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' }, display: "flex" }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => { handleOnClickMenu(page); handleCloseNavMenu(); }}>
                  <Typography sx={{fontFamily: "Montserrat, serif" , textAlign: 'center', color: "#1b1c1b" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <ShieldIcon sx={{ display: { xs: 'flex', md: 'none', color: '#1b1c1b' }, mr: 1 }} /> */}

          <AlterResponsiveImg onClick={() => navigate("/home")}
            src={shield} alt="logo" />
          <Typography
            onClick={() => navigate("/home")}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontSize: "20px",
              fontFamily: "Lexend, serif" , 
              fontWeight: 600,
              cursor:"pointer",
              color: '#1b1c1b',
              textDecoration: 'none',
            }}
          >
            FortiFile
          </Typography>

          <Box sx={{
            flexGrow: 1,
            flexDirection: "row-reverse",
            display: { xs: 'none', md: 'flex' }
          }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleOnClickMenu(page); handleCloseNavMenu();}}
                sx={{ fontFamily: "Montserrat, serif" , my: 2, mr: 1, textTransform: "none", color: '#333333', display: 'block', fontWeight: 600 }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ border: "1px solid rgb(232, 232, 232)", bgcolor: "#18e719" }}>N</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem sx={{ padding: "10px 20px" }} key={setting} onClick={() => { handleCloseUserMenu(); }}>
                  <Typography sx={{ textAlign: 'center', display: "flex", flexDirection: "row" }}>
                    {setting === "Profile" ?
                      <AccountCircleIcon sx={{ display: { xs: 'flex', md: 'flex', color: 'rgb(113, 194, 84)' }, mr: 1 }} /> :
                      <LogoutIcon sx={{ display: { xs: 'flex', md: 'flex', color: 'rgb(113, 194, 84)' }, mr: 1 }} />
                    }
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;



