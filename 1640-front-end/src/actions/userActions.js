import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_REGISTER_RESET,
    USER_UPDATE_BY_ADMIN_REQUEST,
    USER_UPDATE_BY_ADMIN_SUCCESS,
    USER_UPDATE_BY_ADMIN_FAIL,
} from '../constants/userConstants'
import usersApi from '../api/usersApi'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const data = await usersApi.login(email, password)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', data ? JSON.stringify(data) : {})
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err,
        })
    }
}

export const register = (username, email, password, role_ticker, department_id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const data = await usersApi.register(username, email, password, role_ticker, department_id)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', data ? JSON.stringify(data) : {})
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const data = await usersApi.getProfile(id, userInfo.token)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const data = await usersApi.listAllUsers(userInfo.token)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: err,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const data = await usersApi.updateProfile(user, userInfo.token)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err,
        })
    }
}

export const updateUserByAdmin = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_BY_ADMIN_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const data = await usersApi.updateUserByAdmin(user, userInfo.token)

        dispatch({ type: USER_UPDATE_BY_ADMIN_SUCCESS })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({
            type: USER_UPDATE_BY_ADMIN_FAIL,
            payload: err,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const data = await usersApi.deleteUser(id, userInfo.token)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_REGISTER_RESET })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: USER_LOGOUT })
}