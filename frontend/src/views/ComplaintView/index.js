import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
// import Profile from './Profile';
import AddComplaint from './addComplaint';
import ComplaintRegister from './complaintRegister';

const Account = () => (
  <>
    <Helmet>
      <title>Add Complaint</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            {' '}
            <ComplaintRegister />
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <AddComplaint />
          </Grid>
          {/* <Grid item lg={3} md={6} xs={12}></Grid> */}
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
