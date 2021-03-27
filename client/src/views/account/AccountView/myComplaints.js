import moment from 'moment';
import React, { Component } from 'react';
import axios from 'axios';

import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

class complaintRegister extends Component {
  constructor(props) {
    super(props);
    this.state = { complaints: [] };
  }

  getComplaints = () => {
    axios.get(`/api/v1/complaint/myComplaints`).then((response) => {
      console.log(response);
      this.setState({ complaints: response.data.data.docs });
    });
  };

  componentDidMount = () => {
    this.getComplaints();
  };

  render() {
    return (
      <Card {...this.props}>
        <CardHeader title="My Pending Complaints" />
        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">
                    <TableSortLabel active direction="desc">
                      Date Created
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.complaints.map((complaint) => (
                  <TableRow hover key={complaint._id}>
                    <TableCell>
                      {moment(complaint.createdAt).format('DD/MM/YYYY hh:mm A')}
                    </TableCell>
                    <TableCell>{complaint.category.toUpperCase()}</TableCell>
                    <TableCell>{complaint.subject}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        ></Box>
      </Card>
    );
  }
}

export default complaintRegister;
