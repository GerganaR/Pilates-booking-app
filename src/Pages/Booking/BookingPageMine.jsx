import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { WorkoutTemplateMine } from "../../data";
import { useQuery, gql } from "@apollo/client";
const SEARCH_WORKOUTS_BY_DATE_AND_TIME = gql`
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
// const WORKOUTS_BY_DATE_QUERY = gql`
//   query Query($workoutDate: String!) {
//     searchWorkoutsByDate(workoutDate: $workoutDate) {
//       _id
//       name
//       location
//       level
//       tags
//       workoutDate
//       workoutTime
//       freeSpaces
//       reservedPlaces {
//         _id
//         date
//         bookedPlace
//         user {
//           _id
//           firstName
//           lastName
//         }
//       }
//       trainer {
//         firstName
//         lastName
//         avatar
//       }
//     }
//   }
// `;

const BookingPageMine = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [workoutTime, setWorkoutTime] = useState("13:30"); // Replace with your desired workout time
  const [workoutDate, setWorkoutDate] = useState("2023-06-23"); // Replace with your desired workout date

  const [workouts, setWorkouts] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const { loading, error, data } = useQuery(SEARCH_WORKOUTS_BY_DATE_AND_TIME, {
    variables: { workoutTime, workoutDate },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const workoutsData = data.searchWorkoutsByDateAndTime;
  console.log(workoutsData);
  const selectWorkout = (workoutSelectedFromList) => {
    // search only by date
    // TODO searcg by time also
    // setWorkoutDate(workoutSelectedFromList.date);
    setWorkoutDate(workoutSelectedFromList.date);
    setWorkoutTime(workoutSelectedFromList.time);
    // const workout = {
    //   WorkoutTemplateMine,
    //   workoutDate: workoutSelectedFromList.date,
    //   freeSpaces: WorkoutTemplateMine.freeSpaces,
    //   reservedPlaces: [
    //     {
    //       user: "PB",
    //       bookedPlace: 2,
    //     },
    //   ],
    // };

    setSelectedWorkout(workoutsData.workout);

    console.log(selectedWorkout);
  };

  function selectDate(date) {
    // const formattedDate = moment(date).format("YYYY-MM-DD");
    // console.log(formattedDate);

    setStartDate(date);
    // console.log(startDate);

    //GET THE DATES FOR THE DAYS
    const generatedWorkouts = WorkoutTemplateMine.time?.map((time) => {
      const generatedDate = moment(date).format("YYYY-MM-DD");

      return {
        date: generatedDate,
        time: time,
      };
    });
    setWorkouts(generatedWorkouts);

    console.log(workouts);

    // setWorkoutTemplates(generatedWorkouts);
  }

  const getWorkouts = () => {
    return workouts?.map((workout, index) => {
      return (
        <div className="p-3" onClick={() => selectWorkout(workout)} key={index}>
          {workout.date}
          <br />
          {workout.time}
        </div>
      );
    });
  };

  function getAvailablePlaces() {
    const freeSpaces = Array.from(
      { length: selectedWorkout?.freeSpaces || 0 },
      (_, i) => i + 1
    );
    console.log(freeSpaces);
    return freeSpaces.map((freeSpace, index) => {
      return <div>dsfbgd{freeSpace}</div>;
    });
  }

  function isWeekday(date) {
    const day = date.getDay();
    return WorkoutTemplateMine.days.includes(day);
  }
  return (
    <div className="row">
      <div className="col-md-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => selectDate(date)}
          filterDate={isWeekday}
        />
        {workouts.length > 0 ? getWorkouts() : <p>No</p>}
      </div>
      <div className="col-md-8">dsc{getAvailablePlaces()}</div>
    </div>
  );
};

export default BookingPageMine;
