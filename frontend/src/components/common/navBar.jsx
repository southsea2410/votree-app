import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchBar from './search';
import { LogoVoTree_primary } from '../../assets/images';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { colors } from '../../styles';
import { HomeIcon, MarketIcon, MarketIconFill, Noti, Basket } from '../../assets/icons';
import { Avatar } from '@mui/material';

const ImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 0, color: colors.green2 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ background: colors.green1 }} style={{ borderBottom: '1px solid', borderColor: colors.green4, justifyContent: "space-between" }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} firstChild={true} float="left">
            <ImageContainer>
              <img src={LogoVoTree_primary} alt="" width="157" height="58" />
            </ImageContainer>
            <SearchBar />
          </div>
          <div style={{ 
                    width       : '200px',
                    marginLeft  : '4%',
                    marginRight : 'auto'
                }}>
            <BottomNavigation value={value} onChange={handleChange}>
              <BottomNavigationAction
                icon={value === 0 ? <HomeIcon color={colors.green5} style={{ fontSize: 30 }}/> : <HomeIcon color={colors.green1} style={{ fontSize: 30 }}/>}
                showLabel={true}
                selected={value === 0}
                style={{ borderBottom: value === 0 ? "4px solid" : "4px solid", borderColor: value === 0 ? colors.green5 : colors.green1 }}
              />
              <BottomNavigationAction
                icon={value === 0 ? <MarketIcon style={{ fontSize: 30 }}/> : <MarketIconFill style={{ fontSize: 30 }} />}
                showLabel={true}
                selected={value === 1}
                style={{ borderBottom: value === 1 ? "4px solid" : "4px solid", borderColor: value === 1 ? colors.green5 : colors.green1 }}
              />
            </BottomNavigation>
          </div>
          <Box sx={{ display: { xs: 'none', md: 'flex', gap: '19px' } }} lastChild={true} float="right">
            {value === 1 ? (<Basket />) : null}
            <Noti />
            <Avatar variant='small'>N</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
