import { useState } from "react";
import Login from "./Login";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    setUsername("")
    setPassword("")
    const user = {
      username,
      password,
    };

    fetch("http://localhost:4001/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => console.log(res))
      .then((data) => console.log(data));
  }

  return (
    <div className="App">
      <h2>Register</h2>
      <label>Användarnamn</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Lösenord</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Registrera användare</button>

      <Login />
    </div>
  );
}

export default App;
