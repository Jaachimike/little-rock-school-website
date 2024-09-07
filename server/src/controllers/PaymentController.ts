import {Request, Response} from "express";
import PaymentService from "../services/PaymentService";
import {PaymentData} from "../types";

class PaymentController {
  static async register(req: Request, res: Response) {
    try {
      const paymentData: PaymentData = req.body;
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

  // Get all users
  static async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getAllUsers();
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }

  // get single user
  static async getSinglePayment(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const payment = await PaymentService.getSingleUser(id);
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }

  // Update user details
  static async updateParentDetails(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const updatedData = req.body;
      const updatedPayment = await PaymentService.updateUser(id, updatedData);
      res.status(200).json(updatedPayment);
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }

  // Delete a parent
  static async deleteParentUser(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const deleted = await PaymentService.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }
}

export default PaymentController;
