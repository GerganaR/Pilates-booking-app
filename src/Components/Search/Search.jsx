import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./Search.css";
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div class="form-outline mb-3 search-input">
      <span className="search-input-icon">
        <BiSearchAlt size={18} />
      </span>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by all..."
        type="text"
        id="typeText"
        class="form-control"
      />
    </div>
  );
};

export default Search;
