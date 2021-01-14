import { Router } from "express";
import { AccountsController } from "../controllers/AccountsController";
import { FarmerController } from "../controllers/FarmerController";
import { LoginController } from "../controllers/LoginController";
import { NotificationController } from "../controllers/NotificationsController";
import { NumberController } from "../controllers/NumbersController";
import { StrategiesController } from "../controllers/StrategiesController";



const apiRoutes = Router();





apiRoutes.route("/farmers")
    .get(FarmerController.getFarmersData)
    .post(FarmerController.createFarmer);
apiRoutes.route("/farmers/:id")
    .put(FarmerController.updateFarmer)
    .delete(FarmerController.deleteFarmer);

apiRoutes.get("/farmerslist", FarmerController.getListOfFarmers);


apiRoutes.route("/notifications")
    .get(NotificationController.getNotifications)
    .post(NotificationController.createNotification)
    .put(NotificationController.updateNotification)
    .delete(NotificationController.deleteNotification);

apiRoutes.route("/numbers")
    .get(NumberController.getNumbers)
    .post(NumberController.createNumber)
    .put(NumberController.updateNumber)
    .delete(NumberController.deleteNumber);

apiRoutes.route("/strategies")
    .get(StrategiesController.getStrategies)
    .post(StrategiesController.createStrategies)
    .put(StrategiesController.updateStrategies)
    .delete(StrategiesController.deleteStrategies);



apiRoutes.get("/accounts/:id", AccountsController.getAccountById);


apiRoutes.route("/accounts")
    .get(AccountsController.getAccounts)
    .post(AccountsController.createAccount)
    .put(AccountsController.updateAccount)
    .delete(AccountsController.deleteAccount);


apiRoutes.route("/signup")
    .post(LoginController.handleSignup);
apiRoutes.route("/login")
    .post(LoginController.handleSignIn);
export { apiRoutes }
