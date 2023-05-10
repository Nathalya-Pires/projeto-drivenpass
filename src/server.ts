import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authenticationRouter from "./routes/authentication.routes.js";
import user from "./routes/user.routes.js";
import credentialRouter from "./routes/credential.routes.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use([authenticationRouter, user, credentialRouter]);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port: ${port}`));