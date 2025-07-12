const express = require('express');
const db = require("./models");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const authRoutes = require("./routes/user.routes");
const specRoutes = require("./routes/spec.routes");
const timesRoutes = require("./routes/availableTimes.routes");
const sessionsRoutes = require("./routes/sessions.routes");


const cookieparser = require("cookie-parser");

const jwt = require('jsonwebtoken');

/*  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});*/


 // connect db 
try{
    db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database updated with model changes");
})}catch(error){
    console.error('Unable to connect to the database:', error);
}

// start my app
const app = express();
app.use(express.json());
app.use(cookieparser());


app.get(checkUser);


// routes

app.get("/", (req, res) => {
  res.json({ message: "Albireh Clinc " });
});


app.use("/api/auth"   , authRoutes);
app.use("/api/spec", requireAuth , specRoutes);
app.use("/api/times", requireAuth , timesRoutes);
app.use("/api/sessions", requireAuth , sessionsRoutes);


// app connection 
app.listen('8000', () =>{
    console.log("server started on port 8000")
})