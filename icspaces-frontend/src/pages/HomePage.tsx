import { Box, Container, } from "@mui/material";
import MuiHomeGridFinal from "../components/MuiHomeGridFinal";
import HomeBG from "../assets/room_images/HomeBG.png";
const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
         
        margin:0,
        // marginTop:'-2vh',//di ko gets bakit may white gap between navbar and box, 
        backgroundImage: `url(${HomeBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
      }}
    >
      {/* <Box sx={{ marginTop: 10 }}> Previous
        <MuiBox />
      </Box> */}
  
      <Container>
        <MuiHomeGridFinal/>
      </Container>
    </Box>
  )
};

export default HomePage;
