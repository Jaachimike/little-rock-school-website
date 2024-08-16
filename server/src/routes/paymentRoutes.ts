import {Router} from "express";
import PaymentController from "../controllers/PaymentController";

const router = Router();

router.post("/register", PaymentController.register);
router.post("/payment-details", PaymentController.getPaymentDetails);
router.post("/make-payment", PaymentController.makePayment);

export default router;
