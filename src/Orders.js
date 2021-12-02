import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchAllOrders } from './actions';
import { useDispatch } from 'react-redux';

export default function Orders() {

    const dispatch = useDispatch();

    //pulls down things from the database
    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const orders = useSelector(state => state.orders);

    return (
        <div className="orders">
            {orders.map(order =>
                <div className="orderCard" key={order.id}>
                    <h2>{order.name}</h2>
                    <p>{order.items}</p>
                    <p>${order.total}</p>
                </div>
            )}
        </div>
    );
}