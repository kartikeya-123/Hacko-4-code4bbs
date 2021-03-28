import { useState } from 'react';
import { React, Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Card,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

import axios from 'axios';

class SportsList extends Component {
  state = {
    courses: [],
  };

  getAllCourses = () => {
    axios
      .get('/api/v1/course', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ courses: response.data.courses, isLoading: false });
      })
      .catch((err) => console.log(err));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.getAllCourses();
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Previous Papers</title>
        </Helmet>

        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Typography
              style={{
                textAlign: 'center',
                fontWeight: 'bolder',
                fontSize: '24px',
              }}
            >
              E-Resources
            </Typography>
            {!this.state.isLoading ? (
              <>
                <Box sx={{ pt: 3 }}>
                  <Grid
                    container
                    spacing={3}
                    style={{ justifyContent: 'center' }}
                  >
                    {!this.state.isLoading &&
                      this.state.courses.map((product) => (
                        <Grid item key={product.id} lg={4} md={6} xs={12}>
                          <ProductCard
                            product={product}
                            sx={{ height: '100%' }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
                {this.state.courses.length > 3 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pt: 3,
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={parseInt((this.state.courses.length - 1) / 6) + 1}
                      size="small"
                    />
                  </Box>
                ) : null}
              </>
            ) : null}
          </Container>
        </Box>
      </>
    );
  }
}

export default SportsList;
