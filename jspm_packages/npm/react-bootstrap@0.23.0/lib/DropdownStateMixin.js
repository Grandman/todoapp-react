/* */ 
'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}
var _react = require("react");
var _react2 = _interopRequireDefault(_react);
var _utilsDomUtils = require("./utils/domUtils");
var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);
var _utilsEventListener = require("./utils/EventListener");
var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);
function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
var DropdownStateMixin = {
  getInitialState: function getInitialState() {
    return {open: false};
  },
  setDropdownState: function setDropdownState(newState, onStateChangeComplete) {
    if (newState) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }
    this.setState({open: newState}, onStateChangeComplete);
  },
  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.setDropdownState(false);
    }
  },
  handleDocumentClick: function handleDocumentClick(e) {
    if (isNodeInRoot(e.target, _react2['default'].findDOMNode(this))) {
      return ;
    }
    this.setDropdownState(false);
  },
  bindRootCloseHandlers: function bindRootCloseHandlers() {
    var doc = _utilsDomUtils2['default'].ownerDocument(this);
    this._onDocumentClickListener = _utilsEventListener2['default'].listen(doc, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener = _utilsEventListener2['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);
  },
  unbindRootCloseHandlers: function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }
    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
};
exports['default'] = DropdownStateMixin;
module.exports = exports['default'];
