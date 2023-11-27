import React, { useReducer, useEffect, useState, useContext } from "react";
import "./parent.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Login = () => {
  const [state, dispatch] = useContext(userContext);
  const navigate = useNavigate();

  const [id, setID] = useState(8);
  const [buttonClicked, setButton] = useState(0);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  // const [userVerifiedData, setUserVerifiedData] = useState(false);

  useEffect(() => {
    if (buttonClicked != 0) {
      fetch("https://stg.dhunjam.in/account/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((datas) => dispatch({ type: "save-id", payload: datas }));
    }
  }, [buttonClicked]);

  return (
    <section className="Login-section">
      <div className="Login-parent">
        <h1 className="Login-heading"> Venue Admin Login </h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          autoComplete="off"
          className="Login-input"
          onChange={(e) => {
            setUserData((prev) => {
              return {
                ...prev,
                username: e.target.value,
              };
            });
          }}
          value={userData.username}
        />
        <input
          type="password"
          name="username"
          placeholder="password"
          className="Login-input"
          onChange={(e) => {
            setUserData((prev) => {
              return {
                ...prev,
                password: e.target.value,
              };
            });
          }}
          value={userData.password}
        />
        <button
          className="Login-button"
          onClick={() => {
            setButton(buttonClicked + 1);
            if (
              userData.username == "DJ@4" &&
              userData.password == "Dhunjam@2023"
            ) {
              setTimeout(() => navigate("./dashboard"), 0);
            } else {
            }
            console.log("button click");
          }}
          disabled={
            !(
              userData.username == "DJ@4" && userData.password == "Dhunjam@2023"
            )
          }
        >
          sign in
        </button>
      </div>
    </section>
  );
};

export default Login;
