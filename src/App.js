import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from './components/EmptyBoard';
import boardsSlice from "./redux/projectSlice";

import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Clips from './pages/Clips';

function App() {

  const dispatch = useDispatch();

  return (
 

<Router>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route element={<Layout  />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/kanbanboard" element={<KanbanBoard />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/team" element={<Team />} />
    {/* <Route path="/clips" element={<Clips />} /> */}
  </Route>
</Routes>
</Router>
  
  );
}

export default App;
