export default function MenuItem(props) {
    const { item } = props;
    return (
        <div className="menuItem">
            <p>{item.item} : ${formatMoney(item.price)}</p>
        </div>

    );
}

export function formatMoney(value) {
    return value.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

