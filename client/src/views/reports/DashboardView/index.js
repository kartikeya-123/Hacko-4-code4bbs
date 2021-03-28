import { Helmet } from 'react-helmet';
import { Card, Box, Container, Grid, Typography } from '@material-ui/core';

import image from '../../../images/home.png';

const Dashboard = ({ user }) => (
  <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <div style={{ padding: '40px' }}>
      <Card style={{ padding: '20px' }}>
        <Typography variant="h2" style={{ paddingBottom: '20px' }}>
          Hi, {user.name} 👋
        </Typography>
        <Typography variant="h4">
          Welcome to the College Management Portal
        </Typography>
      </Card>
      <img
        src={image}
        alt="welcome"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  </>
);

export default Dashboard;
