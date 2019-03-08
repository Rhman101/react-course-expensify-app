import { createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy
    }
}

const decrementCount = ({ decrementBy = 1} = {}) => {
    return {
        type: 'DECREMENT',
        decrementBy
    }
}

const resetCount = () => {
    return {
        type: 'RESET'
    }
}

const setCount = ({ number = 100 } = {}) => {
    return {
        type: 'SET',
        number
    }
}

const countReducer = (state = { count : 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT' :
            return {
                count : state.count + action.incrementBy
            };
        case 'DECREMENT' :
            return {
                count : state.count - action.decrementBy
            };
        case 'RESET' : 
            return {
                count : state.count = 0
            };
        case 'SET' : 
        return {
            count: action.number
        }
        default :
            return state;
    }
};

const store = createStore(countReducer);
console.log('store is');
console.log(store);

store.subscribe(() => {
    console.log('Store:');
    console.log(store.getState());
})

store.dispatch(incrementCount({ incrementBy: 50 }));

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 100 }));

store.dispatch(decrementCount());

store.dispatch(setCount({ number: 200 }));

store.dispatch(setCount({}));

store.dispatch(setCount());

console.log(store.getState());