import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import NewsPreview from './news/NewsPreview';
import LoadingContainer from '../components/loading/LoadingContainer';
import _ from 'lodash';
import { fetchNews } from '../redux/actions/newsActions';

class NewsContainer extends Component {
    static propTypes = {
        intl: PropTypes.object.isRequired,
        ajaxStatus: PropTypes.object.isRequired,
        fetchNews: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        keyword: PropTypes.string,
        list: PropTypes.array
    };

    static defaultProps = {
        keyword: '',
        list: []
    };

    liveSearch = e => {
        this.props.fetchNews(e.target.value, 1);
    };

    scrollSearch = () => {
        const { keyword, page, fetchNews, ajaxStatus } = this.props;
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            && !ajaxStatus.isLoading && page < 10 //Free account maximums 100 record for free account
        ) {
            fetchNews(keyword, page + 1);
        }
    };

    componentDidMount() {
        const { page, fetchNews } = this.props;
        fetchNews('', page);

        window.addEventListener('scroll', _.debounce(this.scrollSearch, 100));
    }

    render() {
        const { list, intl, ajaxStatus } = this.props;
        const placeholder = intl.formatMessage({ id: 'common.search' });

        return (
            <div className="page">
                <div className="header-section">
                    <div className="header-top-area">
                        <div className="header-container">
                            <div className="title"><FormattedMessage id="news.title"/></div>
                            <div className="search">
                                <i className="fa fa-search"/>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={placeholder}
                                    onChange={this.liveSearch}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="header-bg"/>
                </div>
                <div className="loaded-list">
                    {ajaxStatus.isServerError && ajaxStatus.serverMessage && (
                        <div className="col-lg-4 col-md-6 col-sm-8 col-12 alert alert-danger">
                            {ajaxStatus.serverMessage}
                        </div>
                    )}
                    {!ajaxStatus.isLoading && list.length === 0 && (
                        <div className="col-lg-4 col-md-6 col-sm-8 col-12 alert alert-warning">
                            <FormattedMessage id="common.notFound"/>
                        </div>
                    )}
                    {list.length > 0 && (
                        list.map((it, index) => {
                            return (
                                <div key={index} className="list-item">
                                    <NewsPreview data={it}/>
                                </div>
                            );
                        })
                    )}
                </div>
                <LoadingContainer loading={ajaxStatus.isLoading}>&nbsp;</LoadingContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ajaxStatus: state.ajaxStatus,
    keyword: state.news.keyword,
    page: state.news.page,
    list: state.news.list
});

export default connect(mapStateToProps, { fetchNews })(injectIntl(NewsContainer));
