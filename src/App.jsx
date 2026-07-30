import { useState } from "react";

import Student from "./pages/Student";
import Merchant from "./pages/Merchant";

function App() {

  const [role, setRole] = useState("");

  if (role === "student") {
    return <Student />;
  }

  if (role === "merchant") {
    return <Merchant />;
  }

  return (
    <div className="landing">

      <h1>🍽 Smart Canteen</h1>

      <h2>Queue-Free Ordering System</h2>

      <button
        className="role-btn"
        onClick={() => setRole("student")}
      >
        👨‍🎓 Student
      </button>

      <button
        className="role-btn"
        onClick={() => setRole("merchant")}
      >
        🧑‍🍳 Merchant
      </button>

    </div>
  );

}

export default App;