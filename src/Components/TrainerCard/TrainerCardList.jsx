import React from "react";
import TrainerCardListItem from "./TrainerCardListItem";
import "./TrainerCard.css";

const TrainerCardList = ({ instructors }) => {
  return (
    <div className="trainer-card-list-item-wrapper">
      {instructors.map((item, index) => (
        <TrainerCardListItem
          key={index}
          firstName={item.firstName}
          lastName={item.lastName}
          weight={item.weight}
          height={item.height}
          age={item.age}
          email={item.email}
          specialization={item.specialization}
          address={item.address}
          phone={item.phone}
          avatar={item.avatar}
        />
      ))}
    </div>
  );
};

export default TrainerCardList;
