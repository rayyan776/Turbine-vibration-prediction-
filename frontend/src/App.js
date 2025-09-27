import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import VibrationChart from "./components/VibrationChart";
import HorizonSlider from "./components/HorizonSlider";
import ExportButtons from "./components/ExportButtons";
import SummaryCards from "./components/SummaryCards";

function App() {
  const [actualData, setActualData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [horizon, setHorizon] = useState(5);
  const [theme, setTheme] = useState("light");


  const [fade, setFade] = useState(true);

  const fetchActual = useCallback(async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/vibration?limit=1000");
      setActualData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching actual data:", err);
    }
  }, []);

  const fetchPredicted = useCallback(async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/predict?horizon=${horizon}`);
      setPredictedData(res.data.predictions || []);
    } catch (err) {
      console.error("Error fetching predicted data:", err);
    }
  }, [horizon]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchActual();
      await fetchPredicted();
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [fetchActual, fetchPredicted]);

  // Disable scrolling globally
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const backgrounds = {
    light: {
      backgroundColor: "#f7f3ea",
      backgroundImage: `
        linear-gradient(90deg, rgba(228, 210, 185, 0.16) 1px, transparent 1px),
        linear-gradient(rgba(228, 210, 185, 0.16) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px",
    },
    dark: {
      backgroundColor: "#0b0c21",
      backgroundImage: `
        linear-gradient(30deg, rgba(255,0,255,0.1) 30%, transparent 30%),
        linear-gradient(60deg, rgba(0,255,255,0.1) 30%, transparent 30%),
        linear-gradient(90deg, rgba(255,0,255,0.1) 30%, transparent 30%),
        linear-gradient(120deg, rgba(0,255,255,0.1) 30%, transparent 30%)
      `,
      backgroundSize: "60px 60px",
      backgroundRepeat: "repeat",
    },
  };

  const btnStyle = {
    position: "fixed",
    top: 10,
    right: 10,
    backgroundColor: theme === "light" ? "#444" : "#f1f1f4",
    color: theme === "light" ? "#f1f1f4" : "#444",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    cursor: "pointer",
    zIndex: 1000,
  };


  const appStyle = {
    minHeight: "100vh",
    padding: "40px 24px",
    fontFamily: "'Inter', Arial, sans-serif",
    color: theme === "light" ? "#111827" : "#d1d5db",
    ...backgrounds[theme],
    backgroundAttachment: "fixed",
    overflow: "hidden",
    opacity: fade ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  const controlRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
    marginTop: "40px",
  };

  
  const toggleTheme = () => {
    setFade(false);
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setFade(true);
    }, 300);
  };

  return (
    <div style={appStyle}>
      <button style={btnStyle} onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "40px", fontWeight: "700", fontSize: "2.5rem" }}>
        Mini Digital Twin Dashboard
      </h1>

      <SummaryCards actualData={actualData} predictedData={predictedData} theme={theme} />

      <div style={{ marginTop: "40px" }}>
        <VibrationChart actualData={actualData} predictedData={predictedData} theme={theme} />
      </div>

      <div style={controlRowStyle}>
        <ExportButtons actualData={actualData} predictedData={predictedData} theme={theme} />
        <HorizonSlider horizon={horizon} setHorizon={setHorizon} theme={theme} />
      </div>
    </div>
  );
}

export default App;
