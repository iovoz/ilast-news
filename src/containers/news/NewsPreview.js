import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class NewsPreview extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    render() {
        const { data } = this.props;
        const date = data.publishedAt ? moment.utc(data.publishedAt).local().format('YYYY-MM-DD HH:mm:ss') : '';
        const domain = data.source ? data.source.name : '';

        return (
            <div className="item">
                <a href={data.url} target="_blank" rel="noopener noreferrer">
                    <div className="item-content">
                        <div className="top">
                            <div className="avatar">{domain.substring(0, 1)}</div>
                            <div className="text">
                                <div className="domain">{domain}</div>
                                <div className="date">{date}</div>
                            </div>
                        </div>
                        <div className="thumbnail">
                            <img src={data.urlToImage || `/us-news-400x400.png`} alt={data.title} className="bg"/>
                        </div>
                        <div className="content">
                            <div className="title">{data.title}</div>
                            <div className="desc">{data.description}</div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}
