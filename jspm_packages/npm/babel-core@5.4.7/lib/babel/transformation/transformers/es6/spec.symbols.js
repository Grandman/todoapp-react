/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.UnaryExpression = UnaryExpression;
exports.BinaryExpression = BinaryExpression;
exports.VariableDeclaration = VariableDeclaration;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  optional: true
};

exports.metadata = metadata;

function UnaryExpression(node, parent, scope, file) {
  if (node._ignoreSpecSymbols) return;

  if (node.operator === "typeof") {
    var call = t.callExpression(file.addHelper("typeof"), [node.argument]);
    if (this.get("argument").isIdentifier()) {
      var undefLiteral = t.literal("undefined");
      var unary = t.unaryExpression("typeof", node.argument);
      unary._ignoreSpecSymbols = true;
      return t.conditionalExpression(t.binaryExpression("===", unary, undefLiteral), undefLiteral, call);
    } else {
      return call;
    }
  }
}

function BinaryExpression(node, parent, scope, file) {
  if (node.operator === "instanceof") {
    return t.callExpression(file.addHelper("instanceof"), [node.left, node.right]);
  }
}

function VariableDeclaration(node) {
  if (node._generated) this.skip();
}

exports.FunctionDeclaration = VariableDeclaration;