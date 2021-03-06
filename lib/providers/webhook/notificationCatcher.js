'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _notificationCatcherProvider = require('../notificationCatcherProvider');

var _notificationCatcherProvider2 = _interopRequireDefault(_notificationCatcherProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Types
var WebhookCatcherProvider = function (_NotificationCatcherP) {
  (0, _inherits3.default)(WebhookCatcherProvider, _NotificationCatcherP);

  function WebhookCatcherProvider() {
    (0, _classCallCheck3.default)(this, WebhookCatcherProvider);
    return (0, _possibleConstructorReturn3.default)(this, (WebhookCatcherProvider.__proto__ || (0, _getPrototypeOf2.default)(WebhookCatcherProvider)).apply(this, arguments));
  }

  (0, _createClass3.default)(WebhookCatcherProvider, [{
    key: 'send',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var event = _ref2.event,
            data = _ref2.data,
            url = _ref2.url;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.sendToCatcher({
                  to: url,
                  from: '-',
                  subject: event,
                  text: (0, _stringify2.default)(data),
                  headers: {
                    'X-type': 'webhook',
                    'X-to': url
                  }
                });
                return _context.abrupt('return', '');

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x) {
        return _ref.apply(this, arguments);
      }

      return send;
    }()
  }]);
  return WebhookCatcherProvider;
}(_notificationCatcherProvider2.default);

exports.default = WebhookCatcherProvider;