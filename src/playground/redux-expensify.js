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
        updates: inputObject
    }
}

const expensesReducer = (state = [], action) => {
    // console.log('state');
    // console.log(state);
    // console.log('action');
    // console.log(action);
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE': 
            return state.filter((elem) => elem.id !== action.uuid);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default: 
            return state;
    }
};

const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT_FILTER',
        text
    }
}

const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT'
    }
}

const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    }
}

const setStartDate = (date = undefined) => {
    return {
        type: 'SET_START_DATE',
        date
    }
}

const setEndDate = (date = undefined) => {
    return {
        type: 'SET_END_DATE',
        date
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE': 
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };
        default: 
            return state;
    }
};

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

const getVisibleExpenses = (expenses, { endDate, sortBy, startDate, text }) => {
    return expenses.filter((element) => {
        const endDateFilter = element.createdAt <= endDate;
        const startDateFilter = element.createdAt >= startDate;
        const textFilter = element.description.toLowerCase().includes(text.toLowerCase());
        return endDateFilter && startDateFilter && textFilter
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
        });
}

store.subscribe(() => {
    console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 500}));
// store.dispatch(addExpense({ description: 'flowers', note: 'For wife', amount: 200 }));

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 50, createdAt: 50 }));

// store.dispatch(editExpense(expenseTwo.expense.id, { 
//     note: 'Too much',
//     createdAt: 'someNewDate',
//  }));

// store.dispatch(removeExpense(expenseOne));

// store.dispatch(setTextFilter('rent'));

store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());s

store.dispatch(setStartDate(0));
store.dispatch(setEndDate(1000));

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