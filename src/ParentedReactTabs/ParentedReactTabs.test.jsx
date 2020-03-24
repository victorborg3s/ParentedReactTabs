import React from 'react';
import { mount } from 'enzyme';
import {
  Tabs, TabList, Tab, TabPanel,
} from 'react-tabs';

import ParentedReactTabs from './ParentedReactTabs';

describe('<ParentedReactTabs />', () => {
  // Arrange
  function SomeContentComponent(props) {
    // eslint-disable-next-line react/prop-types
    const { id, color, children } = props;
    return <span id={id} style={{ color }}>{children}</span>;
  }
  const oneElementArrayWithMinimalConfigPage = [{
    id: 'someTabIdentifier',
    tab: {},
    component: {
      type: SomeContentComponent,
    },
  }];
  const moreThanOneElementArrayWithCompleteConfigPages = [
    {
      id: 'tab1',
      tab: {
        title: 'Tab 1',
        icon: ['fab', 'airbnb'],
        badge: {
          type: 'primary',
          quantity: 8,
        },
      },
      component: {
        type: SomeContentComponent,
        props: { children: 'this is tab1&apos;s RED content', color: 'red', id: 'spanTab1Content' },
      },
    },
    {
      id: 'tab2',
      tab: {
        title: 'Tab 2',
        icon: ['fab', 'react'],
        badge: {
          type: 'secondary',
          quantity: 7,
        },
      },
      component: {
        type: SomeContentComponent,
        props: { children: 'this is tab2&apos;s BLUE content', color: 'blue', id: 'spanTab2Content' },
      },
    },
  ];

  it('is able to mount when filling out only required properties', () => {
    // Act
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={() => {}}
        onIndexChange={() => {}}
        onTabClose={() => {}}
        selectedIndex={0}
      />,
    );
    // Assert
    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(TabList)).toHaveLength(1);
  });

  it('is able to draw tabs when pages is set as an array with one or more elements with minimal configuration', () => {
    // Act
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={() => {}}
        onIndexChange={() => {}}
        onTabClose={() => {}}
        selectedIndex={0}
        pages={oneElementArrayWithMinimalConfigPage}
      />,
    );
    // Assert
    expect(wrapper.find(Tab)).toHaveLength(oneElementArrayWithMinimalConfigPage.length);
    expect(wrapper.find(TabPanel)).toHaveLength(oneElementArrayWithMinimalConfigPage.length);
    expect(wrapper.find(SomeContentComponent))
      .toHaveLength(oneElementArrayWithMinimalConfigPage.length);
  });

  it('is able to draw more than one tab with completly specified pages', () => {
    // Act
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={() => {}}
        onIndexChange={() => {}}
        onTabClose={() => {}}
        selectedIndex={0}
        pages={moreThanOneElementArrayWithCompleteConfigPages}
      />,
    );
    // Assert
    expect(wrapper.find(Tab)).toHaveLength(moreThanOneElementArrayWithCompleteConfigPages.length);
    expect(wrapper.find(TabPanel))
      .toHaveLength(moreThanOneElementArrayWithCompleteConfigPages.length);
    expect(wrapper.text()).toEqual(
      expect.stringContaining(moreThanOneElementArrayWithCompleteConfigPages[0].tab.title),
    );
    expect(wrapper.text()).toEqual(
      expect.stringContaining(moreThanOneElementArrayWithCompleteConfigPages[1].tab.title),
    );
    expect(wrapper.find('.fa-airbnb')).toHaveLength(1);
    expect(wrapper.find('.fa-react')).toHaveLength(1);
    expect(wrapper.find('.badge-primary')).toHaveLength(1);
    expect(wrapper.find('.badge-secondary')).toHaveLength(1);
    expect(wrapper.find('.badge-primary').getDOMNode().textContent).toBe('8');
    expect(wrapper.find('.badge-secondary').getDOMNode().textContent).toBe('7');
  });

  it('calls props.addNewPage', () => {
    // Act
    const addNewPageStub = jest.fn();
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={addNewPageStub}
        changeToTab={() => {}}
        onIndexChange={() => {}}
        onTabClose={() => {}}
        selectedIndex={0}
      />,
    );
    wrapper.prop('addNewPage')();
    // Assert
    expect(addNewPageStub).toHaveBeenCalledTimes(1);
  });

  it('calls props.changeToTab', () => {
    // Act
    const changeToTabStub = jest.fn();
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={changeToTabStub}
        onIndexChange={() => {}}
        onTabClose={() => {}}
        selectedIndex={0}
      />,
    );
    wrapper.prop('changeToTab')();
    // Assert
    expect(changeToTabStub).toHaveBeenCalledTimes(1);
  });

  it('calls props.onIndexChange', () => {
    // Act
    const onIndexChangeStub = jest.fn();
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={() => {}}
        onIndexChange={onIndexChangeStub}
        onTabClose={() => {}}
        selectedIndex={0}
      />,
    );
    wrapper.prop('onIndexChange')();
    // Assert
    expect(onIndexChangeStub).toHaveBeenCalledTimes(1);
  });

  it('calls props.onTabClose', () => {
    // Act
    const onTabCloseStub = jest.fn();
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={() => {}}
        onIndexChange={() => {}}
        onTabClose={onTabCloseStub}
        selectedIndex={0}
      />,
    );
    wrapper.prop('onTabClose')();
    // Assert
    expect(onTabCloseStub).toHaveBeenCalledTimes(1);
  });

  it('control which component is visible based on tab index', () => {
    const content1 = moreThanOneElementArrayWithCompleteConfigPages[0].component.props.children;
    const content2 = moreThanOneElementArrayWithCompleteConfigPages[1].component.props.children;
    // Act
    const wrapper = mount(
      <ParentedReactTabs
        addNewPage={() => {}}
        changeToTab={() => {}}
        onIndexChange={() => {}}
        onTabClose={() => {}}
        selectedIndex={0}
        pages={moreThanOneElementArrayWithCompleteConfigPages}
      />,
    );
    // Assert
    expect(wrapper.find(SomeContentComponent)).toHaveLength(1);
    expect(wrapper.find(SomeContentComponent).prop('children')).toBe(content1);
    wrapper.setProps({ selectedIndex: 1 });
    wrapper.update();
    expect(wrapper.find(SomeContentComponent)).toHaveLength(1);
    expect(wrapper.find(SomeContentComponent).prop('children')).toBe(content2);
  });
});
