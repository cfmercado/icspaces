import { Box, Typography, TextField, Icon, Stack, useMediaQuery, MenuItem, Snackbar, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import React, { useState, useEffect, useRef, ChangeEvent} from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import '../../App.css';

const darkColor = '#183048';
const inputStyle = {
  fontSize: '20px',
  color: darkColor,
  fontFamily: 'Inter',
  fontWeight: 400,
  marginBottom: '5%',
  backgroundColor: '#FFFFFF',
};

const styles = {
  list: {
    width: '100%',
    // border: '1px solid #ddd',
    marginTop: '1%',
    maxWidth: '100%',
    // backgroundColor: theme.palette.background.paper,

  },
  listItem: {
    color: darkColor,
    border: '1px solid',
    borderColor: '#183048',
    borderRadius: '100px',
    marginBottom: '10px',
    maxHeight: '5vh',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
};


const EditRoomInfoPage_Admin = () => {


  const [items, setItems] = useState<Utility[]>([]);
  const [originalItems, setOrignalItems] = useState<Utility[]>([]);
  const [newItem, setNewItem] = useState<Utility>({item_name: '', item_qty: 0, fee: 0 });
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isVertical = useMediaQuery('(min-width:600px)');
  const [orientation, setOrientation] = useState('');
  const roomName = useRef<HTMLInputElement>(null);
  const roomLocation = useRef<HTMLInputElement>(null);
  const roomCapacity = useRef<HTMLInputElement>(null);
  const roomFee = useRef<HTMLInputElement>(null);
  const roomOvertimeFee = useRef<HTMLInputElement>(null);
  const utilityQty = useRef<HTMLInputElement[]>([]);   
  const utilityPrice = useRef<HTMLInputElement[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const initialQuantities = items.map(item => item.item_qty);
  const initialPrices = items.map(item => item.fee);
  const {room_id} = useParams<{room_id: string}>(); // Get the room ID from the URL
  console.log('Room ID:', room_id);


  // Set initial state using useState
  const [quantities, setQuantities] = useState(initialQuantities);
  const [prices, setPrices] = useState(initialPrices);

  // Function to handle value change
  const handleLocationChange = () => {
    setSelectedLocation(roomLocation.current?.value || '');
  };

  const handleCapacityChange = () => {
    setSelectedCapacity(roomCapacity.current?.value || '');
  };

  const location = [
    {
      value: 0,
      label: 'First Floor',
    },
    {
      value: 1,
      label: 'Second Floor',
    },
    {
      value: 2,
      label: 'Third Floor',
    },
    {
      value: 3,
      label: 'Fourth Floor',
    },
  ];

  const capacities = [
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 100,
      label: '100',
    },
  ];


  // Define the types
  interface Room {
    room_id: number;
    room_name: string;
    floor_number: number;
    room_capacity: number;
    fee: number;
    additional_fee_per_hour: number;
  }

  interface Utility {
    item_name: string;
    item_qty: number;
    fee: number;
  }

  useEffect(() => {
    getRoomInformation();
    setOrientation(isVertical ? 'vertical' : 'horizontal');
  }, [isVertical]);

  //function to save to database

  const saveEdit = async () => {
    // Access the values of the text fields directly using refs
    const name = roomName.current!.value;
    const location = roomLocation.current!.value;
    const capacity = roomCapacity.current!.value;
    const fee = roomFee.current!.value;
    const overtimeFee = roomOvertimeFee.current!.value;
    console.log('Location', location);
    console.log('Capacity', capacity);
  
    // Validate if any required field is empty
    if (!name || !location || !capacity || !fee || !overtimeFee) {
      setSnackbarMessage("Please fill out all fields.");
      setSnackbarOpen(true);
      console.error("Please fill out all fields.");
      return; // Exit early if any required field is empty
    }
  
    // Prepare the payload to send to the backend
    const roomDetails = {
      room_name: name,
      floor_number: parseInt(location), // Convert location to number
      room_capacity: parseInt(capacity), // Convert capacity to number
      fee: parseFloat(fee), // Convert fee to float
      additional_fee_per_hour: parseFloat(overtimeFee), // Convert overtimeFee to float
      room_id: room_id, // Adjust the room ID as needed
    };
  
    try {
      // Send an HTTP request to the backend
      const response = await fetch("https://api.icspaces.online/edit-room-information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomDetails), // Convert roomDetails object to JSON string
      });
  
      if (!response.ok) {
        setSnackbarMessage("Failed to save room details.");
        setSnackbarOpen(true);
        throw new Error("Failed to save room details.");
        
      }
  
      const utilityDetails = {
        room_id: room_id, // Adjust the room ID as needed
        utilities: items, // Current list of utilities
      };
      console.log('Utility Details:', utilityDetails);
      // Send an HTTP request to update utilities
      const utilityResponse = await fetch("https://api.icspaces.online/set-utilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilityDetails), // Convert utilityDetails object to JSON string
      });
  
      if (!utilityResponse.ok) {
        setSnackbarMessage("Failed to save utilities.");
        setSnackbarOpen(true);
        throw new Error("Failed to save utilities.");
      }
  
      console.log('Location', location);
      console.log('Capacity', capacity);
      console.log('Room Details')
      console.log("Room details saved successfully.");
      setSnackbarMessage("Room details saved successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving room details:", error);
      // Handle errors gracefully
    }
  };
  
 // Assuming you're using fetch API or axios for making HTTP requests in your frontend

// using fetch API
const getRoomInformation = async () => {
  try {
    const response = await fetch('https://api.icspaces.online/get-room-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify({room_id: room_id}), // Adjust the room_id as needed
    });

    if (!response.ok) {
      setSnackbarMessage("Failed to fetch room details.");
      setSnackbarOpen(true);
      throw new Error('Failed to fetch room data');
    }

    const roomData = await response.json();
    console.log('Room data:', roomData);
    const roomInfo = roomData.room;
    setRoom(roomInfo); // Update the room state with the fetched data
    if(roomInfo && roomData.utility) {
      setItems(roomData.utility); // Update the equipments list with the fetched data
      setOrignalItems(roomData.utility);
      // Initialize quantities list based on initial items
      const initialQuantities = roomData.utility.map((item: Utility) => item.item_qty);
      setQuantities(initialQuantities);

      // Initialize prices list based on initial items
      const initialPrices = roomData.utility.map((item: Utility) => item.fee);
      setPrices(initialPrices);

      console.log('Room utility:', roomData.utility);
      setSelectedCapacity(roomInfo.room_capacity);
      setSelectedLocation(roomInfo.floor_number);
    }
    // Process the room data further as needed
  } catch (error) {
    setSnackbarMessage("Failed to fetch room details.");
    setSnackbarOpen(true);
    console.error('Error fetching room data:', error);
    // Handle errors gracefully
  }
};


  const addItem = () => {
    if (newItem.item_name.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem({item_name: '', item_qty: 0, fee: 0 }); // Clear the input field after adding
    }
  };

  const deleteItem = (index: number) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  
    setQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities.splice(index, 1);
      return updatedQuantities;
    });

    setPrices(prevPrices => {
      const updatedPrices = [...prevPrices];
      updatedPrices.splice(index, 1);
      return updatedPrices;
    });
  
  };

  const cancelEdit = () => {
    window.location.reload();
    // Clear the input fields
    setSnackbarMessage("Changes have been discarded.");
    setSnackbarOpen(true);
  };

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   const keyCode = event.keyCode || event.which;
  //   const keyValue = String.fromCharCode(keyCode);

  //   // Allow only numbers
  //   if (!/^\d+$/.test(keyValue)) {
  //     event.preventDefault();
  //   }
  // };

  return (
      <>
      <Button
        variant="contained" // or "outlined" or "text" based on your design
        color="primary" // or "secondary" or any other color
        onClick = {() => window.history.back()}
        style={{
          borderRadius: 3,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
          // backgroundColor: '#D9D9D9', // Change background color
          backgroundImage: 'linear-gradient(to bottom, #EAEAEA, #CCDBE4)',
          color: darkColor, // Change text color
          transition: 'background-image 0.3s',
          position: "absolute",
          top: '15vh',
          left: '14%',
          zIndex: 2, // Ensure it's on top of other content
          fontFamily: 'Inter',
          padding: '0.5%',
          // marginBottom: '20px',
          // Add other custom styles here
        }}
        startIcon={<ArrowBackIosRoundedIcon />}
        
      >
      <Typography variant="body1" sx={{ textTransform: 'none' }}>Back</Typography>
    </Button>

      
      

      <Box
      sx={{
        // border: '3px solid #ff6699',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column' }, // Stack vertically on small screens, horizontally on medium screens and above
        alignItems: 'center', // Align items at the start
        height: '50vh', // Full height of the viewport
        justifyContent: 'center', // Center children horizontally
        boxSizing: 'border-box',
        marginTop: '20vh',

      }}
    >
      
       <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000} // Adjust the duration as needed
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{
            vertical: "bottom", // Change to 'top' if you want it to appear at the top
            horizontal: "center", // Change to 'left' if you want it to appear on the left
          }}
        />
        
      <Stack sx={{
        // border: '2px solid #333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        flexDirection: { xs: 'column', md: 'row' },
        maxWidth: '100%',
        height: '50vh',
        backgroundColor: '#EEEEEE',
        color: darkColor,
        margin: 'auto',
        borderRadius: 4,
        padding: 2,
        paddingLeft: 4,
        paddingTop: 4,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: { xs: '80%', md: '70%' }, // Adjust width for different screen sizes
        marginTop: { xs: 'auto', md: '13%' }, 
        zIndex: 1,
      }}
      spacing={2}
      useFlexGap
      flexWrap="wrap"
      direction={{ xs: 'column', md: 'row' }}
      >
      
      {/* <Stack direction={{xs: 'column', md: 'row'}} spacing={2}  useFlexGap flexWrap="wrap" border={1} color='#333' width={'90%'}> */}
      <Stack  direction="column" spacing={0} width={{xs: '100%',  md:'48%'}}
      // sx={{
      //   border: '2px solid #333',}}
      >


      {room && (
        <>
          <Typography variant="h6" style={{color: darkColor, fontFamily:'Inter', fontWeight: 700}}>Room Information</Typography>
          <TextField 
            id="room-name" 
            label="Room Name" 
            defaultValue={room.room_name || ''} 
            variant="outlined" 
            size="small" 
            inputRef={roomName}
            inputProps={{
              maxLength: 25,
            }}
            InputProps={{
              style: {
                fontSize: '30px',
                color: darkColor,
                fontFamily: 'Inter', // Just 'Inter' is enough, no need for 'Inter.700' here
                fontWeight: 700,
                marginBottom: '5%',
                backgroundColor: '#FFFFFF',
              },
            }}
          />

      <TextField
          id="location"
          select
          label="Room Location"
          // defaultValue={location[room?.floor_number]} 
          value={selectedLocation}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          size="small"
          inputRef={roomLocation}
          InputProps={{
            style: inputStyle,
          }}
          onChange={handleLocationChange} 
        >
          {location.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

      <TextField id="room-capaciy" 
            select 
            label="Room Capacity" 
            // defaultValue={capacities[room?.room_capacity]}
            value={selectedCapacity}
            variant="outlined" 
            size = "small" 
            inputRef={roomCapacity}
            SelectProps={{
              native: true,
            }}
            InputProps = {{
              style: inputStyle,
            }}
            onChange={handleCapacityChange}
      >
      {capacities.map((optionCapacity) => (
        <option key={optionCapacity.value} value={optionCapacity.value}>
          {optionCapacity.label}
        </option>
      ))}
      </TextField>

      <TextField id="room-fee" label="Fee per Hour" defaultValue={room?.fee} variant="outlined" size="small" type="number" inputRef={roomFee}
      InputProps={{
        style: inputStyle,
        inputProps: {
          maxLength: 10,
          min: 0, // Optionally, you can set minimum value
          step: 50, // Optionally, you can set step value
          max: 100000,
        },
      }}
    />
      <TextField id="room-overtime-fee" label = "Additional Fee per Hour"defaultValue={room?.additional_fee_per_hour} variant="outlined" size = "small" type = "number"  inputRef={roomOvertimeFee}
      InputProps = {{
        style: inputStyle,
        inputProps: {
          maxLength: 10,
          min: 0, // Optionally, you can set minimum value
          step: 50, // Optionally, you can set step value
          max: 100000,
        },
      }}
      />

        </>
      )}

      </Stack>

      {orientation === 'vertical' ? (
        <svg width="2" height="100%" >
          <line x1="0" y1="0" x2="0" y2="100%" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="100%" height="2">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#333" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      )}

      <Stack direction="column" spacing={2} justifyContent="flex-start" alignItems="flex-start"  width={{xs: '100%', md:'47%'}} >
        <Typography variant="h6" style={{color: darkColor, fontFamily:'Inter', fontWeight: 700}}>Equipments Available: </Typography> 
        <Typography variant="h6" style={{color: 'gray', fontFamily:'Inter', fontWeight: 400, fontSize: '12px', marginTop: '1%'}}>Character Limit: 20</Typography>
       
        {room && (
        <List style ={styles.list} >
          {items.map((item, index) => (
            <ListItem key={index} style={styles.listItem}>
              <ListItemText primary={item.item_name} style={{ color: darkColor, flex: 1, maxWidth: '45%' }} />
              <Typography variant="body1" style={{ color: darkColor, flex: 'none', width: '10%', fontSize: '15px', textAlign: 'center', padding:'5px'}}>Price: </Typography>
              <TextField 
                id="item" 
                value={prices[index]}
                variant="standard" 
                size="small" 
                type="number" 
                inputRef={(input) => (utilityPrice.current[index] = input)} 
                InputProps={{
                  style: { ...inputStyle, flex: 'none', width: '70px', fontSize: '15px', textAlign: 'center', marginTop: '1vh'},
                  disableUnderline: true,
                  
                }}
                inputProps={{
                  style: { textAlign: 'center', verticalAlign: 'bottom'},
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = (e.target as HTMLInputElement).value;
                    const updatedItems = [...items];
                    updatedItems[index].fee = parseInt(newValue);
                    setItems(updatedItems);
                    const updatedPrices = [...prices];
                    updatedPrices[index] = parseInt(newValue);
                    setPrices(updatedPrices);
                    console.log('Updated Prices:', items);

                  }
                  
                }}
              />

              <Typography variant="body1" style={{ color: darkColor, flex: 'none', width: '7%', fontSize: '15px', textAlign: 'center'}}>Qty: </Typography>
              <TextField 
                id="item" 
                value={quantities[index]}
                variant="standard" 
                size="small" 
                type="number" 
                inputRef={(input) => (utilityQty.current[index] = input)} 
                InputProps={{
                  style: { ...inputStyle, flex: 'none', width: '50px', fontSize: '15px', textAlign: 'center', marginTop: '1vh'},
                  disableUnderline: true,
                  
                }}
                inputProps={{
                  style: { textAlign: 'center', verticalAlign: 'bottom'},
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = (e.target as HTMLInputElement).value;
                    const updatedItems = [...items];
                    updatedItems[index].item_qty = parseInt(newValue);
                    setItems(updatedItems);
                    const updatedQuantities = [...quantities];
                    updatedQuantities[index] = parseInt(newValue);
                    setQuantities(updatedQuantities);
                    console.log('Updated Quantities:', items);
                  }
                  
                }}
              />

              <IconButton
                onClick={() => deleteItem(index)}
                
                aria-label="delete"
                style={{ color: '#183048', marginLeft: 'auto' }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
          
          {items.length <= 5 && (
          <ListItem style={styles.listItem}>
          <TextField
              // label="Add New Equipment"
              placeholder="Add New Equipment"
              value={newItem.item_name}
              onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value})}
              size="small"
              variant="standard"
              inputProps={{
                maxLength: 20,
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <IconButton onClick={addItem} aria-label="add" >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </ListItem>
          )}
        </List>
        
        )}
      </Stack>
      

     
      </Stack>
      <Stack direction={{xs: 'row', md: 'row'}} spacing={'10%'} width={{xs: '100%', md:'50%'}} margin='2%' justifyContent='center' >
        <Button variant="contained" color="primary" onClick={saveEdit} style={{width: '20%',borderRadius: '50px', backgroundColor: '#FFB532', color: darkColor, fontFamily: 'Inter', fontWeight: 700, fontSize: '15px'}}> Save </Button>
        <Button variant="contained" color="secondary" onClick={cancelEdit} style={{width: '20%',borderRadius: '50px', backgroundColor: '#E4E4E4', color: darkColor, fontFamily: 'Inter', fontWeight: 700, fontSize: '15px'}}>Cancel</Button>
      </Stack>
      
      </Box>
      </>


);
  
};

export default EditRoomInfoPage_Admin;




