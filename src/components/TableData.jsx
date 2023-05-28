import React, { useEffect, useState } from "react";
import "./TableData.css";
import Navbar from "./Navbar";

const TableData = () => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort the data
  const [searchQuery, setSearchQuery] = useState(""); // State for search the data
  const [isFiltered, setIsFiltered] = useState(false); // State for filtering the data
  const [isCardView, setIsCardView] = useState(false); // State for card view

  useEffect(() => {
    fetchData();
  }, []);

  //function to fetch the data from API
  const fetchData = async () => {
    try {
      const response = await fetch("https://coralmango.com/api/react-test");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //function to sort the data
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  //function to search the data
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setIsFiltered(true);
  };

  //function to clear the search query
  const clearSearch = () => {
    setSearchQuery("");
    setIsFiltered(false);
  };

  //function to filter the data
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortColumn === "age") {
      return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
    }
    return 0;
  });

  //function to toggle between table and card view
  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  const renderListView = () => {
    if (isCardView) {
      return (
        <div className="card-list-container">
          {sortedData.map((item, index) => (
            <div className="card" key={index}>
              <div className="avatar">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/002/400/532/non_2x/young-happy-businessman-character-avatar-wearing-business-outfit-isolated-free-vector.jpg"
                  alt="Avatar"
                />
              </div>
              <h3>{item.name}</h3>
              <p>Age: {item.age}</p>
              <p>Occupation: {item.occupation}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <table className="data-table">
          <thead>
            <tr>
              <th>
                Name
                {sortColumn === "name" && (
                  <span className={`${sortOrder === "asc" ? "asc" : "desc"}`} />
                )}
              </th>
              <th>
                Age
                {sortColumn === "age" && (
                  <span className={`${sortOrder === "asc" ? "asc" : "desc"}`} />
                )}
              </th>
              <th>Occupation</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.occupation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="table-container">
        <h1 className="heading">Fetched Data</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {isFiltered && (
          <div className="info-banner">
            You are viewing filtered results!{" "}
            <button onClick={clearSearch}>Clear filter</button>
          </div>
        )}

        <div className="button-container">
          <button onClick={() => handleSort("name")}>Sort By Name</button>
          <button onClick={() => handleSort("age")}>Sort By Age</button>
          <button onClick={toggleView}>
            {isCardView ? "Table View" : "Card View"}
          </button>
        </div>

        {renderListView()}
      </div>
    </div>
  );
};

export default TableData;
