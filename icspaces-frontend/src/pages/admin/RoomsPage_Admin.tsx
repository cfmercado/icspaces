import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

import roomImages from "../../assets/room_images/RoomImages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BackButton from "../../components/BackButton";
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
  const [currentRoom, setCurrentRoom] = useState(0);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [image, setImage] = useState<{ [key: number]: string }>({});
  
  const nextRoom = () => {
    setCurrentRoom((prevIndex) => (prevIndex + 1) % rooms.length);
  };
  const prevRoom = () => {
    setCurrentRoom(
      (prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length
    );
  };
  const statusMapping: Record<string, string> = {
    "0": "Ground Floor",
    "1": "Second Floor",
    "2": "Third Floor",
    "3": "Fourth Floor",
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
    isDeleted: boolean;
    floor_number: number;
    additional_fee_per_hour: string;
    utilityData: Utility[];
  }
  
  const deleteRoom = () => {
    const confirmed = window.confirm("Are you sure you want to delete this page?");
    if (confirmed){
      try {
        fetch("https://api.icspaces.online/delete-room", {
          method: "POST",
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({room_id: rooms[currentRoom]?.id}),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {console.log(data);console.log(rooms)})
      } catch (error) {
        console.error("Error deleting room:", error);
      }
      window.location.reload();
    }
  };
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("https://api.icspaces.online/get-all-rooms-complete", {
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
          isDeleted: room.isDeleted,
          additional_fee_per_hour: room.additional_fee_per_hour,
          utilityData: room.utilities.map((utility:any) => ({
            fee: utility.fee,
            item_name: utility.item_name,
            item_qty: utility.item_qty,
          })),
        }));
        setRooms(roomData);
        console.log(roomData);
        
      } catch (error) {
        console.error("Failed to fetch rooms and utilities:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const photos = await fetch(
          "https://api.icspaces.online/get-room-image",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ room_id: rooms[currentRoom]?.id }),
          }
        );
        if (!photos.ok) {
          throw new Error("Failed to fetch room images");
        }

        const imagesData = await photos.json();

        if (imagesData && imagesData.images && imagesData.images.length > 0) {
          const latestImage = imagesData.images[0].url;
          setImage((img:any)=>({
            ...img,
            [rooms[currentRoom]?.id]: latestImage,
          }));
          console.log("setting images successful");
        } 
      }catch (error) {
        console.error("Failed to fetch rooms and utilities:", error);
      }
    }
    getPhotos();
  }, [rooms, currentRoom]);
  
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
          top: 560, // Adjust these values as needed
          left: 230,
          width: "66%", // Specify width and height if necessary
          height: 300,
        }}
      >
        <RoomPhotos roomID = {rooms[currentRoom]?.id}  />
      </Box>

      <Box
        style={{
          position: "absolute",
          top: 80,
          left: 40,
        }}
      >
        <BackButton />
      </Box>
      <Box
        component="img"
        src={`${image[currentRoom+1]}`}
        alt={`Room Image ${currentRoom + 1}`}
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
        onClick={prevRoom}
        disabled={currentRoom === 0}
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        sx={{ position: "absolute", top: "320px", left: "1250px" }}
        onClick={nextRoom}
        disabled={currentRoom === rooms.length - 1}
      >
        <ArrowForwardIosIcon />
      </Button>
      <Card
        sx={{
          width: 320,
          height: 370,
          position: "absolute",
          top: "340px",
          right: "120px",
          transform: "translate(-50%, -50%)",
          p: 2,
          backgroundColor: "#183048",
          borderRadius: 4,
          overflowY: "auto",
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
            {rooms[currentRoom]?.name}
          </Typography>
          <Stack spacing={1} mt={2}>
            <TableContainer component={Paper} sx={{ border: "none", mb: 16 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Room type:</TableCell>
                    <TableCell style={styles.cell}>
                      {rooms[currentRoom]?.type}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Location:</TableCell>
                    <TableCell style={styles.cell}>
                      {
                        statusMapping[
                          rooms[currentRoom]?.floor_number ?? 3
                        ]
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={styles.boldCell}>Capacity:</TableCell>
                    <TableCell style={styles.cell}>
                      {rooms[currentRoom]?.capacity}
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
              {rooms[currentRoom]?.utilityData?.map((utilityItem) => (
                <li key={utilityItem.item_name}>
                  <Typography
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                    align="left"
                  >
                    - {utilityItem.item_name}
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
                `P ${parseInt(rooms[currentRoom]?.fee ?? "")} / hour`,
                `P ${parseInt(
                  rooms[currentRoom]?.additional_fee_per_hour ?? ""
                )} / hour overtime`,
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
            <Stack direction="row" spacing={2} alignContent="center">
              <Button
                variant="contained"
                component={Link}
                to={`/editroominfopage_admin/${rooms[currentRoom]?.id}`}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#FFB532",
                  height: "23px",
                  width: "40%",
                  color: "black",
                  borderRadius: "20px",

                  fontSize: "13px",
                  "&:hover": {
                    backgroundColor: "#FFC532",
                  },
                }}
              >
                {" "}
                Edit{" "}
              </Button>
              <Button
                variant="contained"
                onClick={deleteRoom}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#FFB532",
                  height: "23px",
                  width: "40%",
                  color: "black",
                  borderRadius: "20px",
                  fontSize: "13px",
                  "&:hover": {
                    backgroundColor: "#FFC532",
                  },
                }}
              >
                {" "}
                Delete{" "}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoomsPage_Admin;