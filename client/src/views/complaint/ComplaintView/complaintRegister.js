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
    console.log(this.props);
    this.getComplaints();
  };

  upvoteComplaint = (e, id) => {
    e.preventDefault();
    axios
      .patch(`/api/v1/complaint/upvote/${id}`, null)
      .then((res) => {
        if (res.status === 200) {
          const responseData = res.data.data;
          const updatedData = {
            upvotes: responseData.upvotes,
            upvotedBy: responseData.upvotedBy,
          };
          const updatedComplaints = [...this.state.complaints];
          const myPostIndex = updatedComplaints.indexOf(
            updatedComplaints.find((x) => x._id === responseData._id)
          );
          const updatedComplaint = {
            ...updatedComplaints[myPostIndex],
            upvotes: updatedData.upvotes,
            upvotedBy: updatedData.upvotedBy,
          };
          updatedComplaints[myPostIndex] = updatedComplaint;
          this.setState({ complaints: updatedComplaints });
        } else if (res.status === 400) {
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400)
          window.alert('You are not allowed to upvote your own complaint!');
      });
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
                  <TableCell>+1 Feature</TableCell>
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
                    <TableCell>
                      {complaint.upvotedBy.includes(this.props.user._id) ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            this.upvoteComplaint(e, complaint._id);
                          }}
                        >
                          {complaint.upvotes}
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={(e) => {
                            this.upvoteComplaint(e, complaint._id);
                          }}
                        >
                          {complaint.upvotes}
                        </Button>
                      )}
                    </TableCell>

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
