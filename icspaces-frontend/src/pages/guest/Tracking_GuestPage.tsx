import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { format } from "date-fns";
import BackButton from "../../components/BackButton";
import RoomNameCell from "../../components/RoomNameCell";

interface ReservationDialogForVerificationProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
}

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

const ReservationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataTable, setDataTable] = useState<Reservation[]>([]);
  const [originalData, setOriginalData] = useState<Reservation[]>([]);

  // useEffect(() => {
  //   const fetchReservations = async () => {
  //     try {
  //       console.log("Fetching profile...");
  //       const profileResponse = await fetch(
  //         "https://api.icspaces.online//get-profile",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //         }
  //       );

  //       if (!profileResponse.ok) {
  //         throw new Error(`HTTP error! status: ${profileResponse.status}`);
  //       }

  //       const profileData = await profileResponse.json();
  //       console.log("Profile data:", profileData);

  //       if (profileData.success) {
  //         const userEmail = profileData.data.email;
  //         console.log("User email:", userEmail);

  //         console.log("Fetching reservations...");
  //         const reservationsResponse = await fetch(
  //           "https://api.icspaces.online//get-all-reservations-by-user",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ user_id: userEmail }),
  //             credentials: "include",
  //           }
  //         );

  //         if (!reservationsResponse.ok) {
  //           throw new Error(
  //             `HTTP error! status: ${reservationsResponse.status}`
  //           );
  //         }

  //         const reservationsData = await reservationsResponse.json();
  //         console.log("Reservations data:", reservationsData);

  //         if (reservationsData.success || reservationsData.length === 0) {
  //           setDataTable(reservationsData.data || []);
  //           setOriginalData(reservationsData.data || []);
  //         } else {
  //           throw new Error(reservationsData.errmsg);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch reservations:", error);
  //     }
  //   };

  //   fetchReservations();
  // }, []);
  // useEffect(() => {
  //   fetch('https://api.icspaces.online//get-all-reservation', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // body: JSON.stringify(data), // Uncomment this line if you need to send data in the request body
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     setDataTable(data);
  //     setOriginalData(data);
  //   });
  // }, []);

  var reservationNotFound = false;
  const handleSearchChange = (event: { target: { value: any } }) => {
  const search = event.target.value;
  
  setSearchTerm(search);
  if (search !== "") {
    fetch('https://api.icspaces.online//get-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservation_id: parseInt(search) }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch reservation');
        reservationNotFound = true;
      }
      return response.json();
    })
    .then(data => {
      setDataTable([data]);
    })
    .catch(error => {
      console.error(error);
      setDataTable([]);
    });
  } else {
    setDataTable([]);
  }
};

  return (
    <div style={{ maxWidth: "95%", margin: "0 auto" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "100px",
          marginBottom: "30px",
        }}
      >
        <BackButton />
        <Typography
          variant="h4"
          style={{ marginLeft: 20, color: "#183048", fontWeight: "bold" }}
        >
          My Room Reservations
        </Typography>
      </Box>

      <Paper
        style={{
          width: "auto",
          maxHeight: 540,
          overflow: "auto",
          padding: 20,
          margin: "auto",
        }}
      >
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <TextField
            label="Search Tracking ID"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">TRACKING ID</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">TIME</TableCell>
                <TableCell align="center">ROOM</TableCell>
                <TableCell align="center">EVENT NAME</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable.length > 0 ? ( //IF MAY ERROR,
                dataTable.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.reservation_id}</TableCell>
                    <TableCell align="center">{format(new Date(row.start_datetime), "MM/dd/yyyy")}</TableCell>
                    <TableCell align="center">{format(new Date(row.start_datetime), "hh:mm a")}</TableCell>
                    <RoomNameCell roomId={parseInt(row.room_id)} />
                    <TableCell align="center">{row.activity_name}</TableCell>
                    <TableCell align="center">{statusMapping[row.status_code]}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    
                    Please enter a valid tracking ID.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ReservationsPage;
