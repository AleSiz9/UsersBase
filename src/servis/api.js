import bcrypt from "bcryptjs";

export const API_URL = 'https://696b6a70624d7ddccaa12b8a.mockapi.io/user/users'
const saltRounds = 10

export const userAPI = {
    async createUser(userData) {
        try {
            const checkUsersLogin = await fetch(`${API_URL}?login=${encodeURIComponent(userData.login)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(checkUsersLogin.ok) {
                const res = await checkUsersLogin.json()
                if(Array.isArray(res) && res.length > 0 ) {
                    throw new Error('Пользователь с таким логином уже существует')
                }
            }
            const password = await bcrypt.hash(userData.password, saltRounds)
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: userData.login,
                    password,
                    isLoggedIn: true,
                    name: userData.name || '{name}',
                    avatar: userData.avatar || '',
                    createdAt: new Date().toISOString()
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка создания пользователя')
            }
            const redactUser = await response.json()
            const { password: _, ...newUserData } = redactUser;
            console.log(newUserData)
            return newUserData

        } catch (error) {
            throw new Error(error.message)
        }
    },

    async getUsersData() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            };
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Ошибка при получении данных', error)
            return []
        }
    },

    async updateUser(userId, updatedFieldts) {
        try {
            const response = await fetch(`${API_URL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFieldts)
            })

            if (!response.ok) {
                throw new Error('Произошла ошибка')
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Ошибка изменения полей', error);
            throw error
        }
    },

    async deleteUser(userId) {
        try {
            const response = await fetch(`${API_URL}/${userId}`, {
                method: 'DELETE',
            })
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                return true;
            }

            return await response.json();
        } catch (error) {
        console.error('Ошибка в deleteUser:', error);
        throw error;
        }
    }
}
