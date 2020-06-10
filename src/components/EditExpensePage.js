import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    return (
      <div>
        <div>edit expense component works!</div>
        <p>Editing expense id: {props.match.params.id}</p>
        <ExpenseForm
          expense={props.expense}
          onSubmit={(exp) => {
            props.dispatch(editExpense(props.expense.id, exp));
            props.history.push("/");
          }}
        />
        <button
          onClick={() => {
            props.dispatch(removeExpense({ id: props.expense.id }));
            props.history.push("/");
          }}
        >
          Remove
        </button>
      </div>
    );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find( exp => exp.id === props.match.params.id )
  }
}

export default connect(mapStateToProps)(EditExpensePage);
