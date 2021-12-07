import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllOrders, deleteAnOrder } from './actions';
import { useDispatch } from 'react-redux';

export default function Orders() {

    const dispatch = useDispatch();

    //pulls down things from the database
    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const orders = useSelector(state => state.orders);
    return (
        <div className="employeePortal">
            <h1>Orders:</h1>
            <div className="orders">
                {orders.map(order =>
                    <div className="orderCard" key={order.id}>
                        <h2>{order.name}</h2>
                        {order.items.map(item =>
                            <p key={item.item}>{item.item} : ${formatMoney(item.price)}</p>
                        )}
                        <p className="orderCardTotal">Total: ${formatMoney(order.total)}</p>
                        <div className="orderCardBtns">
                            {/* add fetch for deleting */}
                            <button className="orderCardBtn" onClick={event => dispatch(deleteAnOrder(order))}>Delete</button>
                            <button className="orderCardBtn" onClick={event => dispatch(deleteAnOrder(order))}>Completed</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}