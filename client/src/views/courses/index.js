import React, { Component } from 'react';

import { Grid, Card, Typography } from '@material-ui/core';

import axios from 'axios';

class Courses extends Component {
  state = {
    courses: [],
    isLoading: true,
  };

  componentDidMount = () => {
    axios
      .get('/api/v1/timetable/')
      .then((res) => {
        if (res.data.courses.length > 0) {
          this.setState({
            courses: res.data.courses[0].courseList,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    if (this.state.isLoading) return null;
    return (
      <div>
        <Typography fontSize={25} style={{ padding: '20px', fontWeight: 500 }}>
          Your Courses
        </Typography>
        {this.state.courses.length > 0 ? (
          <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.courses.map((el) => {
              return (
                <Card
                  style={{
                    width: '300px',
                    height: '200px',
                    justifyContent: 'center',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    margin: '10px',
                  }}
                >
                  <Typography fontSize={18} style={{ fontWeight: 500 }}>
                    {el.name}
                  </Typography>
                  <Typography>{el.id}</Typography>
                </Card>
              );
            })}
          </Grid>
        ) : (
          <Typography>
            Not enrolled in any courses. Contact administration.
          </Typography>
        )}
      </div>
    );
  }
}

export default Courses;
