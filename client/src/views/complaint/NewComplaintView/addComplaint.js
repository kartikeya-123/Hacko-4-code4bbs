import { useState } from 'react';
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
  Checkbox,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    value: 'civil',
    label: 'Civil',
  },
  {
    value: 'mess',
    label: 'Hostel Mess',
  },
  {
    value: 'electrical',
    label: 'Electrical',
  },
  {
    value: 'internet',
    label: 'Internet',
  },
];

const hostels = [{ value: 'hostel1', label: 'Hostel 1' }];

const ProfileDetails = (props) => {
  const [values, setValues] = useState({
    subject: '',
    description: '',
    phone: '',
    category: '',
    availableTime: '',
    hostel: 'hostel1',
  });

  const [available, setAvailable] = useState(false);

  let navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const postComplaint = (event) => {
    event.preventDefault();
    axios.post('/api/v1/complaint', { ...values }).then((response) => {
      if (response.status === 201) {
        window.alert('Complaint Added Successfully');
        navigate('/app/complaints');
      } else {
        window.alert('Failed to Add Complaint! Try Again after some time');
      }
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="Fill the form for registering your complaint"
          title=" New Complaint"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Hostel"
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
                label="Select Category"
                name="category"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                onChange={handleChange}
                required
                value={values.subject}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                disabled={available}
                label="Availabe Time"
                name="availableTime"
                onChange={handleChange}
                value={values.availableTime}
                variant="outlined"
              />
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      size="small"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAvailable(true);
                          setValues({ ...values, availableTime: 'available' });
                        } else {
                          setAvailable(false);
                        }
                      }}
                    />
                  }
                  label="Anytime Availabe"
                  labelPlacement="right"
                />
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
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
                onChange={handleChange}
                required
                value={values.firstName}
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
                values.subject &&
                values.description &&
                values.phone &&
                values.category &&
                values.hostel &&
                values.availableTime
              )
            }
            onClick={(e) => {
              postComplaint(e);
            }}
          >
            Register Complaint
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileDetails;
