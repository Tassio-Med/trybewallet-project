import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, defineExpense } from '../actions';
import Table from '../components/table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      outlay: 0,
      totalExes: 0,
      description: '',
      moeda: '',
      method: '',
      tag: '',
      regularExes: false,
    };
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  fetchExes = async () => {
    const URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  validateBtn = async (param) => {
    param.preventDefault();
    const { expenses, exeSaved } = this.props;
    const {
      outlay,
      description,
      moeda,
      method,
      tag,
      totalExes,
    } = this.state;

    const data = await this.fetchExes();
    const objValue = Object.values(data);
    const setExchange = objValue.filter((elem) => elem
      .code === moeda)[0].ask;
    const parse = parseFloat(outlay) * parseFloat(setExchange);
    const sum = parse + totalExes;

    this.setState({
      totalExes: sum,
      regularExes: true,
    });

    const info = {
      id: expenses.length,
      value: outlay,
      description,
      currency: moeda,
      method,
      tag,
      exchangeRates: data,
    };

    exeSaved(info);

    this.setState({ outlay: 0 });
  }

  render() {
    const {
      email,
      coinType,
    } = this.props;

    const {
      regularExes,
      totalExes,
      outlay,
    } = this.state;

    const newTotal = totalExes.toFixed(2);
    const head = regularExes ? newTotal : 0;
    const coinCamp = coinType.map((coin) => (
      <option key={ coin }>{coin}</option>
    ));

    return (
      <>
        <header>
          <p data-testid="email-field">{email}</p>
          <span data-testid="total-field">
            { head }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <label htmlFor="valor-despesa">
          Valor:
          <input
            data-testid="value-input"
            id="outlay"
            name="outlay"
            onChange={ this.handleChange }
            value={ outlay }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="moeda">
          Moeda:
          <select
            data-testid="currency-input"
            id="moeda"
            onChange={ this.handleChange }
            name="moeda"
          >
            { coinCamp }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            onChange={ this.handleChange }
            name="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            onChange={ this.handleChange }
            name="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="submit"
          onClick={ this.validateBtn }
        >
          Adicionar despesa
        </button>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  coinType: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  exeSaved: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  coinType: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  exeSaved: (inf) => dispatch(defineExpense(inf)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
