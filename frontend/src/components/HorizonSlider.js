const HorizonSlider = ({ horizon, setHorizon, theme }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };
  const labelStyle = {
    fontWeight: "600",
    color: theme === "light" ? "#111827" : "#d1d5db",
    userSelect: "none",
    whiteSpace: "nowrap",
    fontSize: "1.15rem",
  };

  const sliderStyle = {
    verticalAlign: "middle",
    accentColor: theme === "light" ? "#2d65ff" : "#7c9fff",
    width: "240px",
    cursor: "pointer",
    height: "6px",
    borderRadius: "10px",
    marginLeft: "12px",
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>Prediction Horizon: {horizon} steps</label>
      <input
        type="range"
        min="1"
        max="20"
        value={horizon}
        onChange={(e) => setHorizon(Number(e.target.value))}
        style={sliderStyle}
      />
    </div>
  );
};

export default HorizonSlider;
