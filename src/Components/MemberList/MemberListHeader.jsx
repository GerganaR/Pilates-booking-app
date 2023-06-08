import React from "react";
import "./MemberList.css";
const MemberListHeader = ({ name, email, address, phone, age, date }) => {
  return (
    <div>
      <div className="member-list-header">
        <div className="header-header">{name}</div>

        <div className="header-email">{email}</div>

        <div className="header-phone">{phone} </div>

        <div className="header-address"> {address}</div>

        <div className="header-age">{age}</div>
        <div className="header-date">{date}</div>
      </div>
    </div>
  );
};

export default MemberListHeader;
