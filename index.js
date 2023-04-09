const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const Atten = require("./Attendance.json");

app.get("/", (req,res)=> {
    res.send("Hello I am Live");
});

app.get("/attendance", (req, res)=>{
    res.send(Atten);
});

// app.post("/attendance", (req, res) => {
//     const { name, time } = req.body;
//     const newAttendance = { name, time };
  
//     // Add the new attendance record to the existing array
//     Atten.push(newAttendance);
  
//     // Write the updated data back to the file
//     try {
//       fs.writeFileSync("Attendance.json", JSON.stringify(Atten));
//       console.log("Attendance updated successfully");
//       res.status(200).send("Attendance updated successfully");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error updating attendance");
//     }
// });

app.post("/attendance", (req, res) => {
    const { name, time } = req.body;
    const newAttendance = { name, time };
  
    // Add the new attendance record to the existing array
    Atten.push(newAttendance);
  
    // Write the updated data back to the file
    try {
      fs.writeFileSync("Attendance.json", JSON.stringify(Atten), (err) => {
        if (err) throw err;
        console.log("Attendance updated successfully");
      });
      res.status(200).send("Attendance updated successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating attendance");
    }
  });
  
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
