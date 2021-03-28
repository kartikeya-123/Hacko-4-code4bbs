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
    let studentBranch = (this.props.user.rollNumber[2] + this.props.user.rollNumber[3]).toUpperCase();
    let studentYear = new Date().getFullYear() - (20+(this.props.user.rollNumber[0]+this.props.user.rollNumber[1]));
    let student = studentBranch + '_' + studentYear;
    
    
    let timeTable = {
        CS_2 : {
            monday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
            tuesday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
            wednesday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
            thursday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
            friday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral']
        },
        EE_2 : {
            monday : ['ET','EM','EM','DEC','Lunch Break','Lateral','Lateral'],
            tuesday : ['ESTM','ESTM','PS','PS','Lunch Break','Breadth','Lateral'],
            wednesday : ['ESTM','ESTM','PS','PS','Lunch Break','Breadth','Lateral'],
            thursday : ['ESTM','ESTM','PS','PS','Lunch Break','Breadth','Lateral'],
            friday :['ET','EM','EM','DEC','Lunch Break','Lateral','Lateral']
        },
    }
    
    let courses = Object.keys(timeTable);
    let studentCourseIDX = courses.indexOf(student);
    let userTimeTable = {
      monday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
      tuesday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
      wednesday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral'],
      thursday : ['DAA','DAA','PS','PS','Lunch Break','CPS','Lateral'],
      friday : ['DEC','DEC','ESTM','Breadth','Lunch Break','Lateral','Lateral']
    }
    let studentTimeTable = Object.values(userTimeTable);
    const Days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    
    return (
      <>
        <Helmet>
          <title>Timetable</title>
        </Helmet>
        <br/>
        <Box align = "center"><h1>Time Table</h1></Box>
        <br/><br/>
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
                </TableRow>
              </TableHead>
              <TableBody>
                        {studentTimeTable.map((day,IDX)=> {
                          return(
                            <TableRow>
                              {day.map((period,Idx) => {
                                if(Idx == 0) {
                                  return(
                                    <>
                                    <TableCell key = {"Day"+IDX} >{Days[IDX]}</TableCell>
                                    <TableCell key = {IDX+' ' +Idx}>{period}</TableCell>
                                    </>
                                  )
                                } else {
                                  return(
                                    <TableCell key = {IDX+' '+Idx}>{period}</TableCell>
                                  )
                                }
                              })}
                            </TableRow>
                          )
                        })}
              </TableBody>
            </Table>
          </Box>
      </>
    );
  }
}

export default Timetable;
