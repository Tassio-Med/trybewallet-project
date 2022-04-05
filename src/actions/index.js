// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const DEFINE_EXPENSE = 'DEFINE_EXPENSE';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const defineExpense = (elem) => ({
  type: DEFINE_EXPENSE,
  expense: elem,
});

export const fetchCurrencies = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  const fillCurrencies = Object.keys(data).filter((element) => element !== 'USDT');
  dispatch(getCurrencies(fillCurrencies));
};
