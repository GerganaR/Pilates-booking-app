import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size, color }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div>
      {[...Array(fullStars)].map((star, index) => (
        <FaStar color={color} key={index} size={size} />
      ))}
      {[...Array(halfStars)].map((star, index) => (
        <FaStarHalfAlt key={index} color={color} size={size} />
      ))}
      {[...Array(emptyStars)].map((star, index) => (
        <FaRegStar key={index} color={color} size={size} />
      ))}
    </div>
  );
};

export default StarRating;
