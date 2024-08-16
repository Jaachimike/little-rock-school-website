import SchoolPayment from "../models/SchoolPayment";
import calculateFees from "../utils/calculateFees";

class PaymentService {
  static async createPaymentRecord(paymentData: any) {
    const payment = await SchoolPayment.create({
      ...paymentData,
      numberOfChildren: paymentData.childrenNames.length,
      amountOwed: paymentData.totalSchoolFees - paymentData.amountPaid,
    });
    return payment;
  }

  static async getPaymentDetails(email: string, surname: string) {
    const payment = await SchoolPayment.findOne({
      where: {
        email,
        parentLastName: surname,
      },
    });
    if (!payment) {
      throw new Error("Payment record not found");
    }
    return payment;
  }

  static async updatePayment(email: string, amountPaid: number) {
    const payment = await SchoolPayment.findOne({where: {email}});
    if (!payment) {
      throw new Error("Payment record not found");
    }

    payment.amountPaid += amountPaid;
    payment.amountOwed = payment.totalSchoolFees - payment.amountPaid;

    await payment.save();
    return payment;
  }

  static async calculateTotalFees(
    childrenClasses: string[],
    branchLocation: string
  ) {
    return calculateFees(childrenClasses, branchLocation);
  }
}

export default PaymentService;
