import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

export const propTypes = forbidExtraProps({
  /**
   * Function that knows how to add new children pages as new tabs. Expected signature:
   *
   * ```javascript
   * function(parentPageId, canBeClosed, tab, component)
   * ```
   *
   * where:
   *
   * @param parentPageId the parent page's id to be used when property ``changeToTab``` is set,
   * allowing child tabs point to its parent.
   * @param canBeClosed indicates if a tab can be closed, so it shows a close button or not.
   * @param tab object that follows the structure:
   * ```javascript
   * {
   * --title: 'Some title',
   * --icon: ['prefix', 'name'] // FontAwesome pattern icon,
   * --badge: {
   * ----type:
   * 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
   * ----quantity: number // number to show on badge,
   * --},
   * }
   * ```
   * @param component object that follows the struture:
   * ```javascript
   * {
   * --type: React.Component, // any valid React.Component (i.e. span, div, etc)
   * --props: {} // props to be passed to the component when created
   * }
   * ```
   */
  addNewPage: PropTypes.func.isRequired,
  /**
   * Function that know how to set a tab as active by its id. Expected signature:
   *
   * ```javascript
   * function(tabId)
   * ```
   *
   * where:
   * @param tabId is the id of the tab to be activated
   */
  changeToTab: PropTypes.func.isRequired,
  /**
   * Function that knows how to change the active tab by its index. Expected signature:
   *
   * ```javascript
   * function(newIndex)
   * ```
   * where:
   * @param newIndex is the index of the tab to be activated
   */
  onIndexChange: PropTypes.func.isRequired,
  /**
   * Function that know how to remove a tab from property ```pages```. Exptected signature:
   *
   * ```javascript
   * function(page)
   * ```
   * where:
   * @param page is one element of ```pages``` property to be removed
   */
  onTabClose: PropTypes.func.isRequired,
  /**
   * A array of pages to be drawn with the following struture:
   *
   * ```javascript
   * {
   *---id: uniqid('ParentedReactTabsPage'),
   *---parentId: undefined,
   *---canBeClosed: false,
   *---tab: {
   *-----title: 'Some New Page',
   *-----icon: ['prefix', 'name'] // FontAwesome pattern icon,
   *-----badge: {
   *-------type: 'primary' |'secondary' |'success' |'danger' |'warning' |'info' |'light' |'dark',
   *-------quantity: number, // number to show on badge,
   *-----},
   *---},
   *---component: {
   *-----type: SamplePage,
   *-----props: {} // props to be passed to the component when created
   *---},
   * }
   * ```
   */
  pages: PropTypes.array,
  /** The index that of the tab that is active */
  selectedIndex: PropTypes.number.isRequired,
});

export const defaultProps = {
  pages: [],
};
