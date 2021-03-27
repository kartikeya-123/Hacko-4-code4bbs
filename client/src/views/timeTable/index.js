import { Helmet } from 'react-helmet';
// import { Box, Container, Grid,Button,TableCell} from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
  } from '@material-ui/core';

class Timetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTable : null
    };
  }

  render() {
    console.log(this.props.user)
    

    let timeTable = {
        cse_2 : {
            monday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
            tuesday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
            wednesday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
            thursday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
            friday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral']
        },
        ee_2 : {
            monday : ['ET','EM','EM','DEC','Lunch Break','Lateral','Lateral'],
            tuesday : ['ESTM','ESTM','PS','PS','Lunch Break','Breadth','Lateral'],
            wednesday : ['ESTM','ESTM','PS','PS','Lunch Break','Breadth','Lateral'],
            thursday : ['ESTM','ESTM','PS','PS','Lunch Break','Breadth','Lateral'],
            friday :['ET','EM','EM','DEC','Lunch Break','Lateral','Lateral']
        },
    }
    let student = 'cse_01';
    let userTimetable = {
            monday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
            tuesday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
            wednesday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
            thursday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
            friday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral']
    };
    let things = Object.values(userTimetable);
    console.log(things)
    
    return (
      <>
        <Helmet>
          <title>Timetable</title>
        </Helmet>
            {/* <Container maxWidth = "lg">
                <Grid align="center">
                  <Grid item lg={12} md={10} xs={12}>
                    
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                  </Grid>
                </Grid>
            </Container> */}
        <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>09.00-10.00</TableCell>
                  <TableCell>10.00-11.00</TableCell>
                  <TableCell>11.00-12.00</TableCell>
                  <TableCell>12.00-13.00</TableCell>
                  <TableCell>13.00-14.00</TableCell>
                  <TableCell>14.00-15.00</TableCell>
                  <TableCell>15.00-16.00</TableCell>
                  {this.props.admin === 'true' ? (
                    <TableCell>Resolve</TableCell>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                        
              </TableBody>
              {/* <TableBody>
                {this.state.complaints.map((complaint) => (
                  <TableRow hover key={complaint._id}>
                    <TableCell>
                      {moment(complaint.createdAt).format('DD/MM/YYYY hh:mm A')}
                    </TableCell>
                    <TableCell>{complaint.category.toUpperCase()}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{complaint.student.name}</TableCell>
                    <TableCell>{complaint.student.room}</TableCell>
                    <TableCell>{complaint.phone}</TableCell>
                    {this.props.admin === 'true' ? (
                      <TableCell>
                        <Button
                          color="success"
                          size="small"
                          onClick={(e) => {
                            this.resolveComplaint(e, complaint._id);
                          }}
                        >
                          Mark as Resolved
                        </Button>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </Box>
      </>
    );
  }
}

export default Timetable;
