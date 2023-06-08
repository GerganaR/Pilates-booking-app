import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import AuthPage from "./Pages/Auth/AuthPage";
import BookingPage from "./Pages/Booking/BookingPage";
import TrainersPage from "./Pages/Trainers/TrainersPage";
import { gql, useQuery } from "@apollo/client";

import "./App.css";
import MembersPage from "./Pages/Members/MembersPage";
import EditPage from "./Pages/Edit/EditPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import BookingPageMine from "./Pages/Booking/BookingPageMine";
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
function App() {
  const { isLoggedIn } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserContext);

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

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/auth" />} />
        </Routes>
      ) : (
        <Sidebar>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Dashboard />}></Route> */}
            <Route path="/" element={<ProfilePage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/book" element={<BookingPage />} />

            {/* <Route path="/book" element={<BookingPageMine />} /> */}
            <Route path="/edit" element={<EditPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </Sidebar>
      )}
    </BrowserRouter>
  );
}

export default App;
