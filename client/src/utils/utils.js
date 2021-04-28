export const formatMoney = (num) => `$${num}`;

export const parseIntFromMoney = (str) => Number(str.slice(1, str.length));
