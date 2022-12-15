import { ROLES } from '../constants/roles';

export default function (roles) {
  const keys = Object.keys(roles);
  if (keys.length === 1) {
    return { n: ROLES[roles[keys[0]]], c: roles[keys[0]] };
  }
}
