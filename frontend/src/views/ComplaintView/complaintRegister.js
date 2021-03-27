import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const complaints = [
  {
    id: uuid(),

    student: {
      name: 'Ekaterina Tankova',
      room: 'A-190',
    },
    createdAt: 1555016400000,
    subject: 'Tap Leakage',
    category: 'Civil',
    description: 'Tap is leaked on the bathroom 3 of 1st floor.',
  },
  {
    id: uuid(),

    student: {
      name: 'Ekaterina Tankova',
      room: 'A-190',
    },
    createdAt: 1555016400000,
    subject: 'Tap Leakage',
    category: 'Civil',
    description: 'Tap is leaked on the bathroom 3 of 1st floor.',
  },
  {
    id: uuid(),

    student: {
      name: 'Ekaterina Tankova',
      room: 'A-190',
    },
    createdAt: 1555016400000,
    subject: 'Tap Leakage',
    category: 'Civil',
    description: 'Tap is leaked on the bathroom 3 of 1st floor.',
  },
  {
    id: uuid(),

    student: {
      name: 'Ekaterina Tankova',
      room: 'A-190',
    },
    createdAt: 1555016400000,
    subject: 'Tap Leakage',
    category: 'Civil',
    description: 'Tap is leaked on the bathroom 3 of 1st floor.',
  },
  {
    id: uuid(),

    student: {
      name: 'Ekaterina Tankova',
      room: 'A-190',
    },
    createdAt: 1555016400000,
    subject: 'Tap Leakage',
    category: 'Civil',
    description: 'Tap is leaked on the bathroom 3 of 1st floor.',
  },
];

const Complaints = (props) => (
  <Card {...props}>
    <CardHeader title="Pending Complaints" />
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
              <TableCell>Subject</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Room Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow hover key={complaint.id}>
                <TableCell>
                  {moment(complaint.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>{complaint.subject}</TableCell>
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.student.name}</TableCell>
                <TableCell>{complaint.student.room}</TableCell>
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
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default Complaints;
