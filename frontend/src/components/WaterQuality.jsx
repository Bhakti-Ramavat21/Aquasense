import { useState } from "react";
import {
  Activity,
  Droplets,
  Thermometer,
  Waves,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

const readings = {
  ph: 7.2,
  tds: 320,
  turbidity: 1.5,
  temperature: 26,
};

const history = {
  "24h": [
    { time: "00:00", ph: 7.1, tds: 310 },
    { time: "04:00", ph: 7.2, tds: 315 },
    { time: "08:00", ph: 7.3, tds: 318 },
    { time: "12:00", ph: 7.2, tds: 320 },
    { time: "16:00", ph: 7.1, tds: 316 },
    { time: "20:00", ph: 7.2, tds: 320 },
  ],
  "7d": [
    { time: "Mon", ph: 7.0, tds: 300 },
    { time: "Tue", ph: 7.1, tds: 310 },
    { time: "Wed", ph: 7.3, tds: 325 },
    { time: "Thu", ph: 7.2, tds: 315 },
    { time: "Fri", ph: 7.4, tds: 330 },
    { time: "Sat", ph: 7.1, tds: 318 },
    { time: "Sun", ph: 7.2, tds: 320 },
  ],
  "30d": [
    { time: "Week 1", ph: 7.0, tds: 305 },
    { time: "Week 2", ph: 7.2, tds: 315 },
    { time: "Week 3", ph: 7.3, tds: 325 },
    { time: "Week 4", ph: 7.2, tds: 320 },
  ],
};

function getStatus(value, min, max) {
  return value >= min && value <= max
    ? "Within configured range"
    : "Attention required";
}

function SensorCard({ title, value, unit, icon: Icon, min, max }) {
  const status = getStatus(value, min, max);
  const normal = status === "Within configured range";

  return (
    <div className="quality-card">
      <div className="quality-card-top">
        <span>{title}</span>
        <Icon size={22} />
      </div>

      <div className="quality-reading">
        {value}
        <small>{unit}</small>
      </div>

      <div className={normal ? "quality-status normal" : "quality-status warning"}>
        {normal ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
        {status}
      </div>
    </div>
  );
}

export default function WaterQuality() {
  const [period, setPeriod] = useState("7d");

  const selectedHistory = history[period];

  const alerts = [
    {
      name: "pH",
      value: readings.ph,
      min: 6.5,
      max: 8.5,
      unit: "",
    },
    {
      name: "TDS",
      value: readings.tds,
      min: 0,
      max: 500,
      unit: " ppm",
    },
    {
      name: "Turbidity",
      value: readings.turbidity,
      min: 0,
      max: 1,
      unit: " NTU",
    },
    {
      name: "Temperature",
      value: readings.temperature,
      min: 0,
      max: 35,
      unit: " °C",
    },
  ].filter(
    (item) => item.value < item.min || item.value > item.max
  );

  const maxTds = Math.max(...selectedHistory.map((item) => item.tds));

  return (
    <section id="quality" className="quality-page">
      <div className="quality-heading">
        <div>
          <h2>Water Quality Monitoring</h2>
          <p>Monitor and analyze water quality parameters.</p>
        </div>
        <span className="quality-demo">DEMO SENSOR DATA</span>
      </div>

      <div className="quality-grid">
        <SensorCard
          title="pH Level"
          value={readings.ph}
          unit="pH"
          icon={Droplets}
          min={6.5}
          max={8.5}
        />

        <SensorCard
          title="TDS Level"
          value={readings.tds}
          unit="ppm"
          icon={Activity}
          min={0}
          max={500}
        />

        <SensorCard
          title="Turbidity"
          value={readings.turbidity}
          unit="NTU"
          icon={Waves}
          min={0}
          max={1}
        />

        <SensorCard
          title="Temperature"
          value={readings.temperature}
          unit="°C"
          icon={Thermometer}
          min={0}
          max={35}
        />
      </div>

      <div className="quality-panel">
        <div className="quality-panel-heading">
          <div>
            <h3>Historical Readings</h3>
            <p>Illustrative sensor history</p>
          </div>

          <div className="period-buttons">
            {["24h", "7d", "30d"].map((item) => (
              <button
                key={item}
                className={period === item ? "selected" : ""}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <h4>TDS Trend (ppm)</h4>

        <div className="quality-chart">
          {selectedHistory.map((item) => (
            <div className="quality-chart-column" key={item.time}>
              <span>{item.tds}</span>
              <div className="quality-bar-track">
                <div
                  className="quality-bar"
                  style={{
                    height: `${(item.tds / maxTds) * 100}%`,
                  }}
                />
              </div>
              <small>{item.time}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="quality-panel">
        <h3>Quality Alerts</h3>

        {alerts.length === 0 ? (
          <p className="quality-empty">
            No readings have crossed the configured thresholds.
          </p>
        ) : (
          alerts.map((item) => (
            <div className="quality-alert" key={item.name}>
              <AlertTriangle size={19} />
              <div>
                <strong>{item.name} requires attention</strong>
                <p>
                  Current reading: {item.value}{item.unit}.
                  Check the configured threshold.
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="quality-note">
        <Clock size={17} />
        <p>
          Prototype thresholds are configurable. These indicators
          do not certify that water is safe to drink or detect every
          possible contaminant.
        </p>
      </div>
    </section>
  );
}