const _formatNumberOutput = (prefix, suffix) => {
  return `${prefix}${suffix ? `.${suffix.substring(0, 2)}` : ""}`;
};

export const formatNumber = (val) => {
  // Check if the value is a number
  if (isNaN(val)) return val;

  let newnum = `${val}`;
  let numSeperated;

  numSeperated = newnum.split(".");
  newnum = numSeperated[0];

  const hasSuffix = numSeperated.length >= 1;

  if (newnum === "0" || newnum.length <= 3) {
    // Check if length of string is less than three
    return _formatNumberOutput(newnum, hasSuffix ? numSeperated[1] : ""); // Less than three, no need to format
  } else {
    // Greater than three
    let count = 1;
    let newstr;
    let str = "";
    let sw = 0;
    // 56,000
    for (let i = newnum.length - 1; i >= 0; i--) {
      //
      if (count === 3) {
        newstr = newnum.slice(i, i + 3);
        str = newstr + str;
        if (i > 0) {
          str = "," + str;
        }
        count = 0;
      } else if (count !== 3 && i === 0) {
        newstr = newnum.slice(i, i + count);
        str = newstr + str;
      }
      count++;
    }
    return _formatNumberOutput(str, hasSuffix ? numSeperated[1] : "");
  }
};
