import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const CustomizedMenu = ({ user, currentUser, updateProfile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [profile, setProfile] = React.useState(user);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Unpubishing a user //
  const unpublishUser = (email) => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails,
    };
    axios
      .patch('/api/v1/admin/unpublish', data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        alert('Sucessfully unpublished');

        updateProfile();
      })
      .catch((err) => console.log(err));
  };
  //Publish user
  const publishUser = (email) => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails,
    };
    axios
      .patch('/api/v1/admin/publish', data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        alert('Sucessfully published');
        updateProfile();
      })
      .catch((err) => console.log(err));
  };
  const verifyUser = (email) => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails,
    };
    axios
      .patch('/api/v1/admin/verify', data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        alert('Sucessfully verified');
        updateProfile();
      })
      .catch((err) => console.log(err));
  };
  const unverifyUser = (email) => {
    let emails = [];
    emails.push(email);
    const data = {
      emails: emails,
    };
    axios
      .patch('/api/v1/admin/unverify', data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        alert('Sucessfully unverified');
        updateProfile();
      })
      .catch((err) => console.log(err));
  };
  const endorseUser = (id) => {
    if (!user.endorsers.includes(currentUser.id)) {
      console.log(user.endorsers);
      console.log(currentUser.id);
      let data = [];
      axios
        .patch('/api/v1/user/endorse/' + id, data, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.message === 'This user is already endorsed by you')
            alert('This user is already endorsed by you');
          else {
            alert('Sucessfully endorsed');
            updateProfile();
          }
          console.log(response);
        })
        .catch((err) => console.log(err));
    } else {
      alert('Already endorsed by you');
    }
  };
  const clearEndorses = (id) => {
    let data = [];
    axios
      .patch('/api/v1/user/clearEndorses?id=' + id, data, {
        withCredentials: true,
      })
      .then((response) => {
        alert('Sucessfully cleared reports');
        updateProfile();
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  let verify;
  let unpublish;
  let publish;
  let clearendorse;
  if (typeof currentUser === 'string') {
    currentUser = JSON.parse(currentUser);
  }
  if (currentUser.role === 'visitor' || currentUser.email === user.email) {
    return null;
  }
  //Verify
  // if (user.verifyStatus) {
  //   verify = (
  //     <StyledMenuItem>
  //       <ListItemText
  //         primary="Unverify user"
  //         onClick={() => unverifyUser(user.email)}
  //       />
  //     </StyledMenuItem>
  //   );
  // } else {
  //   verify = (
  //     <StyledMenuItem>
  //       <ListItemText
  //         primary="Verify user"
  //         onClick={() => verifyUser(user.email)}
  //       />
  //     </StyledMenuItem>
  //   );
  // }
  //publish status
  // if (user.publishStatus) {
  //   unpublish = (
  //     <StyledMenuItem>
  //       <ListItemText
  //         primary="Unpublish user"
  //         onClick={() => unpublishUser(user.email)}
  //       />
  //     </StyledMenuItem>
  //   );
  // } else {
  //   publish = (
  //     <StyledMenuItem>
  //       <ListItemText
  //         primary="Publish user"
  //         onClick={() => publishUser(user.email)}
  //       />
  //     </StyledMenuItem>
  //   );
  // }
  if (user.endorse > 0) {
    clearendorse = (
      <StyledMenuItem>
        <ListItemText
          primary="Clear endorse"
          onClick={() => clearEndorses(user._id)}
        />
      </StyledMenuItem>
    );
  }

  return (
    <div>
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ float: 'right', color: 'black' }}
        >
          <MoreVertIcon />
        </IconButton>
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText
            primary="Endorse User"
            onClick={() => endorseUser(user._id)}
          />
        </StyledMenuItem>

        {currentUser.role === 'admin' || currentUser.role === 'superAdmin' ? (
          <span>
            {clearendorse}
            {/* {verify}
            {unpublish} */}
          </span>
        ) : null}
        {currentUser.role === 'superAdmin' ? <> {publish} </> : null}
      </StyledMenu>
    </div>
  );
};

export default CustomizedMenu;
