import axiosClient from './axiosClient'

const usersApi = {
    login: (email, password) => {
        return axiosClient.post('/login', {
            email,
            password,
        })
    },
    register: (username, email, password, role_ticker, department_id) => {
        return axiosClient.post('/user/add', {
            username,
            email,
            password,
            role_ticker,
            department_id,
        })
    },
    getProfile: (id, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.get(`/api/users/${id}`, config)
    },
    updateProfile: (user, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.put(`/api/users/profile`, user, config)
    },
    updateUserByAdmin: (user, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.put(`/api/users/${user.id}`, user, config)
    },
    listAllUsers: (token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.get(`/api/users/`, config)
    },
    deleteUser: (id, token) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
        return axiosClient.delete(`/api/users/${id}/delete`, config)
    },
}

export default usersApi