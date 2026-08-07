import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.listen(2020);

app.get("/",({req,res} : any )=>{
res.json({
    message:"server is running.... 67676"
})
})