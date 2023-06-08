import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import { UserContext } from "../../Context/UserContext";
import { workoutTemplate, WorkoutTemplateMine } from "../../data";

import DatePickerListItem from "../../Components/Reservation/DatePickerListItem";
import Mat from "../../Components/Reservation/UIElements/Mat";
import Mirror from "../../Components/Reservation/UIElements/Mirror";
import ReservationDetails from "../../Components/Reservation/ReservationDetails";
import { useQuery, gql } from "@apollo/client";

import "./BookingPage.css";

const SEARCH_WORKOUTS_BY_DATE_AND_TIME_QUERY = gql`
  query SearchWorkoutsByDateAndTime(
    $workoutTime: String!
    $workoutDate: String!
  ) {
    searchWorkoutsByDateAndTime(
      workoutTime: $workoutTime
      workoutDate: $workoutDate
    ) {
      _id
      name
      level
      location
      tags
      workoutDate
      workoutTime
      freeSpaces
      reservedPlaces {
        bookedPlace
        user {
          firstName
          lastName
        }
      }
      trainer {
        avatar
        firstName
        lastName
      }
    }
  }
`;

const RESERVATIONS_BY_WORKOUT_QUERY = gql`
  query ReservationsByWorkout($workoutId: String!) {
    reservationsByWorkout(workoutId: $workoutId) {
      _id
      bookedPlace
      user {
        _id
        firstName
        lastName
      }
      workout {
        _id
      }
    }
  }
`;

const Booking = () => {
  const { currentUser } = useContext(UserContext);

  const [startDate, setStartDate] = useState(new Date());
  const [workoutTime, setWorkoutTime] = useState("13:30");
  const [workoutDate, setWorkoutDate] = useState("2023-06-23");
  const [reservation, setReservation] = useState();
  const [workouts, setWorkouts] = useState([]);
  const [workoutId, setWorkoutId] = useState("647de4b3aeab9ea27d193fdb");
  const [bookedPlace, setBookedPlace] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState();

  const {
    loading: loadingWorkouts,
    error: errorWorkouts,
    data: dataWorkouts,
  } = useQuery(SEARCH_WORKOUTS_BY_DATE_AND_TIME_QUERY, {
    variables: { workoutTime, workoutDate },
  });

  const {
    loading: loadingReservations,
    error: errorReservations,
    data: dataReservations,
  } = useQuery(RESERVATIONS_BY_WORKOUT_QUERY, {
    variables: { workoutId },
  });

  if (loadingWorkouts || loadingReservations) {
    return <p>Loading...</p>;
  }

  if (errorWorkouts || errorReservations) {
    return (
      <p>
        Error:{" "}
        {errorWorkouts ? errorWorkouts.message : errorReservations.message}
      </p>
    );
  }

  // Access the data from each query
  const workoutsData = dataWorkouts.searchWorkoutsByDateAndTime;
  const reservations = dataReservations.reservationsByWorkout;

  const selectWorkout = (workoutSelectedFromList) => {
    //Check for existing workout on this date in backend
    setWorkoutDate(workoutSelectedFromList.date);
    setWorkoutTime(workoutSelectedFromList.time);
    // if it exists setSelectedWorkout from response

    setSelectedWorkout(workoutsData[0]);
    setWorkoutId(workoutsData[0]._id);

    // console.log("-------------------");
    // console.log(workoutsData[0]);

    // console.log("-------------------");
  };
  // --------------neee-----------------

  const getDatePicker = () => {
    return (
      <div
        style={{
          backgroundColor: "#6985ed",
          padding: "25px 20px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <h2> Available classes</h2>
        <p>Select dates and see available courses</p>

        <DatePicker
          style={{ padding: "20px" }}
          selected={startDate}
          onChange={(date) => selectDate(date)}
          filterDate={isWeekday}
        />
      </div>
    );
  };
  // --------------neee-----------------

  // --------------neee-----------------

  const selectDate = (date) => {
    setStartDate(date);
    const generatedWorkouts = WorkoutTemplateMine.time?.map((time) => {
      const generatedDate = moment(date).format("YYYY-MM-DD");

      return {
        date: generatedDate,
        time: time,
      };
    });
    setWorkouts(generatedWorkouts);
    console.log(workouts);
  };

  function isWeekday(date) {
    const day = date.getDay();
    return workoutTemplate.days.includes(day);
  }
  // --------------neee-----------------

  const getWorkouts = () => {
    return (
      <div className="list-wrapper">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <DatePickerListItem
              workout={workout}
              selectWorkout={selectWorkout}
              key={index}
            />
          ))
        ) : (
          <div className="list-wrapper-empty">
            <p>
              Select date from the date picker above to see the available
              classes.
            </p>
          </div>
        )}
      </div>
    );
  };

  function getUser(index) {
    const existingBooking = reservations.find(
      (reservation) => reservation.bookedPlace === index
    );

    console.log("---Existing booking----");
    console.log(index);
    console.log(existingBooking);

    if (existingBooking) {
      const { firstName, lastName } = existingBooking.user;
      return firstName.substring(0, 1) + lastName.substring(0, 1);
    }

    //Reserved by current user spot
    // raboti i bez tozi kod
    const isCurrentBooking = index === bookedPlace;
    if (isCurrentBooking) {
      return (
        currentUser.firstName.substring(0, 1) +
        currentUser.lastName.substring(0, 1)
      );
    }

    //Free spot
    return null;
  }

  function getAvailablePlaces() {
    console.log("getAvailablePlaces");
    console.log(selectedWorkout);
    console.log("freespaces" + selectedWorkout);

    const freeSpaces = Array.from(
      { length: selectedWorkout?.freeSpaces || 0 },
      (_, i) => i + 1
    );

    return (
      <div className="d-flex">
        <div className="reservation-wrapper">
          {freeSpaces.length > 0 ? (
            <>
              <Mirror />
              <div className="room-mats">
                {freeSpaces.map((freeSpace, index) => {
                  return (
                    <Mat
                      onBook={() => {
                        if (index === bookedPlace) {
                          setBookedPlace(null);
                        } else {
                          setBookedPlace(index);
                        }
                      }}
                      key={index}
                      index={index}
                      user={getUser(index)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="reservatin-empty">No available data to show.</div>
          )}
          {freeSpaces.length > 0 && (
            <div className="btn-reserve">
              <div className="btn btn-primary">Reserve</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }} className="row">
      <div className="col-md-3">
        <div className="date-picker-wrapper">
          {getDatePicker()}

          {getWorkouts()}
        </div>
      </div>
      <div className="col-md-9">
        {selectedWorkout ? (
          <ReservationDetails pilates={selectedWorkout} />
        ) : null}

        {getAvailablePlaces()}
      </div>
    </div>
  );
};

export default Booking;
