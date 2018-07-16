'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generalConfigFallback = undefined;
exports.getDexie = getDexie;
exports.initializeDexie = initializeDexie;

var _dexie = require('dexie');

var _dexie2 = _interopRequireDefault(_dexie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;
var isSetup = false;
var storeName = 'pounder-config';

function getDexie() {
    if (!isSetup) {
        throw "Dexie isn't Initialized, ensure you call initializeDexie() first";
    } else {
        return db;
    }
}

function initializeDexie() {
    db = new _dexie2.default(storeName);

    db.version(1).stores({
        cssConfig: "id, propertyName, value",
        generalConfig: "id, value"
    });

    db.on("populate", function () {
        db.generalConfig.put({ id: 0, value: { isFirstTimeBoot: true } });
    });

    isSetup = true;
}

// Fallback Values.
var generalConfigFallback = exports.generalConfigFallback = {
    startInFullscreen: false,
    startLocked: false
};
