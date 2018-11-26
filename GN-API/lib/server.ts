import app from "./app";
import * as express from "express";

import * as cors from "cors";

//get router
var router = express.Router();

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: 'http://localhost:4200',
  preflightContinue: false
};

//use cors middleware
router.use(cors(options));

//add your routes

//enable pre-flight
router.options("*", cors(options));

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port' + PORT);
})