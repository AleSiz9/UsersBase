import { memo, useEffect, useState } from "react";
import { UserCard } from "../../../users/components/UserCard/UserCard";
import './userList.css'

export const UserList = memo(({ users, onEditUsers }) => {
    const [visibleCount, setVisibleCount] = useState(10);
    const MAX_VISIBLE = 10;

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + MAX_VISIBLE);
    };
    useEffect(() => {
        setVisibleCount(10);
    }, [users.length]);
    const visibleUsers = users.slice(0, visibleCount);

    const hasMoreUsers = users.length > visibleCount;

    return (
        <div className="users-list">
            {visibleUsers.map(user => (
                <UserCard
                    key={user.id}
                    id={user.id}
                    data-user-id={user.id}
                    src={user.avatar}
                    name={user.name}
                    createdAt={user.createdAt}
                    onClick={() => onEditUsers(user)}
                    users={user}
                />
            ))}
            <div className="show-more-container">
                {hasMoreUsers && (
                    <button
                        onClick={handleShowMore}
                        className="btn show-more-btn"
                    >
                        Показать ещё ({users.length - visibleCount})
                    </button>
                )}
            </div>
        </div>
    )
})

UserList.displayName = 'UserList'