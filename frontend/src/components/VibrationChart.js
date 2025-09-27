import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VibrationChart = ({ actualData, predictedData, theme }) => {
  const allTimestamps = [
    ...actualData.map((d) => d.timestamp),
    ...predictedData.map((d) => d.timestamp),
  ];

  
  const formatTimestamp = (ts) => {
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return ts;
    }
  };

  const colors = {
    light: {
      actualLine: "#2d65ff",
      actualFill: "rgba(45, 101, 255, 0.2)",
      predictedLine: "#e4bc5d",
      predictedDash: [8, 6],
      anomaliesLine: "#8892a9",
      anomaliesFill: "#8892a9",
      legendColor: "#1e293b",
      gridColor: "#e9dde8",
      titleColor: "#1e293b",
      tickColor: "#4a5568",
      backgroundColor: "#fff",
    },
    dark: {
      actualLine: "#7c9fff",
      actualFill: "rgba(124, 159, 255, 0.3)",
      predictedLine: "#f8ca52",
      predictedDash: [8, 6],
      anomaliesLine: "#a7b7db",
      anomaliesFill: "#a7b7db",
      legendColor: "#e2e8f0",
      gridColor: "#383f54",
      titleColor: "#e2e8f0",
      tickColor: "#d1d5db",
      backgroundColor: "rgba(27, 26, 44, 0.8)",
    },
  };

  const themeColors = colors[theme] || colors.light;

  const chartData = {
    labels: allTimestamps.map(formatTimestamp),
    datasets: [
      {
        label: "Actual Vibration",
        data: allTimestamps.map((ts) => {
          const found = actualData.find((d) => d.timestamp === ts);
          return found ? found.vibration : null;
        }),
        borderColor: themeColors.actualLine,
        backgroundColor: themeColors.actualFill,
        tension: 0.3,
        fill: true,
        pointRadius: 5,
      },
      {
        label: "Predicted Vibration",
        data: allTimestamps.map((ts) => {
          const found = predictedData.find((d) => d.timestamp === ts);
          return found ? found.value : null;
        }),
        borderColor: themeColors.predictedLine,
        borderDash: themeColors.predictedDash,
        tension: 0.3,
        fill: false,
        pointRadius: 3,
      },
      {
        label: "Anomalies",
        data: allTimestamps.map((ts) => {
          const found = predictedData.find((d) => d.timestamp === ts);
          return found && found.anomaly === 1 ? found.value : null;
        }),
        borderColor: themeColors.anomaliesLine,
        backgroundColor: themeColors.anomaliesFill,
        pointRadius: 6,
        showLine: false,
      },
    ],
  };

  
  const yTicks = [];
  for (let v = 0.5; v <= 1.0; v += 0.05) {
    yTicks.push(Number(v.toFixed(2)));
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Wind Turbine Vibration",
        color: themeColors.titleColor,
        font: { family: "'Inter', sans-serif", size: 22, weight: "600" },
      },
      legend: { position: "top", labels: { color: themeColors.legendColor, font: { size: 14 } } },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Timestamp [25-09-2025]", color: themeColors.tickColor, font: { size: 14 } },
        ticks: { maxRotation: 0, minRotation: 0, color: themeColors.tickColor, maxTicksLimit: 15 }, // no rotation, keep horizontal
        grid: { color: themeColors.gridColor, borderDash: [5, 5] },
      },
      y: {
        title: { display: true, text: "Vibration", color: themeColors.tickColor, font: { size: 14 } },
        ticks: {
          color: themeColors.tickColor,
          callback: (val) => val.toFixed(2),
          values: yTicks,
          stepSize: 0.05,
          min: 0.5,
          max: 1.0,
          maxTicksLimit: yTicks.length,
        },
        grid: { color: themeColors.gridColor, borderDash: [5, 5] },
      },
    },
  };

  const containerStyle = {
    height: "40vh",
    backgroundColor: themeColors.backgroundColor,
    padding: "24px",
    borderRadius: "24px",
    boxShadow:
      theme === "light"
        ? "0 10px 24px rgb(228 210 185 / 0.3)"
        : "0 10px 24px rgb(124 159 255 / 0.6)",
    backdropFilter: theme === "dark" ? "blur(10px)" : "none",
  };

  return (
    <div style={containerStyle} id="chartContainer">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default VibrationChart;
