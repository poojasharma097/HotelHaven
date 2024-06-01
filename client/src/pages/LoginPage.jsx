import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {user, setUser} = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {data} = axios.post("/login", {email, password }).then(() => {
        setUser(data);
        localStorage.setItem("authToken", data.token);
        console.log(user);
      alert("Login successful.");
      setRedirect(true);
    });
  };
  
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow items-center flex justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button className="primary" type="submit">
            Login
          </button>
          <div className="py-2 text-center text-gray-500">
            Don&rsquo;t have an account?{" "}
            <Link className="text-black underline" to={"/register"}>
              Register now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
