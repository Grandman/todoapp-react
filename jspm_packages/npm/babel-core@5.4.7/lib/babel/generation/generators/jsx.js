/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.JSXAttribute = JSXAttribute;
exports.JSXIdentifier = JSXIdentifier;
exports.JSXNamespacedName = JSXNamespacedName;
exports.JSXMemberExpression = JSXMemberExpression;
exports.JSXSpreadAttribute = JSXSpreadAttribute;
exports.JSXExpressionContainer = JSXExpressionContainer;
exports.JSXElement = JSXElement;
exports.JSXOpeningElement = JSXOpeningElement;
exports.JSXClosingElement = JSXClosingElement;
exports.JSXEmptyExpression = JSXEmptyExpression;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _lodashCollectionEach = require("lodash/collection/each");

var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);

var _types = require("../../types");

var t = _interopRequireWildcard(_types);

function JSXAttribute(node, print) {
  print(node.name);
  if (node.value) {
    this.push("=");
    print(node.value);
  }
}

function JSXIdentifier(node) {
  this.push(node.name);
}

function JSXNamespacedName(node, print) {
  print(node.namespace);
  this.push(":");
  print(node.name);
}

function JSXMemberExpression(node, print) {
  print(node.object);
  this.push(".");
  print(node.property);
}

function JSXSpreadAttribute(node, print) {
  this.push("{...");
  print(node.argument);
  this.push("}");
}

function JSXExpressionContainer(node, print) {
  this.push("{");
  print(node.expression);
  this.push("}");
}

function JSXElement(node, print) {
  var open = node.openingElement;
  print(open);
  if (open.selfClosing) return;

  this.indent();
  var _arr = node.children;
  for (var _i = 0; _i < _arr.length; _i++) {
    var child = _arr[_i];
    if (t.isLiteral(child)) {
      this.push(child.value, true);
    } else {
      print(child);
    }
  }
  this.dedent();

  print(node.closingElement);
}

function JSXOpeningElement(node, print) {
  this.push("<");
  print(node.name);
  if (node.attributes.length > 0) {
    this.push(" ");
    print.join(node.attributes, { separator: " " });
  }
  this.push(node.selfClosing ? " />" : ">");
}

function JSXClosingElement(node, print) {
  this.push("</");
  print(node.name);
  this.push(">");
}

function JSXEmptyExpression() {}