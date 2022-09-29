import "./assets/reset.css";
import "./assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Map from "./components/Map";
import NewPost from "./components/NewPost";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("userdata")
      ? JSON.parse(localStorage.getItem("userdata"))
      : null
  );
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Map />} />
          <Route path="add" element={<NewPost />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
