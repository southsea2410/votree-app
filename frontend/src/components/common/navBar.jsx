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
import { HomeIcon, MarketIcon, MarketIconFill, Noti, Basket, BasketClicked, NotiClicked } from '../../assets/icons';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectNavBarState } from '../../redux/features/common/navBarStateSlice';
import { updateNavBarState } from '../../redux/features/common/navBarStateSlice';
import { selectIsLoggedIn } from '../../redux/features/account/isLoggedInSlice';

const ImageContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const hoverStyle = {
    cursor: 'pointer'
};

export default function NavBar({ className }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navBarState = useSelector(selectNavBarState);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState(navBarState);
    const [basketClicked, setBasketClicked] = React.useState(false);
    const [notiClicked, setNotiClicked] = React.useState(false);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        if (newValue === 0) navigate('/');
        if (newValue === 1) navigate('/marketplace');
        if (newValue === 2) navigate('/profile');
        
        // update Redux
        dispatch(updateNavBarState(newValue));
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

    const handleNavigateToHome = () => {
        setValue(0);
        dispatch(updateNavBarState(0));
        navigate('/');
    }

    const handleNavigateToLogin = () => {
        navigate('/login');
    }

    const handleClickBasket = () => {
        setBasketClicked(!basketClicked);
        if (notiClicked) setNotiClicked(!notiClicked);
    }

    const handleClickNoti = () => {
        setNotiClicked(!notiClicked);
        if (basketClicked) setBasketClicked(!basketClicked);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}>
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
                horizontal: 'right'
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
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
                    color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 0, color: colors.green2 }} className={className}>
            <AppBar position="static" elevation={0}>
                <Toolbar
                    sx={{ background: colors.green1 }}
                    style={{
                        borderBottom: '1px solid',
                        borderColor: colors.green4,
                        justifyContent: 'space-between'
                    }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <ImageContainer onClick={handleNavigateToHome} style={hoverStyle}>
                            <img src={LogoVoTree_primary} alt="" width="157" height="58" />
                        </ImageContainer>
                        <SearchBar />
                    </div>
                    <div
                        style={{
                            marginLeft: '6%',
                            marginRight: 'auto'
                        }}>
                        <BottomNavigation value={value} onChange={handleChange}>
                            <BottomNavigationAction
                                icon={
                                    value === 0 ? (
                                        <HomeIcon color={colors.green5} style={{ fontSize: 30 }} />
                                    ) : (
                                        <HomeIcon color={colors.green1} style={{ fontSize: 30 }} />
                                    )
                                }
                                showLabel={true}
                                selected={value === 0}
                                style={{
                                    borderBottom: value === 0 ? '4px solid' : '4px solid',
                                    borderColor: value === 0 ? colors.green5 : colors.green1
                                }}
                            />
                            <BottomNavigationAction
                                icon={
                                    value === 1 ? (
                                        <MarketIconFill style={{ fontSize: 30 }} />
                                    ) : (
                                        <MarketIcon color={colors.green5} style={{ fontSize: 30 }} />
                                    )
                                }
                                showLabel={true}
                                selected={value === 1}
                                style={{
                                    borderBottom: value === 1 ? '4px solid' : '4px solid',
                                    borderColor: value === 1 ? colors.green5 : colors.green1,
                                    pointerEvents: isLoggedIn ? 'auto' : 'none'
                                }}
                            />
                        </BottomNavigation>
                    </div>
                    {
                        isLoggedIn ?
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex', gap: '19px' }
                            }}
                            // lastChild={true}
                            float="right">
                            <div onClick={handleClickBasket} style={hoverStyle}>
                                {
                                    basketClicked ?
                                    <BasketClicked />
                                    :
                                    <Basket />
                                }
                            </div>
                            <div onClick={handleClickNoti} style={hoverStyle}>
                                {
                                    notiClicked ?
                                    <NotiClicked />
                                    :
                                    <Noti />
                                }
                            </div>
                            <div style={{...hoverStyle, pointerEvents: isLoggedIn ? 'auto' : 'none'}} onClick={() => handleChange(null, 2)}>
                            {
                                value === 2 ?
                                <Avatar variant="small-border">N</Avatar>
                                :
                                <Avatar variant="small">N</Avatar>
                            }
                            </div>
                            <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
                        </Box>
                        :
                        <Button style={{ padding: '6px 21px' }} onClick={handleNavigateToLogin}>Log in / Sign up</Button>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
