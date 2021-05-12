import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    GET_BOOKMARK_ITEMS,
    CHANGE_BOOKMARK,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function changeBookmark(id) {
    const request = axios.get(`${USER_SERVER}/changeBookmark?productId=${id}`)
                .then(response => response.data);

    return {
        type: CHANGE_BOOKMARK,
        payload: request
    }
}

export function getBookmarkItems(bookmarkItems, userBookmark) {

    const request = axios.get(`/api/product/products_by_id?id=${bookmarkItems}&type=array`)
                .then(response => response.data);

    return {
        type: GET_BOOKMARK_ITEMS,
        payload: request
    }
}

