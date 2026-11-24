import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Droplets,
  Activity,
  Waves,
  Filter,
  CheckCheck,
} from "lucide-react";

const initialAlerts = [
  {
    id: 1,
    title: "Tank Level Normal",
    message: "Tank is currently 72% full.",
    category: "Tank",
    severity: "success",
    time: "Just now",
  },
  {
    id: 2,
    title: "Water Quality Reading",
    message: "Turbidity is currently 1.5 NTU.",
    category: "Water Quality",
    severity: "info",
    time: "2 min ago",
  },
  {
    id: 3,
    title: "Flow Monitoring Active",
    message: "Current water flow is 2.4 L/min.",
    category: "Flow",
    severity: "info",
    time: "5 min ago",
  },
];

const icons = {
  Tank: Droplets,
  "Water Quality": Waves,
  Flow: Activity,
};

export default function Alerts() {
  const [filter, setFilter] = useState("All");
  const [alertList, setAlertList] = useState(initialAlerts);

  const filteredAlerts =
    filter === "All"
      ? alertList
      : alertList.filter((alert) => alert.severity === filter);

  const unreadCount = alertList.filter(
    (alert) => !alert.read && alert.severity !== "success"
  ).length;

  const markAllRead = () => {
    setAlertList((previous) =>
      previous.map((alert) => ({ ...alert, read: true }))
    );
  };

  return (
    <section className="alerts-page" id="alerts">
      <div className="alerts-header">
        <div>
          <h2>System Alerts</h2>
          <p>Monitor important events from your water system.</p>
        </div>

        <div className="alert-count">
          <Bell size={18} />
          {unreadCount} Unread
        </div>
      </div>

      <div className="alert-summary">
        <div className="alert-summary-card">
          <AlertTriangle />
          <div>
            <h3>{alertList.filter(a => a.severity === "warning" || a.severity === "critical").length}</h3>
            <p>Warnings</p>
          </div>
        </div>

        <div className="alert-summary-card">
          <Info />
          <div>
            <h3>{alertList.filter(a => a.severity === "info").length}</h3>
            <p>Information</p>
          </div>
        </div>

        <div className="alert-summary-card">
          <CheckCircle />
          <div>
            <h3>{alertList.filter(a => a.severity === "success").length}</h3>
            <p>Normal Status</p>
          </div>
        </div>
      </div>

      <div className="alerts-toolbar">
        <div className="filter-label">
          <Filter size={17} />
          Filter alerts
        </div>

        <div className="alert-filters">
          {["All", "critical", "warning", "info", "success"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item === "All"
                ? "All"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <button className="mark-read-btn" onClick={markAllRead}>
          <CheckCheck size={16} />
          Mark all read
        </button>
      </div>

      <div className="alerts-list">
        {filteredAlerts.length === 0 ? (
          <div className="no-alerts">
            <CheckCircle size={30} />
            <h3>No alerts in this category</h3>
            <p>Everything is clear for this filter.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = icons[alert.category] || Bell;

            return (
              <div
                className={`alert-card ${alert.severity} ${
                  alert.read ? "read" : "unread"
                }`}
                key={alert.id}
              >
                <div className="alert-icon">
                  <Icon size={21} />
                </div>

                <div className="alert-content">
                  <div className="alert-title-row">
                    <h3>{alert.title}</h3>
                    <span className={`severity-tag ${alert.severity}`}>
                      {alert.severity}
                    </span>
                  </div>

                  <p>{alert.message}</p>

                  <span className="alert-time">{alert.time}</span>
                </div>

                {!alert.read && (
                  <button
                    className="read-btn"
                    onClick={() =>
                      setAlertList((previous) =>
                        previous.map((item) =>
                          item.id === alert.id
                            ? { ...item, read: true }
                            : item
                        )
                      )
                    }
                  >
                    Mark read
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <p className="demo-alert-note">
        Demo mode: These alerts use simulated sensor readings.
        Real sensor-based alerts will be available after hardware integration.
      </p>
    </section>
  );
}