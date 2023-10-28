import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/register", { name, email, password }).then((response) => {
      console.log(response);
      alert("Registration successful. Now you can log in.");
    });
  };

  // function registerUser(event) {
  //   event.preventDefault();
  //   axios.post('/register', {name,email,password}.then(response => {console.log(response);}));
  // }
  return (
    <div className="mt-4 grow items-center flex justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button className="primary" type="submit">
            Register
          </button>
          <div className="py-2 text-center text-gray-500">
            Already have an account?{" "}
            <Link className="text-black underline" to={"/login"}>
              Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
