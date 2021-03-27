import { useState } from 'react';
import { React, Component } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';
import axios from 'axios';

class SportsList extends Component {
  state = {
    sports: [],
    isLoading: true,
  };
  getAllSports = () => {
    axios
      .get('/api/v1/sport/eqType', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ sports: response.data.data.docs, isLoading: false });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.getAllSports();
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Sports</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Toolbar />
            {!this.state.isLoading ? (
              <>
                <Box sx={{ pt: 3 }}>
                  <Grid
                    container
                    spacing={3}
                    style={{ justifyContent: 'center' }}
                  >
                    {!this.state.isLoading &&
                      this.state.sports.map((product) => (
                        <Grid item key={product.id} lg={4} md={6} xs={12}>
                          <ProductCard
                            product={product}
                            sx={{ height: '100%' }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
                {this.state.sports.length > 3 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pt: 3,
                    }}
                  >
                    <Pagination
                      color="primary"
                      count={this.state.sports.length / 3 + 1}
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
