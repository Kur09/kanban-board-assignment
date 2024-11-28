import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import CustomSpinner from "./CustomSpinner";
import "../styles/dashboard.css"

// Import Images
import profile from "../images/emp1.png";
import profile1 from "../images/emp2.png";
import profile4 from "../images/emp3.png";
import profile5 from "../images/emp5.png";
import profile6 from "../images/emp6.png";
import profile7 from "../images/emp7.png";
// import { FETCH_URL } from "../FETCH_URL";

const FETCH_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";
const Dashboard = () => {
  
  const [userData, setUserData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const statusKeys = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
  const priorityMapping = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  const profileMapping = {
    "usr-1": profile1,
    "usr-2": profile6,
    "usr-3": profile7,
    "usr-4": profile5,
    "usr-5": profile4,
    default: profile,
  };

  useEffect(() => {
    fetchData();
  }, [grouping, ordering]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(FETCH_URL);
      const data = await response.json();

      //console.log('Fetched data:', data); 
      setUserData(data.users);
      
      setTickets(data.tickets);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupAndSortTickets = () => {
    let grouped = {};

    if (grouping === "status") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
      statusKeys.forEach((key) => (grouped[key] = grouped[key] || []));
    } else if (grouping === "priority") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = acc[ticket.priority] || [];
        acc[ticket.priority].push(ticket);
        return acc;
      }, {});
    } else if (grouping === "users") {
      grouped = tickets.reduce((acc, ticket) => {
        acc[ticket.userId] = acc[ticket.userId] || [];
        acc[ticket.userId].push(ticket);
        return acc;
      }, {});
    }

    // Sort within each group
    Object.keys(grouped).forEach((key) => {
      grouped[key] = grouped[key].sort((a, b) =>
        ordering === "title"
          ? a.title.localeCompare(b.title)
          : b.priority - a.priority
      );
    });
    //console.log('Grouped and Sorted Tickets:', grouped); 
    return grouped;
  };

  const groupedTickets = groupAndSortTickets();

  const renderGroupHeader = (key) => {
    //console.log('Group header key:', key);
    if (grouping === "status") {
      return (
        <>
          <i
            className={`bx ${
              key === "Todo"
                ? "bx-circle"
                : key === "In progress"
                ? "bx-adjust"
                : key === "Backlog"
                ? "bx-task-x"
                : key === "Done"
                ? "bxs-check-circle"
                : "bxs-x-circle"
            }`}
            id={key.toLowerCase().replace(" ", "-")}
          ></i>
          <span className="text">{key}</span>
        </>
      );
    }
    if (grouping === "priority") {
      return (
        <>
          <i
            className={`bx ${
              key === "4"
                ? "bxs-message-square-error"
                : key === "3"
                ? "bx-signal-4"
                : key === "2"
                ? "bx-signal-3"
                : key === "1"
                ? "bx-signal-2"
                : "bx-dots-horizontal-rounded"
            }`}
            id={priorityMapping[key]?.toLowerCase() || "no-priority"}
          ></i>
          <span className="text">{priorityMapping[key] || "No Priority"}</span>
        </>
      );
    }
    if (grouping === "users") {
      const user = userData.find((u) => u.id === key);
      return (
        <>
          <img
            src={profileMapping[key] || profileMapping.default}
            className="user-avatar"
            alt="user"
          />
          <span className="text">{user?.name || "Unknown"}</span>
        </>
      );
    }
  };

  return (
    <div>
      <Navbar
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />
      <div className="Dashboard-Container">
        {isLoading ? (
          <CustomSpinner />
        ) : (
          Object.keys(groupedTickets).map((key, index) => (
            <div className="column" key={index}>
              <div className="Header">
                <div className="icon-text">{renderGroupHeader(key)}</div>
                <span>{groupedTickets[key].length}</span>
              </div>
              
              {/* {groupedTickets[key].map((ticket) => (
                
                <Card
                  key={ticket.id}
                  {...ticket}
                  userData={userData}
                  grouping={grouping}
                  ordering={ordering}
                />
              ))} */}
              {groupedTickets[key].map((ticket) => (
  <div key={ticket.id}>
    {
    // console.log('Rendering ticket:', ticket)
    //console.log('Ticket passed to Card:', ticket)
    } 

    <Card
      key={ticket.id}
      ticketId={ticket.id}
      labels={ticket.tag}
      ticketTitle={ticket.title}
      assignedUserId={ticket.userId}  
      currentState={ticket.status} 
      importanceLevel={ticket.priority} 
      category={ticket.category}  
      sortOrder={ticket.sortOrder} 
      stateMapping={ticket.stateMapping}  
      userData={userData}
      grouping={grouping}
      ordering={ordering}
    />
  </div>
))}

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
