import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';
import React, {Component} from 'react';
import MyComplaints from './myComplaints';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails : null
    };
  }
  
  render() {
    let userDetails = null;
    if(userDetails !== null) {
      userDetails = this.state.userDetails
    }
    return (
      <>
        <Helmet>
          <title>Account</title>
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
              <Grid item lg={4} md={6} xs={12}>
                <Profile user={this.props.user} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <ProfileDetails user={this.props.user} userDetails = {userDetails} />
              </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <MyComplaints user={this.props.user} />
            </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    )
  }
}

export default Account;
