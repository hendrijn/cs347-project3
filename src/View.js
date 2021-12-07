import { Link } from 'react-router-dom';

export default function View() {
    return (
        <div className="viewBtns">
            <Link className="viewBtn" to={`/customer`}>Customer Portal</Link>
            <Link className="viewBtn" to={`/employee`}>Employee Portal</Link>
        </div>
    )
}