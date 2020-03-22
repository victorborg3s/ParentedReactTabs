import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import CustomTab from './CustomTab';

import 'react-tabs/style/react-tabs.css';

const propTypes = forbidExtraProps({
  addNewPage: PropTypes.func.isRequired,
  changeToTab: PropTypes.func.isRequired,
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
  addNewPage, changeToTab, onIndexChange, onTabClose, pages, selectedIndex,
}) {
  library.add(fab, far, fas);

  const tabs = [];
  const tabPanels = [];

  pages.forEach((page) => {
    tabs.push(
      <Tab key={page.id}>
        <CustomTab
          tab={page.tab}
          onTabClose={!page.canBeClosed ? undefined : () => {
            onTabClose(page);
          }}
        />
      </Tab>,
    );
    tabPanels.push(
      <TabPanel key={page.id}>
        {React.createElement(
          page.component.type,
          {
            ...page.component.props,
            addNewPage: (canBeClosed, tab, component) => {
              addNewPage(page.id, canBeClosed, tab, component);
            },
            goToParent: !page.parentId ? undefined : () => changeToTab(page.parentId),
          },
        )}
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
