import { useState } from "react";
import {
  SlidersHorizontal,
  Bell,
  Cpu,
  Database,
  Info,
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    lowTank: 20,
    highTank: 90,
    maxTurbidity: 5,
    minPH: 6.5,
    maxPH: 8.5,
    notifications: true,
    lowTankAlert: true,
    qualityAlert: true,
    demoMode: true,
    refreshInterval: "5",
  });

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <section className="settings-page" id="settings">
      <h2>System Settings</h2>
      <p>Configure your Aqua Sense monitoring system.</p>

      <div className="settings-panel">
        <h3><SlidersHorizontal /> Monitoring Thresholds</h3>

        <label>Low Tank Level Alert (%)</label>
        <input
          type="number"
          value={settings.lowTank}
          onChange={(e) => updateSetting("lowTank", e.target.value)}
        />

        <label>High Tank Level Alert (%)</label>
        <input
          type="number"
          value={settings.highTank}
          onChange={(e) => updateSetting("highTank", e.target.value)}
        />

        <label>Maximum Turbidity (NTU)</label>
        <input
          type="number"
          step="0.1"
          value={settings.maxTurbidity}
          onChange={(e) => updateSetting("maxTurbidity", e.target.value)}
        />

        <label>Minimum pH</label>
        <input
          type="number"
          step="0.1"
          value={settings.minPH}
          onChange={(e) => updateSetting("minPH", e.target.value)}
        />

        <label>Maximum pH</label>
        <input
          type="number"
          step="0.1"
          value={settings.maxPH}
          onChange={(e) => updateSetting("maxPH", e.target.value)}
        />
      </div>

      <div className="settings-panel">
        <h3><Bell /> Notifications</h3>

        <label className="setting-toggle">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateSetting("notifications", e.target.checked)}
          />
          Enable notifications
        </label>

        <label className="setting-toggle">
          <input
            type="checkbox"
            checked={settings.lowTankAlert}
            onChange={(e) => updateSetting("lowTankAlert", e.target.checked)}
          />
          Tank level alerts
        </label>

        <label className="setting-toggle">
          <input
            type="checkbox"
            checked={settings.qualityAlert}
            onChange={(e) => updateSetting("qualityAlert", e.target.checked)}
          />
          Water quality alerts
        </label>
      </div>

      <div className="settings-panel">
        <h3><Cpu /> Sensor Configuration</h3>
        <p>pH, TDS, turbidity and temperature sensors</p>
        <p className="settings-note">
          Demo mode: Simulated readings. Hardware connection pending.
        </p>
      </div>

      <div className="settings-panel">
        <h3><Database /> Data and System</h3>

        <label>Data Refresh Interval</label>
        <select
          value={settings.refreshInterval}
          onChange={(e) => updateSetting("refreshInterval", e.target.value)}
        >
          <option value="2">2 seconds</option>
          <option value="5">5 seconds</option>
          <option value="10">10 seconds</option>
          <option value="30">30 seconds</option>
        </select>

        <label className="setting-toggle">
          <input
            type="checkbox"
            checked={settings.demoMode}
            onChange={(e) => updateSetting("demoMode", e.target.checked)}
          />
          Demo mode
        </label>
      </div>

      <div className="settings-panel">
        <h3><Info /> About Aqua Sense</h3>
        <p>Smart Water Guardian</p>
        <p>Version 1.0.0</p>
        <p>Water monitoring and management dashboard.</p>
      </div>
    </section>
  );
}