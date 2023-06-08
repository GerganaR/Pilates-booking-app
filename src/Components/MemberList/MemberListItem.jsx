import React from "react";
import "./MemberList.css";
import moment from "moment";

const MemberListItem = ({
  firstName,
  lastName,
  age,
  email,
  address,
  phone,
  avatar,
  date,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Using JavaScript's built-in Date object
    // return date.toLocaleDateString(); // Format based on browser's locale

    // Using Moment.js library
    return moment(date).format("YYYY-MM-DD");
  };
  return (
    <div className="member-list-item-wrapper">
      <div className="member-header">
        <div className="member-image">
          <img src={avatar} alt={firstName} />
        </div>
        <div className="member-name">{`${firstName} ${lastName}`}</div>
      </div>

      <div className="member-email">{email}</div>

      <div className="member-phone">{phone} </div>

      <div className="member-address"> {address}</div>

      <div className="member-age">{age}</div>
      <div className="member-date">{formatDate(date)}</div>
    </div>
  );
};

export default MemberListItem;
