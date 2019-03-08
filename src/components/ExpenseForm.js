import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { addExpense } from '../actions/expenses';
import { connect } from 'react-redux';

export default class ExpenseForm extends React.Component {
    state = {
        description: this.props.expenseItem ? this.props.expenseItem.description : '',
        note: this.props.expenseItem ? this.props.expenseItem.note : '',
        amount: this.props.expenseItem ? (this.props.expenseItem.amount / 100) : '',
        createdAt: this.props.expenseItem ? moment(this.props.expenseItem.createdAt) : moment(),
        calendarFocused: false,
        error: false
    };
    onDescriptionChange = (event) => {
        let description = event.target.value;
        this.setState(() => ({ description }));
    };
    onAmountChange = (event) => {
        let amount = event.target.value;
        if (!amount || amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        };
    };
    onNoteChange = (event) => {
        let note = event.target.value;
        this.setState(() => ({ note }));
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        };
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (event) => {
        event.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: true }));
        } else {
            this.setState(() => ({ error: false }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <input 
                    type='text'
                    placeholder='Description'
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input 
                    type='text'
                    placeholder='Amount'
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder='Add an optional note'
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                    </textarea>
                <button>Add/Edit Expense</button>
                {this.state.error && <p>Please provide a description and/or an amount.</p>}
            </form> 
            </div>
        )
    }
};