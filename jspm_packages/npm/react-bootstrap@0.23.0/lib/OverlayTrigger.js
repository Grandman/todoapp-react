/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _OverlayMixin = require("./OverlayMixin");
var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);
var _RootCloseWrapper = require("./RootCloseWrapper");
var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);
var _utilsCreateChainedFunction = require("./utils/createChainedFunction");
var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);
var _utilsCreateContextWrapper = require("./utils/createContextWrapper");
var _utilsCreateContextWrapper2 = _interopRequireDefault(_utilsCreateContextWrapper);
var _utilsDomUtils = require("./utils/domUtils");
var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
var _utilsObjectAssign = require("./utils/Object.assign");
var _utilsObjectAssign2 = _interopRequireDefault(_utilsObjectAssign);
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}
var OverlayTrigger = _react2['default'].createClass({
  displayName: 'OverlayTrigger',
  mixins: [_OverlayMixin2['default']],
  propTypes: {
    trigger: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['manual', 'click', 'hover', 'focus']), _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    delay: _react2['default'].PropTypes.number,
    delayShow: _react2['default'].PropTypes.number,
    delayHide: _react2['default'].PropTypes.number,
    defaultOverlayShown: _react2['default'].PropTypes.bool,
    overlay: _react2['default'].PropTypes.node.isRequired,
    containerPadding: _react2['default'].PropTypes.number,
    rootClose: _react2['default'].PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right',
      trigger: ['hover', 'focus'],
      containerPadding: 0
    };
  },
  getInitialState: function getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ? false : this.props.defaultOverlayShown,
      overlayLeft: null,
      overlayTop: null,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
  },
  show: function show() {
    this.setState({isOverlayShown: true}, function() {
      this.updateOverlayPosition();
    });
  },
  hide: function hide() {
    this.setState({isOverlayShown: false});
  },
  toggle: function toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  },
  renderOverlay: function renderOverlay() {
    if (!this.state.isOverlayShown) {
      return _react2['default'].createElement('span', null);
    }
    var overlay = (0, _react.cloneElement)(this.props.overlay, {
      onRequestHide: this.hide,
      placement: this.props.placement,
      positionLeft: this.state.overlayLeft,
      positionTop: this.state.overlayTop,
      arrowOffsetLeft: this.state.arrowOffsetLeft,
      arrowOffsetTop: this.state.arrowOffsetTop
    });
    if (this.props.rootClose) {
      return _react2['default'].createElement(_RootCloseWrapper2['default'], {onRootClose: this.hide}, overlay);
    } else {
      return overlay;
    }
  },
  render: function render() {
    var child = _react2['default'].Children.only(this.props.children);
    if (this.props.trigger === 'manual') {
      return child;
    }
    var props = {};
    props.onClick = (0, _utilsCreateChainedFunction2['default'])(child.props.onClick, this.props.onClick);
    if (isOneOf('click', this.props.trigger)) {
      props.onClick = (0, _utilsCreateChainedFunction2['default'])(this.toggle, props.onClick);
    }
    if (isOneOf('hover', this.props.trigger)) {
      props.onMouseOver = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedShow, this.props.onMouseOver);
      props.onMouseOut = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedHide, this.props.onMouseOut);
    }
    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedShow, this.props.onFocus);
      props.onBlur = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedHide, this.props.onBlur);
    }
    return (0, _react.cloneElement)(child, props);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._hoverDelay);
  },
  componentDidMount: function componentDidMount() {
    if (this.props.defaultOverlayShown) {
      this.updateOverlayPosition();
    }
  },
  handleDelayedShow: function handleDelayedShow() {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return ;
    }
    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;
    if (!delay) {
      this.show();
      return ;
    }
    this._hoverDelay = setTimeout((function() {
      this._hoverDelay = null;
      this.show();
    }).bind(this), delay);
  },
  handleDelayedHide: function handleDelayedHide() {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return ;
    }
    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;
    if (!delay) {
      this.hide();
      return ;
    }
    this._hoverDelay = setTimeout((function() {
      this._hoverDelay = null;
      this.hide();
    }).bind(this), delay);
  },
  updateOverlayPosition: function updateOverlayPosition() {
    if (!this.isMounted()) {
      return ;
    }
    this.setState(this.calcOverlayPosition());
  },
  calcOverlayPosition: function calcOverlayPosition() {
    var childOffset = this.getPosition();
    var overlayNode = this.getOverlayDOMNode();
    var overlayHeight = overlayNode.offsetHeight;
    var overlayWidth = overlayNode.offsetWidth;
    var placement = this.props.placement;
    var overlayLeft = undefined,
        overlayTop = undefined,
        arrowOffsetLeft = undefined,
        arrowOffsetTop = undefined;
    if (placement === 'left' || placement === 'right') {
      overlayTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
      if (placement === 'left') {
        overlayLeft = childOffset.left - overlayWidth;
      } else {
        overlayLeft = childOffset.left + childOffset.width;
      }
      var topDelta = this._getTopDelta(overlayTop, overlayHeight);
      overlayTop += topDelta;
      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
      arrowOffsetLeft = null;
    } else if (placement === 'top' || placement === 'bottom') {
      overlayLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;
      if (placement === 'top') {
        overlayTop = childOffset.top - overlayHeight;
      } else {
        overlayTop = childOffset.top + childOffset.height;
      }
      var leftDelta = this._getLeftDelta(overlayLeft, overlayWidth);
      overlayLeft += leftDelta;
      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
      arrowOffsetTop = null;
    } else {
      throw new Error('calcOverlayPosition(): No such placement of "' + this.props.placement + '" found.');
    }
    return {
      overlayLeft: overlayLeft,
      overlayTop: overlayTop,
      arrowOffsetLeft: arrowOffsetLeft,
      arrowOffsetTop: arrowOffsetTop
    };
  },
  _getTopDelta: function _getTopDelta(top, overlayHeight) {
    var containerDimensions = this._getContainerDimensions();
    var containerScroll = containerDimensions.scroll;
    var containerHeight = containerDimensions.height;
    var padding = this.props.containerPadding;
    var topEdgeOffset = top - padding - containerScroll;
    var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;
    if (topEdgeOffset < 0) {
      return -topEdgeOffset;
    } else if (bottomEdgeOffset > containerHeight) {
      return containerHeight - bottomEdgeOffset;
    } else {
      return 0;
    }
  },
  _getLeftDelta: function _getLeftDelta(left, overlayWidth) {
    var containerDimensions = this._getContainerDimensions();
    var containerWidth = containerDimensions.width;
    var padding = this.props.containerPadding;
    var leftEdgeOffset = left - padding;
    var rightEdgeOffset = left + padding + overlayWidth;
    if (leftEdgeOffset < 0) {
      return -leftEdgeOffset;
    } else if (rightEdgeOffset > containerWidth) {
      return containerWidth - rightEdgeOffset;
    } else {
      return 0;
    }
  },
  _getContainerDimensions: function _getContainerDimensions() {
    var containerNode = this.getContainerDOMNode();
    var width = undefined,
        height = undefined,
        scroll = undefined;
    if (containerNode.tagName === 'BODY') {
      width = window.innerWidth;
      height = window.innerHeight;
      scroll = _utilsDomUtils2['default'].ownerDocument(containerNode).documentElement.scrollTop || containerNode.scrollTop;
    } else {
      width = containerNode.offsetWidth;
      height = containerNode.offsetHeight;
      scroll = containerNode.scrollTop;
    }
    return {
      width: width,
      height: height,
      scroll: scroll
    };
  },
  getPosition: function getPosition() {
    var node = _react2['default'].findDOMNode(this);
    var container = this.getContainerDOMNode();
    var offset = container.tagName === 'BODY' ? _utilsDomUtils2['default'].getOffset(node) : _utilsDomUtils2['default'].getPosition(node, container);
    return (0, _utilsObjectAssign2['default'])({}, offset, {
      height: node.offsetHeight,
      width: node.offsetWidth
    });
  }
});
OverlayTrigger.withContext = (0, _utilsCreateContextWrapper2['default'])(OverlayTrigger, 'overlay');
exports['default'] = OverlayTrigger;
module.exports = exports['default'];
