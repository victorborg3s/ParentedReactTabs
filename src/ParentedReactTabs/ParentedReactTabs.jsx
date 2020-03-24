import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import CustomTab from './CustomTab';
import { propTypes, defaultProps } from './ParentedReactTabsProps';

import 'react-tabs/style/react-tabs.css';

/**
 * Knows how to draw tabs and is respective content that comes strutured into array of objects set
 * on ```pages``` property.
 *
 * @author [Victor Borges](https://github.com/victorborg3s)
 */
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
            addNewChildPage: (canBeClosed, tab, component) => {
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
