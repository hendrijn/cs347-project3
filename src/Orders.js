import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllOrders, deleteAnOrder } from './actions';
import { useDispatch } from 'react-redux';

export default function Orders() {

    const dispatch = useDispatch();
    const isProgressing = useSelector(state => state.isProgressing);
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
                        <h2>{order.name}</h2>
                        {order.items.map(item =>
                            <p key={keyNum++}>{item.item} : ${formatMoney(item.price)}</p>
                        )}
                        <p className="orderCardTotal">Total: ${formatMoney(order.total)}</p>
                        <div className="orderCardBtns">
                            {/* add fetch for deleting */}
                            <button className="deleteBtn" onClick={event => dispatch(deleteAnOrder(order))}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" /></svg>
                            </button>
                            <button className="orderCardBtn completeBtn" onClick={event => dispatch(deleteAnOrder(order))}>COMPLETED</button>
                        </div>
                    </div>
                )}
            </div>}
        </div>
    );
}

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}