// lib/app.ts
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import express = require("express");
import mongoose = require('mongoose');
import logger = require("morgan");
import * as path from "path";
import Routes from "./routes/index";
// import { database } = require('./config/database');

class Express {
  public app: express.Express;
  private envFile = 'src/.env';

  /*--------  Constructor  --------*/
  constructor() {
    // 
    // ENV
    this.setEnv();
    // 
    // Mongo
    this.connectToMongo();
    // 
    // Start App
    this.app = express() as express.Express;
    // 
    // Set view engine
    this.setViewEngine();
    // 
    // Middleware
    this.setMiddleware();
    // 
    // Set static files
    this.setStaticFiles();
    // 
    // Routes
    this.setRoutes();
  }
  /*--------  Methods  --------*/
  /**
   * Set env
   * Set env from .env or .env.${NODE_ENV} file using dotenv
   */
  private setEnv() {
    // 
    // Add NODE_ENV to path if is not production
    if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;
    // 
    // Set env from file
    dotenv.config({ path: this.envFile });
  }

  /**
   * Connect to mongo
   */
  private async connectToMongo(uri?: string, opts?: object) {
    if (!uri) {
      uri = process.env.MONGO_URI || 'mongodb://localhost:27017/collector';
    }
    opts = opts || { useNewUrlParser: true };
    mongoose.connect(uri, opts, (err) => {
      if (err) {
        console.log(err.message);
        console.log(err);
      }
      else {
        console.log('Connected to MongoDb');
      }
    });
    
  }

  /**
   * Set view engine
   */
  private setViewEngine() {
    // 
    // Configure ejs as view engine
    this.app.set("views", path.join(__dirname, "../../src/views"));
    this.app.set("view engine", "ejs");
  }

  /**
   * Set middleware
   */
  private setMiddleware() {
    // 
    // Add logging
    this.app.use(logger("dev"));
    // 
    // Add body parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // 
    // Add cookie parser
    this.app.use(cookieParser());
  }

  /**
   * Set static files
   */
  private setStaticFiles() {
    // 
    // Set static route for public folder
    this.app.use(express.static(path.join(__dirname, "../../src/public")));
  }

  /**
   * Set routes
   */
  private setRoutes() {
    // 
    // Create Routes, and export its configured Express.Router
    new Routes(this.app);
  }
}

export default new Express().app;