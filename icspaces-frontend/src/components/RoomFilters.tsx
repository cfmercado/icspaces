import {
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Stack,
  Button,
  Popover,
  useMediaQuery,
  useTheme,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import React, { useEffect, MouseEvent, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface RoomFiltersProps {
  roomTypes: string[];
  floors: string[];
  capacities: string[];

}

const FilterButton = ({
  label,
  handleClick,
}: {
  label: string;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
}) => (
  <Button variant="text" color="primary" onClick={handleClick}>
    {label}
    {<ArrowDropDownIcon />}
  </Button>
);

const FilterPopover = ({
  id,
  open,
  anchorEl,
  handleClose,
  children,
}: {
  id: string;
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  children: React.ReactNode;
}) => (
  <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
  >
    <Paper sx={{ padding: "1rem", maxWidth: "100vw" }}>{children}</Paper>
  </Popover>
);



const Filters = ({ items }: { items: string[] }) => (
  <Stack>
    {items.map((item, index) => (
      <FormControlLabel
        key={index}
        control={<Checkbox color="secondary" />}
        label={item}
      />
    ))}
  </Stack>
);

const RoomFilters = () => {
  const roomTypes = ["Mega Hall", "Lecture Hall", "Lab Rooms"];
  const floors = ["Ground", "First", "Second"];
  const capacities = ["0-25", "30-50", "More than 50"];

  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  const [filters, setfilters] = useState<RoomFiltersProps>({
    roomTypes: [],
    floors: [],
    capacities: [],
  });

  useEffect(() => {
    fetch('https://icspaces-backend.onrender.com/get-all-room-filters', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data), // Uncomment this line if you need to send data in the request body
    })
    .then(response => response.json())
    .then(data => {
      setfilters(data);
      console.log(data);
    });
  }, []);


  return smallScreen ? (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyItems: "center",
        top: "64px",
        left: 0,
        right: 0,
        p: 1,
        mt: { xs: -1, sm: -0.5 },
        justifyContent: "center",
        bgcolor: "background.paper",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
          mt: 1,
          mx: 1,
        }}
      >
        <TextField label="Search" variant="outlined" size="small" />
        <FilterButton label="Filter" handleClick={handleClick} />
        <FilterPopover
          id="filter-popover"
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <Typography variant="h6">Room Type</Typography>
          <Filters items={filters.roomTypes} />
          <Divider />
          <Typography variant="h6">Floor</Typography>
          <Filters items={filters.floors} />
          <Divider />
          <Typography variant="h6">Capacity</Typography>
          <Filters items={filters.capacities} />
        </FilterPopover>
      </Box>
    </Box>
  ) : (
    <Paper
      sx={{
        padding: "1rem",
        position: "fixed",
        width: { sm: "none", md: "10rem", lg: "15rem" },
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        style={{ marginBottom: "1rem" }}
      />
      <Typography variant="h6" textAlign="start" color="primary">
        Room Type
      </Typography>
      <Filters items={filters.roomTypes} />
      <Divider />
      <Stack marginTop="1rem" textAlign="start" color="primary">
        <Typography variant="h6">Floor</Typography>
        <Filters items={filters.floors} />
      </Stack>
      <Divider />
      <Stack marginTop="1rem" textAlign="start" color="primary">
        <Typography variant="h6">Capacity:</Typography>
        <Filters items={filters.capacities} />
      </Stack>
    </Paper>
  );
};

export default RoomFilters;
