'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _v = require('../../util/aws/v4');

var _v2 = _interopRequireDefault(_v);

var _crypto = require('../../util/crypto');

var _request = require('../../util/request');

var _request2 = _interopRequireDefault(_request);

var _mailComposer = require('nodemailer/lib/mail-composer');

var _mailComposer2 = _interopRequireDefault(_mailComposer);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// types
var EmailSesProvider = function () {
  function EmailSesProvider(_ref) {
    var region = _ref.region,
        accessKeyId = _ref.accessKeyId,
        secretAccessKey = _ref.secretAccessKey,
        sessionToken = _ref.sessionToken;
    (0, _classCallCheck3.default)(this, EmailSesProvider);
    this.id = 'email-ses-provider';

    this.credentials = { region: region, accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, sessionToken: sessionToken };
  }

  (0, _createClass3.default)(EmailSesProvider, [{
    key: 'send',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request) {
        var region, host, raw, body, apiRequest, signer, response, responseText;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                region = this.credentials.region;
                host = 'email.' + region + '.amazonaws.com';
                _context.t0 = this;

                if (!request.customize) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return request.customize(this.id, request);

              case 6:
                _context.t1 = _context.sent;
                _context.next = 10;
                break;

              case 9:
                _context.t1 = request;

              case 10:
                _context.t2 = _context.t1;
                _context.next = 13;
                return _context.t0.getRaw.call(_context.t0, _context.t2);

              case 13:
                raw = _context.sent.toString('base64');
                body = _querystring2.default.stringify({
                  Action: 'SendRawEmail',
                  Version: '2010-12-01',
                  'RawMessage.Data': raw
                });
                apiRequest = {
                  method: 'POST',
                  path: '/',
                  headers: {
                    Host: host,
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'X-Amz-Content-Sha256': (0, _crypto.sha256)(body, 'hex'),
                    'User-Agent': 'notifme-sdk/v1 (+https://github.com/notifme/notifme-sdk)'
                  },
                  body: body,
                  region: region
                };
                signer = new _v2.default(apiRequest, 'ses');

                signer.addAuthorization(this.credentials, new Date());

                _context.next = 20;
                return (0, _request2.default)('https://' + host + apiRequest.path, apiRequest);

              case 20:
                response = _context.sent;
                _context.next = 23;
                return response.text();

              case 23:
                responseText = _context.sent;

                if (!(response.ok && responseText.includes('<MessageId>'))) {
                  _context.next = 28;
                  break;
                }

                return _context.abrupt('return', responseText.match(/<MessageId>(.*)<\/MessageId>/)[1]);

              case 28:
                throw new Error(response.status + ' - ' + responseText);

              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x) {
        return _ref2.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: 'getRaw',
    value: function getRaw(_ref3) {
      var customize = _ref3.customize,
          request = (0, _objectWithoutProperties3.default)(_ref3, ['customize']);

      return new _promise2.default(function (resolve, reject) {
        var email = new _mailComposer2.default(request).compile();
        email.keepBcc = true;
        email.build(function (error, raw) {
          error ? reject(error) : resolve(raw);
        });
      });
    }
  }]);
  return EmailSesProvider;
}();

exports.default = EmailSesProvider;