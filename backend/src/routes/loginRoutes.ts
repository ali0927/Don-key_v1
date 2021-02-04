import {  Router } from "express";
import { LoginController } from "../controllers/LoginController";

const loginRoutes = Router();

loginRoutes.route("/login").post(LoginController.handleSignIn);



export {loginRoutes};
