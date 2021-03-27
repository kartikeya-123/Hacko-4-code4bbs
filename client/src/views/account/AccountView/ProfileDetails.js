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
import axios from 'axios';

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
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(event) {
    event.preventDefault();
    const field = event.target.name;
    this.setState({ [field] : event.target.value});
    // console.log(event.target.value)
  }
  
  saveDetails = () => {
    const changes = {
      phoneNumber : this.state.phoneNumber,
      hostelName : this.state.hostel,
      roomNumber : this.state.room,
      rollNumber : this.state.rollNumber
    }
    axios.patch('/api/v1/user/updateProfile',changes).then(response => {
      this.setState({
        email : response.data.updatedUserData.updatedUser.email,
        name : response.data.updatedUserData.updatedUser.name,
        phoneNumber : response.data.updatedUserData.updatedUser.phoneNumber,
        roomNumber : response.data.updatedUserData.updatedUser.room,
        rollNumber : response.data.updatedUserData.updatedUser.rollNumber,
        hostelName : response.data.updatedUserData.updatedUser.hostel
      })
    })
  }
  render() {
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
    
    return (
      <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={this.handleChange}
                required
                value={this.state.name}
                variant="outlined"
              />
            </Grid> */}

            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={this.handleChange}
                required
                value={this.state.email}
                variant="outlined"
              />
            </Grid> */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={this.handleChange}
                type="text"
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
          <Button color="primary" variant="contained" onClick = {this.saveDetails}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    )
  }
}


export default ProfileDetails;
