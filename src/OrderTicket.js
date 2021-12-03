import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewOrder } from './actions';

export default function OrderTicket() {
    const custOrder = useSelector(state => state.custOrder);
    const [name, setName] = useState();
    const [items, setItems] = useState();
    const [total, setTotal] = useState();
    const dispatch = useDispatch();

    return (
        <div className="ticket">
            <h2>Order Ticket</h2>
            <label className="custNameInput">
                Name:
                <input type="text" value={name} />
            </label>
            {custOrder.items.map(item =>
                <p>{item.item} : ${formatMoney(item.price)}</p>
            )}
            <div className="ticketBottom">
                <p className="ticketTotal">Total: ${formatMoney(custOrder.total)}</p>
                <button
                    onClick={() => dispatchEvent(postNewOrder(name, items, total))}
                >Place Order</button>
            </div>
        </div>
    );
};

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}