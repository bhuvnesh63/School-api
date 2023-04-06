const app = require("./app");

const dotenv= require("dotenv");
const connectDatabase= require("./config/database")

// handling Uncaught error

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Error`);
    process.exit(1);
})

// confiig
dotenv.config({path:"config/config.env"})

// connect to database 
connectDatabase();  

const server= app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});

// connection error

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection or any internal error`);

    server.close(()=>{
        process.exit(1);
    });
})