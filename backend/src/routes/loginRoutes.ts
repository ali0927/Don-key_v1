import {  Router } from "express";
import { LoginController } from "../controllers/LoginController";

const loginRoutes = Router();

loginRoutes.route("/login").post(LoginController.handleSignIn);

loginRoutes.route("/verifyToken").post(LoginController.verifyToken)


export {loginRoutes};
