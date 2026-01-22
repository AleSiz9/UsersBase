import { memo, useEffect, useState } from "react"
import { Button } from "../../components/Button/Button"
import { Modal } from "../../components/Modals/Modal/Modal"
import './editUserModal.css'
import '../../styles/usersModal.css'


export const EditUserModal = memo(({ isOpen, onClose, user, onSubmit, onDelete }) => {
    const [formData, setFormData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        avatar: user?.avatar || ''
    });
    const [modalLoading, setModalLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                name: user.name || '',
                avatar: user.avatar || ''
            });
        }
        setError('')
    }, [user]);

    const handleDelete = async () => {
        setModalLoading(true);
        setError('');

        try {
            await onDelete?.(user.id);
            setModalLoading(false);
        } catch (error) {
            setError(error.message || 'Ошибка удаления пользователя');
            setModalLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalLoading(true);
        setError('');
        try {
            await onSubmit(formData);
            onClose()
        } catch (error) {
            setError(error.message || 'Ошибка обновления пользователя');
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Редактирование пользователя">
            <form onSubmit={handleSubmit} className="edit-user-form user-form__modal">
                <fieldset>
                    <legend>Редактирование пользователя</legend>
                    <p className="form-group">
                        <label htmlFor="id" className="form-label">id</label>
                        <input
                            type="text"
                            name="id"
                            className="form-input"
                            value={formData.id}
                            disabled
                        />
                    </p>
                    <p className="form-group">
                        <label htmlFor="name" className="form-label">Имя</label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Напишите имя"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </p>
                    <p className="form-group">
                        <label htmlFor="avatar" className="form-label">Сылка на аватарку</label>
                        <input
                            type="url"
                            name="avatar"
                            className="form-input"
                            placeholder="Добавьте ссылку для аватарки"
                            value={formData.avatar}
                            onChange={handleChange}
                        />
                    </p>
                    {error && (
                        <div className="error-message">{error}</div>
                    )}
                </fieldset>
                <div className="form-actions form-action__edit-user">
                    <Button
                    className="btn btn-secondary"
                        onClick={handleDelete}
                        disabled={modalLoading}
                    >
                        {modalLoading ? 'Удаление...' : 'Удалить'}
                    </Button>
                    <div className="form-actions__right">
                        <Button
                        className="btn btn-secondary"
                            disabled={modalLoading}
                            type="submit"
                        >
                            {modalLoading ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                        <Button
                        disabled={modalLoading}
                        className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
})

EditUserModal.displayName = 'EditUserModal'