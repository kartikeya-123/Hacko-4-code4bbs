import { useState } from 'react';
import { React, Component } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

class EquipmentView extends Component {
  state = {
    availableEquipments: [],
    issuedEquipments: [],
    isLoading: true,
  };

  constructor() {
    super();
    this.id = window.location.pathname.split('/')[3];
  }

  getEquipments = () => {
    axios.get(`/api/v1/sport/eqtype/${this.id}`).then((res) => {
      console.log(res.data);
      this.setState({
        availableEquipments: res.data.availableEquipments,
        issuedEquipments: res.data.issuedEquipments,
        isLoading: false,
      });
    });
  };

  componentDidMount = () => {
    this.getEquipments();
  };

  render() {
    return (
      <>
        {!this.state.isLoading ? (
          <div>
            <Card style={{ marginLeft: '30px', width: '500px' }}>
              <CardHeader title="Available Equipments" />
              <Divider />
              <PerfectScrollbar>
                <Box sx={{ minWidth: 100 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Equipment ID</TableCell>
                        <TableCell>Status</TableCell>
                        {/* <TableCell sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction="desc">
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell> */}
                        <TableCell>Issue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.availableEquipments.map((eq) => (
                        <TableRow hover key={eq.id}>
                          <TableCell>{eq.id}</TableCell>

                          {/* <TableCell>
                  {moment(eq.createdAt).format('DD/MM/YYYY')}
                </TableCell> */}
                          <TableCell>
                            <Chip
                              color="primary"
                              label={eq.status}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" color="primary">
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
            </Card>
            <br></br>
            <br></br>
            <Card
              style={{ marginLeft: '30px', marginBottom: '15px', width: '80%' }}
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
                      {this.state.issuedEquipments.map((eq) => (
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
          </div>
        ) : null}
      </>
    );
  }
}

export default EquipmentView;
