export const FETCH_NEWS = 'iLastNews/news/fetchNews';

const initialState = {
    list: [],
    keyword: '',
    page: 1
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                keyword: action.keyword,
                page: action.page,
                list: action.page === 1 ? [...action.list] : [...state.list, ...action.list]
            };
        default:
            return state;
    }
}
