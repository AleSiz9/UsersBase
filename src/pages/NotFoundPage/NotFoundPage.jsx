import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to="/">На главную</Link>
        </div>
    );
};