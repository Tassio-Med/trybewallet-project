// Coloque aqui suas actions
export const DISPATCH_EMAIL = 'DISPATCH_EMAIL';

export const dispatchEmail = ({ email }) => ({
  type: DISPATCH_EMAIL,
  email,
});
