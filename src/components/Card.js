import React from "react"
import "../styles/card.css"
import avatarDefault from "../images/emp1.png";
import avatar1 from "../images/emp2.png";
import avatar2 from "../images/emp3.png";
import avatar3 from "../images/emp5.png";
import avatar4 from "../images/emp6.png";
import avatar5 from "../images/emp7.png";

const Card = ({
  ticketId,
  ticketTitle,
  labels,
  assignedUserId,
  userList = [],
  currentState,
  importanceLevel,
  category,
  sortOrder,
  stateMapping,
}) => {

  console.log('Card props:', {
    ticketId,
    ticketTitle,
    assignedUserId,
    userList,
    currentState,
    importanceLevel,
    category,
    sortOrder,
    stateMapping,
    labels,
  });
  const assignedUser = userList.find((user) => user.id === assignedUserId);

  // Mapping for user avatars
  const avatarMapping = {
    "usr-1": avatar1,
    "usr-2": avatar4,
    "usr-3": avatar5,
    "usr-4": avatar3,
    "usr-5": avatar2,
  };

  // Mapping for task status icons
  const statusIcons = {
    "To Do": "bx bx-circle",
    "In Progress": "bx bx-adjust",
    Backlog: "bx bx-task-x",
    Done: "bx bxs-check-circle",
    Canceled: "bx bxs-x-circle",
  };

  // Mapping for priority icons
  const priorityIcons = {
    0: "bx bx-dots-horizontal-rounded",
    1: "bx bx-signal-2",
    2: "bx bx-signal-3",
    3: "bx bx-signal-4",
    4: "bx bxs-message-square-error",
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="status-indicator">
          {category === "users" || category === "priority" ? (
            <i
              className={statusIcons[stateMapping[ticketId]] || "bx bx-help-circle"}
              id={stateMapping[ticketId]?.toLowerCase().replace(" ", "-")}
            ></i>
          ) : null}
          <p>{ticketId}</p>
        </div>
        {category !== "users" && (
          <div
            className={
              assignedUser && !assignedUser.available
                ? "user-avatar-disabled"
                : "user-avatar"
            }
          >
            <img
              src={avatarMapping[assignedUserId] || avatarDefault}
              className={
                assignedUser && !assignedUser.available
                  ? "user-avatar-disabled"
                  : "user-avatar"
              }
              alt="Assigned User"
            />
          </div>
        )}
      </div>

      
      <div className="card-title">
        <p>{ticketTitle}</p>
      </div>

      <div className="card-footer">
        {category !== "priority" && (
          <div className="icon-container">
            <i className={priorityIcons[importanceLevel] || "bx bx-help-circle"}></i>
          </div>
        )}
        {labels?.map((label, idx) => (
          <div className="label-container" key={idx}>
            <div className="label-icon"></div>
            <div className="label-text">{label}</div>
          </div>
        ))}
      </div> 

    </div>
  );
};

export default Card;
