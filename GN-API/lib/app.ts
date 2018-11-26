import * as express from "express";
import cors from "cors";
import corsOptions from "cors";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/GNRoutes";
import * as mongoose from "mongoose";

class App {
    
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/GNdb';
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void{
       // this.app.use(cors);
        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({extended: false}));
    }
    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }
}
export default new App().app;