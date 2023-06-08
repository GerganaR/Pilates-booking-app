import React, { useEffect, useState } from "react";
import "./UIElements.css";
const Mat = ({ onBook, user, index }) => {
  console.log(user);
  const [isBooked, setIsBooked] = useState("");

  useEffect(() => {
    if (user) {
      setIsBooked("booked");
    } else {
      setIsBooked("");
    }
  }, [user]);

  return (
    <div onClick={() => onBook()} className={`mat ${isBooked}`}>
      {user ? (
        <div className="mat-initials ">{user}</div>
      ) : (
        <div className="mat-number">{index}</div>
      )}
    </div>
  );
};

export default Mat;
