import pandas as pd
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib


DATA_PATH = r"C:\Users\rayya\OneDrive\Desktop\aero-digital-twin\backend\data\vibration_data.csv"
MODEL_PATH = r"C:\Users\rayya\OneDrive\Desktop\aero-digital-twin\backend\models\model.pkl"
ANOMALY_MODEL_PATH = r"C:\Users\rayya\OneDrive\Desktop\aero-digital-twin\backend\models\anomaly_model.pkl"


df = pd.read_csv(DATA_PATH, parse_dates=["timestamp"], dayfirst=True)
df = df.sort_values("timestamp").reset_index(drop=True)


LAGS = 3
for lag in range(1, LAGS+1):
    df[f'lag_{lag}'] = df['vibration'].shift(lag)


df.dropna(inplace=True)


X = df[[f'lag_{lag}' for lag in range(1, LAGS+1)]].values
y = df['vibration'].values


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)


regressor = RandomForestRegressor(n_estimators=100, random_state=42)
regressor.fit(X_train, y_train)


y_pred = regressor.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"RandomForest MAE: {mae:.4f}")


anomaly_model = IsolationForest(contamination=0.1, random_state=42)
anomaly_model.fit(X)


joblib.dump(regressor, MODEL_PATH)
joblib.dump(anomaly_model, ANOMALY_MODEL_PATH)

print("Models saved successfully.")