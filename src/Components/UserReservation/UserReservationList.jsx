import React from "react";
import "./UserReservation.css";
import UserReservationItem from "./UserReservationItem";
import { userReservations } from "../../data";

const UserReservationList = () => {
  return (
    <>
      <div className="user-reservation-header">
        <h3>Incoming trainings</h3>
        <p>See all trainings</p>
      </div>
      <div className="user-reservation-list">
        {userReservations.map((reservation) => (
          <UserReservationItem key={reservation._id} data={reservation} />
        ))}
      </div>
    </>
  );
};

export default UserReservationList;
