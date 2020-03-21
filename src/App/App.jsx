import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';

function App() {
  library.add(fab, far, fas);
  const initialPages = [
    {
      id: 1,
      parentTabId: null,
      canBeClosed: false,
      tab: {
        title: 'Airbnb',
        icon: ['fab', 'airbnb'],
        badge: {
          type: 'warning',
          quantity: 8,
        },
      },
      component: {
        type: 'span',
        props: {
          className: 'badge badge-warning text-wrap',
          children: 'any content 1',
        },
      },
    },
    {
      id: 3,
      parentTabId: null,
      canBeClosed: true,
      tab: {
        title: 'Address',
        icon: ['far', 'address-card'],
        badge: null,
      },
      component: {
        type: 'span',
        props: {
          className: 'badge badge-secondary text-wrap',
          children: 'any content 3',
        },
      },
    },
    {
      id: 4,
      parentTabId: 1,
      canBeClosed: true,
      tab: {
        title: 'Adjust',
        icon: ['fas', 'adjust'],
        badge: {
          type: 'primary',
          quantity: 5,
        },
      },
      component: {
        type: 'span',
        props: {
          className: 'badge badge-primary text-wrap',
          children: 'any content 4',
        },
      },
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pages, setPages] = useState(initialPages);
  const tabs = [];
  const tabPanels = [];

  const onTabClose = (closedPage) => {
    const indexToRemove = pages.indexOf(closedPage);
    const newPages = [
      ...pages.slice(0, indexToRemove),
      ...pages.slice(indexToRemove + 1),
    ];
    let newIndex = 0;
    if (selectedIndex >= indexToRemove) { // to the right
      newIndex = selectedIndex - 1;
    } else { // to the left
      newIndex = selectedIndex;
    }
    if (closedPage.parentTabId && pages[selectedIndex].id === closedPage.id) {
      newIndex = newPages.findIndex(
        (element) => element.id === closedPage.parentTabId,
      );
    }
    setSelectedIndex(newIndex);
    setPages(newPages);
  };

  pages.forEach((page) => {
    tabs.push(
      <Tab key={page.id}>
        <FontAwesomeIcon icon={page.tab.icon} />
        <span className="ml-1">{page.tab.title}</span>
        {page.tab.badge ? (
          <span className={`badge badge-${page.tab.badge.type} ml-1`}>
            {page.tab.badge.quantity}
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
        <page.component.type {...page.component.props} />
      </TabPanel>,
    );
  });

  return (
    <div>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList>{tabs}</TabList>
        {tabPanels}
      </Tabs>
    </div>
  );
}

export default App;
