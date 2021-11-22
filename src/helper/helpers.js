export const summaryDonations = (danations) => (
  danations.reduce((accumulator, value) => (accumulator + value))
);


export const httpHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
