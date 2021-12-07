import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { addItemToTicket } from './actions';

export default function Menu() {
    const items = useSelector(state => state.menuItems);
    const dispatch = useDispatch();
    let keyNum = 0;

    return (
        <div className="menu">
            <h2>Menu</h2>
            {items.map(item =>
                <div key={keyNum++} className="menuItem-AddBtn">
                    <MenuItem key={item.item} item={item} />
                    <button className="orderCardBtn completeBtn" onClick={() => dispatch(addItemToTicket(item))}>Add to Order</button>
                </div>
            )}
        </div>
    );
};
