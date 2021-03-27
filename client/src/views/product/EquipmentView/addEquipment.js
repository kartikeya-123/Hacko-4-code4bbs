import { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField } from '@material-ui/core';

const NewEquipment = (props) => {
  const id = window.location.pathname.split('/')[3];

  const [values, setValues] = useState({
    id: '',
    type: id,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const addEquipment = (event) => {
    event.preventDefault();
    axios.post('/api/v1/sport/eq', { ...values }).then((response) => {
      if (response.status === 201) {
        window.alert('Equipment Added Successfully');
      } else {
        window.alert('Failed to Add Equipment! Try Again after some time');
      }
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      {/* <Grid container spacing={3}> */}
      <Grid item md={12} xs={12}>
        <TextField
          //   fullWidth
          required
          label="New Equipment ID"
          name="id"
          onChange={handleChange}
          value={values.id}
          variant="outlined"
        />
      </Grid>
      {/* </Grid> */}
      <br />
      <Button
        color="primary"
        variant="contained"
        size="small"
        disabled={!(values.id && values.type)}
        onClick={(e) => {
          addEquipment(e);
        }}
      >
        Add Equipment
      </Button>
    </form>
  );
};

export default NewEquipment;
