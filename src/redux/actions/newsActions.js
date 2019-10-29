import { FETCH_PENDING, FETCH_COMPLETE, SERVER_ERROR } from '../reducers/ajaxStatusReducer';
import { FETCH_NEWS } from '../reducers/newsReducer';
import axios from 'axios';
import constants from '../../constants/constants';

export function fetchNews(keyword, page) {
    return async dispatch => {
        try {
            dispatch({
                type: FETCH_PENDING
            });

            let url = `https://newsapi.org/v2/everything?domains=washingtonpost.com,nytimes.com
                &apiKey=${constants.apiKey}&pageSize=${constants.pageSize}&page=${page}`;
            if (keyword) url += `&q=${keyword}`;

            const response = await axios.get(url);

            dispatch({
                type: FETCH_NEWS,
                keyword,
                page,
                list: response.data.articles || []
            });

            dispatch({
                type: FETCH_COMPLETE
            });
        } catch (e) {
            dispatch({
                type: SERVER_ERROR,
                serverStatus: e.response.status,
                serverMessage: e.response.message
            });
        }
    };
}
