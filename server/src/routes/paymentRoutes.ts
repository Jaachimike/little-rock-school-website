import {Router} from "express";
import PaymentController from "../controllers/PaymentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", PaymentController.register);
router.post("/payment-details", PaymentController.getPaymentDetails);
router.post("/make-payment", PaymentController.makePayment);

// dashbord routes
router.get(
  "/get-all-payments",
  authMiddleware,
  PaymentController.getAllPayments
);
router.get(
  "/get-payment/:id",
  authMiddleware,
  PaymentController.getSinglePayment
);
router.put(
  "/update-payment/:id",
  authMiddleware,
  PaymentController.updateParentDetails
);
router.delete(
  "/delete-payment/:id",
  authMiddleware,
  PaymentController.deleteParentUser
);

export default router;
2;
