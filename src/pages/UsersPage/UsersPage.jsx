import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userAPI } from "../../servis/api"
import { useAuth } from "../../servis/authService/authService"
import { useModal } from "../../hooks/useModal"
import { EditUserModal } from "../../users/EditUserModal/EditUserModal"
import { CreateUserModal } from "../../users/CreateUserModal/CreateUserModal"
import { UserList } from "../../users/components/UserList/UserList"
import { Button } from "../../components/Button/Button"
import "./usersPage.css"


export const UsersPage = () => {
    const { logout } = useAuth()
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(false)
    const [listRefreshing, setListRefreshing] = useState(false)
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const createUserModal = useModal()
    const editUserModal = useModal()
    const [selectedUser, setSelectedUser] = useState(null)


    const fetchUsers = useCallback(async (showPageLoading = false) => {
        if (showPageLoading) {
            setPageLoading(true)
        }
        setError('')
        try {
            const usersData = await userAPI.getUsersData()
            if (usersData.length === 0) {
                setError('Пользователи не найдены')
                setUsers([]);
            }

            if (usersData.status === 404) {
                navigate('/404');
                return;
            }

            setUsers(usersData)
        } catch (error) {
            setError('Не удалось загрузить пользователей')
            console.error(error)
        } finally {
            if (showPageLoading) {
                setPageLoading(false)
            }
        }
    }, [navigate])
    useEffect(() => {
        fetchUsers(true)
    }, [fetchUsers])

    const handleCreateUser = useCallback(async (userData) => {
        try {
            setListRefreshing(true)
            await userAPI.createUser(userData)
            createUserModal.closeModal()
            await fetchUsers(false)
        } catch (error) {
            console.error('Ошибка создания пользователя:', error)
            throw error;
        } finally {
            setListRefreshing(false)
        }
    }, [createUserModal, fetchUsers])

    const handleUpdateUser = useCallback(async (userData) => {
        try {
            setListRefreshing(true)
            const response = await userAPI.updateUser(selectedUser.id, userData);

            setUsers(prev => prev.map(user =>
                user.id === selectedUser.id
                    ? { ...user, ...response }
                    : user
            ));

            editUserModal.closeModal();

            setSelectedUser(null);

            return true;

        } catch (error) {
            console.error('Ошибка обновления пользователя:', error);
            throw error;
        } finally {
            setListRefreshing(false)
        }
    }, [selectedUser, editUserModal]);

    const handleDeleteUser = useCallback(async (userId) => {
        try {
            setListRefreshing(true);

            await userAPI.deleteUser(userId);

            setUsers(prev => prev.filter(user => user.id !== userId));

        } catch (error) {
            console.error('Ошибка удаления:', error);
        } finally {
            setListRefreshing(false);
        }
    }, []);

    const handleEditUser = useCallback((user) => {
        setSelectedUser(user)
        editUserModal.openModal()
    }, [editUserModal])

    if (pageLoading) {
        return <div className="users-loading">
            <div className="spinner"></div>
            <p className="info-message">Загрузка пользователей...</p>
        </div>
    }
    return (
        <div className="users-page">
            <div className="users-header">
                <Button
                    className="btn btn-logout"
                    onClick={logout}
                >
                    Выход
                </Button>
            </div>
            <div className="users-main">
                <div className="users-grid">
                    {listRefreshing ? (
                        <div className="users-loading">
                            <div className="spinner"></div>
                            <p className="info-message">Обновление данных...</p>
                        </div>
                    ) : (
                        <UserList
                            users={users}
                            onEditUsers={handleEditUser}
                            className="users-list-container"
                        />
                    )}
                    {error && (
                        <span className="users-message">{error}</span>
                    )}
                    <div className="create-user-section">
                        <Button onClick={() => createUserModal.openModal()} className="btn create-user-btn">
                            Создать пользователя
                        </Button>
                    </div>
                </div>
            </div>
            <CreateUserModal
                isOpen={createUserModal.isOpen}
                onClose={createUserModal.closeModal}
                onSubmit={handleCreateUser}
            />
            <EditUserModal
                isOpen={editUserModal.isOpen}
                onClose={editUserModal.closeModal}
                onSubmit={handleUpdateUser}
                onDelete={handleDeleteUser}
                user={selectedUser}
            />
        </div>
    )
}