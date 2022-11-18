import Payment from "../models/payment";
import Log from "../models/log";

export const PAYMENTTYPES = [
  new Payment("1", "Faculty Dues", true, 1000),
  new Payment("2", "Department Dues", false, 7000),
  new Payment("3", "Class Dues", false, 5000),
];

export const LECTURERLOGS = [
  new Log("1", "Fumya Takeoff", "2022-11-18T11:37:40.172Z", 5000, "3"),
  new Log("2", "Cherrycute Offset", "2022-11-18T11:47:21.075Z", 7000, "2"),
  new Log("3", "Seasea Young-John", "2022-11-18T11:48:08.095Z", 5000, "3"),
];
