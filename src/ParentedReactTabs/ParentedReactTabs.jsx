import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const propTypes = forbidExtraProps({
  onIndexChange: PropTypes.func.isRequired,
  onTabClose: PropTypes.func,
  pages: PropTypes.array,
  selectedIndex: PropTypes.number.isRequired,
});

const defaultProps = {
  onTabClose: null,
  pages: [],
};

function ParentedReactTabs({
  onIndexChange, onTabClose, pages, selectedIndex,
}) {
  library.add(fab, far, fas);

  const tabs = [];
  const tabPanels = [];

  pages.forEach((page) => {
    tabs.push(
      <Tab key={page.id}>
        <FontAwesomeIcon icon={page.tab.icon} />
        <span className="ml-1">{page.tab.title}</span>
        {page.tab.badge ? (
          <span className={`badge badge-${page.tab.badge?.type} ml-1`}>
            {page.tab.badge?.quantity}
          </span>
        ) : (
          ''
        )}
        {page.canBeClosed ? (
          <button
            className="btn btn-danger btn-xs ml-2"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onTabClose(page);
            }}
          >
            <FontAwesomeIcon icon={['fas', 'times']} />
          </button>
        ) : (
          ''
        )}
      </Tab>,
    );
    tabPanels.push(
      <TabPanel key={page.id}>
        {page.content}
      </TabPanel>,
    );
  });

  return (
    <Tabs
      selectedIndex={selectedIndex}
      onSelect={(newIndex) => onIndexChange(newIndex)}
    >
      <TabList>{tabs}</TabList>
      {tabPanels}
    </Tabs>
  );
}

ParentedReactTabs.propTypes = propTypes;
ParentedReactTabs.defaultProps = defaultProps;

export default ParentedReactTabs;
