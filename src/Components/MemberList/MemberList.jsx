import React from "react";
import MemberListItem from "./MemberListItem";
import MemberListHeader from "./MemberListHeader";

const MemberList = ({ members }) => {
  return (
    <>
      <MemberListHeader
        age="Age"
        name="Member Details"
        email="Email"
        address="Address"
        phone="Phone"
        date="Date"
      />
      <div className="member-list">
        {members.length > 0 ? (
          members.map((item, index) => (
            <MemberListItem
              key={index}
              firstName={item.firstName}
              lastName={item.lastName}
              age={item.age}
              email={item.email}
              address={item.address}
              phone={item.phone}
              avatar={item.avatar}
              date={item.createdAt}
            />
          ))
        ) : (
          <div className="member-list-empty">
            No data to show by current filtering.
          </div>
        )}
      </div>
    </>
  );
};

export default MemberList;
