import React, { Component } from 'react';
import { Card, Typography, Grid, Divider } from '@material-ui/core';

const menu = [
  {
    day: 'Sunday',
    index: 0,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
  {
    day: 'Monday',
    index: 1,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
  {
    day: 'Tuesday',
    index: 2,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
  {
    day: 'Wednesday',
    index: 3,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
  {
    day: 'Thursday',
    index: 4,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
  {
    day: 'Friday',
    index: 5,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
  {
    day: 'Saturday',
    index: 6,
    breakfast: ['Dosa', 'Sambar', 'Coconut chutney', 'Sweet corn'],
    lunch: ['Jeera rice', 'Dal tadka', 'Dry Bhindi', 'Masala papad', 'Sambar'],
    snacks: ['Samosa'],
    dinner: ['Veg kolhapuri', 'Plain Dal', 'Curd', 'Roti', 'Sambar'],
  },
];

let newMenu = [];

class MessMenu extends Component {
  render() {
    let today = new Date();
    let day = today.getDay();

    let i = 0;
    for (i = 0; i < 7; i++) {
      newMenu[i] = menu[(day + i) % 7];
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
            {newMenu.map((el) => {
              return (
                <Card
                  key={el.index}
                  style={{
                    width: '300px',
                    margin: '10px 20px 20px 20px',
                    padding: '20px',
                  }}
                >
                  <Typography fontSize={26} style={{ fontWeight: 500 }}>
                    {el.day}
                  </Typography>
                  <Divider />
                  <br />
                  <Typography fontSize={20} style={{ fontWeight: 500 }}>
                    Breakfast
                  </Typography>
                  {el.breakfast.map((it) => {
                    return <Typography fontSize={18}>{it}</Typography>;
                  })}
                  <br />
                  <Typography fontSize={20} style={{ fontWeight: 500 }}>
                    Lunch
                  </Typography>
                  {el.lunch.map((it) => {
                    return <Typography fontSize={18}>{it}</Typography>;
                  })}
                  <br />
                  <Typography fontSize={20} style={{ fontWeight: 500 }}>
                    Snacks
                  </Typography>
                  {el.snacks.map((it) => {
                    return <Typography fontSize={18}>{it}</Typography>;
                  })}
                  <br />
                  <Typography fontSize={20} style={{ fontWeight: 500 }}>
                    Dinner
                  </Typography>
                  {el.dinner.map((it) => {
                    return <Typography fontSize={18}>{it}</Typography>;
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
