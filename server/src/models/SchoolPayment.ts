import {Model, DataTypes} from "sequelize";
import sequelize from "../config/database";

class SchoolPayment extends Model {
  public id!: number;
  public parentFirstName!: string;
  public parentLastName!: string;
  public email!: string;
  public phoneNumber!: string;
  public childrenNames!: string[];
  public childrenClasses!: string[];
  public numberOfChildren!: number;
  public branchLocation!: string;
  public totalSchoolFees!: number;
  public amountPaid!: number;
  public amountOwed!: number;
}

SchoolPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parentFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    childrenNames: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    childrenClasses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    numberOfChildren: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branchLocation: {
      type: DataTypes.ENUM("lagos", "abuja", "owerri"),
      allowNull: false,
    },
    totalSchoolFees: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    amountOwed: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "SchoolPayment",
  }
);

export default SchoolPayment;
