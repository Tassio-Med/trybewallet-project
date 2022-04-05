import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class table extends React.Component {
  render() {
    const { outlay } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {outlay.map((expense) => {
            const { currency } = expense;
            const expenses = expense.exchangeRates;
            const leachExes = Object.values(expenses)
              .filter((param) => param
                .code === currency)[0];
            const coin = leachExes.name;
            const coinType = 'Real';
            const exchange = leachExes.ask;
            const parse = parseFloat(expense.value) * parseFloat(exchange);
            const exesValue = parse.toFixed(2);
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{coin}</td>
                <td>{parseFloat(exchange).toFixed(2)}</td>
                <td>{exesValue}</td>
                <td>{coinType}</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

table.propTypes = {
  outlay: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  outlay: state.wallet.expenses,
});

export default connect(mapStateToProps)(table);
