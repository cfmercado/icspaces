import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import roomImage from "../assets/room_images/ICS.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BorderBottom,
  PaddingOutlined,
  PaddingRounded,
} from "@mui/icons-material";
import roomImages from "../../assets/room_images/RoomImages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Calendar from "../../components/Calendar";
import HourButtons from "../../components/HourButtons";
import DropDown_Admin from "../../components/DropDown_Admin";
import RoomDropdown from "../../components/RoomDropdown";
import dayjs, { Dayjs } from "dayjs";

const cell = {
  color: "white",
  backgroundColor: "#183048",
  border: "none",
  padding: "1px 15px",
  fontWeight: "bold",
};

const styles = {
  cell,
  boldCell: {
    ...cell,
    fontWeight: "normal",
    color: "white",
    backgroundColor: "#183048",
  },
  tableContainer: {
    border: "none",
    elevation: 0,
  },
  table: {
    border: "none",
  },
  tableCell: {
    border: "none",
  },
};

const BookReservationPage_Admin = () => {
  const { room_id } = useParams<{ room_id: string }>();

  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handler to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % roomImages.length);
  };

  // Handler to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + roomImages.length) % roomImages.length
    );
  };

  const statusMapping: Record<string, string> = {
    "0": "Ground",
    "1": "First",
    "2": "Second",
    "3": "N/A",
    // add other status codes as needed
  };

  const handleDateSelect = (selectedDate: Dayjs) => {
    // Do something with the selected date
    console.log("Selected Date:", selectedDate);
  };

  const [reservations, setReservations] = useState<ReservationsInfo | null>();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/get-available-room-time",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ room_id: room_id, date: selectedDate.format("dddd DD MMM YYYY")}),
          }
        );
        const data = await response.json();
        setReservations(data);
        console.log(reservations);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  interface Room {
    additional_fee_per_hour: string;
    fee: string;
    floor_number: number;
    room_capacity: number;
    room_id: number;
    room_name: string;
    room_type: string;
  }

  interface ReservationsInfo {
    availableTimes: any;
  }

  interface Utility {
    fee: string;
    item_name: string;
    item_qty: number;
    room_id: number;
    // add properties here based on the structure of utility objects
  }

  interface RoomInfo {
    room: Room;
    utility: Utility[];
  }

  interface Reservation {
    end_datetime: any;
    start_datetime: any;
    activity_name: any;
    // Define your reservation properties here
  }

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [room, setRoom] = useState<RoomInfo | null>();

  useEffect(() => {
    if (selectedRoomId !== null) {
      fetch("http://localhost:3001/get-room-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_id: selectedRoomId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setRoom(data);
          console.log(data);
        });
    }
  }, [selectedRoomId]);

  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    fetch("http://localhost:3001/get-room-info", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_id: room_id }), // Uncomment this line if you need to send data in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        setRoom(data);
        console.log(data);
      });
  }, [selectedDate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Aligns content to the top
        alignItems: "center", // Centers content horizontally
        height: "100vh", // Maintains full viewport height
        overflowY: "auto", // Allows scrolling
        position: "relative", // Allows positioning of children
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 650, // Adjust these values as needed
          left: 230,
          width: 300, // Specify width and height if necessary
          height: 300,
        }}
      >
        <Calendar onDateSelect={handleDateSelect} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 650, // Adjust these values as needed
          left: 620,
          width: 1700, // Specify width and height if necessary
          height: 700,
        }}
      >
        <HourButtons availableTimes={reservations?.availableTimes} dateTime={selectedDate} />
      </Box>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ position: "absolute", top: 80, left: 20 }}
        variant="contained"
        onClick={() =>
          (window.location.href = "http://localhost:3000/viewroomspage")
        }
      >
        Back to ICS Rooms
      </Button>

      <Box
        component="img"
        src={roomImages[currentImageIndex]}
        alt={`Room Image ${currentImageIndex + 1}`}
        sx={{
          maxHeight: 400,
          borderRadius: 4,
          position: "absolute",
          top: "200px",
          left: "250px",
        }}
      />
      <Button
        sx={{ position: "absolute", top: "320px", left: "200px" }}
        onClick={prevImage}
        disabled={currentImageIndex === 0}
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        sx={{ position: "absolute", top: "320px", left: "1250px" }}
        onClick={nextImage}
        disabled={currentImageIndex === roomImages.length - 1}
      >
        <ArrowForwardIosIcon />
      </Button>

      <RoomDropdown
        sx={{ position: "absolute", top: "120px", right: "300px" }}
        onRoomChange={setSelectedRoomId}
      />
      <Card
      sx={{
        width: 300,
        height: 370,
        position: "absolute",
        top: "400px",
        right: "120px",
        transform: "translate(-50%, -50%)",
        p: 2,
        backgroundColor: "#183048",
        borderRadius: 4,
      }}
    >
      <CardContent>
        {selectedRoomId && (
          <>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#FFB532",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {room?.room?.room_name}
            </Typography>
            <Stack spacing={1} mt={2}>
              <TableContainer component={Paper} sx={{ border: "none", mb: 16 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={styles.boldCell}>Room type:</TableCell>
                      <TableCell style={styles.cell}>
                        {room?.room?.room_type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={styles.boldCell}>Location:</TableCell>
                      <TableCell style={styles.cell}>
                        {statusMapping[room?.room?.floor_number ?? "3"]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={styles.boldCell}>Capacity:</TableCell>
                      <TableCell style={styles.cell}>
                        {room?.room?.room_capacity}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography
                color="text.secondary"
                gutterBottom
                align="left"
                style={{ fontSize: "1rem" }}
              >
                <span style={{ color: "white" }}>Available equipment:</span>
              </Typography>
              <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                {room?.utility?.map((utilityItem) => (
                  <li key={utilityItem.item_name}>
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                      align="left"
                    >
                      {`${utilityItem.item_name} (Qty: ${utilityItem.item_qty})`}
                    </Typography>
                  </li>
                ))}
              </ul>
              <Typography
                color="text.secondary"
                gutterBottom
                align="left"
                style={{ fontSize: "1rem" }}
              >
                <span style={{ color: "white" }}>Hourly Fee:</span>
              </Typography>
              <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                {[
                  `P ${parseInt(room?.room?.fee ?? "")} / hour`,
                  `P ${parseInt(room?.room?.additional_fee_per_hour ?? "")} / hour overtime`,
                ].map((fee) => (
                  <li key={fee}>
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                      align="left"
                    >
                      {fee}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Stack>
          </>
        )}
        {!selectedRoomId && (
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              m: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 300,  // Use 100% height to take full height of the parent container
            }}
          >
            Please select a room to view details.
          </Typography>

        )}
      </CardContent>
    </Card>
    </Box>
  );
};

export default BookReservationPage_Admin;
