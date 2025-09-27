const SummaryCards = ({ actualData, predictedData, theme }) => {
  const latestActual = actualData.length ? actualData[actualData.length - 1].vibration : "-";
  const latestPred = predictedData.length ? predictedData[predictedData.length - 1].value : "-";
  const anomalies = predictedData.filter((d) => d.anomaly === 1).length;

  const baseCardStyle = {
    flex: 1,
    padding: "24px 0",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "1.3rem",
    userSelect: "none",
    cursor: "default",
    boxShadow:
      theme === "light"
        ? "0 6px 16px rgb(228 210 185 / 0.3)"
        : "0 6px 12px rgb(150 0 255 / 0.4)",
    color: theme === "light" ? "#1e293b" : "#e2e8f0",
    position: "relative",
  };

  const accentColors = theme === "light"
    ? ["#2d65ff", "#e4bc5d", "#8892a9"]
    : ["#7c9fff", "#f8ca52", "#a7b7db"];

  const accentStyle = (color) => ({
    position: "absolute",
    left: 0,
    top: "25%",
    height: "50%",
    width: "7px",
    backgroundColor: color,
    borderRadius: "0 8px 8px 0",
  });

  return (
    <div style={{ display: "flex", gap: "24px", marginBottom: "40px" }}>
      <div style={baseCardStyle}>
        <div style={accentStyle(accentColors[0])}></div>
        Current Vibration
        <span style={{ marginTop: "4px", fontSize: "2rem", fontWeight: "700" }}>
          {latestActual}
        </span>
      </div>

      <div style={baseCardStyle}>
        <div style={accentStyle(accentColors[1])}></div>
        Latest Prediction
        <span style={{ marginTop: "4px", fontSize: "2rem", fontWeight: "700" }}>
          {latestPred !== "-" ? Number(latestPred).toFixed(2) : "-"}
        </span>

      </div>

      <div style={baseCardStyle}>
        <div style={accentStyle(accentColors[2])}></div>
        Anomalies Detected
        <span style={{ marginTop: "4px", fontSize: "2rem", fontWeight: "700" }}>{anomalies}</span>
      </div>
    </div>
  );
};

export default SummaryCards;
