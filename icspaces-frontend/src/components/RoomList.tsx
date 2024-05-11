import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard"; // Make sure to import the RoomCard component
import { Grid, Stack } from "@mui/material";
import tempRoomPhoto from "../assets/room_images/ICS.jpg"; // Import your room images
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface Room {
  image: string;
  room_id: number;
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
  const [roomImages, setRoomImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetch("https://api.icspaces.online//get-all-rooms", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data), // Uncomment this line if you need to send data in the request body
    })
      .then((response) => response.json())
      .then(async (data: Room[]) => {
        setRooms(data);

        data.forEach(async (room: Room) => {
          console.log("THIS", room.room_id);

          try {
            const response = await fetch(
              "https://api.icspaces.online//get-room-image",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ room_id: room.room_id }),
              }
            );

            const imagesData = await response.json();

            if (imagesData.images.length > 0) {
              setRoomImages((prevState) => ({
                ...prevState,
                [room.room_id]: imagesData.images[0],
              }));
            } else {
              console.error(imagesData.msg);
            }
          } catch (error) {
            console.error(`Failed to get room images: ${error}`);
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Stack>
      {rooms.map((room, index) => (
        <Grid item key={index}>
          <RoomCard
            image={roomImages[room.room_id]}
            room_name={room.room_name}
            floor_number={room.floor_number}
            room_type={room.room_type}
            room_id={room.room_id.toString()}
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