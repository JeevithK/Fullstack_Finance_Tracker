import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Editrecord from "./pages/recordedit";
import Deleterecord from "./pages/recorddelete";
import Header from "./components/header";
import { useState } from "react";
import Register from "./auth/register";
import Login from "./auth/login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editrecord/:id" element={<Editrecord />} />
        <Route path="/deleterecord/:id" element={<Deleterecord />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
