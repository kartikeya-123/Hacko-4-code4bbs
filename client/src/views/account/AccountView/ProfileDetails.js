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
import React, {Component} from 'react';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : this.props.user.name,
      email: this.props.user.email,
      phoneNumber : this.props.user.phoneNumber,
      hostel : this.props.user.hostel,
      rollNumber : this.props.user.rollNumber,
      room : this.props.user.room
    };
  }
  
  render() {
    console.log(this.props.userDetails);
    const hostels = [
      {
        value: 'hostel-1',
        label: 'Hostel 1',
      },
      {
        value: 'hostel-2',
        label: 'Hostel 2',
      },
      {
        value: 'hostel-3',
        label: 'Hostel 3',
      },
    ];
    console.log(this.props.user)
    return (
      <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={this.handleChange}
                required
                value={this.state.name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={this.handleChange}
                required
                value={this.state.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={this.handleChange}
                type="number"
                value={this.state.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Hostel Name"
                name="hostel"
                onChange={this.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={this.state.hostel}
                variant="outlined"
              >
                {hostels.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Room Number"
                name="room"
                onChange={this.handleChange}
                required
                value={this.state.room}
                variant="outlined"
              >
                {/* {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))} */}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Roll Number"
                name="rollNumber"
                onChange={this.handleChange}
                required
                value={this.state.rollNumber}
                variant="outlined"
              ></TextField>
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
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    )
  }
}


export default ProfileDetails;
