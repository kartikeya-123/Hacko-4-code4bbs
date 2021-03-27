import React, { Component } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';

class editMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: { breakfast: '', snacks: '', dinner: '', lunch: '' },
    };
    this.id = window.location.pathname.split('/')[3];
  }

  getMenu = () => {
    axios.get(`/api/v1/mess/menu/${this.id}`).then((response) => {
      if (response.status === 200) {
        const doc = response.data.data.doc;
        const initalValues = {
          breakfast: doc.breakfast.join(),
          lunch: doc.lunch.join(),
          dinner: doc.dinner.join(),
          snacks: doc.snacks.join(),
        };
        this.setState({ values: initalValues });
      }
    });
  };

  componentDidMount = () => {
    this.getMenu();
  };

  handleChange = (e) => {
    e.preventDefault();
    const newValues = { ...this.state.values };
    newValues[e.target.name] = e.target.value;

    this.setState({ values: newValues });
  };

  mapDays = (index) => {
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    return weekday[index];
  };

  render() {
    return (
      <form autoComplete="off" noValidate {...this.props}>
        <Card>
          <CardHeader
            subheader="Menu "
            title={`Edit Menu: ${this.mapDays(this.id)}`}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Breakfast"
                  name="breakfast"
                  onChange={(e) => this.handleChange(e)}
                  required
                  value={this.state.values.breakfast}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Lunch"
                  name="lunch"
                  onChange={(e) => this.handleChange(e)}
                  required
                  value={this.state.values.lunch}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Snacks"
                  name="snacks"
                  onChange={(e) => this.handleChange(e)}
                  required
                  value={this.state.values.snacks}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={4}
                  label="Dinner"
                  name="dinner"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.values.dinner}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              disabled={
                !(
                  this.state.values.breakfast &&
                  this.state.values.dinner &&
                  this.state.values.lunch &&
                  this.state.values.snacks
                )
              }
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Update Menu
            </Button>
          </Box>
        </Card>
      </form>
    );
  }
}

export default editMenu;
