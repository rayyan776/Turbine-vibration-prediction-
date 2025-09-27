from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import numpy as np
from datetime import timedelta

app = FastAPI(title="Mini Digital Twin Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


DATA_PATH = r"C:\Users\rayya\OneDrive\Desktop\aero-digital-twin\backend\data\vibration_data.csv"
MODEL_PATH = r"C:\Users\rayya\OneDrive\Desktop\aero-digital-twin\backend\models\model.pkl"
ANOMALY_MODEL_PATH = r"C:\Users\rayya\OneDrive\Desktop\aero-digital-twin\backend\models\anomaly_model.pkl"


df = pd.read_csv(DATA_PATH, parse_dates=["timestamp"])
df = df.sort_values("timestamp").reset_index(drop=True)


regressor = joblib.load(MODEL_PATH)
anomaly_model = joblib.load(ANOMALY_MODEL_PATH)

LAGS = 3  

@app.get("/vibration")
def get_vibration(limit: int = Query(1000, ge=1)):
    return {"data": df.tail(limit).to_dict(orient="records")}

@app.get("/predict")
def predict(horizon: int = Query(5, ge=1)):
    
    last_values = df['vibration'].values[-LAGS:].tolist()
    last_timestamp = df['timestamp'].values[-1]

    predictions = []

    for i in range(horizon):
        X_input = np.array(last_values[-LAGS:]).reshape(1, -1)
        pred = regressor.predict(X_input)[0]

        
        next_timestamp = pd.to_datetime(last_timestamp) + timedelta(minutes=1)
        last_timestamp = next_timestamp

        
        anomaly_flag = int(anomaly_model.predict(X_input)[0] == -1)

        predictions.append({
            "timestamp": next_timestamp.isoformat(),
            "value": float(pred),
            "anomaly": anomaly_flag
        })

        
        last_values.append(pred)

    return {"predictions": predictions}