import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewOrder, removeItemFromTicket } from './actions';
import MenuItem from './MenuItem';

export default function OrderTicket() {
    const custOrder = useSelector(state => state.custOrder);
    const [name, setName] = useState();
    const dispatch = useDispatch();

    return (
        <div className="ticket">
            <h2>Order Ticket</h2>
            <label className="custNameInput">
                Name:
                <input type="text" value={name} onChange={event => setName(event.target.value)} />
            </label>

            {custOrder.items.map(item =>
                <div className="ticketItems">
                    <button onClick={event => dispatch(removeItemFromTicket(item))}>X</button>
                    <MenuItem key={item.item} item={item} />
                </div>
            )}

            <div className="ticketBottom">
                <p className="ticketTotal">Total: ${formatMoney(custOrder.total)}</p>
                <button
                    onClick={() => dispatch(postNewOrder(name, custOrder.items, custOrder.total))}
                >Place Order</button>
                <p className="ticketError">Please enter a name.</p>
            </div>
        </div>
    );
};

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}