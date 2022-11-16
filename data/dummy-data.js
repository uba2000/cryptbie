import Payment from "../models/payment";

export const PAYMENTTYPES = [
  new Payment("1", "Faculty Dues", true, 5000),
  new Payment("2", "Department Dues", false, 10000),
  new Payment("3", "Class Dues", false, 10000),
];
