export const summaryValues = (values) => (
  values.reduce((accumulator, value) => (accumulator + value))
);

export const httpHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
