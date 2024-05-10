import RoomFilters from "../../components/RoomFilters";
import RoomListGuest from "./RoomList_Guest";
import { Box, Grid, Stack } from "@mui/material";

const ViewRoomsPage = () => {
  return (
    <Box style={{ maxHeight: "calc(100vh - 5px)", overflow: "auto" }}>
      <Grid
        container
        spacing={4}
        justifyContent="space-evenly"
        sx={{ mt: { xs: 10, sm: 10, md: 5 } }}
      >
        <Grid item>
          <RoomFilters />
        </Grid>
        <Grid item>
          <RoomListGuest />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewRoomsPage;
