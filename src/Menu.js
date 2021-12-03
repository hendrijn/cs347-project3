import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';

export default function Menu() {
    const items = useSelector(state => state.menuItems);

    return (
        <div className="menu">
            <h2>Menu</h2>
            {items.map(item =>
                <div className="menuItem-AddBtn">
                    <MenuItem key={item.item} item={item} />
                    <button>Add to Order</button>
                </div>
            )}
        </div>
    );
};
