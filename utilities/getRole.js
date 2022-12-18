import { ROLES } from '../constants/roles';

export default function (roles) {
  if (!roles) {
    return { n: '', c: '' };
  }

  const keys = Object.keys(roles);
  if (keys.length === 1) {
    return { n: ROLES[roles[keys[0]]], c: roles[keys[0]] };
  }

  let highestRole = roles[keys[0]];

  Array.from(keys).forEach((d) => {
    if (roles[d] > highestRole) {
      highestRole = roles[d];
    }
  });

  return { n: ROLES[highestRole], c: roles[keys[0]] };
}
