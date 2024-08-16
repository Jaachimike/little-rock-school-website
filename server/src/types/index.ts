export interface PaymentData {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phoneNumber: string;
  childrenNames: string[];
  childrenClasses: string[];
  branchLocation: string;
  totalSchoolFees: number;
  amountPaid: number;
  amountOwed: number;
}
