import express, {Express} from "express";
import cors from "cors";
import Routes from "./src/routes/Routes";

const app: Express = express();
app.use(cors());
const port = 5000;
new Routes(app);

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/',(req,res)=>{
    res.send('Express  Server');
})