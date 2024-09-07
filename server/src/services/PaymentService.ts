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

  // get all users
  static async getAllUsers() {
    const payments = await SchoolPayment.findAll();
    if (payments.length === 0) {
      throw new Error("No payments found.");
    }
    return payments;
  }

  // get single user
  static async getSingleUser(id: string) {
    const payment = await SchoolPayment.findOne({where: {id}});
    if (!payment) {
      throw new Error("No user with that id found.");
    }
    return payment;
  }

  // update user
  static async updateUser(id: string, updatedData: any) {
    const [updated] = await SchoolPayment.update(updatedData, {
      where: {id},
    });

    if (!updated) {
      throw new Error("User not found or no change in data.");
    }

    const updatedPayment = await SchoolPayment.findOne({where: {id}});

    if (!updatedPayment) {
      throw new Error("Failed to fetch the updated record.");
    }

    return updatedPayment;
  }

  // delete a parent
  static async deleteUser(id: string) {
    const deleted = await SchoolPayment.destroy({
      where: {id},
    });
    if (!deleted) {
      throw new Error("Payment record not found");
    }
    return deleted;
  }

  static async calculateTotalFees(
    childrenClasses: string[],
    branchLocation: string
  ) {
    return calculateFees(childrenClasses, branchLocation);
  }
}

export default PaymentService;
