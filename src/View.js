import { Link } from 'react-router-dom';

export default function View() {
    return (
        <div className="viewBtns">
            <Link className="viewBtn" to={`/`}>HOME</Link>
            <Link className="viewBtn" to={`/customer`}>CUSTOMER PORTAL</Link>
            <Link className="viewBtn" to={`/employee`}>EMPLOYEE PORTAL</Link>
        </div>
    )
}