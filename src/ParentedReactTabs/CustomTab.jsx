import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const propTypes = forbidExtraProps({
  onTabClose: PropTypes.func,
  tab: PropTypes.object.isRequired,
});

const defaultProps = {
  onTabClose: undefined,
};


function CustomTab({ tab, onTabClose }) {
  return (
    <>
      <FontAwesomeIcon icon={tab.icon} />
      <span className="ml-1">{tab.title}</span>
      {tab.badge ? (
        <span className={`badge badge-${tab.badge?.type} ml-1`}>
          {tab.badge?.quantity}
        </span>
      ) : (
        ''
      )}
      {onTabClose ? (
        <button
          className="btn btn-danger btn-xs ml-2"
          type="button"
          onClick={(event) => {
            if (event) event.stopPropagation();
            onTabClose();
          }}
        >
          <FontAwesomeIcon icon={['fas', 'times']} />
        </button>
      ) : (
        ''
      )}
    </>
  );
}

CustomTab.propTypes = propTypes;
CustomTab.defaultProps = defaultProps;

export default CustomTab;
