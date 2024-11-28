import React, { useState, useRef, useEffect } from "react";
import "../styles/navbar.css"

const Navbar = ({ grouping: propGrouping, setGrouping, ordering: propOrdering, setOrdering, fetchData }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Initialize state with local storage or props
  const [grouping, updateGrouping] = useState(() => localStorage.getItem("grouping") || propGrouping);
  const [ordering, updateOrdering] = useState(() => localStorage.getItem("ordering") || propOrdering);

  // Sync grouping state with props and local storage
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    setGrouping(grouping);
  }, [grouping, setGrouping]);

  // Sync ordering state with props and local storage
  useEffect(() => {
    localStorage.setItem("ordering", ordering);
    setOrdering(ordering);
  }, [ordering, setOrdering]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Handle changes to grouping
  const onGroupingChange = (event) => {
    const newGrouping = event.target.value;
    updateGrouping(newGrouping);
    // if (newGrouping === "users") {
    //   fetchData(); // Fetch additional data if grouping by users
    // }
  };

  // Handle changes to ordering
  const onOrderingChange = (event) => {
    updateOrdering(event.target.value);
  };

  return (
    <div className="navbar">
      <div className="dropdown-container" ref={dropdownRef}>
        <button onClick={() => setDropdownOpen((prev) => !prev)} className="dropdown-btn">
          <i className="bx bx-slider"></i>
          <span className="btn-text">Display</span>
          <i className={`bx ${isDropdownOpen ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div className="grouping-section">
              <label htmlFor="grouping-select">Grouping</label>
              <select
                id="grouping-select"
                value={grouping}
                onChange={onGroupingChange}
              >
                <option value="status">Status</option>
                <option value="users">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="ordering-section">
              <label htmlFor="ordering-select">Ordering</label>
              <select
                id="ordering-select"
                value={ordering}
                onChange={onOrderingChange}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
