import React, { useEffect,useState } from 'react';
import RoomCard from "./RoomCard"; // Make sure to import the RoomCard component
import { Grid, Stack } from "@mui/material";
import tempRoomPhoto from "../assets/room_images/ICS.jpg"; // Import your room images
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Room {
  image: string;
  room_id: string;
  room_name: string;
  room_capacity: string;
  fee: string;
  room_type: string;
  floor_number: string;
  additional_fee_per_hour: string;
  utilities: string[];

}

// const rooms: Room[] = [
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   {
//     image: tempRoomPhoto,
//     name: "ICS Room",
//     description: {
//       floor: "Ground",
//       type: "Mega Hall",
//       capacity: "30-50",
//       amenities: ["Projector", "Whiteboard", "Sound System"],
//     },
//   },
//   // Add more room objects as needed
// ];

const RoomList: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch('https://api.icspaces.online/get-all-rooms', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data), // Uncomment this line if you need to send data in the request body
    })
    .then(response => response.json())
    .then(data => {
      setRooms(data);
      console.log(data);
    });
  }, []);


  return (
    <Stack>
      {rooms.map((room, index) => (
        <Grid item key={index}>
          <RoomCard
            image={room.image}
            room_name={room.room_name}
            floor_number={room.floor_number}
            room_type={room.room_type} 
            room_id={room.room_id} 
            room_capacity={room.room_capacity} 
            fee={room.fee} 
            additional_fee_per_hour={room.additional_fee_per_hour}  
            utilities={room.utilities}
            />
        </Grid>
      ))}
    </Stack>
  );
};

export default RoomList;
