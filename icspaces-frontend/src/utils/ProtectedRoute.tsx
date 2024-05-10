import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

axios.defaults.withCredentials = true;

const ProtectedRoute = ({
  component: ProtectedComponent,
}: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await axios.get("https://icspaces-backend.onrender.com/is-logged-in");
        console.log(response.data); // Add this line
        if (response.data.isLoggedIn) {
          // Change this line
          setIsLoading(false);
        } else {
          navigate("/login-fail");
        }
      } catch (error) {
        console.error("Failed to check if logged in:", error);
        navigate("/login-fail");
      }
    };

    checkIfLoggedIn();
  }, [navigate]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return <ProtectedComponent />;
};

export default ProtectedRoute;
