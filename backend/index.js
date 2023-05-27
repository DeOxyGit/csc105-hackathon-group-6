import express from 'express';
import authRoutes from './routes/auths.js';
import cors from 'cors';

const app = express();
const port = 8000;


app.use("/api/auth",authRoutes);
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.listen(port,()=>{
    console.log("Database connected at " + port);
})