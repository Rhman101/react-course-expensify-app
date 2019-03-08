import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ExpenseListItem = (props) => {
    // console.log(props);
    return (
        <div>
            <Link to={`/edit/${props.input.id}`}>
                <h3>{props.input.description}</h3>
            </Link>
            <p>Amount: {props.input.amount}</p>
            <p>Date: {props.input.createdAt}</p>
            <p>Note: {props.input.note}</p>
            </div>
    )
};

export default connect()(ExpenseListItem);