import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import axios from 'axios';
// import Profile from './Profile';
import AddComplaint from './addComplaint';
import ComplaintRegister from './complaintRegister';

class ComplaintView extends Component {
  constructor(props) {
    super(props);
    this.state = { complaints: [] };
  }

  getComplaints = () => {
    axios.get(`/api/v1/complaint`).then((response) => {
      console.log(response);
      this.setState({ complaints: response.data.data.docs });
    });
  };

  componentDidMount = () => {
    this.getComplaints();
  };

  render() {
    return (
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
                <ComplaintRegister complaints={this.state.complaints} />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <AddComplaint />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default ComplaintView;
