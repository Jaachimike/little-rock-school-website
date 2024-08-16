import {Request, Response} from "express";
import PaymentService from "../services/PaymentService";

class PaymentController {
  static async register(req: Request, res: Response) {
    try {
      const paymentData = req.body;
      const totalFees = await PaymentService.calculateTotalFees(
        paymentData.childrenClasses,
        paymentData.branchLocation
      );
      const payment = await PaymentService.createPaymentRecord({
        ...paymentData,
        totalSchoolFees: totalFees,
        amountPaid: 0,
      });
      res.status(201).json({payment, totalFees});
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }

  static async getPaymentDetails(req: Request, res: Response) {
    try {
      const {email, surname} = req.body;
      const paymentDetails = await PaymentService.getPaymentDetails(
        email,
        surname
      );
      res.status(200).json(paymentDetails);
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }

  static async makePayment(req: Request, res: Response) {
    try {
      const {email, amountPaid} = req.body;
      const updatedPayment = await PaymentService.updatePayment(
        email,
        amountPaid
      );
      res.status(200).json(updatedPayment);
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }
}

export default PaymentController;
