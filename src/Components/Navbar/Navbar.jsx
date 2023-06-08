import React, { useContext, useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrDown } from "react-icons/gr";
import { UserContext } from "../../Context/UserContext";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleEditMenu = () => {
    setShowEditMenu(!showEditMenu);
  };

  const getFullName = () => {
    return `${currentUser.firstName} ${currentUser.lastName}`;
  };
  return (
    <div className="navbar-app">
      <div className="wrapper">
        <div className="greeting">
          <p>Good Morning</p>
          <h6>Welcome Back</h6>
        </div>

        <div className="items">
          <div className="search">
            <div className="search-icon">
              <BiSearchAlt size={18} />
            </div>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="item">
            <div className="item-icon">
              {" "}
              <IoNotificationsOutline size={18} />
            </div>
          </div>
          <div className="item">
            <img
              src={currentUser.avatar}
              alt={getFullName()}
              className="avatar"
            />
            <span className="current-user">{getFullName()}</span>
            <div className="edit-menu">
              <GrDown onClick={handleEditMenu} size={15} />
              {showEditMenu && (
                <div className="edit-menu-item">
                  {" "}
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to="/edit"
                    onClick={handleEditMenu}
                  >
                    Edit Profile
                  </NavLink>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
