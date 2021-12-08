import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchAllOrders, deleteAnOrder, showNameEdit, hideNameEdit, submitNameEdit, hideEmployeeErrorMessage } from './actions';
import { useDispatch } from 'react-redux';
import MenuItem from './MenuItem';

export default function Orders() {

    const dispatch = useDispatch();
    const isProgressing = useSelector(state => state.isProgressing);
    const errorMessage = useSelector(state => state.employeeErrorMessage);
    const [name, setName] = useState();
    let keyNum = 0;

    //pulls down things from the database
    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const orders = useSelector(state => state.orders);
    return (
        <div className="employeePortal">
            {isProgressing && <div className="spinner" />}
            <h1>Orders</h1>
            {!isProgressing && <div className="orders">
                {orders.map(order =>
                    <div className="orderCard" key={order.id}>

                        {!order.isEditing && <div className="orderCardName">
                            <h2>{order.name}</h2>
                            <button onClick={event => dispatch(showNameEdit(order.id))}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" /></svg>
                            </button>
                        </div>}
lllll
                        {order.isEditing && <div className="orderCardName editingModeOn">
                            <input type="text" onChange={event => setName(event.target.value)} />
                            <button className="submitButton" onClick={event => dispatch(submitNameEdit(order.id, name))}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" /></svg>
                            </button>
                            <button className="cancelBtn" onClick={() => {
                                dispatch(hideNameEdit(order.id));
                                dispatch(hideEmployeeErrorMessage());
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                            </button>
                        </div>}

                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

kkkkk
                        {order.items.map(item =>
                            <MenuItem key={keyNum++} item={item} />
                        )}
                        <p className="orderCardTotal">Total: ${formatMoney(order.total)}</p>
                        <div className="orderCardBtns">
                            <button className="deleteBtn" onClick={event => dispatch(deleteAnOrder(order))}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" /></svg>
                            </button>
                            <button className="orderCardBtn completeBtn" onClick={event => dispatch(deleteAnOrder(order))}>COMPLETED</button>
                        </div>
                    </div>
                )}
            </div>}
        </div >
    );
}

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}