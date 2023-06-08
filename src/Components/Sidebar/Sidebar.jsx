import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import { SlLogout } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { SidebarData } from "./SidebarData";

import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { isLoggedIn, logout } = useContext(UserContext);
  const toggle = () => setIsOpened(!isOpened);
  const toggleDrawwer = () => setDrawerOpened(!drawerOpened);

  const handleLogout = () => {
    // Delete the token by removing the cookie
    Cookies.remove("token");
    navigate("/auth");
    logout();

    // Perform any additional logout logic, such as redirecting to the login page
  };
  return (
    <div className="sidebar-container">
      <div
        style={{ width: isOpened ? "250px" : "70px" }}
        className="sidebar-nav"
      >
        <div>
          <div className="top_section">
            <img />
            <h1
              style={{ display: isOpened ? "block" : "none" }}
              className="logo"
            >
              Pilates
            </h1>
            <div
              style={{
                marginLeft: isOpened ? "70px" : "0px",
                marginTop: isOpened ? "0px" : "12px",
              }}
              className="bars"
            >
              <HiOutlineBars3 size={25} onClick={toggle} />
            </div>
          </div>
        </div>
        <div>
          {SidebarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpened ? "block" : "none" }}
                className="link_text"
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
        <div className="nav-logout">
          <NavLink
            onClick={handleLogout}
            className="link"
            activeclassName="active"
          >
            <div className="icon">
              {" "}
              <SlLogout size={18} onClick={toggle} />
            </div>
            <div
              style={{ display: isOpened ? "block" : "none" }}
              className="link_text"
            >
              Logout
            </div>
          </NavLink>
        </div>
      </div>

      <div>
        <span className="button-drawer">
          <HiOutlineBars3 size={33} onClick={toggleDrawwer} />
        </span>
        {drawerOpened && (
          <div className="drawer" onClick={toggleDrawwer}>
            {/* Content of the mobile drawer */}
            {SidebarData.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className="link"
                activeclassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.title}</div>
              </NavLink>
            ))}
            <NavLink
              className="link"
              activeclassName="active"
              onClick={handleLogout}
            >
              <SlLogout size={18} className="icon" />
              <div className="link_text">Logout</div>
            </NavLink>
          </div>
        )}
        {/* Rest of your component */}
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
