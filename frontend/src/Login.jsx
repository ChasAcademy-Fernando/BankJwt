import { useState } from "react";

let myToken;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userAcc, setUserAcc] = useState("")

  function handleLogin() {
    setUsername("")
    setPassword("")
    const user = {
      username,
      password,
    };

    fetch("http://localhost:4001/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    setUserAcc("")
    fetch("http://localhost:4001/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.userAcc[0].money);
        setUserAcc(data.userAcc[0].money)
        
      });
  }

  return (
    <div className="App">
      <h2>Login</h2>
      <label>Användarnamn</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Lösenord</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Logga in</button>

      <div>
        <br />
        <br />
        <button onClick={handleGetAccount}>Get account</button>
        <div>
        {userAcc ? (
          <div>
            You have {userAcc} dollars in your account.
          </div>
        ):(null)}
          </div>
      </div>
    </div>
  );
}

export default Login;
