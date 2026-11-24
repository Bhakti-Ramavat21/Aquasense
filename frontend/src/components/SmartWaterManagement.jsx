import { useState } from "react";
import {
  Droplets,
  Waves,
  Gauge,
  Activity,
  Power,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const tankCapacity = 500;
export default function SmartWaterManagement({
  tankLevel,
  setTankLevel,
  flowRate,
  setFlowRate,
}) {
  // Pump state remains local to this demo component
  const [pumpOn, setPumpOn] = useState(true);

  const waterStored = Math.round(
    (tankLevel / 100) * tankCapacity
  );

  const possibleLeak =
    flowRate > 1 && !pumpOn;
  return (
    <section id="management" className="management-page">
      <div className="management-heading">
        <div>
          <h2>Smart Water Management</h2>
          <p>Monitor storage, consumption and water flow.</p>
        </div>

        <span className="management-demo">DEMO MODE</span>
      </div>

      <div className="management-grid">
        {/* TANK LEVEL */}
        <div className="management-card">
          <div className="management-card-heading">
            <span>Tank Water Level</span>
            <Droplets size={22} />
          </div>

          <div className="tank-visual">
            <div
              className="tank-water"
              style={{ height: `${tankLevel}%` }}
            />

            <span className="tank-percentage">
              {tankLevel}%
            </span>
          </div>

          <h3>
            {waterStored} L / {tankCapacity} L
          </h3>

          <p>Estimated water currently stored</p>

          <input
            type="range"
            min="0"
            max="100"
            value={tankLevel}
            onChange={(e) =>
              setTankLevel(Number(e.target.value))
            }
          />

          <small>Demo control: change tank level</small>
        </div>

        {/* WATER FLOW */}
        <div className="management-card">
          <div className="management-card-heading">
            <span>Water Flow Rate</span>
            <Waves size={22} />
          </div>

          <h2 className="management-big-value">
            {flowRate.toFixed(1)}
            <small> L/min</small>
          </h2>

          <p>Current illustrative flow reading</p>

          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={flowRate}
            onChange={(e) =>
              setFlowRate(Number(e.target.value))
            }
          />

          <small>Demo control: change flow rate</small>
        </div>

        {/* PUMP STATUS */}
        <div className="management-card">
          <div className="management-card-heading">
            <span>Pump Status</span>
            <Power size={22} />
          </div>

          <h2 className={pumpOn ? "pump-on" : "pump-off"}>
            {pumpOn ? "ON" : "OFF"}
          </h2>

          <p>
            {pumpOn
              ? "Pump is marked as running."
              : "Pump is marked as stopped."}
          </p>

          <button
            className="pump-button"
            onClick={() => setPumpOn(!pumpOn)}
          >
            {pumpOn
              ? "Turn Demo Pump OFF"
              : "Turn Demo Pump ON"}
          </button>

          <small>
            This changes software demo state only.
          </small>
        </div>

        {/* SYSTEM STATUS */}
        <div className="management-card">
          <div className="management-card-heading">
            <span>System Status</span>
            <Activity size={22} />
          </div>

          {tankLevel < 20 ? (
            <div className="management-warning">
              <AlertTriangle size={24} />
              <h3>Low Tank Level</h3>
              <p>Tank level is below 20%.</p>
            </div>
          ) : tankLevel > 90 ? (
            <div className="management-warning">
              <AlertTriangle size={24} />
              <h3>High Tank Level</h3>
              <p>Tank level is above 90%.</p>
            </div>
          ) : possibleLeak ? (
            <div className="management-warning">
              <AlertTriangle size={24} />
              <h3>Possible Leak</h3>
              <p>
                Flow detected while the pump is off.
              </p>
            </div>
          ) : (
            <div className="management-normal">
              <CheckCircle2 size={24} />
              <h3>Normal</h3>
              <p>
                No configured warning condition detected.
              </p>
            </div>
          )}
        </div>
      </div>
<div className="management-note">
        <Gauge size={18} />

        <p>
          Demo controls simulate sensor and pump states.
          Possible leakage is an indication for investigation,
          not confirmation of an actual leak. No physical pump
          is controlled by this interface.
        </p>
      </div>
    </section>
  );
}