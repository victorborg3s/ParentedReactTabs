import React, { useState } from 'react';
import uniqid from 'uniqid';

import ParentedReactTabs from '../ParentedReactTabs';
import SamplePage from '../SamplePage';

import 'react-tabs/style/react-tabs.css';
import './App.css';

/**
 * The App is the common ancestor of navigation components and the ```ParentedReactTabs```. So, it
 * should hold and manage state of pages and tabs. But it doesn't (and shouldn't) know what content
 * is being drawn on each tab. So, to allow add more tab, it delegates to child tabs through
 * ```addPage``` method.
 *
 * @author [Victor Borges](https://github.com/victorborg3s)
 */
function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pages, setPages] = useState([
    {
      id: uniqid('ParentedReactTabsPage'),
      parentId: undefined,
      canBeClosed: false,
      tab: {
        title: 'Some New Page',
        icon: ['far', 'file'],
        badge: {
          type: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'][Math.floor(Math.random() * 8)],
          quantity: Math.floor(Math.random() * 10),
        },
      },
      component: { type: SamplePage },
    },
  ]);

  function addPage(parentId, canBeClosed, tab, component) {
    const newPages = [...pages,
      {
        id: uniqid('ParentedReactTabsPage'),
        parentId,
        canBeClosed,
        tab,
        component,
      },
    ];
    setPages(newPages);
  }

  function removePage(pageToRemove) {
    const indexToRemove = pages.indexOf(pageToRemove);
    const newPages = [
      ...pages.slice(0, indexToRemove),
      ...pages.slice(indexToRemove + 1),
    ];
    let newIndex = 0;
    if (selectedIndex > indexToRemove) {
      newIndex = selectedIndex - 1;
    } else if (selectedIndex < indexToRemove) {
      newIndex = selectedIndex;
    } else if (pageToRemove.parentId) {
      newIndex = newPages.findIndex(
        (element) => element.id === pageToRemove.parentId,
      );
    }
    setSelectedIndex(newIndex);
    setPages(newPages);
  }

  function changeToTab(tabId) {
    const nextIndex = pages.findIndex((page) => page.id === tabId);
    setSelectedIndex(nextIndex === -1 ? 0 : nextIndex);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ParentedReactTabs
            pages={pages}
            selectedIndex={selectedIndex}
            onTabClose={removePage}
            onIndexChange={(newIndex) => setSelectedIndex(newIndex)}
            addNewPage={addPage}
            changeToTab={changeToTab}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
