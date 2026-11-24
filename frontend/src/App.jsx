import UsageChart from "./components/UsageChart";
import{
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

import { sensorData, alerts } from "./data/mockdata";
import "./App.css";

function App() {
  const metrics = [
    {
      title: "Tank Level",
      value: sensorData.tankLevel,
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
      value: sensorData.flowRate,
      unit: "L/min",
      icon: Activity,
    },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2><Droplets /> Aqua Sense</h2>
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
                  <h3>{item.value} <small>{item.unit}</small></h3>
                  <p>Illustrative sensor reading</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="quality" className="panel">
          <h2>Water Quality Monitoring</h2>
          <p>pH: {sensorData.ph}</p>
          <p>TDS: {sensorData.tds} ppm</p>
          <p>Turbidity: {sensorData.turbidity} NTU</p>
          <p>Temperature: {sensorData.temperature} °C</p>
          <small>
            Screening indicators only. These readings do not certify
            drinking-water safety.
          </small>
        </section>

        <section id="management" className="panel">
          <h2>Smart Water Management</h2>
          <p>Tank level: {sensorData.tankLevel}%</p>
          <p>Current flow: {sensorData.flowRate} L/min</p>
          <p>Tank status: Normal (demo)</p>
          <p>Leak detection: Awaiting monitoring data</p>
        </section>
        <section id="analytics">
  <h2>Water Usage Analytics</h2>
  <UsageChart />
</section>

        <section id="alerts">
  <h2>Water System Alerts</h2>

  <div className="alerts-list">
    {alerts.map((alert) => (
      <div className="alert-item" key={alert.id}>
        <div>
          <h3>{alert.title}</h3>
          <p>{alert.description}</p>
        </div>

        <span className={`alert-status ${alert.type}`}>
          {alert.type === "success" ? "Normal" : "Info"}
        </span>
      </div>
    ))}
  </div>
</section>

      </main>
    </div>
  );
}

export default App;