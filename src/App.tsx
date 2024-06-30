import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReservationForm from "./components/ReservationForm/ReservationForm";
import Rooms from "./pages/Rooms";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import HomeContent from "./pages/Home/HomeContent";
import PaymentForm from "./components/PaymentForm";
import RegisterForm from "./pages/Auth/register";
import UserInfo from "./pages/User/UserProfile";
import LoginPage from "./pages/Auth/login";
import Bookings from "./pages/Admin/Bookings";
import Accommodations from "./pages/Admin/Accommodations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<HomeContent />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="user-info" element={<UserInfo />} />
        <Route path="admin" element={<Admin />} />
        <Route path="admin/bookings" element={<Bookings />} />
        <Route path="admin/rooms" element={<Accommodations />} />
      </Route>
      <Route path="/reservation-form" element={<ReservationForm />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
