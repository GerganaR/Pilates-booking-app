import React from "react";
import Widget from "./Widget";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaWeightHanging } from "react-icons/fa";
import { WidgetItems } from "../../data";

import { gql, useQuery } from "@apollo/client";

const GET_TRAINER_COUNT = gql`
  query Query {
    trainerCount
  }
`;

const GET_USER_COUNT = gql`
  query Query {
    usersCount
  }
`;

const WidgetList = () => {
  const {
    loading: trainerLoading,
    error: trainerError,
    data: trainerData,
  } = useQuery(GET_TRAINER_COUNT);
  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery(GET_USER_COUNT);

  if (trainerLoading && loadingUsers) {
    return <p>Loading...</p>;
  }

  if (trainerError && errorUsers) {
    return <p>Error</p>;
  }

  const trainerCount = trainerData.trainerCount;
  const usersCount = dataUsers.usersCount;

  console.log(usersCount);

  return (
    <div className="widget-wrapper">
      <Widget
        className="orange"
        key={1}
        icon={<BsFillPeopleFill />}
        title="Clients"
        text={trainerCount}
      />
      <Widget
        className="purple"
        key={2}
        icon={<BsFillPeopleFill />}
        title="Trainers"
        text={usersCount}
      />
      <Widget
        className="blue"
        key={3}
        icon={<FaWeightHanging />}
        title="Courses"
        text={trainerCount}
      />
      {/* {WidgetItems.map((item, index) => (
        <Widget
          className={item.className}
          key={index}
          icon={item.icon}
          title={item.title}
          text={item.text}
        />
      ))} */}
    </div>
  );
};

export default WidgetList;
