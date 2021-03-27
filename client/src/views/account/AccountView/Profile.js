import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import React, {Component} from 'react';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Avatar
              src={this.props.user.image}
              sx={{
                height: 100,
                width: 100,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h3">
              {this.props.user.name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${this.props.user.hostel || 'Hostel 1'} || ${this.props.user.room || 'A100'}`}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${this.props.user.admissionYear || 'Please enter your Roll Number'}`}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${this.props.user.email || 'xxx@iitbbs.ac.in'}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        {/* <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions> */}
      </Card>
    );
  }
}


export default Profile;
