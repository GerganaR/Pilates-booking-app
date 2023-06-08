import React from "react";
import { useQuery, gql } from "@apollo/client";
import TrainerCardList from "../../Components/TrainerCard/TrainerCardList";

const GET_TRAINERS = gql`
  query Query($page: Int!, $limit: Int) {
    trainers(page: $page, limit: $limit) {
      items {
        address
        age
        avatar
        createdAt
        email
        firstName
        height
        lastName
        phone
        specialization
        updatedAt
        weight
      }
      page
      totalItems
      totalPages
    }
  }
`;

const TrainersPage = () => {
  const { loading, error, data } = useQuery(GET_TRAINERS, {
    variables: { page: 1, limit: 10 },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const trainers = data?.trainers.items;
  return (
    <div style={{ padding: "20px" }}>
      <TrainerCardList instructors={trainers} />
    </div>
  );
};

export default TrainersPage;
