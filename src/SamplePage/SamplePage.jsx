import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const propTypes = forbidExtraProps({
  addNewChildPage: PropTypes.func.isRequired,
  goToParent: PropTypes.func,
});

const defaultProps = {
  goToParent: undefined,
};

function SamplePage({ addNewChildPage, goToParent }) {
  return (
    <div>
      {!goToParent
        ? ''
        : (
          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={goToParent}
          >
            I have a father! Click me and i&apos;ll show you who is he
          </button>
        )}
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={() => addNewChildPage(
          true,
          {
            title: 'Some New Page',
            icon: ['far', 'file'],
            badge: {
              type: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'][Math.floor(Math.random() * 8)],
              quantity: Math.floor(Math.random() * 10),
            },
          }, {
            type: SamplePage,
            props: {},
          },
        )}
      >
        Click me to add a new tab as child of this one...
      </button>
    </div>
  );
}

SamplePage.propTypes = propTypes;
SamplePage.defaultProps = defaultProps;

export default SamplePage;
