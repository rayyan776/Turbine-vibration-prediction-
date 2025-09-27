🚀 Turbine Vibration Prediction Dashboard


🌟 Project Overview
  This project implements an Enhanced Mini Digital Twin Dashboard for a wind turbine, visualizing vibration data in real-time and integrating machine learning for predictive insights.
  It simulates a digital twin pipeline by providing:
    -Historical vibration data
    -Predicted future values using ML
    -Anomaly detection to highlight unusual vibration events
    -Fully interactive dashboard and exports of data and charts

⚡ Features
     -Real-time visualization of turbine vibration data
     -ML predictions for future vibration levels using Random Forest Regression
     -Slider/input to adjust the prediction horizon dynamically
     -Export options: CSV data and PNG chart snapshots
     -Anomaly detection with visual highlights on the chart using Isolation Forest

🛠 Setup Instructions
      Important: Always start the backend first.

1️⃣ Clone the Repository-
bash
cmd:- git clone https://github.com/rayyan776/Turbine-vibration-prediction-.git
cmd:- cd Turbine-vibration-prediction

2️⃣ Backend Setup-
Navigate to the backend folder:
bash
cmd:- cd backend
cmd:- Install Python dependencies:
cmd:- pip install -r requirements.txt

Train the ML and anomaly detection models:
cmd:- python train_model.py

This will:
     -Read the CSV file at backend/data/vibration_data.csv
     -Train a Random Forest Regressor for vibration prediction
     -Train an Isolation Forest for anomaly detection
     
Automatic Save models to:
backend/models/model.pkl
backend/models/anomaly_model.pkl

Start the FastAPI server:
cmd:- python -m uvicorn app.main:app --reload --port 8000

The backend API is now live at:
http://127.0.0.1:8000

Endpoints:
/vibration → Returns historical vibration data as JSON
/predict → Returns future vibration predictions; accepts query parameter steps


3️⃣ Frontend Setup-
Open a new terminal and navigate to the frontend folder:
bash
cmd:- cd frontend

Install Node.js dependencies:
cmd:- npm install chart.js react-chartjs-2 axios papaparse html2canvas

Start the React dashboard:
v npm start

The dashboard will open in your browser at:
http://localhost:3000


4️⃣ Usage
     The dashboard fetches vibration data and ML predictions every 2 seconds
     Adjust the prediction horizon using the slider/input

Export options:
      CSV: Download the currently displayed data
      PNG: Download a snapshot of the chart including predictions
      Anomalies are highlighted automatically on the chart
      

5️⃣ Quick Start Commands-
Copy-paste these commands to get everything running immediately:
bash
# Backend
cd backend
pip install -r requirements.txt
python train_model.py
python -m uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install chart.js react-chartjs-2 axios papaparse html2canvas
npm start


6️⃣ ML Model Details-
      Prediction Model: Random Forest Regressor (model.pkl)
      Anomaly Detection Model: Isolation Forest (anomaly_model.pkl)
      Both models are stored in backend/models/
      The vibration dataset vibration_data.csv should remain in backend/data/ for retraining or updating models
      Metrics: The backend logs Mean Absolute Error (MAE) for the prediction model after training
      

7️⃣ Dependencies-
           Backend:
               Python 3.x
               FastAPI
               pandas
               scikit-learn
               joblib
               uvicorn
            Frontend:
                React
                chart.js
                react-chartjs-2
                axios
                papaparse
                html2canvas

