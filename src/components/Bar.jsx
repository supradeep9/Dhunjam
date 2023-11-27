import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, BarElement } from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement);

const Bars = (props) => {
  const labels = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
  ];
  const amount = props.amount;

  const { category_6, category_7, category_8, category_9, category_10 } =
    amount;

  const dynamic = [category_6, category_7, category_8, category_9, category_10];

  const options = {
    scales: {
      x: {
        grid: {
          lineWidth: 2,
          color: ["white", "none", "none", "none", "none"],
        },
      },
      y: {
        ticks: {
          display: false, // hide x-axis tick values
        },
        grid: {
          lineWidth: 2,
          color: [
            "white",
            "none",
            "none",
            "none",
            "none",
            "none",
            "none",
            "none",
            "none",
            "none",
            "none",
          ],
        },
        beginAtZero: true,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "2020 exp",
        data: dynamic,
        backgroundColor: "#F0C3F1",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={options}
      // style={{ width: "400px", height: "400px" }}
      className="Bar"
    />
  );
};

export default Bars;
