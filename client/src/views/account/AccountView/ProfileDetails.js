import { useState } from 'react';
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

// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama',
//   },
//   {
//     value: 'new-york',
//     label: 'New York',
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco',
//   },
// ];

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

const ProfileDetails = ({ user }) => {

  const [values, setValues] = useState({
    firstName: user.name,
    email: user.email,
    // phoneNumber: user.phoneNumber || 'Not Specified',
    // hostel: user.hostel || 'Not Specified',
    // roomNumber: user.room || 'Not Specified',
    // rollNumber: user.rollNumber || 'Not Specified'
  });
  console.log(user);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Hostel Name"
                name="hostel"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.hostel}
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
                onChange={handleChange}
                required
                value={values.room}
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
                onChange={handleChange}
                required
                value={values.rollNumber}
                variant="outlined"
              >
              </TextField>
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
  );
};

export default ProfileDetails;
