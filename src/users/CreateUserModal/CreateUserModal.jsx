import { memo, useEffect, useState } from "react"
import { Modal } from "../../components/Modals/Modal/Modal"
import { Button } from "../../components/Button/Button"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './createUserModal.css'
import '../../styles/usersModal.css'

export const CreateUserModal = memo(({ isOpen, onClose, onSubmit }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        avatar: '',
        login: '',
        password: ''
    })
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                avatar: '',
                login: '',
                password: ''
            })
            setError('');
        }
    }, [isOpen])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await onSubmit(formData)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Создание нового пользователя"
        >
            <form onSubmit={handleSubmit} className="create-user-form user-form__modal">
                <fieldset>
                    <legend>Создание пользователя</legend>
                    <p className="form-group">
                        <label htmlFor="name" className="form-label">Имя:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </p>

                    <p className="form-group">
                        <label htmlFor="avatar" className="form-label">Ссылка на аватарку</label>
                        <input
                            type="url"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </p>

                    <p className="form-group">
                        <label htmlFor="login">Логин:</label>
                        <input
                            type="text"
                            name="login"
                            className="form-input"
                            value={formData.login}
                            onChange={handleChange}
                            required
                        />
                    </p>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Пароль:</label>
                        <div className="form-group__input">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </Button>
                        </div>
                    </div>
                    {error && (
                        <div className="error-message">{error}</div>
                    )}
                    <div className="form-actions form-action__creat-user">
                        <Button
                            type="submit"
                            className="btn btn-primary"
                            variant="primary"
                            disabled={loading}>
                            {loading ? 'Создаем...' : 'Создать'}
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Отмена
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Modal>
    )
})

CreateUserModal.displayName = 'CreateUserModal'