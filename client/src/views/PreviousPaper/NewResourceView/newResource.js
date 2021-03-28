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
class newResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      values: { course: '', name: '', year: '', link: '' },
    };
  }

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

  handleChange = (e) => {
    e.preventDefault();
    const newValues = { ...this.state.values };
    newValues[e.target.name] = e.target.value;

    this.setState({ values: newValues });
  };

  addResource = (e) => {
    e.preventDefault();

    axios
      .post(`/api/v1/course/paper/:${this.state.values.course}`, {
        ...this.state.values,
      })
      .then((response) => {
        console.log(response);
      });
  };

  componentDidMount = () => {
    this.getAllCourses();
  };

  render() {
    let years = [];
    let d = new Date();
    let y;
    for (y = d.getFullYear(); y >= d.getFullYear() - 5; y--) {
      years.push({ label: y, value: y });
    }

    return (
      <form autoComplete="off" noValidate {...this.props}>
        <Card>
          <CardHeader
            subheader="Fill the form for adding a New Resource"
            title=" New Resource"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Select Course"
                  name="course"
                  onChange={(e) => this.handleChange(e)}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={this.state.values.course}
                  variant="outlined"
                >
                  <option value={null}></option>
                  {this.state.courses.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select Year"
                  name="year"
                  onChange={(e) => this.handleChange(e)}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={this.state.values.year}
                  variant="outlined"
                >
                  {years.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={(e) => this.handleChange(e)}
                  required
                  value={this.state.values.name}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="URL file for Sharing"
                  name="link"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.values.link}
                  variant="outlined"
                />
              </Grid>

              {/* <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  name="phone"
                  onChange={(e) => this.handleChange(e)}
                  type="number"
                  value={this.state.values.phone}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows="4"
                  helperText="Describe your complaint"
                  label="Description"
                  name="description"
                  onChange={(e) => this.handleChange(e)}
                  required
                  value={this.state.values.firstName}
                  variant="outlined"
                />
              </Grid> */}
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
                  this.state.values.course &&
                  this.state.values.year &&
                  this.state.values.name &&
                  this.state.values.link
                )
              }
              onClick={(e) => {
                this.addResource(e);
              }}
            >
              Register Complaint
            </Button>
          </Box>
        </Card>
      </form>
    );
  }
}

export default newResource;
