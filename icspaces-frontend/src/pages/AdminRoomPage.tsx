import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import {Link } from "react-router-dom";

import roomImages from "../assets/room_images/RoomImages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RoomPhotos from "../components/RoomPhotos";

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

const AdminRoomPage = () => {
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

  return (
    <Box       
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Aligns content to the top
        alignItems: 'center', // Centers content horizontally
        height: '100vh', // Maintains full viewport height
        overflowY: 'auto', // Allows scrolling
        position: 'relative', // Allows positioning of children
    }}>
        
      <Box
        sx={{
          position: "absolute",
          top: 560, // Adjust these values as needed
          left: 230,
          width: '66%', // Specify width and height if necessary
          height: 300,
        }}
      >
        
        <RoomPhotos />
      </Box>
    
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ position: "absolute", top: 80, left: 20, backgroundColor: "#CFCFCF", color:'black',  '&:hover': {
          backgroundColor: 'lightgrey',
        }}}
        variant="contained"
        onClick={() =>
          (window.location.href = "https://icspaces.onrender.com/viewroomspage")
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
          top: "140px",
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
      <Card
        sx={{
          width: 300,
          height: 370,
          position: "absolute",
          top: "340px",
          right: "120px",
          transform: "translate(-50%, -50%)",
          p: 2,
          backgroundColor: "#183048",
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#FFB532",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            ICS Mega Hall
          </Typography>
          <Stack spacing={1} mt={2}>
            <TableContainer component={Paper} sx={{ border: "none", mb: 16 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Room type:</TableCell>
                    <TableCell style={styles.cell}>Lecture Hall</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Location:</TableCell>
                    <TableCell style={styles.cell}>2nd Floor, Wing C</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Capacity:</TableCell>
                    <TableCell style={styles.cell}>120 pax</TableCell>
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
              {["Projector and Screen", "Sound System", "Armchairs"].map(
                (equipment) => (
                  <li key={equipment}>
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                      align="left"
                    >
                      {equipment}
                    </Typography>
                  </li>
                )
              )}
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
              {["P 650 / hour", "P 100 / hour overtime"].map((fee) => (
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
            <Link to="/reservationspage">
              <Button variant="contained" style={{alignSelf:'center'}} sx={{
                      textTransform: "none",
                      backgroundColor: '#FFB532',
                      height: "23px",
                      width: '40%',
                      color: 'black', 
                      borderRadius: '20px',
                      fontSize: "13px",
                      '&:hover': {
                          backgroundColor: '#FFC532',
                      }
                  }}> Edit </Button>
            </Link>
            
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminRoomPage;
