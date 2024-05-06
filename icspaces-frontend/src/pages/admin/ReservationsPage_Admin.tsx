// ReservationsPage_Admin.tsx
import React, { useEffect,useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
  Paper, TextField, Button, MenuItem, FormControl, InputLabel, Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Pagination,
  Box
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Reservation {
  activity_name: string;
  additional_fee: string;
  date_created: string;
  discount: string;
  end_datetime: string;
  reservation_id: string; 
  room_id: string;
  start_datetime: string;
  status_code: string;
  total_amount_due: string;
  user_id: string;
  room_name: string;
  // add other fields as needed
}

const statusMapping: Record<string, string> = { 
  '0': 'Pending',
  '1': 'For Payment',
  '2': 'Approved',
  '3': 'Rejected',
  '4': 'Cancelled',
  // add other status codes as needed
};

const ReservationsPage_Admin = () => {
  // const initialDataTable = [
  //   { date: "2024-04-28", status: "Booked", room: "101", event: "Conference", account: "User1" },
  //   { date: "2024-04-29", status: "For Verification", room: "102", event: "Seminar", account: "User2" },
  //   { date: "2024-04-30", status: "Cancelled", room: "103", event: "Workshop", account: "User3" },
  //   { date: "2024-05-01", status: "Confirmed", room: "104", event: "Meeting", account: "User4" },
  //   { date: "2024-05-02", status: "Booked", room: "105", event: "Training", account: "User5" },
  //   { date: "2024-05-03", status: "Pending", room: "106", event: "Presentation", account: "User6" },
  //   { date: "2024-05-04", status: "For Verification", room: "107", event: "Conference", account: "User7" },
  //   { date: "2024-05-05", status: "Confir`med", room: "108", event: "Seminar", account: "User8" },
  //   { date: "2024-05-06", status: "Booked", room: "109", event: "Workshop", account: "User9" },
  //   { date: "2024-05-07", status: "Cancelled", room: "110", event: "Meeting", account: "User10" },
  // ];  

  const [reservationView, setReservationView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTable, setDataTable] = useState<Reservation[]>([]);
const [originalData, setOriginalData] = useState<Reservation[]>([]);


  useEffect(() => {
  fetch('http://localhost:3001/get-all-reservation', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data), // Uncomment this line if you need to send data in the request body
  })
  .then(response => response.json())
  .then(data => {
    setDataTable(data);
    setOriginalData(data);
  });
}, []);

  


  const handleViewChange = (event: { target: { value: any; }; }) => {
    const view = event.target.value;
    setReservationView(view);
    applyFilters(view, searchTerm);
  };

  const handleSearchChange = (event: { target: { value: any; }; }) => {
    const search = event.target.value;
    setSearchTerm(search);
    applyFilters(reservationView, search);
  };

  const handleItemsPerPageChange = (event: { target: { value: any; }; }) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1); // Reset to first page if items per page change
  };

  const applyFilters = (view: string, search: string) => {
    let filteredData = originalData;
    if (view !== 'all') {
      filteredData = filteredData.filter(row => statusMapping[row.status_code] === view);
    }
    if (search) {
      filteredData = filteredData.filter(row => row.activity_name.toLowerCase().includes(search.toLowerCase()));
    }
    setDataTable(filteredData);
  };

  const handleViewClick = () => {
    alert('View button is clicked');
  };

  const handlePageChange = (event: any, value: React.SetStateAction<number>) => {
    setCurrentPage(value);
  };

  const handleLatestClick = () => {
    const sortedData = [...dataTable].sort((a, b) => new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime());
    setDataTable(sortedData);
  };
  
  const handleOldestClick = () => {
    const sortedData = [...dataTable].sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime());
    setDataTable(sortedData);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataTable.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Box style={{ display: 'flex', alignItems: 'center', marginTop: '80px', marginLeft: '80px' }}>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIosNewIcon />
          <Typography variant="body1">
            Back
          </Typography>
        </IconButton>
        <Typography variant="h4" style={{ marginLeft: 20, color: '#183048', fontWeight: 'bold' }}>
          ICS Room Reservations
        </Typography>
      </Box>

      <Paper style={{ width: 'auto', maxHeight: 540, overflow: 'auto', padding: 20, margin: 'auto' }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <TextField
            label="Search by event name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="contained" onClick={handleLatestClick}>Latest</Button>
          <Button variant="contained" onClick={handleOldestClick}>Oldest</Button>
          <FormControl fullWidth>
            <InputLabel>Reservation View</InputLabel>
            <Select value={reservationView} label="Reservation View" onChange={handleViewChange}>
              <MenuItem value="all">All Reservations</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="For Payment">For Payment</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Items per page</InputLabel>
            <Select value={itemsPerPage} label="Items per page" onChange={handleItemsPerPageChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>DATE & TIME</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ROOM</TableCell>
                <TableCell>EVENT NAME</TableCell>
                <TableCell>ACCOUNT</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.start_datetime}</TableCell>
                    <TableCell>{statusMapping[row.status_code]}</TableCell> 
                    <TableCell>{row.room_name}</TableCell>
                    <TableCell>{row.activity_name}</TableCell>
                    <TableCell>{row.user_id}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={handleViewClick}
                        style={{
                          backgroundColor: '#FFB533',
                          color: '#183048',
                          borderRadius: 5
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No event found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Pagination
            count={Math.ceil(dataTable.length / itemsPerPage)}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default ReservationsPage_Admin;
