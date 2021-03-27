import React, { Component } from 'react';
import './index.css';
import {
  CalendarComponent,
  ChangedEventArgs,
} from '@syncfusion/ej2-react-calendars';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import {
//   Button,
//   Card,
//   CardHeader,
//   Chip,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Tooltip,
//   Box,
//   Container,
//   Grid,
//   Pagination,
//   touchRippleClasses,
// } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { withStyles } from '@material-ui/styles';
import { GrTechnology } from 'react-icons/gr';
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: 'transparent',
  },
  //   title: {
  //     margin: theme.spacing(4, 0, 2),
  //   },
  title: {
    paddingTop: '20px',
    color: 'blue',
  },
});

class Calendar extends Component {
  //   const [selectedDate, setDate] = useState(new Date().toLocaleDateString());
  state = {
    date: 0,
    events: [
      {
        day: 'Monday',
        currEvents: [
          {
            name: 'Wissenaire || Techno management Fest',
            endsAt: '21:30 || Today',
          },
          {
            name: 'Panacea || Literary event',
            endsAt: '17:30 || Today',
          },
          {
            name: 'Web&d || Webathon',
            endsAt: '14:30 || Today',
          },
        ],
      },
      {
        day: 'Tuesday',
        currEvents: [
          {
            name: 'Esummit || Entrepreneurship',
            endsAt: '11:30 || Today',
          },
          {
            name: 'Neuromancers|| Hackathon',
            endsAt: '13:30 || Today',
          },
          {
            name: 'Web&d || Webathon',
            endsAt: '14:30 || Today',
          },
        ],
      },
      {
        day: 'Wednesday',
        currEvents: [
          {
            name: 'Alma || Cultural Fest',
            endsAt: '20:30 || Today',
          },
          {
            name: 'Web&d || Webathon',
            endsAt: '14:30 || Today',
          },
        ],
      },
      {
        day: 'Thursday',
        currEvents: [
          {
            name: 'Esummit || Entrepreneurship',
            endsAt: '11:30 || Today',
          },
          {
            name: 'Neuromancers|| Hackathon',
            endsAt: '13:30 || Today',
          },
        ],
      },
      {
        day: 'Friday',
        currEvents: [
          {
            name: 'Alma || Cultural Fest',
            endsAt: '20:30 || Today',
          },
          {
            name: 'Web&d || Webathon',
            endsAt: '13:30 || Today',
          },
          {
            name: 'RISC|| Webathon',
            endsAt: '15:30 || Today',
          },
        ],
      },
      {
        day: 'Saturday',
        currEvents: [
          {
            name: 'RISC|| Webathon',
            endsAt: '15:30 || Today',
          },
          {
            name: 'Panacea || Literary event',
            endsAt: '17:30 || Today',
          },
        ],
      },
      {
        day: 'Sunday',
        currEvents: [
          {
            name: 'Wissenaire || Techno management Fest',
            endsAt: '21:30 || Today',
          },
          {
            name: 'RISC|| Webathon',
            endsAt: '15:30 || Today',
          },
          {
            name: 'Panacea || Literary event',
            endsAt: '17:30 || Today',
          },
        ],
      },
    ],
  };

  onChangeDate = (args) => {
    var d = this.state.date;
    d = (d + 1) % 7;
    this.setState({ date: d });
  };

  //   const classes = useStyles();
  //   const [dense, setDense] = React.useState(false);
  //   const [secondary, setSecondary] = React.useState(false);

  render() {
    const { classes } = this.props;

    return (
      <div style={{ margin: '20px' }}>
        <CalendarComponent change={this.onChangeDate}></CalendarComponent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Current Events Happening
            </Typography>
            <div className={classes.demo}>
              <List>
                {this.state.events[this.state.date].currEvents.map(
                  (event, index) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <GrTechnology />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.name}
                        secondary={event.endsAt}
                      />
                    </ListItem>
                  )
                )}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Calendar);
