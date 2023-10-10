import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  console.log(isAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    // Prevents reloading of form on its submission . Otherwise as the form submit button is pressed , the form reloads and the info entered in the form fields gets vanished .
    console.log(email, password);

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // If it is set false then cookie wont occur .
        }
      );

      toast.success(data.message); // Successfully Registered msg is displayed on successful regd due to this toast.success.The msg is +nt in data.message .
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message); // If any error occurs then this msg is displayed .
      setIsAuthenticated(false);
      //   console.log(error);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className="login">
      <section>
        <form disabled={loading} onSubmit={submitHandler}>
          {/* // required means if I dont write it then if I dont fill it in the form then also form will get submitted else wont . */}

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
