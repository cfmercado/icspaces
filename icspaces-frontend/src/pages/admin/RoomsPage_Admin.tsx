import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import {Link } from "react-router-dom";

import roomImages from "../../assets/room_images/RoomImages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RoomPhotos from "../../components/RoomPhotos";

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

const RoomsPage_Admin = () => {
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
    '0': 'Ground Floor',
    '1': 'Second Floor',
    '2': 'Third Floor',
    '3': 'Fourth Floor',
    // add other status codes as needed
  };

  interface Utility {
  fee: string;
  item_name: string;
  item_qty: number;
  room_id: number;
  }
  
  interface RoomInfo {
    id: number;
    name: string;
    capacity: number;
    fee: string;
    type: string;
    floor_number: number;
    additional_fee_per_hour: string;
  }

  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [utility, setUtility] = useState<Utility[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("https://icspaces-backend.onrender.com/get-all-rooms", {
          method: "POST",
        });
        const data = await response.json();
        const roomData = data.map((room: any) => ({
          id: room.room_id,
          name: room.room_name,
          capacity: room.room_capacity,
          fee: room.fee,
          type: room.room_type,
          floor_number: room.floor_number,
          additional_fee_per_hour: room.additional_fee_per_hour,
        }));
        const utilityData = data.map((utility: any) => ({
          fee: utility.fee,
          item_name: utility.item_name,
          item_qty: utility.item_qty,
          room_id: utility.room_id,
        }));
        setRooms(roomData);
        setUtility(utilityData);
        console.log(roomData);
        console.log(utilityData);
      } catch (error) {
        console.error("Failed to fetch rooms and utilities:", error);
      }
    };

    fetchRooms();
  }, []);


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
            {rooms[currentImageIndex]?.name}
          </Typography>
          <Stack spacing={1} mt={2}>
            <TableContainer component={Paper} sx={{ border: "none", mb: 16 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Room type:</TableCell>
                    <TableCell style={styles.cell}>{rooms[currentImageIndex]?.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Location:</TableCell>
                    <TableCell style={styles.cell}>{statusMapping[rooms[currentImageIndex]?.floor_number ?? 3]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Capacity:</TableCell>
                    <TableCell style={styles.cell}>{rooms[currentImageIndex]?.capacity}</TableCell>
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
              {utility?.map((utilityItem) => (utilityItem.item_name && utilityItem.item_qty &&
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
              {[`P ${parseInt(rooms[currentImageIndex]?.fee ?? '')} / hour`, `P ${parseInt(rooms[currentImageIndex]?.additional_fee_per_hour ?? '')} / hour overtime`].map((fee) => (
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
              <Button 
              variant="contained" 
              style={{alignSelf:'center'}}
              component={Link}
              to={`/editroominfopage_admin/${rooms[currentImageIndex]?.id}`} 
              sx={{
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
            
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoomsPage_Admin;
