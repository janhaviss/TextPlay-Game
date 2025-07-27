import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/message')
  //     .then(res => setMessage(res.data.message))
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
