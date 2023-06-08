import React from "react";
import { BiTime, BiCalendar, BiChevronRight } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";
import "./Reservation.css";
const DatePickerListItem = ({ workout, selectWorkout }) => {
  return (
    <div className="list-item" onClick={() => selectWorkout(workout)}>
      <div className="list-item-name">
        <h2>{workout.name}</h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="list-item-details">
            <p>
              {" "}
              <span>
                <BiTime />
              </span>{" "}
              {workout.date}
            </p>
            <p>
              <span>
                <BiCalendar />
              </span>{" "}
              {workout.time}
            </p>
          </div>
        </div>
        {/* <div className="col-md-6">
          <div className="list-item-button">
            <div
              className="btn btn-primary"
              // style={{ backgroundColor: "#6985ed" }}
            >
              Reserve
              <span>
                <BsChevronRight />
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DatePickerListItem;
