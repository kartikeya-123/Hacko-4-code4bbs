import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ComplaintRegister from './complaintRegister';

class ComplaintView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let isAdmin = false;
    if (this.props.user) {
      isAdmin = this.props.user.role === 'admin';
    }

    return (
      <>
        <Helmet>
          <title>Complaints</title>
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
                <ComplaintRegister
                  admin={isAdmin.toString()}
                  user={this.props.user}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default ComplaintView;
