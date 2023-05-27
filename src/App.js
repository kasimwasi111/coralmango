import React, { useState } from "react";
import Login from "./components/Login";
import TableData from "./components/TableData";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>{!isLoggedIn ? <Login onLogin={handleLogin} /> : <TableData />}</div>
  );
};

export default App;
