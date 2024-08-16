// import {Paystack} from "paystack";
// import dotenv from "dotenv";

// dotenv.config();

// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

// class PaystackService {
//   static async initializeTransaction(
//     amount: number,
//     email: string,
//     reference: string
//   ) {
//     try {
//       const response = await paystack.transaction.initialize({
//         amount: amount * 100, // Paystack expects amount in kobo
//         email,
//         reference,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Paystack initialization error:", error);
//       throw new Error("Failed to initialize payment");
//     }
//   }

//   static async verifyTransaction(reference: string) {
//     try {
//       const response = await paystack.transaction.verify(reference);
//       return response.data;
//     } catch (error) {
//       console.error("Paystack verification error:", error);
//       throw new Error("Failed to verify payment");
//     }
//   }
// }

// export default PaystackService;
