import { useForm } from "react-hook-form";
import { useAuth } from "../../servis/authService/authService";
import { Button } from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './login.css'
import '../../styles/authForms.css'
import '../../styles/buttonShowToggle.css'

export const Login = () => {
    const { login, loading, error, clearError } = useAuth();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        return () => {
            clearError();
        };
    }, []);

    const {
        register,
        handleSubmit,
        formState:
        { errors, isSubmitting }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            login: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        clearError();
        const result = await login(data.login, data.password);
        if (result.success) {
            navigate('/users-page')
        }
    };

    return (
        <div className="auth-form login">
            <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                <fieldset disabled={isSubmitting || loading}>
                    <legend>Вход</legend>
                    <p className="login-input-wrapper">
                        <label htmlFor="username">Логин</label>
                        <input
                            type="text"
                            name="username"
                            aria-invalid={errors.username ? "true" : "false"}
                            aria-describedby={errors.username ? "username-error" : undefined}
                            placeholder="Напишите логин"
                            {...register('login', {
                                required: 'Введите логин',
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Слишком длинный логин'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Только латинские буквы'
                                },
                            })}
                        />
                    </p>
                    <div>
                        <label htmlFor="password">Пароль</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                aria-invalid={errors.password ? "true" : "false"}
                                aria-describedby={errors.password ? "password-error" : undefined}
                                placeholder="Введите пароль"
                                {...register('password', {
                                    required: 'Введите пароль',
                                    minLength: {
                                        value: 6,
                                        message: 'Минимум 6 символов'
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="error-message">{errors.password.message}</span>
                        )}
                    </div>
                    {error && (
                        <span className="error-message">{error}</span>
                    )}
                </fieldset>
                <div>
                    <Button
                        className="btn btn__login"
                        type="submit"
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </Button>

                    <Link to="/register">Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    )
}