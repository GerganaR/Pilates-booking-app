import React, { useEffect } from "react";
import { FiClock, FiCalendar, FiMapPin } from "react-icons/fi";
import "./Reservation.css";
const ReservationDetails = ({ pilates }) => {
  console.log(pilates?.reservedPlaces);
  function getReservationHeader() {
    if (pilates && pilates.name) {
      return (
        <div className="row">
          <div className="pilates-title">
            <h1>{pilates?.name}</h1>
          </div>
          <div className="col-sm-3">
            <div className="pilates-info-item">
              <span>
                <FiClock size={20} />
              </span>
              <span>
                {pilates?.workoutTime}
                <br /> 30 min
              </span>
            </div>

            <div className="pilates-info-item">
              <img
                src={pilates?.trainer?.avatar}
                alt={pilates?.trainer?.firstName}
              />
              {pilates.trainer?.firstName} {pilates.trainer?.lastName}
            </div>
          </div>
          <div className="col-sm-3">
            <div className="pilates-info-item">
              <span>
                <FiCalendar size={20} />
              </span>
              <span>
                {pilates?.workoutDate} <br /> Daily Workout
              </span>
            </div>

            <div className="pilates-info-item">
              <span>
                <FiMapPin size={20} />
              </span>
              <span>{pilates?.location}</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="mb-2">Level:{pilates?.level}</div>
            <div className="mb-2">
              Booked: {pilates?.reservedPlaces?.length}
            </div>
            <div className="mb-2">Max:{pilates?.freeSpaces} </div>
          </div>
          <div className="col-sm-4">
            <div className="d-flex flex-row flex-wrap">
              {pilates?.tags?.map((tag, index) => {
                return <span className="chip">{tag}</span>;
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="pilates-title-empty">
          <h3>No available trainings.</h3>
          <p>
            Please select training from the menu to load the available mats.
          </p>
        </div>
      );
    }
  }
  useEffect(() => {}, [getReservationHeader, pilates]);
  return <div className="pilates-info">{getReservationHeader()}</div>;
};

export default ReservationDetails;
