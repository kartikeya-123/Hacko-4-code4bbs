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
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Tool as ToolBarIcon,
  Calendar as CalendarIcon,
  Clock as TimetableIcon,
} from 'react-feather';

import NavItem from './NavItem';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';

import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ClearAllRoundedIcon from '@material-ui/icons/ClearAllRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const items = [
  {
    type: 'Academics',
    children: [
      {
        href: '/app/dashboard',
        icon: HomeOutlinedIcon,
        title: 'Home',
      },
      {
        href: '/app/account',
        icon: UserIcon,
        title: 'Profile',
      },
      {
        href: '/app/users',
        icon: UsersIcon,
        title: 'Students',
      },
      {
        href: '/app/courses',
        icon: DescriptionOutlinedIcon,
        title: 'Courses',
      },
      {
        href: '/app/time-table',
        icon: TimetableIcon,
        title: 'Time Table',
      },
      {
        href: '/app/papers',
        icon: ClearAllRoundedIcon,
        title: 'Resources',
      },
    ],
  },
  {
    type: 'Hostel',
    children: [
      {
        href: '/app/sports',
        icon: ShoppingBagIcon,
        title: 'Sports',
      },

      {
        href: '/app/complaints',
        icon: ToolBarIcon,
        title: 'Complaints',
      },
      {
        href: '/app/calendar',
        icon: CalendarIcon,
        title: 'Calendar',
      },
      {
        href: '/app/mess-menu',
        icon: FastfoodOutlinedIcon,
        title: 'MessMenu',
      },
    ],
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
        <Typography
          style={{ paddingTop: '10px' }}
          color="textPrimary"
          variant="h5"
        >
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
            <div>
              <Typography style={{ fontWeight: 500, padding: '5px 0px' }}>
                {item.type}
              </Typography>
              {item.children.map((el) => {
                return (
                  <NavItem
                    href={el.href}
                    key={el.title}
                    title={el.title}
                    icon={el.icon}
                  />
                );
              })}
            </div>
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
