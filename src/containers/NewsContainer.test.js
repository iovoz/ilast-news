import React from 'react';
import { shallow } from 'enzyme';
import { NewsContainer } from './NewsContainer';
import { createIntl } from 'react-intl';
import messages from '../locales/en.json';

describe('<NewsContainer />', () => {
    const intl = createIntl({
        locale: 'en',
        defaultLocale: 'en',
        messages
    });

    let component;

    beforeEach(() => {
        component = shallow(<NewsContainer intl={intl} ajaxStatus={{}} fetchNews={() => {
        }} page={1} keyword={''} list={[]}/>);
    });

    it('should render properly', () => {
        expect(component.find('.page').exists());
    });

    it('should render no news application', () => {
        expect(component.find('.list-item').length).toEqual(0);
    });

    it('should render news item', () => {
        const list = [
            {
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
            }];

        component.setProps({
            list
        });
        expect(component.find('.list-item').length).toEqual(1);
    });
});
