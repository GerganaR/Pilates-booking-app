import React, { useContext, useEffect } from "react";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { UserContext } from "../../Context/UserContext";
import WidgetList from "../../Components/Widget/WidgetList";
import UserReservationList from "../../Components/UserReservation/UserReservationList";
import { gql, useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      _id
      createdAt
      updatedAt
      firstName
      lastName
      email
      password
      avatar
      age
      address
      phone
      roles
    }
  }
`;
const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    if (data) {
      try {
        const { currentUser } = data;
        setCurrentUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data, setCurrentUser]);

  console.log("current user from profile");
  console.log(currentUser);

  return (
    <div className="main-wrapper">
      <div className="row">
        <div className="col-md-9">
          <WidgetList />

          <UserReservationList />
        </div>
        <div className="col-md-3">
          {" "}
          <ProfileCard
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
            email={currentUser.email}
            age={currentUser.age}
            address={currentUser.address}
            phone={currentUser.phone}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
