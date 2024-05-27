import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard"; // Make sure to import the RoomCard component
import { Grid, Stack } from "@mui/material";
import tempRoomPhoto from "../assets/room_images/ICS.jpg"; // Import your room images
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRoomFilter } from './RoomFilterContext'; // Import the hook


interface Room {
  image: string;
  room_id: number;
  room_name: string;
  room_capacity: number;
  fee: string;
  room_type: string;
  floor_number: number;
  additional_fee_per_hour: string;
  utilities: string[];
}

const RoomList: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomImages, setRoomImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetch("https://api.icspaces.online/get-all-rooms", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Room[]) => {
        console.log("Fetched rooms data:", data); // Log all rooms info here
        setRooms(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const { selectedRoomTypes, selectedCapacities, selectedUtility, selectedFeeRange } = useRoomFilter();

  const feeRangeFilter = (fee: string) => {
    const feeNum = parseFloat(fee);
    if (selectedFeeRange.length === 0) return true; // No filter selected, show all
    return selectedFeeRange.some(range => {
      switch (range) {
        case "Below 1000":
          return feeNum < 1000;
        case "1001 - 3000":
          return feeNum >= 1001 && feeNum <= 3000;
        case "3000 Above":
          return feeNum > 3000;
        default:
          return true;
      }
    });
  };
  

  const filteredRooms = rooms.filter(room =>
    (selectedRoomTypes.length === 0 || selectedRoomTypes.includes(room.room_type)) &&
    (selectedCapacities.length === 0 || selectedCapacities.map(capacity => parseInt(capacity)).includes(room.room_capacity)) &&
    (selectedUtility === "" || room.utilities.some(utility => utility.toLowerCase() === selectedUtility.toLowerCase())) &&
    feeRangeFilter(room.fee)
  );

  return (
    <Stack>
      {filteredRooms.map((room, index) => (
        <Grid item key={index}>
          <RoomCard
            image={roomImages[room.room_id] || tempRoomPhoto}
            room_name={room.room_name}
            floor_number={room.floor_number.toString()}
            room_type={room.room_type}
            room_id={room.room_id.toString()}
            room_capacity={room.room_capacity.toString()}
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
