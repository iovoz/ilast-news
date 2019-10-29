export const FETCH_PENDING = 'iLastNews/ajaxStatus/fetchPending';
export const FETCH_COMPLETE = 'iLastNews/ajaxStatus/fetchComplete';
export const SERVER_ERROR = 'iLastNews/ajaxStatus/serverError';
export const RESET_STATUS = 'iLastNews/ajaxStatus/resetStatus';

const initialState = {
    isServerError: false,
    isLoading: false,
    serverStatus: '',
    serverMessage: ''
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SERVER_ERROR:
            return {
                ...state,
                isServerError: true,
                isLoading: false,
                serverStatus: action.serverStatus,
                serverMessage: action.serverMessage
            };
        case FETCH_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_COMPLETE:
            return {
                ...state,
                isLoading: false,
                isServerError: false,
                serverStatus: ''
            };
        case RESET_STATUS:
            return {
                ...state,
                isServerError: false,
                isLoading: false,
                serverStatus: '',
                serverMessage: ''
            };
        default:
            return state;
    }
}
