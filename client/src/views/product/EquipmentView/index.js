import { useState } from 'react';
import { React, Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  touchRippleClasses,
} from '@material-ui/core';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import AddEquipment from './addEquipment';

class EquipmentView extends Component {
  state = {
    availableEquipments: [],
    issuedEquipments: [],
    isLoading: true,
    user: null,
    userIssued: false,
    issues: false,
    addMore: false,
  };

  constructor() {
    super();
    this.id = window.location.pathname.split('/')[3];
  }

  getEquipments = () => {
    axios
      .get(`/api/v1/sport/eqtype/${this.id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          availableEquipments: res.data.availableEquipments,
          issuedEquipments: res.data.issuedEquipments,
          isLoading: false,
        });
        if (res.data.issuedEquipments) {
          this.setState({ issues: true });
        }
        for (let x of res.data.issuedEquipments) {
          if (this.state.user.email == x.issuedTo.email) {
            this.setState({ userIssued: true });
            break;
          }
        }
      })
      .catch((err) => console.log(err));
  };

  issuedEquipment = (equipId) => {
    const data = {
      id: equipId,
    };
    axios
      .patch('/api/v1/sport/issue', data, { withCredentials: true })
      .then((response) => {
        const status = response.data.status;
        console.log(status);
        if (status == 'Fail') {
          const issuedEquipment = response.data.userIssuedEquipment;
          const name = issuedEquipment[0].id;
          const message = `You have already issued a equipment of id ${name}. Please return the equipment to issue a new equipment`;
          alert(message);
        } else {
          this.getEquipments();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  returnEquipment = (equipId) => {
    const data = {
      id: equipId,
    };
    axios
      .patch('/api/v1/sport/return', data, { withCredentials: true })
      .then((response) => {
        this.getEquipments();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount = () => {
    // this.setState({ user: this.props.user });
    this.getEquipments();
  };

  render() {
    return (
      <>
        {!this.state.isLoading ? (
          <div>
            <Card
              style={{ marginLeft: '30px', marginTop: '20px', width: '500px' }}
            >
              <CardHeader title="Available Equipments" />
              <Divider />
              <PerfectScrollbar>
                <Box sx={{ minWidth: 100 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Equipment ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Issue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.availableEquipments.map((eq) => (
                        <TableRow hover key={eq.id}>
                          <TableCell>{eq.id}</TableCell>
                          <TableCell>
                            <Chip
                              color="primary"
                              label={eq.status}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.issuedEquipment(eq._id)}
                            >
                              {' '}
                              Issue equipment
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
                  // justifyContent: 'flex-end',
                  p: 2,
                }}
              >
                {!this.state.addMore ? (
                  <Button
                    color="primary"
                    endIcon={<ArrowDownIcon />}
                    size="small"
                    variant="text"
                    onClick={() => {
                      this.setState({ addMore: true });
                    }}
                  >
                    Add More
                  </Button>
                ) : (
                  <AddEquipment />
                )}
              </Box>
            </Card>
            <br></br>
            <br></br>
            <Card
              style={{
                marginLeft: '30px',
                marginBottom: '40px',
                width: '80%',
              }}
            >
              <CardHeader title="Issued Equipments" />
              <Divider />
              <PerfectScrollbar>
                <Box sx={{ minWidth: 400 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Equipment ID</TableCell>
                        <TableCell>Student name</TableCell>
                        <TableCell>Student roll</TableCell>
                        <TableCell>Student room number</TableCell>

                        <TableCell sortDirection="desc">
                          <Tooltip enterDelay={300} title="Sort">
                            <TableSortLabel active direction="desc">
                              Date
                            </TableSortLabel>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.issues &&
                        this.state.issuedEquipments.map((eq) => (
                          <TableRow hover key={eq.id}>
                            <TableCell>{eq.id}</TableCell>
                            <TableCell>{eq.issuedTo.name}</TableCell>
                            <TableCell>
                              {eq.issuedTo.roll || '19EE01003'}
                            </TableCell>
                            <TableCell>{eq.issuedTo.room || 'A120'}</TableCell>
                            <TableCell>{eq.issuedDate}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
            )
          </div>
        ) : null}
      </>
    );
  }
}

export default EquipmentView;
