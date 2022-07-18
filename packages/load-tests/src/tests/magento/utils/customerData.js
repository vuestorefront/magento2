const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';

export const getEmail = (length = 15) => {
  let string = '';
  for (let i = 0; i < length; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }

  return `${string}@gmail.com`;
};

export const customerData = {
  getEmail,
};

export default customerData;
