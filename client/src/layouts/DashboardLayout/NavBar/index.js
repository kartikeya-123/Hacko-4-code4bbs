import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'react-feather';
import NavItem from './NavItem';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers',
  },
  {
    href: '/app/sports',
    icon: ShoppingBagIcon,
    title: 'Sports',
  },

  {
    href: '/app/complaints',
    icon: ShoppingBagIcon,
    title: 'Complaints',
  },

  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
  },
];
const logOut = (cookies) => {
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

const NavBar = ({ user, cookies, onMobileClose, openMobile }) => {
  const location = useLocation();

  if (typeof user === 'string') {
    user = JSON.parse(user);
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.image}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2} m={2}>
        <Box display="flex" justifyContent="center" mt={1}>
          <GoogleLogout
            clientId="1092979243632-ufl3842hjal4adoaio73ta2noj2avnbo.apps.googleusercontent.com"
            buttonText="LOG OUT"
            onLogoutSuccess={() => logOut({ cookies })}
            theme="dark"
            icon={false}
          ></GoogleLogout>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
