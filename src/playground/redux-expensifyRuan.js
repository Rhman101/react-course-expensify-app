import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note, 
        amount,
        createdAt
    }
});

const removeExpense = (input) => {
    return {
        type: 'REMOVE_EXPENSE',
        uuid: input.expense.id
    }
};

const editExpense = (inputUuid, inputObject) => {
    return {
        type: 'EDIT_EXPENSE',
        id: inputUuid,
        description: inputObject.description,
        note: inputObject.note,
        amount: inputObject.amount,
        createdAt: inputObject.createdAt
    }
}

const expensesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE': 
            return state.filter((elem) => elem.id !== action.uuid);
        case 'EDIT_EXPENSE':
        let element;
        let newState;
        for (let i = 0; i < state.length; i++) {
            if (state[i].id == action.id) {
                element = i;
            }
        }
        newState = state;
        if (action.description != undefined) {
            newState[element] = { ...newState[element], description: action.description };
        }
        if (action.note != undefined) {
            newState[element] = { ...newState[element], note: action.note };
        }
        if (action.amount != undefined) {
            newState[element] = { ...newState[element], amount: action.amount };
        }
        if (action.createdAt != undefined) {
            newState[element] = { ...newState[element], createdAt: action.createdAt };
        }
            return newState;
        default: 
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default: 
            return state;
    }
};

// Store creation

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    console.log(store.getState());
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
store.dispatch(addExpense({ description: 'flowers', note: 'For wife', amount: 200 }));

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 50 }));

store.dispatch(editExpense(expenseTwo.expense.id, { 
    note: 'Too much',
    createdAt: 'someNewDate',
 }));

store.dispatch(removeExpense(expenseOne));

const demoState = {
    expenses: [{
        id: 'poinsg', 
        description: 'January rent',
        notes: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}