import express, {Express} from "express";
import cors from "cors";

const app: Express = express();
app.use(cors());
const port = 5000;

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/',(req,res)=>{
    res.send('Express  Server');
})