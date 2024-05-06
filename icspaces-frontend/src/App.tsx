import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AccountPage from "./pages/AccountPage";
import ViewRoomsPage from "./pages/ViewRoomsPage";
import RoomPage from "./pages/RoomPage";

import RoomReservationPage from "./pages/RoomReservationPage";

import ReservationsPage from "./pages/ReservationsPage";
import AdminRoomPage from "./pages/AdminRoomPage";
import HomePage_Admin from "./pages/admin/HomePage_Admin";
import ReservationsPage_Admin from "./pages/admin/ReservationsPage_Admin";
import EditRoomInfoPage_Admin from "./pages/admin/SchedulesPage_Admin";
import AccountsPage_Admin from "./pages/admin/AccountsPage_Admin";
import SchedulesPage_Admin from "./pages/admin/SchedulesPage_Admin";
import RoomsPage_Admin from "./pages/admin/RoomsPage_Admin";
import Status_Admin from "./components/Status_Admin";
import BookRoomReservationPage_Admin from "./pages/admin/BookReservationPage_Admin";
import FAQsPage from "./pages/FAQsPage";

//Changes the default theme of the app
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      main: "#183048",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFB532",
      contrastText: "#183048",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<LoginPage />} />

              <Route path="/login-fail" element={<LoginPage />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/accountpage" element={<AccountPage />} />
              <Route path="/viewroomspage" element={<ViewRoomsPage />} />
              <Route path="/roompage/:room_id" element={<RoomPage />} />
              <Route path="/adminroompage" element={<AdminRoomPage />} />
              <Route
                path="/roomreservation"
                element={<RoomReservationPage />}
              />
              <Route path="/reservationspage" element={<ReservationsPage />} />
              <Route path="/faqspage" element={<FAQsPage />} />

              <Route path="/homepage_admin" element={<HomePage_Admin />} />
              <Route
                path="/reservationspage_admin"
                element={<ReservationsPage_Admin />}
              />
              <Route
                path="/editroominfopage_admin"
                element={<EditRoomInfoPage_Admin />}
              />
              <Route path="/roomspage_admin" element={<RoomsPage_Admin />} />
              <Route
                path="/accountspage_admin"
                element={<AccountsPage_Admin />}
              />
              <Route
                path="/schedulepage_admin"
                element={<SchedulesPage_Admin />}
              />
              <Route
                path="/bookreservationpage_admin"
                element={<BookRoomReservationPage_Admin />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
