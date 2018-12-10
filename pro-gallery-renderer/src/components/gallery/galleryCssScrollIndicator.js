
import React from 'react';
import _ from 'lodash';
import {cssScrollHelper} from '../helpers/cssScrollHelper';

export default class CssScrollIndicator extends React.Component {

  constructor() {
    super();

    this.state = {
      scrollTop: 0,
      scrollLeft: 0
    };
  }

  toggleEventListeners(isInDisplay) {
    if (isInDisplay && !this.scrollEventListenerSet) {
      this.initScrollListener();
    } else {
      this.removeScrollListener(); //for guy to add the remove function
    }
  }

  removeScrollListener() {
    if (this.scrollEventListenerSet) {
      this.scrollEventListenerSet = false;
      const scrollingElement = this.props.scrollingElement;
      scrollingElement.vertical().removeEventListener('scroll', this.onVerticalScroll);
      const {oneRow} = this.props;
      if (oneRow) {
        scrollingElement.horizontal().removeEventListener('scroll', this.onHorizontalScroll);
      }
    }
  }

  initScrollListener() {
    if (!this.scrollEventListenerSet) {
      this.scrollEventListenerSet = true;
      const scrollInterval = 500;

      const scrollingElement = this.props.scrollingElement;
      const {oneRow} = this.props;
      if (oneRow) {
            //Horizontal Scroll
        this.onHorizontalScroll = e => {
          const target = (e.currentTarget || e.target || e);
          const left = (target && (target.scrollX || target.scrollLeft));
          if (left >= 0) {
            this.setState({
              scrollTop: left, //todo use both scrollTop and scrollLeft
              scrollLeft: left
            });
            this.props.getMoreItemsIfNeeded(left);
          }
        };
        scrollingElement.horizontal().addEventListener('scroll', this.onHorizontalScroll);
      } else {
            //Vertical Scroll
        // this.onVerticalScroll = _.throttle(e => {
        this.onVerticalScroll = e => {
          const target = (e.currentTarget || e.target || e);
          const top = (target && (target.scrollY || target.scrollTop));
          if (top >= 0) {
            this.setState({
              scrollTop: top
            });
            this.props.getMoreItemsIfNeeded(top);
          }
        };
        // }, scrollInterval);
        scrollingElement.vertical().addEventListener('scroll', this.onVerticalScroll);
      }
    }
  }


  componentWillUnmount() {
    this.toggleEventListeners(false);
  }

  componentDidMount() {
    this.toggleEventListeners(true);
  }

  render() {
    return (
        <div className={cssScrollHelper.calcScrollClasses(this.state.scrollTop)}/>
    );

  }

}