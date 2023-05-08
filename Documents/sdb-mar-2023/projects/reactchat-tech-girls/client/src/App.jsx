import './App.css';
import React, { useState, useEffect } from "react";
import Auth from './components/Auth/Auth';
import Footer from './components/Footer';
//import Header from './components/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RoomEdit from "./components/Room/RoomEdit";
import RoomIndex from "./components/Room/RoomIndex";
//import Login from './components/Auth/Login';
import Navbar from './components/Navbar';



function App() {
  // useState variables
 const [token, setToken] = useState("");
 const navigate = useNavigate();
  // uef keyboard shourtcut for useEffect snippit
  useEffect(() => {
    // If we have something in our local storage then lets update our State Variable so other components can use it.
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  function updateToken(newToken) {
    // update the state of token
    setToken(newToken);
    // update the localStorage with the new token
    localStorage.setItem("token", newToken);
  }

  function clearToken() {
    // Clear local storage
    localStorage.clear();
    // Set the token to be blank
    setToken("");
    // Navigate to the "/"
    navigate("/");

  }

  return (
    <div>
       {/*<Header/>*/}
       <Navbar token={token} clearToken={clearToken}/>
       
       <Routes>
           {/*<Route path="/" element={<Login updateToken={updateToken} />}/>*/}
         <Route path="/" element={<Auth updateToken={updateToken} />}/> 
          <Route path="/room" element={<RoomIndex token={token} />}/>
          <Route path="/update/:id" element={<RoomEdit token={token} />}/>

        </Routes>
      <Footer />
    </div>
  );
}

export default App;