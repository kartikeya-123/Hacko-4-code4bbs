import React, { Component } from 'react';
import {
  Card,
  Typography,
  Grid,
  Divider,
  Button,
  Box,
} from '@material-ui/core';
import axios from 'axios';

class MessMenu extends Component {
  state = { menu: [] };
  constructor(props) {
    super(props);
  }

  getMenu = () => {
    axios.get('/api/v1/mess').then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({ menu: response.data.data.docs });
      }
    });
  };

  componentDidMount = () => {
    this.getMenu();
  };

  render() {
    let today = new Date();
    let day = today.getDay();
    let newMenu = [];
    if (this.state.menu.length > 0) {
      let i = 0;
      for (i = 0; i < 7; i++) {
        newMenu[i] = this.state.menu[(day + i) % 7];
      }
    }
    return (
      <>
        <Typography fontSize={24} style={{ padding: '20px 50px' }}>
          Hostel 1
        </Typography>
        <Grid item style={{ overflowX: 'auto', height: 'calc(100vh - 200px)' }}>
          <Grid
            container
            style={{
              justifyContent: 'space-evenly',
              width: '2500px',
              height: 'calc(100% - 500px)',
            }}
          >
            {newMenu.map((el, index) => {
              let color =
                index == 0 ? 'rgb(62, 149, 242,0.2)' : 'rgb(18, 60, 105,0.1)';
              return (
                <Card
                  key={el.index}
                  style={{
                    width: '300px',
                    margin: '10px 20px 20px 20px',
                    padding: '20px',
                    backgroundColor: color,
                  }}
                  key={el.day}
                >
                  <Typography
                    fontSize={26}
                    style={{ fontWeight: 500 }}
                    key={el.day}
                  >
                    {el.day}
                  </Typography>
                  {this.props.user && this.props.user.role === 'admin' ? (
                    <Button
                      color="primary"
                      size="small"
                      variant="text"
                      onClick={() =>
                        (window.location.href = `/app/mess-menu/${el.index}`)
                      }
                    >
                      Edit
                    </Button>
                  ) : null}
                  <Divider />
                  <br />
                  <Typography
                    fontSize={20}
                    style={{ fontWeight: 500 }}
                    key={'breakfast' + el.day}
                  >
                    Breakfast
                  </Typography>
                  {el.breakfast.map((it, i) => {
                    return (
                      <Typography key={i} fontSize={18}>
                        {it}
                      </Typography>
                    );
                  })}
                  <br />
                  <Typography
                    fontSize={20}
                    style={{ fontWeight: 500 }}
                    key={'Lunch' + el.day}
                  >
                    Lunch
                  </Typography>
                  {el.lunch.map((it, i) => {
                    return (
                      <Typography key={i} fontSize={18}>
                        {it}
                      </Typography>
                    );
                  })}
                  <br />
                  <Typography
                    fontSize={20}
                    style={{ fontWeight: 500 }}
                    key={'Snacks' + el.day}
                  >
                    Snacks
                  </Typography>
                  {el.snacks.map((it, i) => {
                    return (
                      <Typography key={i} fontSize={18}>
                        {it}
                      </Typography>
                    );
                  })}
                  <br />
                  <Typography
                    fontSize={20}
                    style={{ fontWeight: 500 }}
                    key={'Dinner' + el.day}
                  >
                    Dinner
                  </Typography>
                  {el.dinner.map((it, i) => {
                    return (
                      <Typography key={i} fontSize={18}>
                        {it}
                      </Typography>
                    );
                  })}
                </Card>
              );
            })}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default MessMenu;
