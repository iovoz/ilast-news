import React from 'react';
import { shallow } from 'enzyme';
import NewsPreview from './NewsPreview';
import moment from 'moment';

describe('<NewsPreview />', () => {
    let component;

    beforeEach(() => {
        component = shallow(<NewsPreview data={{}}/>);
    });

    it('should render date correctly', () => {
        const data = {
            'source': {
                'id': 'crypto-coins-news',
                'name': 'Crypto Coins News'
            },
            'author': 'Ali Martinez',
            'title': 'TRON Ranks #2, Way Ahead of Bitcoin in China’s Latest Crypto Rankings',
            'description': 'China’s Center for Information and Industry Development released…',
            'url': 'https://www.ccn.com/tron-eos-bitcoin-china-crypto-rankings/',
            'urlToImage': 'https://www.ccn.com/wp-content/uploads/2019/10/Crypto-coins-stock.jpg',
            'publishedAt': '2019-10-30T06:28:30Z',
            'content': 'XEM and GXChain removed from the CCIDs crypto raking index.… [+2433 chars]'
        };

        component.setProps({
            data
        });
        const date = moment.utc('2019-10-30T06:28:30Z').local().format('YYYY-MM-DD HH:mm:ss');
        expect(component.find('.date').text()).toEqual(date);
    });
});
