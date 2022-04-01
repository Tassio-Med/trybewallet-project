import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expense: 0,
      description: '',
      tag: '',
      coinType: '',
      payMethod: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, currencies } = this.props;
    const {
      coinType,
      payMethod,
      tag, expense,
      description,
    } = this.state;

    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <section>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              id="value"
              data-testid="value-input"
              type="number"
              value={ expense }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="coin">
            Moeda:
            <select
              name="coin"
              id="coin"
              value={ coinType }
              onChange={ this.handleChange }
            >
              {currencies.map((currency) => (
                <option
                  key={ currency }
                >
                  {currency}
                </option>))}
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              type="text"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ payMethod }
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="method">
            Tag
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button
            data-testid="edit-button-save"
            type="button"
          >
            Adicionar despesa
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
