import React, { Component } from 'react';
import { Box, Container, withStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import axios from 'axios';
const useStyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
});

class CustomerListView extends Component {
  state = {
    users: [],
    tags: [
      {
        group: 'Tech',
        name: 'React',
      },
      {
        group: 'Tech',
        name: 'Node',
      },
      {
        group: 'Tech',
        name: 'Flutter',
      },
      {
        group: 'Tech',
        name: 'Angular',
      },
      {
        group: 'Positon of Responsibility',
        name: 'Mess Secretary',
      },
      {
        group: 'Positon of Responsibility',
        name: 'Sports Secretary',
      },
      {
        group: 'Positon of Responsibility',
        name: 'Cultural Secretary',
      },
      {
        group: 'Positon of Responsibility',
        name: 'Tech Secretary',
      },
    ],
    isLoadingUsers: false,
    isLoadingTags: false,
  };
  getAllUsers = () => {
    this.setState({ isLoadingUsers: true });
    axios
      .get('/api/v1/user', {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          users: response.data.data.docs,
          isLoadingUsers: false,
        });
      })
      .catch((err) => {
        this.setState({ isLoadingUsers: false });
      });
  };

  componentDidMount = () => {
    this.getAllUsers();
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {!this.state.isLoadingUsers && !this.state.isLoadingTags ? (
          <Page className={classes.root} title="Students List">
            <Container maxWidth={false}>
              <Box mt={3}>
                <Results customers={this.state.users} tags={this.state.tags} />
              </Box>
            </Container>
          </Page>
        ) : null}
      </div>
    );
  }
}
export default withStyles(useStyles)(CustomerListView);
