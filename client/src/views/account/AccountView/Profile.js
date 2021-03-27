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
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
      </Card>
    );
  }
}
// const Profile = ({ user }) => {
//   console.log(typeof user);
//   return (
//     <Card>
//       <CardContent>
//         <Box
//           sx={{
//             alignItems: 'center',
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           <Avatar
//             src={user.image}
//             sx={{
//               height: 100,
//               width: 100,
//             }}
//           />
//           <Typography color="textPrimary" gutterBottom variant="h3">
//             {user.name}
//           </Typography>
//           <Typography color="textSecondary" variant="body1">
//             {`${user.hostel || 'Hostel 1'} || ${user.room || 'A100'}`}
//             {/* <br/>
//             {`${user.admissionYear || 'Please enter your roll Number'}`} */}
//           </Typography>
//           <Typography color="textSecondary" variant="body1">
//             {`${user.admissionYear || 'Please enter your Roll Number'}`}
//           </Typography>
//         </Box>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button color="primary" fullWidth variant="text">
//           Upload picture
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };
export default Profile;
