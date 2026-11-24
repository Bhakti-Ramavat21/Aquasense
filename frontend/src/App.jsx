import { useState } from "react";
import {
  Droplets,
  Gauge,
  Activity,
  Waves,
  LayoutDashboard,
  FlaskConical,
  ChartColumn,
  Bell,
  Settings,
} from "lucide-react";
import SettingsPage from "./components/Settings";
import Alerts from "./components/Alerts";
import WaterQuality from "./components/WaterQuality";
import SmartWaterManagement from "./components/SmartWaterManagement";
import UsageChart from "./components/UsageChart";
import { sensorData, alerts } from "./data/mockdata";
import "./App.css";

function App() {
  // Shared readings used by the entire dashboard
  const [tankLevel, setTankLevel] = useState(sensorData.tankLevel);
  const [flowRate, setFlowRate] = useState(sensorData.flowRate);

  const metrics = [
    {
      title: "Tank Level",
      value: tankLevel,
      unit: "%",
      icon: Gauge,
    },
    {
      title: "TDS Level",
      value: sensorData.tds,
      unit: "ppm",
      icon: Droplets,
    },
    {
      title: "Turbidity",
      value: sensorData.turbidity,
      unit: "NTU",
      icon: Waves,
    },
    {
      title: "Water Flow",
      value: flowRate.toFixed(1),
      unit: "L/min",
      icon: Activity,
    },
  ];

  // Keep tank and flow alerts synchronized with current readings
  const currentAlerts = alerts.map((alert) => {
    if (alert.id === 1) {
      const isWarning = tankLevel < 20 || tankLevel > 90;

      return {
        ...alert,
        title:
          tankLevel < 20
            ? "Low tank level"
            : tankLevel > 90
            ? "High tank level"
            : "Tank level normal",
        description: `Tank is currently ${tankLevel}% full.`,
        type: isWarning ? "warning" : "success",
      };
    }

    if (alert.id === 3) {
      return {
        ...alert,
        description: `Current flow: ${flowRate.toFixed(1)} L/min.`,
      };
    }

    return alert;
  });

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>
          <Droplets /> Aqua Sense
        </h2>
        <p className="tagline">Smart Water Guardian</p>

        <nav>
          <a href="#overview"><LayoutDashboard /> Overview</a>
          <a href="#quality"><FlaskConical /> Water Quality</a>
          <a href="#management"><Waves /> Water Management</a>
          <a href="#analytics"><ChartColumn /> Analytics</a>
          <a href="#alerts"><Bell /> Alerts</a>
          <a href="#settings"><Settings /> Settings</a>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>Water Dashboard</h1>
            <p>Monitor. Manage. Conserve.</p>
          </div>
          <span className="demo">● Demo Mode</span>
        </header>

        <section id="overview">
          <h2>System Overview</h2>

          <div className="metrics">
            {metrics.map((item) => {
              const Icon = item.icon;

              return (
                <div className="metric-card" key={item.title}>
                  <div className="metric-heading">
                    {item.title}
                    <Icon />
                  </div>

                  <h3>
                    {item.value} <small>{item.unit}</small>
                  </h3>

                  <p>Illustrative sensor reading</p>
                </div>
              );
            })}
          </div>
        </section>

        <WaterQuality />

        <SmartWaterManagement
          tankLevel={tankLevel}
          setTankLevel={setTankLevel}
          flowRate={flowRate}
          setFlowRate={setFlowRate}
        />

        <section id="analytics">
          <h2>Water Usage Analytics</h2>
          <UsageChart />
        </section>

        <Alerts />
        <SettingsPage />
      </main>
    </div>
  );
}

export default App;