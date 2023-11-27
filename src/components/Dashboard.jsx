import React, { useEffect, useState, useContext } from "react";
import Bar from "./Bar";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { userContext } from "../App";

const Dashboard = () => {
  const [chargable, setChargable] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [counter, setCounter] = useState(1);
  const [data, setData] = useState({
    amount: {
      category_6: "",
      category_7: "",
      category_8: " ",
      category_9: " ",
      category_10: " ",
    },
  });
  const [state, dispatch] = useContext(userContext);
  const [temp, setTemp] = useState("Checking The Details");

  function handleClick(e) {
    setData((prev) => {
      return {
        amount: {
          ...prev.amount,
          [e.target.name]: e.target.value,
        },
      };
    });
  }

  useEffect(() => {
    const Fetch = async (URL) => {
      const response = await fetch(URL);
      const datas = await response.json();
      console.log(datas);

      setData(() => {
        return {
          amount: datas.data.amount,
        };
      });

      setChargable(() => {
        return datas.data.charge_customers;
      });
      setName(() => {
        return datas.data.name;
      });
      setLocation(() => {
        return datas.data.location;
      });
    };

    if (state?.data?.id) {
      Fetch(`https://stg.dhunjam.in/account/admin/${state?.data?.id}`);
    }

    setTimeout(() => setTemp("Please Login"), 1000);
  }, [state]);

  useEffect(() => {
    if (counter != 1) {
      fetch(`https://stg.dhunjam.in/account/admin/${state?.data?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => console.log(result));
    }
  }, [counter]);
  //console.log(data);

  const { amount } = data;
  const { category_6, category_7, category_8, category_9, category_10 } =
    amount;

  console.log(state?.data?.id);
  const [input, setInput] = useState(chargable ? chargable : 0);
  const inputHandler = (event) => {
    console.log("innn");
    setInput(event.target.value);
    setChargable(() => {
      if (event.target.value == "Yes") {
        return true;
      } else if ((event.target.value = "No")) {
        return false;
      }
    });
  };

  const inputstyle = {
    backgroundColor: chargable == true ?? "#c2c2c2",
  };
  return (
    <>
      <div>
        {state?.data?.id ? (
          <div className="Dashboard-section">
            <h1 className="Dashboard-heading">
              {name ? name : ""}, {location ? location : ""}
            </h1>
            <div className="Dashboard-input-container">
              <div className="div1">
                <span className="wrap">
                  Do you want to charge your customers for requesting songs:
                </span>
                <input
                  type="radio"
                  name="radio"
                  className="yes"
                  value="Yes"
                  checked={(chargable ? true : false) || input == "Yes"}
                  onChange={(e) => inputHandler(e)}
                  style={{
                    accentColor: chargable == true ? "#6741D9" : "white",
                  }}
                />
                <span> Yes</span>
                <input
                  type="radio"
                  name="radio"
                  value="No"
                  checked={(chargable ? false : true) || input == "No"}
                  onChange={(e) => inputHandler(e)}
                  style={{
                    accentColor: chargable == true ? "#6741D9" : "none",
                  }}
                />{" "}
                &nbsp;
                <span>No</span>
              </div>
              <div className="div2">
                <span className="diffspan">Custom song request amount:</span>
                <input
                  type="text"
                  name="category_6"
                  placeholder="6"
                  onChange={(e) => handleClick(e)}
                  value={data.amount.category_6}
                  id="category_6"
                  className="category_6"
                  autoComplete="off"
                  disabled={chargable == true ? false : true}
                />
              </div>
              <div className="div3">
                <span className="wrap special">
                  Regular song request amount,from high to low:
                </span>

                <input
                  type="text"
                  name="category_7"
                  placeholder="7"
                  value={data.amount.category_7}
                  onChange={(e) => handleClick(e)}
                  className="category_7"
                  autoComplete="off"
                  disabled={chargable == true ? false : true}
                />

                <input
                  type="text"
                  name="category_8"
                  placeholder="8"
                  value={data.amount.category_8}
                  onChange={(e) => handleClick(e)}
                  className="category_8"
                  autoComplete="off"
                  disabled={chargable == true ? false : true}
                />
                <input
                  type="text"
                  name="category_9"
                  placeholder="9"
                  value={data.amount.category_9}
                  onChange={(e) => handleClick(e)}
                  className="category_9"
                  autoComplete="off"
                  disabled={chargable == true ? false : true}
                />
                <input
                  type="text"
                  name="category_10"
                  placeholder="10"
                  value={data.amount.category_10}
                  onChange={(e) => handleClick(e)}
                  className="category_10"
                  autoComplete="off"
                  disabled={chargable == true ? false : true}
                />
              </div>{" "}
            </div>

            <div className="Dashboard-bar">
              {chargable == true ? <Bar amount={amount} /> : ""}

              <button
                onClick={() => setCounter(counter + 1)}
                disabled={
                  category_6 < 99 ||
                  category_7 < 79 ||
                  category_8 < 59 ||
                  category_9 < 39 ||
                  category_10 < 19
                }
                className="Dashboard-button"
              >
                {" "}
                save{" "}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Loading temp={temp} />{" "}
          </div>
        )}
      </div>
    </>
  );
};

const Loading = ({ temp }) => {
  const navigate = useNavigate();
  return <div className="route">{temp}</div>;
};

export default Dashboard;

{
  /* <div>
          <label htmlFor="">check the box:</label>
          <input type="radio" name="radio" />
          <span> Yes</span>
          <input type="radio" name="radio" />
          <span>No</span>
        </div>
        <div>
          <label htmlFor="category_6">whars the cost :</label>
          <input
            type="text"
            name="category_6"
            placeholder="6"
            onChange={(e) => handleClick(e)}
            value={data.amount.category_6}
            id="category_6"
          />
        </div>

        <div>
          <label htmlFor="category_6">whars the cost :</label>
          <input
            type="text"
            name="category_7"
            placeholder="7"
            value={data.amount.category_7}
            onChange={(e) => handleClick(e)}
          />
        </div>

        <div>
          <label htmlFor="category_6">whars the cost :</label>
          <input
            type="text"
            name="category_8"
            placeholder="8"
            value={data.amount.category_8}
            onChange={(e) => handleClick(e)}
          />
          <input
            type="text"
            name="category_9"
            placeholder="9"
            value={data.amount.category_9}
            onChange={(e) => handleClick(e)}
          />
          <input
            type="text"
            name="category_10"
            placeholder="10"
            value={data.amount.category_10}
            onChange={(e) => handleClick(e)}
          />
        </div > */
}

{
}
