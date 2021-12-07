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
            <form>
                <label className="custNameInput">
                    Name:
                <input type="text" required value={name} onChange={event => setName(event.target.value)} />
                </label>

                {custOrder.items.map(item =>
                    <div className="ticketItems">
                        <button onClick={event => dispatch(removeItemFromTicket(item))}>X</button>
                        <MenuItem key={item.item} item={item} />
                    </div>
                )}

                <div className="ticketBottom">
                    <p className="ticketTotal">Total: ${formatMoney(getTotal(custOrder))}</p>
                    <button type="submit"
                        onClick={() => dispatch(postNewOrder(name, custOrder.items, getTotal(custOrder)))}
                    >Place Order</button>
                </div>
            </form>
        </div >
    );
};

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export function getTotal(custOrder) {
    let sum = 0.00;
    for (let i = 0; i < custOrder.items.length; i++) {
        sum += custOrder.items[i].price;
    }
    return sum;
}