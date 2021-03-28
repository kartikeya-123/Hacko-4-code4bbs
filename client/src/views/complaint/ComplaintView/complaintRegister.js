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
  Tooltip,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class complaintRegister extends Component {
  constructor(props) {
    super(props);
    this.state = { complaints: [] };
  }

  getComplaints = () => {
    axios.get(`/api/v1/complaint`).then((response) => {
      console.log(response);
      this.setState({ complaints: response.data.data.docs });
    });
  };

  componentDidMount = () => {
    this.getComplaints();
  };

  resolveComplaint = (e, id) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/complaint/resolve/${id}`, {})
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.alert(response.data.message);
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

  render() {
    return (
      <Card {...this.props}>
        <CardHeader
          title="Pending Complaints"
          action={
            <Button
              color="primary"
              endIcon={<ArrowRightIcon />}
              size="small"
              variant="text"
              onClick={(e) => {
                window.location.href = '/app/complaints/add';
              }}
            >
              Lodge Complaint
            </Button>
          }
        />

        <Divider />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date Created
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Category</TableCell>
                  {/* <TableCell>Subject</TableCell> */}
                  <TableCell>Description</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Room Number</TableCell>
                  <TableCell>Phone Number</TableCell>
                  {this.props.admin === 'true' ? (
                    <>
                      <TableCell>Available Time</TableCell>
                      <TableCell>Resolve</TableCell>
                    </>
                  ) : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.complaints.map((complaint) => (
                  <TableRow hover key={complaint._id}>
                    <TableCell>
                      {moment(complaint.createdAt).format('DD/MM/YYYY hh:mm A')}
                    </TableCell>
                    <TableCell>{complaint.category.toUpperCase()}</TableCell>
                    {/* <TableCell>{complaint.subject}</TableCell> */}
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{complaint.student.name}</TableCell>
                    <TableCell>{complaint.student.room}</TableCell>
                    <TableCell>{complaint.phone}</TableCell>

                    {this.props.admin === 'true' ? (
                      <TableCell>{complaint.availableTime}</TableCell>
                    ) : null}

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
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    );
  }
}

export default complaintRegister;
