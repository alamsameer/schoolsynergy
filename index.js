
import dbmain from "./src/config/db.js"
import express from "express";

const app =express();

dbmain().then(()=>{ console.log("db connected");}).catch((e)=>{ console.log(e);console.log("db not connected");})

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});