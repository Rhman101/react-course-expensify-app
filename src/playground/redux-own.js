import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


const toDoListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.item]
        default: 
            return state;
    }
}

const doneListReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_DONE': 
            return [...state, action.item];
        default:
            return state;
    }
}

const store = createStore(combineReducers({
    toDo: toDoListReducer,
    done: doneListReducer
}));

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({
    type: 'ADD',
    item: 'thing'
});

store.dispatch({
    type: 'ADD_DONE',
    item: 'anotherThing'
})


store.dispatch({
    type: 'ADD_DONE',
    item: 'thing'
});

store.dispatch({
    type: 'ADD',
    item: 'anotherThing'
})