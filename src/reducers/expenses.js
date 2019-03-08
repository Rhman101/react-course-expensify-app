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

export default expensesReducer;