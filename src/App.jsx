import { useState } from "react";

import Student from "./pages/Student";
import Merchant from "./pages/Merchant";

function App() {

  const [role, setRole] = useState("");

  if (role === "student") {
    return <Student goHome={() => setRole("")} />;
  }

  if (role === "merchant") {
    return <Merchant goHome={() => setRole("")} />;
  }

  return (
    <div className="landing">

      <h1>🍽 Smart Canteen</h1>

      <p>Queue-Free Ordering System</p>

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