import dotenv from "dotenv";

dotenv.config();

const calculateFees = (
  childrenClasses: string[],
  branchLocation: string
): number => {
  let totalFees = 0;

  childrenClasses.forEach(className => {
    const feeKey = `${branchLocation.toUpperCase()}_FEES_${className.toUpperCase()}`;
    const classFee = Number(process.env[feeKey]) || 0;
    totalFees += classFee;
  });

  return totalFees;
};

export default calculateFees;
