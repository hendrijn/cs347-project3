import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Action } from './actions';

const initialState = {
    isProgressing: false,
    customerErrorMessage: null,
    employeeErrorMessage: null,
    orders: [
        {
            id: -1,
            name: "John Doe",
            items: [
                {
                    item: "Taco",
                    price: 3.70
                }
            ],
            total: 3.70,
            isEditing: false
        },
        {
            id: -2,
            name: "Jane Donne",
            items: [
                {
                    item: "Burger",
                    price: 4.75
                }
            ],
            total: 4.75,
            isEditing: false
        },
    ],
    custOrder: {
        id: -1,
        name: "Default",
        items: [],
        total: 0.00,
        isEditing: false
    },
    menuItems: [
        {
            item: "Tacos (2 beef)",
            price: 3.70
        },
        {
            item: "Burger (cheese, lettuce, and tomato)",
            price: 4.75
        },
        {
            item: "Italian Sub Sandwich",
            price: 6.99
        },
        {
            item: "Spaghetti (with side salad)",
            price: 8.20
        },
        {
            item: "Greek Salad",
            price: 4.99
        },
        {
            item: "Fries",
            price: 1.99
        },
        {
            item: "Soda (Cola or Sprite)",
            price: 1.20
        },
        {
            item: "Tea or Lemonade",
            price: 1.40
        },
        {
            item: "Water",
            price: .99
        }
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case Action.LoadAllOrders:
            return {
                ...state,
                orders: action.payload
            };
        case Action.AddOrder:
            return {
                ...state,
            };
        case Action.AddItemToTicket:
            return {
                ...state,
                custOrder: {
                    ...state.custOrder,
                    items: state.custOrder.items.concat(action.payload),
                }
            }
        case Action.RemoveItemFromTicket:
            return {
                ...state,
                custOrder: {
                    ...state.custOrder,
                    items: state.custOrder.items.filter(item => item !== action.payload)
                }
            }
        case Action.ClearTicket:
            return {
                ...state,
                custOrder: {
                    name: 'Default',
                    items: [],
                    total: 0.00,
                }
            }
        case Action.HideProgress:
            return {
                ...state,
                isProgressing: false
            }
        case Action.ShowProgress:
            return {
                ...state,
                isProgressing: true
            }
        case Action.ShowCustomerErrorMessage:
            return {
                ...state,
                customerErrorMessage: action.payload
            }
        case Action.HideCustomerErrorMessage:
            return {
                ...state,
                customerErrorMessage: action.payload
            }
        case Action.ShowEmployeeErrorMessage:
            return {
                ...state,
                employeeErrorMessage: action.payload
            }
        case Action.HideEmployeeErrorMessage:
            return {
                ...state,
                employeeErrorMessage: action.payload
            }
        case Action.HideNameEdit:
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order.id === action.payload) {
                        return { ...order, isEditing: false };
                    } else {
                        return order;
                    }
                })
            }
        case Action.ShowNameEdit:
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order.id === action.payload) {
                        return { ...order, isEditing: true };
                    } else {
                        return order;
                    }
                })
            }
        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));