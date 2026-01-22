import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userAPI } from "../../servis/api";
import { Button } from "../../components/Button/Button";
import './register.css'
import '../../styles/authForms.css'

export const Register = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState:
        { errors, isSubmitting }
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            login: '',
            avatar: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        setLoading(true)
        setError('')
        try {
            await userAPI.createUser({
                login: data.login,
                password: data.password,
                avatar: data.avatar
            })
            reset()
            navigate('/')
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-form register">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="register__form">
                <fieldset disabled={isSubmitting}>
                    <legend>Регистрация</legend>
                    <p>
                        <label htmlFor="login">Логин</label>
                        <input
                            type="text"
                            name="login"
                            placeholder="Придумайте логин"
                            {...register('login', {
                                required: 'Логин обязательно',
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Максимум 20 символов'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Только латинские буквы'
                                }
                            })}
                        />
                        {errors.login && (
                            <span>{errors.login.message}</span>
                        )}
                    </p>
                    <div>
                        <label htmlFor="password">Пароль</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Придумайте пароль"
                                {...register('password', {
                                    required: 'Пароль обязателен',
                                    minLength: {
                                        value: 6,
                                        message: 'Минимум 6 символов'
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: 'Только латинские буквы (A-Z, a-z)'
                                    }
                                })}
                            />
                            <Button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </Button>
                        </div>
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}
                    </div>
                    <p>
                        <label htmlFor="avatar">Ссылка на аватарку</label>
                        <input
                            type="url"
                            name="avatar"
                            id="avatar"
                            placeholder="Добавте ссылку для фото аватара"
                        />
                        {errors.avatar && (
                            <span>{errors.avatar.message}</span>
                        )}
                    </p>
                </fieldset>
                <div className="register__button">
                    <Button
                        aria-label="Регистрация пользователя"
                        type="submit"
                        className="btn btn__register"
                    >
                        {loading ? 'Регистрируем...' : 'Зарегестрироваться'}
                    </Button>
                    <Link to="/">Вход в личный кабинет</Link>
                </div>
                {error && (
                    <div className="error-message">{error}</div>
                )}
            </form>
        </div>
    )
}