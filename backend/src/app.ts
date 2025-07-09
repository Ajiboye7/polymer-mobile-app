import express from "express";
import UserRoute from "../src/routes/UserRoute";
import IdentityRoute from "../src/routes/IdentityRoute";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", UserRoute);
app.use("/api/auth", IdentityRoute);




export default app;
