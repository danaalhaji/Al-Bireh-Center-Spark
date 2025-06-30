const express = require('express');
const db = require("./models");
const authRoutes = require("./routes/user.routes");
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




const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Albireh Clinc " });
});

app.use("/api/auth", authRoutes);

app.listen('8000', () =>{
    console.log("server started on port 8000")
})