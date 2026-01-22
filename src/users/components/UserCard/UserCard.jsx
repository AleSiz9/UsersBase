import { memo } from "react"
import { Button } from "../../../components/Button/Button"
import "./userCard.css"

export const UserCard = memo((props) => {
    const {
        id,
        className = '',
        src,
        name,
        createdAt,
        onClick
    } = props

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Дата не указана'
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options)
    }
    return (
        <div className={`user-card ${className}`} id={id}>
            <div className="user-card__avatar">
                <img
                    src={src || 'default-avatar.png'}
                    alt={`Фото профиля ${name}`}
                    className="user-card__image"
                />
            </div>
            <div className="user-card__info">
                <Button onClick={onClick}
                    className="user-card__btn"
                >
                    {name}
                </Button>
                {createdAt && (
                    <span className="user-card__date">Зарегестрирован {formatDate(createdAt)}</span>
                )}
            </div>
        </div>
    )
}, (prevProps, nextProps) => {
    return (
        prevProps.id === nextProps.id &&
        prevProps.className === nextProps.className &&
        prevProps.src === nextProps.src &&
        prevProps.name === nextProps.name &&
        prevProps.createdAt === nextProps.createdAt &&
        prevProps.onClick === nextProps.onClick
    );
});

UserCard.displayName = 'UserCard'