import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByDate, setStartDate, setEndDate, sortByAmount } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.subscribe(() => {
    // console.log(store.getState());
    // console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));
});

store.dispatch(addExpense({ description: 'Water bill', note:'H2O is awesome', amount: 50, createdAt: 10800 }));
store.dispatch(addExpense({ description: 'Gas bill', note: 'Find cheaper gas', amount: 120, createdAt: 1080 }));
store.dispatch(addExpense({ description: 'cellphone bill', note:'Use Whatsapp', amount: 150, createdAt: 101802 }));
store.dispatch(sortByAmount());
// store.dispatch(setStartDate(-5000000));
// store.dispatch(setEndDate(1000000000000000));\

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));