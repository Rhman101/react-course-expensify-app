import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    // console.log(props);
    return (
        <div>
            <p>This is from the edit expense page component. The variable name is {props.match.params.variableName}</p>
            <ExpenseForm 
                id={props.match.params.variableName} 
                expenseItem={props.expense}
                onSubmit={(expense) => {
                    props.dispatch(editExpense(props.match.params.variableName, expense));
                    props.history.push('/');
                }}
                />
                <button onClick={() => {
                    console.log(props.match.params.variableName);
                    props.dispatch(removeExpense(props.match.params.variableName));
                    props.history.push('/');
                }}>Remove Expense</button>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.variableName)
    };
};

export default connect(mapStateToProps)(EditExpensePage);