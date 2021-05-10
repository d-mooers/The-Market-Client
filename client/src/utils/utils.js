export const formatMoney = (num) => `$${num}`;

export const parseIntFromMoney = (str) => Number(str.slice(1, str.length));

export const shortenString = (str, limit) => {
  if (str.length < limit) return str;
  return `${str.slice(0, limit - 3)}...`;
};

export const formatNewLine = (str) => {
  const split = str.split(/(?:\r\n|\r|\n)/g);
  return split.map((s) => (
    <>
      {s}
      <br />
    </>
  ));
};
