import React, { useState } from "react";
import MemberList from "../../Components/MemberList/MemberList";
import { gql, useQuery } from "@apollo/client";

import { members } from "../../data";
import Search from "../../Components/Search/Search";
import "./MembersPage.css";

const GET_USERS = gql`
  query Users($page: Int!, $limit: Int) {
    users(page: $page, limit: $limit) {
      items {
        _id
        firstName
        lastName
        email
        password
        avatar
        age
        address
        phone
        roles
        createdAt
      }
      page
      totalItems
      totalPages
    }
  }
`;
const MembersPage = () => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { page: 1, limit: 10 },
  });

  console.log(data?.users.items);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data?.users.items.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.age.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="main-wrapper">
      <div className="page-search">
        <div className="page-header">
          {" "}
          <h2>See all members</h2>
          <p>
            Filter all members by their categories. See more information about
            them.
          </p>
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {!loading && <MemberList members={filteredData} />}
    </div>
  );
};

export default MembersPage;
