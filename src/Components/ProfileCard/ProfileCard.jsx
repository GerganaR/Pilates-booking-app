import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./ProfileCard.css";
const ProfileCard = ({ firstName, lastName, email, address, age, phone }) => {
  const backendDates = ["2023-05-01", "2023-05-24", "2023-05-15", "2023-05-30"];
  const markedDates = [
    new Date(),
    ...backendDates.map((date) => new Date(date)),
  ];
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
    // Handle date change
  };

  const tileContent = ({ date, view }) => {
    if (
      view === "month" &&
      markedDates.some(
        (markedDate) => date.toDateString() === markedDate.toDateString()
      )
    ) {
      // Render a dot for marked dates
      return <div className="dot"></div>;
    }
    return null;
  };
  return (
    <div className="profileCard">
      <div className="profile-avatar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147137.png "
          alt=""
          className="avatar"
        />
      </div>
      {/* copilot */}
      <div className="profile-details">
        <div>{`${firstName} ${lastName}`}</div>
        <p>{email}</p>
        <div className="body-details">
          <div className="body-details-item">
            {" "}
            <span>Member</span>
            <p>Type</p>
          </div>
          <div className="body-details-item">
            {" "}
            <span>{age}</span>
            <p>Age</p>
          </div>
        </div>
        <div className="phone">
          <span>
            <BsFillTelephoneFill />
          </span>

          {phone}
        </div>
        <div className="address">
          <span>
            <IoLocationSharp />
          </span>
          {address}
        </div>
        <Calendar
          formatShortWeekday={(locale, value) =>
            new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
              value
            )[0]
          }
          locale="en-US"
          onChange={onChange}
          value={value}
          tileContent={tileContent}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
