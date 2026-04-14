console.log("Server file loaded");
const cron = require("node-cron");
const { checkAlerts } = require("./services/alertEngine"); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crops');
const alertRoutes = require('./routes/alerts');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/alerts', alertRoutes);
// Test route
app.get('/', (req, res) => {
  res.send("AgroNotify Backend is running!");
});
cron.schedule("*/5 * * * *", () => {
  console.log("⏰ Running background alert check...");
  checkAlerts();
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
 