import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account1/AccountView';
import UsersView from './views/account1/UsersView';

import UpdateView from './views/account1/UpdateView';
import CustomerListView from './views/customer/CustomerListView';
import DashboardView from './views/reports/DashboardView';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import ProductListView from './views/product/ProductListView';
import RegisterView from './views/auth/RegisterView';
import SettingsView from './views/settings/SettingsView';
import ComplaintView from './views/complaint/ComplaintView';
import NewComplaintView from './views/complaint/NewComplaintView';
import EquipmentView from './views/product/EquipmentView';
import Calendar from './views/Calendar';
import MessMenu from './views/messmenu';
import EditMenu from './views/messmenu/EditMenuView';
import TimeTableView from './views/timeTable';
const setUserAsProps = (user, cookies) => {
  return [
    {
      path: 'app',
      element: <DashboardLayout user={user} cookies={cookies} />,
      children: [
        { path: 'account', element: <AccountView user={user} /> },
        { path: 'update', element: <UpdateView user={user} /> },
        { path: 'customers', element: <CustomerListView user={user} /> },
        { path: 'dashboard', element: <DashboardView user={user} /> },
        { path: 'mess-menu', element: <MessMenu user={user} /> },
        { path: 'mess-menu/:id', element: <EditMenu user={user} /> },
        { path: 'sports', element: <ProductListView user={user} /> },
        { path: 'sports/:id', element: <EquipmentView user={user} /> },
        { path: 'user/:id', element: <UsersView user={user} /> },
        { path: 'settings', element: <SettingsView /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'complaints', element: <ComplaintView user={user} /> },
        { path: 'complaints/add', element: <NewComplaintView user={user} /> },
        { path: 'time-table', element: <TimeTableView user={user} /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <LoginView /> },
        { path: 'register', element: <RegisterView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '/', element: <Navigate to="/app/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ];
};

export default setUserAsProps;
