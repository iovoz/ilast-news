import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

function Fragment(props) {
    return props.children || <span {...props}/> || null;
}

class IntlWrapper extends Component {
    static propTypes = {
        lang: PropTypes.string.isRequired,
        store: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
        locales: PropTypes.shape({
            'en': PropTypes.object
        }).isRequired
    };

    render() {
        const { lang, store, locales, children } = this.props;

        return (
            <Provider store={store}>
                <IntlProvider locale={lang} messages={locales[lang]} textComponent={Fragment}>
                    {children}
                </IntlProvider>
            </Provider>
        );
    }
}

export default connect(null, null)(IntlWrapper);
