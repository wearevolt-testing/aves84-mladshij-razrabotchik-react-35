import React from 'react';
import PropTypes from 'prop-types';

export default function withContext(C, context) {
  return class extends React.Component {
    static childContextTypes = Object.keys(context).reduce((s, e) => {
      s[e] = PropTypes.any;
      return s;
    }, {});

    getChildContext() {
      return context;
    }

    render() {
      return <C {...this.props} />;
    }
  };
}
