import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../../components/Logo';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';

const TopBar = ({ onMobileNavOpen, cookies, ...rest }) => {
  const [notifications] = useState([]);
  const logout = (cookies) => {
    axios
      .post('/api/v1/auth/logout', {
        withCredentials: true,
      })
      .then((response) => {
        cookies.cookies.remove('isLoggedIn', { path: '/' });
        cookies.cookies.remove('userData', { path: '/' });
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AppBar elevation={0} {...rest} style={{ backgroundColor: '#123C69' }}>
      <Toolbar>
        <RouterLink to="/">
          <Typography
            fontSize={20}
            style={{ color: 'white', fontWeight: 'bolder' }}
          >
            College Management Portal
          </Typography>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* <IconButton color="inherit" onClick={() => logout({ cookies })}>
          <InputIcon />
        </IconButton> */}

        {/* <Box display="flex" justifyContent="center" mt={1}>
            <GoogleLogout
              clientId="1092979243632-ufl3842hjal4adoaio73ta2noj2avnbo.apps.googleusercontent.com"
              buttonText="LOG OUT"
              onLogoutSuccess={() => logout({ cookies })}
              theme="dark"
              icon={false}
            ></GoogleLogout>
          </Box>
        </Box> */}
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
