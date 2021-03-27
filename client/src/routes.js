import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import CustomerListView from './views/customer/CustomerListView';
import DashboardView from './views/reports/DashboardView';
import LoginView from './views/auth/LoginView';
import NotFoundView from './views/errors/NotFoundView';
import ProductListView from './views/product/ProductListView';
import RegisterView from './views/auth/RegisterView';
import SettingsView from './views/settings/SettingsView';
import ComplaintView from './views/complaint/ComplaintView';
import EquipmentView from './views/product/EquipmentView';

const setUserAsProps = (user, cookies) => {
  return [
    {
      path: 'app',
      element: <DashboardLayout user={user} cookies={cookies} />,
      children: [
        { path: 'account', element: <AccountView user={user} /> },
        { path: 'customers', element: <CustomerListView user={user} /> },
        { path: 'dashboard', element: <DashboardView user={user} /> },
        { path: 'sports', element: <ProductListView user={user} /> },
        { path: 'sports/:id', element: <EquipmentView user={user} /> },
        { path: 'settings', element: <SettingsView /> },
        { path: 'complaints', element: <ComplaintView user={user} /> },
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
