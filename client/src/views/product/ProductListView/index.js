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
import data from './data';
import axios from 'axios';

class SportsList extends Component {
  state = {
    sports: [],
    issued: '',
    issuedId: '',
    isLoading: true,
    open: false,
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

  checkStatus = () => {
    axios
      .get('/api/v1/sport/status')
      .then((res) => {
        this.setState({
          issued: res.data.issued[0].id,
          issuedId: res.data.issued[0]._id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  returnEquipment = () => {
    axios
      .patch('/api/v1/sport/return', { id: this.state.issuedId })
      .then((res) => {
        console.log(res);
        this.setState({ issued: '' });
        this.getAllSports();
        this.handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.getAllSports();
    this.checkStatus();
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Sports</title>
        </Helmet>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ padding: '30px' }}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography fontSize={17}>Confirm Return?</Typography>
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              NO
            </Button>
            <Button
              onClick={this.returnEquipment}
              variant="contained"
              color="primary"
              autoFocus
            >
              CONFIRM
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Toolbar />
            {this.state.issued !== '' ? (
              <Card
                style={{
                  margin: '30px 0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <Typography fontSize={16}>
                  You are already issued {this.state.issued}. Do you want to
                  return it?
                </Typography>
                <Button
                  onClick={() => {
                    this.handleClickOpen();
                  }}
                >
                  RETURN
                </Button>
              </Card>
            ) : null}
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
