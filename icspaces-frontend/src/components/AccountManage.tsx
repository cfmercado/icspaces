import { useState, useEffect} from "react";
import {
  Stack,Typography, Button, Box, Grid, FormControl,InputLabel,TextField,ButtonGroup,Theme, MenuItem, Select
} from "@mui/material";
import AccountCard from "./AccountCard";


import { Reservation, TransactionDetails, usersAdmin} from "./types";
import ReservationsFilters from "./ReservationsFilters";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccountFilters from "./AccountFilters";
import AccountDialog from "./AccountDialog";
import { Users } from "./types";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";

const statusMapping: Record<number, string> = { 
  0: 'Student',
  1: 'Faculty',
  2: 'OIC',
  3: 'Director',

  // add other status codes as needed
};

const AccountManage = () => {

  useEffect(() => {
    fetch('http://localhost:3001/get-all-users', {
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
      console.log(data);
    });
  }, []);


  const [reservationView, setReservationView] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dataTable, setDataTable] = useState<Users[]>([]); 
  const [accountNum,setAccountNum] = useState(dataTable.length);
  const [originalData, setOriginalData] = useState<Users[]>([]);
  const [sortOrder, setSortOrder] = useState("Latest");
  const [selectedReservation, setSelectedReservation] = useState<Users | null>(null);
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

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
  const applyFilters = (view: string, search: string) => {
    let filteredData = originalData;
    if (view !== 'All') {
      filteredData = filteredData.filter(row => statusMapping[row.usertype] === view);
    }
    if (search) {
      filteredData = filteredData.filter(row => row.lname.toLowerCase().includes(search.toLowerCase()));
    }
    setDataTable(filteredData);
  };

  const handleOpen = (reservation: Users) => { //p[]
    setSelectedReservation(reservation);
    setOpen(true);
  };

  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",        
        width: "85%",
      }}
      spacing={1}
    >
      {/* Return Button*/}
        <Grid container >
            <Stack direction='row' spacing={6} textAlign="left">
                <Button variant='contained' size='small' sx={{backgroundColor:'#D9D9D9', color:'#183048',textTransform: 'none'}}>
                    <ArrowBackIosNewIcon  sx={{ fontSize: {xs:20}, color: '#183048' }}/>
                    <Typography variant='h5' sx={{fontSize: {xs:20}}}>Back</Typography>
                </Button>
                <Typography variant='h4'  sx={{  fontSize: {xs:30},color:'#183048'}}>Manage Accounts</Typography>
            </Stack>
        </Grid>
      {/* Account Filters */}
      {/* <AccountFilters /> */}

      <Grid
      container
      direction={isSmallScreen ? "column" : "row"}
      spacing={2}
      width='100%'
    >
      <Grid item xs={12} sm={6} md={5}  style={{display:"flex",justifyContent:"flex-start"}}>
        <TextField
          label="Search account name"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          InputProps={{ endAdornment: <SearchIcon /> }}   
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={5} mt={2} >
        <ButtonGroup  size='medium'color="primary" aria-label="outlined primary button group" sx={{alignContent:'left'}} >
          <Button
            variant={sortOrder === "Latest" ? "contained" : "outlined"}
          >
            Latest
          </Button>
          <Button
            variant={sortOrder === "Oldest" ? "contained" : "outlined"}
          >
            Oldest
          </Button>
          <Button   
            variant={sortOrder === "Reset" ? "contained" : "outlined" }
          >
            Reset
          </Button>
        </ButtonGroup>

      </Grid>
      {/* Account Filters End */}
      
      <Grid item xs={12} sm={6} md={2} container direction='column' style={{display:"flex",justifyContent:"flex-start"}}>
        <FormControl variant="outlined" >
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            label="Filter" value={reservationView} onChange={handleViewChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Faculty">Faculty</MenuItem>
            <MenuItem value="OIC">OIC</MenuItem>
            <MenuItem value="Director">Director</MenuItem>
          </Select>
        </FormControl>
      </Grid>

    </Grid>

      {/* Account Filters */}



      <Box display="flex" justifyContent="flex-end">
        <Typography variant = 'subtitle1'my={3}>Total Accounts: {dataTable.length}</Typography>
       </Box>
     
      <Stack 
        style={{
          maxWidth: "100%",
          minWidth: "100%",
          maxHeight: "400px",
          overflowX: "auto",
          overflowY: "auto",

        }}
        spacing={2}
        
      >

        {/* Account Filters */}
        
        {dataTable.map((reservation) => (
            <AccountCard
              key={reservation.email}
              users={reservation}
              onClick={() => handleOpen(reservation)}
            />
          ))}

        {selectedReservation && (
          <AccountDialog
          open={open}
          onClose={() => setSelectedReservation(null)}
          user={selectedReservation}
          />
        )}






      </Stack>
    </Stack>
  );
};

export default AccountManage;
