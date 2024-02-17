const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/WorkingHours", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const unifiedDataSchema = new mongoose.Schema({
  employeeId: String,
  startTime: String,
  startDate: String,
  endTime: String,
  endDate: String,
  breakInTime: String,
  breakOutTime: String,
  totalWorkTime: String,
  totalWorkDays: Number,
});

const UnifiedData = mongoose.model("UnifiedData", unifiedDataSchema);

app.post("/api/checkWorkHours", async (req, res) => {
  try {
    const { employeeId, date } = req.body;

    const existingWorkHours = await UnifiedData.findOne({
      employeeId,
      startDate: date,
    });

    const workHoursExist = !!existingWorkHours;

    res.json({ workHoursExist });
  } catch (error) {
    console.error("Error checking work hours:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Function to format date with zero-padding for month and day
const formatDateWithZeroPadding = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Zero-padding for month
  const day = date.getDate().toString().padStart(2, "0"); // Zero-padding for day
  return `${month}/${day}/${year}`;
};

app.post("/api/saveUnifiedData", async (req, res) => {
  try {
    const {
      employeeId,
      startTime,
      startDate,
      endTime,
      endDate,
      breakInTime,
      breakOutTime,
      totalWorkTime,
    } = req.body;

    // Format start date and end date with zero-padding for month and day
    const formattedStartDate = formatDateWithZeroPadding(new Date(startDate));
    const formattedEndDate = formatDateWithZeroPadding(new Date(endDate));

    // Check if there are any existing entries for the employee
    const existingEntries = await UnifiedData.find({ employeeId });

    // Get the last entry
    const lastEntry = existingEntries[existingEntries.length - 1];

    // Initialize totalWorkDays to 1 by default
    let totalWorkDays = 1;

    // Check if there is a last entry and if the month and year match the current entry
    if (lastEntry) {
      const lastEntryMonth = new Date(lastEntry.endDate).getMonth();
      const currentEntryMonth = new Date(endDate).getMonth();
      const lastEntryYear = new Date(lastEntry.endDate).getFullYear();
      const currentEntryYear = new Date(endDate).getFullYear();
      if (lastEntryMonth === currentEntryMonth && lastEntryYear === currentEntryYear) {
        // If the month and year match, increment totalWorkDays
        totalWorkDays = lastEntry.totalWorkDays + 1;
      }
    }

    const newUnifiedData = new UnifiedData({
      employeeId,
      startTime,
      startDate: formattedStartDate,
      endTime,
      endDate: formattedEndDate,
      breakInTime,
      breakOutTime,
      totalWorkTime,
      totalWorkDays,
    });

    await newUnifiedData.save();

    console.log("Unified data saved successfully");
    res.status(200).send("Unified data saved successfully");
  } catch (error) {
    console.error("Error saving unified data:", error);
    res.status(500).send("Error saving unified data");
    console.error("Error retrieving last entry:", error);
  }
});



app.get("/workhours_data", async (req, res) => {
  try {
    const workHoursData = await UnifiedData.find({}, "endDate totalWorkTime");
    res.json(workHoursData);
  } catch (error) {
    console.error("Error fetching work hours data:", error);
    res.status(500).send("Error fetching work hours data");
  }
});

app.get("/total_work_days/:employeeId", async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const workHoursData = await UnifiedData.distinct("endDate", { employeeId });

    const totalWorkDays = workHoursData.length;

    res.json({ totalWorkDays });
  } catch (error) {
    console.error("Error fetching total work days:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/fetch_data_for_month", async (req, res) => {
  try {
    const { year, month } = req.query;
    const numericYear = parseInt(year);
    const numericMonth = parseInt(month);

    const startDate = new Date(numericYear, numericMonth - 1, 1);
    const endDate = new Date(numericYear, numericMonth, 0);

    const data = await UnifiedData.find(
      {
        endDate: {
          $gte: startDate,
          $lt: endDate,
        },
      },
      "endDate totalWorkTime"
    );

    res.json(data);
  } catch (error) {
    console.error("Error fetching data for the month:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch UnifiedData
app.get("/workhours_data/:employeeId", async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const workHoursData = await UnifiedData.find(
      { employeeId },
      "endDate totalWorkTime"
    );
    res.json(workHoursData);
  } catch (error) {
    console.error("Error fetching work hours data:", error);
    res.status(500).send("Error fetching work hours data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
