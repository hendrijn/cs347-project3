import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from './actions';

const initialState = {
    orders: [
        {
            id: -1,
            name: "John Doe",
            items: "Taco",
            total: 3.70
        },
        {
            id: -2,
            name: "Jane Donne",
            items: "Burger",
            total: 4.75
        },
    ],
    custOrder: [
        {
            id: -1,
            name: "John Doe",
            items: "Taco",
            total: 3.70
        }
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case Action.LoadAllOrders:
            return {
                ...state,
                orders: action.payload //the payload is an Object with the array inside it...
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));