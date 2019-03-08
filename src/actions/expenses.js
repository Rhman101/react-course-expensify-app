import uuid from 'uuid';

export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note, 
        amount,
        createdAt
    }
});

export const removeExpense = (input) => {
    return {
        type: 'REMOVE_EXPENSE',
        uuid: input
    }
};

export const editExpense = (inputUuid, inputObject) => {
    return {
        type: 'EDIT_EXPENSE',
        id: inputUuid,
        updates: inputObject
    }
}

