import Papa from "papaparse";
import html2canvas from "html2canvas";

const ExportButtons = ({ actualData, predictedData, theme }) => {
  const exportCSV = () => {
    const combined = actualData.map((d, i) => ({
      timestamp: d.timestamp,
      vibration: d.vibration,
      predicted: predictedData[i] ? predictedData[i].value : "",
      anomaly: predictedData[i] ? predictedData[i].anomaly : "",
    }));
    const csv = Papa.unparse(combined);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "vibration_data.csv";
    link.click();
  };

  const exportPNG = () => {
    html2canvas(document.querySelector("#chartContainer")).then((canvas) => {
      const link = document.createElement("a");
      link.download = "vibration_chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const btnStyle = {
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1.1rem",
    padding: "12px 26px",
    userSelect: "none",
    boxShadow:
      theme === "light"
        ? "0 10px 20px rgba(46, 104, 255, 0.3)"
        : "0 10px 20px rgba(124, 159, 255, 0.6)",
    backgroundColor: theme === "light" ? "#2d65ff" : "#7c9fff",
    color: "#fff",
    marginRight: "10px",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <button onClick={exportCSV} style={btnStyle}>
        Export CSV
      </button>
      <button onClick={exportPNG} style={btnStyle}>
        Export PNG
      </button>
    </>
  );
};

export default ExportButtons;
