import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useSocketContext } from "../context/socketContext";
import Band from "../types/Band";

Chart.register(...registerables);
let myChart: Chart;

const BandChart: React.FC = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("current-bands", (bands) => {
      crearGrafica(bands);
    });
    return () => {
      socket?.off("current-bands");
    };
  }, [socket]);

  const crearGrafica = (bands: Band[]) => {
    const ctx = document.getElementById("myChart");
    if (typeof myChart !== "undefined") myChart.destroy();
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data:  bands.map((band) => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  return <canvas id="myChart" ></canvas>;
};

export default BandChart;
