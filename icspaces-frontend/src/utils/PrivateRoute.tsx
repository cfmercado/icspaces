import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const userTypeRoutes: { [key: number]: string[] } = {
  0: [
    "/homepage",
    "/viewroomspage",
    "/reservationspage",
    "/accountpage",
    "/faqspage",
    "/roomreservation",
  ],
  1: [
    "/homepage",
    "/viewroomspage",
    "/reservationspage",
    "/accountpage",
    "/faqspage",
    "/schedulepage",
    "/roomreservation",
  ],
  2: [
    "/homepage_admin",
    "/reservationspage_admin",
    "/editroominfopage_admin",
    "/roomspage_admin",
    "/accountspage_admin",
    "/schedulepage",
    "/bookreservationpage_admin",
    "/accountpage",
    "/bookroom_admin",
    "/roomreservation",
  ],
  3: [
    "/homepage_admin",
    "/editroominfopage_admin",
    "/roomspage_admin",
    "/accountspage_admin",
    "/schedulepage",
    "/bookreservationpage_admin",
    "/bookroom_admin",
  ],

  // Add more user types and routes as needed
};

const notLoggedInRoutes = [
  "/",
  "/reservationtracker_guest",
  "/viewrooms_guest",
  "/roombookingform_guest",
  "/room_guest",
  "/faqspage",
];

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const [userType, setUserType] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("https://api.icspaces.online/get-profile", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("User Type:", data);

        if (data.success) {
          setUserType(data.data.usertype);
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    // const accessibleRoutes = notLoggedInRoutes;
    // if (!accessibleRoutes.includes(location.pathname)) {
    //   navigate("/");
    // }

    if (!isLoading && userType !== null) {
      const accessibleRoutes = userTypeRoutes[userType];
      if (!accessibleRoutes.includes(location.pathname)) {
        if (userType === 0 || userType === 1) {
          navigate("/homepage");
        }
        if (userType === 2 || userType === 3) {
          navigate("/homepage_admin");
        }
        // navigate("/");
      }
    }
  }, [isLoading, userType, navigate, location.pathname]);

  return isLoading ? <p>Loading...</p> : isLoggedIn ? <Component /> : null;
};

export default PrivateRoute;
