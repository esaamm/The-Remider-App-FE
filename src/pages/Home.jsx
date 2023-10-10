import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // We are setting loading and setLoading new here and not using loading and setloading of Context.Provider +nt in main.jsx coz we know that loading of Context.Provider is made related to user and this is made related to task of a user .
  const [tasks, setTasks] = useState([]); // Setting tasks to empty array [] .
  const [refresh, setRefresh] = useState(false); // It is used so that on clicking checkbox or delete button the changes appears on the screen . We set them in useEffect block .
  const { isAuthenticated } =
    useContext(Context);


  // updateHandler updates the task ie it sets isChange field from true to false or vice-versa .
  // deleteHandler deletes the task from the database .
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // This is the submitHandler callback fn for adding tasks .
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // useEffect refreshes the data . useEffect is done to show all the tasks on the same page .
  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.tasks);
        setTasks(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]); // We add refresh in the dependency list of useEffect coz whatever we add in the dep. list of useEffect calls useEffect whenever the value of that thing in dep. list of useEffect changes so whenever refresh value changes the useEffect block is called .

  if (!isAuthenticated) return <Navigate to={"/login"} />;


  return (
    <div className="container">
      <div className="login">
        <section>
          {/* This is the form for adding tasks */}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* // required means if I dont write it then if I dont fill it in the form then also form will get submitted else wont . */}
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
            {/* We r disabling loading means jb Add Task btn pr click krne k bad agr loading ho to disable this add task btn . */}
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i.key}
          />
        ))}
        {/* Put simple brackets in map function.Not curly brackets. */}
      </section>
    </div>
  );
};

export default Home;
