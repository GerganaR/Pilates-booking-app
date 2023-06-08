import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import StarRating from "./StarRating";

import "./TrainerCard.css";

const TrainerCardListItem = ({
  firstName,
  lastName,
  specialization,
  height,
  weight,
  age,
  email,
  address,
  phone,
  avatar,
}) => {
  const getFullName = () => {
    const fullName = `${firstName}  ${lastName}`;
    return fullName;
  };
  return (
    <div className="trainer-card-wrapper">
      <div className="row">
        <div className="col-md-5">
          {" "}
          <div className="trainer-name">
            <img
              alt={getFullName()}
              style={{ width: "70px", height: "70px" }}
              src={avatar}
            />
            <StarRating rating={3} color={"#6884ED"} size={16} />
            <h3>{getFullName()}</h3>

            <span className="trainer-chip">{specialization}</span>
          </div>
        </div>
        <div className="col-md-7">
          <div className="trainer-info">
            <div className="trainer-body">
              <div className="trainer-body-item">
                <span>{weight}</span>
                <p>Weight</p>
              </div>
              <div className="trainer-body-item">
                {" "}
                <span>{height}</span>
                <p>Height</p>
              </div>
              <div className="trainer-body-item">
                {" "}
                <span>{age}</span>
                <p>Age</p>
              </div>
            </div>
            <div className="trainer-contact">
              <div className="trainer-contact-item">
                <span>
                  <IoLocationSharp />
                </span>
                {address}
              </div>
              <div className="trainer-contact-item">
                <span>
                  <BsFillTelephoneFill />
                </span>
                {phone}
              </div>
              <div className="trainer-contact-item">
                <span>
                  <MdEmail />
                </span>
                {email}
              </div>
            </div>
            <div className="trainer-options"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCardListItem;
