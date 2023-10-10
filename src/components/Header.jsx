import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../main";

const Header = () => {
  // const data = useContext(Context) ;
  // console.log(data);
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  console.log(isAuthenticated);

  const logoutHandler = async () => {
    setLoading(true);
    try {
       await axios.get(`${server}/users/logout`, {
        withCredentials: true, // If it is set false then cookie wont occur .
      });

      toast.success("Logged Out Successfully"); // Successfully Registered msg is displayed on successful regd due to this toast.success.The msg is +nt in data.message .
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message); // If any error occurs then this msg is displayed .
      setIsAuthenticated(true);
      //   console.log(error);
      setLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>The Reminder App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>

        {isAuthenticated ? (
          <button className="btn" disabled={loading} onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

//  {/* If isAuthenticated is true then Logout is visible else Login is visible. */}

export default Header;
