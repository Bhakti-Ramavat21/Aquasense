import { weeklyUsage } from "../data/mockdata";

export default function UsageChart() {
  const totalUsage = weeklyUsage.reduce(
    (sum, item) => sum + item.usage,
    0
  );

  const averageUsage = Math.round(
    totalUsage / weeklyUsage.length
  );

  const maxUsage = Math.max(
    ...weeklyUsage.map((item) => item.usage)
  );

  return (
    <div className="analytics-card">
      <div className="analytics-header">
        <div>
          <h3>Weekly Water Consumption</h3>
          <p>Daily water usage overview</p>
        </div>
        <span className="chart-label">Last 7 days</span>
      </div>

      <div className="usage-summary">
        <div>
          <span>Total Consumption</span>
          <h2>{totalUsage.toLocaleString()} L</h2>
        </div>

        <div>
          <span>Daily Average</span>
          <h2>{averageUsage} L</h2>
        </div>
      </div>

      <div className="usage-chart">
        {weeklyUsage.map((item) => (
          <div className="usage-column" key={item.day}>
            <span className="usage-value">
              {item.usage}
            </span>

            <div className="usage-bar-area">
              <div
                className="usage-bar"
                style={{
                  height: `${(item.usage / maxUsage) * 100}%`,
                }}
              />
            </div>

            <span className="usage-day">
              {item.day}
            </span>
          </div>
        ))}
      </div>

      <p className="chart-note">
        Demo data. Actual consumption will be received
        from the ESP32 flow sensor after integration.
      </p>
    </div>
  );
}