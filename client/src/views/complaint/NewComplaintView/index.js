import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import AddComplaint from "./addComplaint";

class NewComplaintView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Lodge Complaint</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={3} md={12} xs={12}></Grid>
              <Grid item lg={6} md={12} xs={12}>
                <AddComplaint />
              </Grid>
              <Grid item lg={3} md={12} xs={12}></Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

export default NewComplaintView;
