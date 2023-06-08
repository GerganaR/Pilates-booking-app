import React from "react";
import { BsCalendar, BsClock } from "react-icons/bs";

const UserReservationItem = ({ data }) => {
  const { src, alt, name, fullName, email, phone, address, time, date, place } =
    data;

  return (
    <div className="user-reservation-item">
      <div className="user-reservation-item-header">
        <div className="user-reservation-img">
          <img src={src} alt={alt} />
        </div>
        <div>
          <p>{name}</p>
          <h2>{fullName}</h2>
        </div>
      </div>

      <div className="user-reservation-email">{email}</div>

      <div className="user-reservation-phone">{phone}</div>

      <div className="user-reservation-address">{address}</div>

      <div className="user-reservation-date">
        <div className="time">
          <span>
            <BsClock size={"15px"} />
          </span>
          {time}
        </div>
        <div>
          <span>
            <BsCalendar size={"15px"} />
          </span>
          {date}
        </div>
      </div>
      <div className="user-reservation-place">
        <span>{place}</span>
      </div>
    </div>
  );
};

export default UserReservationItem;
