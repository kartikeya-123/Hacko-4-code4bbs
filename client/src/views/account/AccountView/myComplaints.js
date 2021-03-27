import moment from 'moment';
import React, { Component } from 'react';
import axios from 'axios';

import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
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

  deleteComplaint = (e, id) => {
    e.preventDefault();
    axios
      .delete(`/api/v1/complaint/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          window.alert(`Complaint Delete successfully`);
          const A = [...this.state.complaints];
          const index = A.indexOf((x) => x._id === id);
          A.splice(index, 1);
          this.setState({ complaints: A });
        }
      })
      .catch((error) => {
        console.log(error);
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
                  <TableCell></TableCell>
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
                    <TableCell>
                      {' '}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => this.deleteComplaint(e, complaint._id)}
                      >
                        Delete Complaint
                      </Button>
                    </TableCell>
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
