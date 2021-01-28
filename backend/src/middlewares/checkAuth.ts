import { RequestHandler } from "express";
import { sendResponse } from "../helpers/sendResponse";
import { verifyToken } from "../helpers";



export const checkAuth = (): RequestHandler => (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return sendResponse(res, { error: { msg: "Acccess Denied" }, code: 401 });
  }
  if (!authHeader.includes("Bearer ")) {
    return sendResponse(res, {
      error: { msg: "Invalid Auth Header" },
      code: 400,
    });
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return sendResponse(res, {
      error: { msg: "Invalid Auth Header" },
      code: 400,
    });
  }

  try {

    req.user = verifyToken(token)
    next();
  } catch (e) {
    console.log(e);
    return sendResponse(res, { error: { msg: "Acccess Denied" }, code: 401 });
  }

};
