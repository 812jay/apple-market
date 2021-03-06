import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    CHANGE_BOOKMARK,
    GET_BOOKMARK_ITEMS,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case CHANGE_BOOKMARK:
            return {...state }
        case GET_BOOKMARK_ITEMS:
            return {...state }
        default:
            return state;
    }
}