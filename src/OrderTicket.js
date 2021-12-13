import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewOrder, removeItemFromTicket } from './actions';
import MenuItem from './MenuItem';

export default function OrderTicket() {
    const custOrder = useSelector(state => state.custOrder);
    const isProgressing = useSelector(state => state.isProgressing);
    const errorMessage = useSelector(state => state.customerErrorMessage);
    const [name, setName] = useState();
    const dispatch = useDispatch();
    let keyNum = 0;

    return (
        <div className="ticket">
            {isProgressing && <div className="spinner" />}
            <h2>Order Ticket</h2>
            {!isProgressing && <div>
                <label className="custNameInput">
                    Name:
                    <input type="text" onChange={event => setName(event.target.value)} />
                </label>

                {errorMessage && <p className="errorMessage">{errorMessage}</p>}

                {custOrder.items.map(item =>
                    <div key={keyNum++} className="ticketItems">
                        <button onClick={event => dispatch(removeItemFromTicket(item))}>X</button>
                        <MenuItem key={item.item} item={item} />
                    </div>
                )}

                <div className="ticketBottom">
                    <p className="ticketTotal">Total: ${formatMoney(getTotal(custOrder))}</p>
                    <button className="viewBtn"
                        onClick={() => dispatch(postNewOrder(name, custOrder.items, getTotal(custOrder), custOrder.isEditing))}
                    >PLACE ORDER</button>
                </div>
            </div>}

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