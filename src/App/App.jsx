import React, { useState } from 'react';
import uniqid from 'uniqid';

import ParentedReactTabs from '../ParentedReactTabs';
import SamplePage from '../SamplePage';

import 'react-tabs/style/react-tabs.css';
import './App.css';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pages, setPages] = useState([]);

  function addPage(id, parentId, canBeClosed, tab, content) {
    console.log('pages', pages);
    const newPages = [...pages,
      {
        id,
        parentId,
        canBeClosed,
        tab,
        content,
      },
    ];
    console.log('newPages', newPages);
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
    setSelectedIndex(nextIndex);
  }

  function addASamplePage(parentId) {
    const newPageId = uniqid('ParentedReactTabsPage');
    addPage(newPageId, parentId, true, {
      title: 'Some New Page',
      icon: ['far', 'file'],
      badge: {
        type: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'][Math.floor(Math.random() * 8)],
        quantity: Math.floor(Math.random() * 10),
      },
    },
      <SamplePage
        addPage={() => addASamplePage(parentId)}
        goToParent={!parentId ? undefined : () => changeToTab(parentId)}
      />);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <SamplePage
            addPage={() => addASamplePage(null)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ParentedReactTabs
            pages={pages}
            selectedIndex={selectedIndex}
            onTabClose={removePage}
            onIndexChange={(newIndex) => setSelectedIndex(newIndex)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
