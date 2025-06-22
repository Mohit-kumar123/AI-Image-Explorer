import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/auth/current_user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user || user === "null") {
          window.location.href = "http://localhost:5000/auth/google";
        } else {
          setLoading(false);
        }
      });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  return children;
};

export default ProtectedRoute;