export const sensorData = {
  tankLevel: 72,
  tds: 320,
  turbidity: 1.5,
  flowRate: 2.4,
  temperature: 26,
  ph: 7.2,
};

export const weeklyUsage = [
  { day: "Mon", usage: 320 },
  { day: "Tue", usage: 280 },
  { day: "Wed", usage: 390 },
  { day: "Thu", usage: 340 },
  { day: "Fri", usage: 410 },
  { day: "Sat", usage: 290 },
  { day: "Sun", usage: 250 },
];

export const alerts = [
  {
    id: 1,
    title: "Tank level normal",
    description: "Tank is currently 72% full.",
    type: "success",
  },
  {
    id: 2,
    title: "Water quality reading",
    description: "Turbidity: 1.5 NTU.",
    type: "info",
  },
  {
    id: 3,
    title: "Flow monitoring active",
    description: "Current flow: 2.4 L/min.",
    type: "info",
  },
];