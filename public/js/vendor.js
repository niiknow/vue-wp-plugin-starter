(self["webpackChunkPLUGIN_NAME"] = self["webpackChunkPLUGIN_NAME"] || []).push([["/js/vendor"],{

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popperGenerator": function() { return /* binding */ popperGenerator; },
/* harmony export */   "createPopper": function() { return /* binding */ createPopper; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ contains; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBoundingClientRect; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");


function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    // Fallback to 1 in case both values are `0`

    if (offsetWidth > 0) {
      scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(rect.width) / offsetWidth || 1;
    }

    if (offsetHeight > 0) {
      scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(rect.height) / offsetHeight || 1;
    }
  }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getClippingRect; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getCompositeRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getComputedStyle; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentElement; }
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDocumentRect; }
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getHTMLElementScroll; }
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getLayoutRect; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeName; }
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getNodeScroll; }
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOffsetParent; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");







function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element);

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_4__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getParentNode; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getScrollParent; }
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getViewportRect; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



function getViewportRect(element) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindow; }
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScroll; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getWindowScrollBarX; }
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": function() { return /* binding */ isElement; },
/* harmony export */   "isHTMLElement": function() { return /* binding */ isHTMLElement; },
/* harmony export */   "isShadowRoot": function() { return /* binding */ isShadowRoot; }
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isScrollParent; }
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isTableElement; }
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ listScrollParents; }
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "top": function() { return /* binding */ top; },
/* harmony export */   "bottom": function() { return /* binding */ bottom; },
/* harmony export */   "right": function() { return /* binding */ right; },
/* harmony export */   "left": function() { return /* binding */ left; },
/* harmony export */   "auto": function() { return /* binding */ auto; },
/* harmony export */   "basePlacements": function() { return /* binding */ basePlacements; },
/* harmony export */   "start": function() { return /* binding */ start; },
/* harmony export */   "end": function() { return /* binding */ end; },
/* harmony export */   "clippingParents": function() { return /* binding */ clippingParents; },
/* harmony export */   "viewport": function() { return /* binding */ viewport; },
/* harmony export */   "popper": function() { return /* binding */ popper; },
/* harmony export */   "reference": function() { return /* binding */ reference; },
/* harmony export */   "variationPlacements": function() { return /* binding */ variationPlacements; },
/* harmony export */   "placements": function() { return /* binding */ placements; },
/* harmony export */   "beforeRead": function() { return /* binding */ beforeRead; },
/* harmony export */   "read": function() { return /* binding */ read; },
/* harmony export */   "afterRead": function() { return /* binding */ afterRead; },
/* harmony export */   "beforeMain": function() { return /* binding */ beforeMain; },
/* harmony export */   "main": function() { return /* binding */ main; },
/* harmony export */   "afterMain": function() { return /* binding */ afterMain; },
/* harmony export */   "beforeWrite": function() { return /* binding */ beforeWrite; },
/* harmony export */   "write": function() { return /* binding */ write; },
/* harmony export */   "afterWrite": function() { return /* binding */ afterWrite; },
/* harmony export */   "modifierPhases": function() { return /* binding */ modifierPhases; }
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain; },
/* harmony export */   "afterRead": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead; },
/* harmony export */   "afterWrite": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite; },
/* harmony export */   "auto": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto; },
/* harmony export */   "basePlacements": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements; },
/* harmony export */   "beforeMain": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain; },
/* harmony export */   "beforeRead": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead; },
/* harmony export */   "beforeWrite": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite; },
/* harmony export */   "bottom": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom; },
/* harmony export */   "clippingParents": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents; },
/* harmony export */   "end": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end; },
/* harmony export */   "left": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left; },
/* harmony export */   "main": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main; },
/* harmony export */   "modifierPhases": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases; },
/* harmony export */   "placements": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements; },
/* harmony export */   "popper": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper; },
/* harmony export */   "read": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read; },
/* harmony export */   "reference": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference; },
/* harmony export */   "right": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right; },
/* harmony export */   "start": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start; },
/* harmony export */   "top": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top; },
/* harmony export */   "variationPlacements": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements; },
/* harmony export */   "viewport": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport; },
/* harmony export */   "write": function() { return /* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write; },
/* harmony export */   "applyStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles; },
/* harmony export */   "arrow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow; },
/* harmony export */   "computeStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles; },
/* harmony export */   "eventListeners": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners; },
/* harmony export */   "flip": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip; },
/* harmony export */   "hide": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide; },
/* harmony export */   "offset": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset; },
/* harmony export */   "popperOffsets": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets; },
/* harmony export */   "preventOverflow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow; },
/* harmony export */   "popperGenerator": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "createPopperBase": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper; },
/* harmony export */   "createPopper": function() { return /* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper; },
/* harmony export */   "createPopperLite": function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToStyles": function() { return /* binding */ mapToStyles; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": function() { return /* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "arrow": function() { return /* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "computeStyles": function() { return /* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   "eventListeners": function() { return /* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "flip": function() { return /* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   "hide": function() { return /* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   "offset": function() { return /* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   "popperOffsets": function() { return /* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   "preventOverflow": function() { return /* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]; }
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distanceAndSkiddingToXY": function() { return /* binding */ distanceAndSkiddingToXY; }
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": function() { return /* binding */ createPopper; },
/* harmony export */   "popperGenerator": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator; },
/* harmony export */   "defaultModifiers": function() { return /* binding */ defaultModifiers; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": function() { return /* binding */ createPopper; },
/* harmony export */   "popperGenerator": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator; },
/* harmony export */   "defaultModifiers": function() { return /* binding */ defaultModifiers; },
/* harmony export */   "detectOverflow": function() { return /* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]; },
/* harmony export */   "createPopperLite": function() { return /* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper; },
/* harmony export */   "applyStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles; },
/* harmony export */   "arrow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow; },
/* harmony export */   "computeStyles": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles; },
/* harmony export */   "eventListeners": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners; },
/* harmony export */   "flip": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip; },
/* harmony export */   "hide": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide; },
/* harmony export */   "offset": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset; },
/* harmony export */   "popperOffsets": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets; },
/* harmony export */   "preventOverflow": function() { return /* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow; }
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeAutoPlacement; }
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ computeOffsets; }
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ debounce; }
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ detectOverflow; }
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ expandToHashMap; }
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ format; }
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAltAxis; }
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getBasePlacement; }
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getFreshSideObject; }
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getMainAxisFromPlacement; }
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositePlacement; }
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getOppositeVariationPlacement; }
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getVariation; }
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": function() { return /* binding */ max; },
/* harmony export */   "min": function() { return /* binding */ min; },
/* harmony export */   "round": function() { return /* binding */ round; }
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeByName; }
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergePaddingObject; }
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ orderModifiers; }
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ rectToClientRect; }
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ uniqueBy; }
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ validateModifiers; }
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": function() { return /* binding */ within; },
/* harmony export */   "withinMaxClamp": function() { return /* binding */ withinMaxClamp; }
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./node_modules/@variantjs/core/dist/index.umd.js":
/*!********************************************************!*\
  !*** ./node_modules/@variantjs/core/dist/index.umd.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports) {

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
(function(global, factory) {
   true ? factory(exports) : 0;
})(this, function(exports2) {
  "use strict";
  const selectClasses = (classesObject) => Object.keys(classesObject).filter((className) => !!classesObject[className]);
  const mergeClasses = (...classes) => classes.map((className) => {
    if (typeof className === "string" || className === void 0) {
      return className || "";
    }
    if (Array.isArray(className)) {
      return mergeClasses(...className);
    }
    return mergeClasses(...selectClasses(className));
  }).join(" ").replace(/  +/g, " ").trim();
  const getCustomPropsFromVariant$1 = (variants, variant) => {
    if (variant !== void 0 && variants) {
      return variants[variant];
    }
    return void 0;
  };
  const parseVariant = (props, globalConfiguration, defaultConfiguration) => {
    const _a = __spreadValues(__spreadValues(__spreadValues({}, defaultConfiguration), globalConfiguration), props), { variants, variant } = _a, mainProps = __objRest(_a, ["variants", "variant"]);
    const customProps = getCustomPropsFromVariant$1(variants, variant);
    const mergedProps = __spreadValues(__spreadValues({}, mainProps), customProps);
    const _b = mergedProps, { classes, fixedClasses, class: className } = _b, componentProps = __objRest(_b, ["classes", "fixedClasses", "class"]);
    const mergedClasses = mergeClasses(className, classes, fixedClasses);
    if (mergedClasses) {
      componentProps.class = mergedClasses;
    }
    return componentProps;
  };
  const pick = (object, condition = (value) => !!value) => {
    const newObject = __spreadValues({}, object);
    Object.keys(object).filter((key) => !condition(newObject[key], key)).forEach((key) => delete newObject[key]);
    return newObject;
  };
  const hasProperty = (obj, prop) => obj !== null && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, prop);
  const getCustomPropsFromVariant = (variants, variant) => {
    if (variant !== void 0 && variants) {
      return variants[variant];
    }
    return void 0;
  };
  const getShouldClearClasses = (props, key, variant) => {
    if (variant === void 0) {
      return hasProperty(props, key) && (props[key] === void 0 || props[key] === null);
    }
    if (props.variants !== void 0 && props.variants[variant] !== void 0) {
      const propsVariant = props.variants[variant];
      return hasProperty(propsVariant, key) && (propsVariant[key] === void 0 || propsVariant[key] === null);
    }
    return false;
  };
  const parseVariantWithClassesList = (props, classesListKeys, globalConfiguration, defaultConfiguration) => {
    const _a = __spreadValues(__spreadValues(__spreadValues({}, defaultConfiguration), globalConfiguration), props), { variants, variant } = _a, mainProps = __objRest(_a, ["variants", "variant"]);
    const classes = {};
    const fixedClasses = {};
    const clearClasses = getShouldClearClasses(props, "classes", variant);
    const clearFixedClasses = getShouldClearClasses(props, "fixedClasses", variant);
    if (clearClasses) {
      classesListKeys.forEach((classItemKey) => {
        classes[classItemKey] = void 0;
      });
    } else {
      classesListKeys.forEach((classItemKey) => {
        if (props.classes !== void 0 && hasProperty(props.classes, classItemKey)) {
          classes[classItemKey] = props.classes[classItemKey];
        } else if (globalConfiguration !== void 0 && globalConfiguration.classes !== void 0 && hasProperty(globalConfiguration.classes, classItemKey)) {
          classes[classItemKey] = globalConfiguration.classes[classItemKey];
        } else if (defaultConfiguration !== void 0 && defaultConfiguration.classes !== void 0 && hasProperty(defaultConfiguration.classes, classItemKey)) {
          classes[classItemKey] = defaultConfiguration.classes[classItemKey];
        }
        if (variant) {
          if (props.variants !== void 0 && props.variants[variant] !== void 0) {
            const propsVariant = props.variants[variant];
            if (propsVariant.classes && hasProperty(propsVariant.classes, classItemKey)) {
              classes[classItemKey] = propsVariant.classes[classItemKey];
            }
          } else if (globalConfiguration !== void 0 && globalConfiguration.variants !== void 0 && globalConfiguration.variants[variant] !== void 0) {
            const globalConfigurationVariant = globalConfiguration.variants[variant];
            if (globalConfigurationVariant.classes && hasProperty(globalConfigurationVariant.classes, classItemKey)) {
              classes[classItemKey] = globalConfigurationVariant.classes[classItemKey];
            }
          } else if (defaultConfiguration !== void 0 && defaultConfiguration.variants !== void 0 && defaultConfiguration.variants[variant] !== void 0) {
            const defaultConfigurationVariant = defaultConfiguration.variants[variant];
            if (defaultConfigurationVariant.classes && hasProperty(defaultConfigurationVariant.classes, classItemKey)) {
              classes[classItemKey] = defaultConfigurationVariant.classes[classItemKey];
            }
          }
        }
      });
    }
    if (clearFixedClasses) {
      classesListKeys.forEach((classItemKey) => {
        fixedClasses[classItemKey] = void 0;
      });
    } else {
      classesListKeys.forEach((classItemKey) => {
        if (props.fixedClasses !== void 0 && hasProperty(props.fixedClasses, classItemKey)) {
          fixedClasses[classItemKey] = props.fixedClasses[classItemKey];
        } else if (globalConfiguration !== void 0 && globalConfiguration.fixedClasses !== void 0 && hasProperty(globalConfiguration.fixedClasses, classItemKey)) {
          fixedClasses[classItemKey] = globalConfiguration.fixedClasses[classItemKey];
        } else if (defaultConfiguration !== void 0 && defaultConfiguration.fixedClasses !== void 0 && hasProperty(defaultConfiguration.fixedClasses, classItemKey)) {
          fixedClasses[classItemKey] = defaultConfiguration.fixedClasses[classItemKey];
        }
        if (variant) {
          if (props.variants !== void 0 && props.variants[variant] !== void 0) {
            const propsVariant = props.variants[variant];
            if (propsVariant.fixedClasses && hasProperty(propsVariant.fixedClasses, classItemKey)) {
              fixedClasses[classItemKey] = propsVariant.fixedClasses[classItemKey];
            }
          } else if (globalConfiguration !== void 0 && globalConfiguration.variants !== void 0 && globalConfiguration.variants[variant] !== void 0) {
            const globalConfigurationVariant = globalConfiguration.variants[variant];
            if (globalConfigurationVariant.fixedClasses && hasProperty(globalConfigurationVariant.fixedClasses, classItemKey)) {
              fixedClasses[classItemKey] = globalConfigurationVariant.fixedClasses[classItemKey];
            }
          } else if (defaultConfiguration !== void 0 && defaultConfiguration.variants !== void 0 && defaultConfiguration.variants[variant] !== void 0) {
            const defaultConfigurationVariant = defaultConfiguration.variants[variant];
            if (defaultConfigurationVariant.fixedClasses && hasProperty(defaultConfigurationVariant.fixedClasses, classItemKey)) {
              fixedClasses[classItemKey] = defaultConfigurationVariant.fixedClasses[classItemKey];
            }
          }
        }
      });
    }
    const customProps = getCustomPropsFromVariant(variants, variant);
    const mergedProps = __spreadValues(__spreadValues({}, mainProps), customProps);
    delete mergedProps.fixedClasses;
    delete mergedProps.classes;
    const mergedClasses = {};
    classesListKeys.forEach((classItemKey) => {
      const classesForTheCurrentKey = classes[classItemKey];
      const fixedClassesForTheCurrentKey = fixedClasses[classItemKey];
      mergedClasses[classItemKey] = mergeClasses(classesForTheCurrentKey, fixedClassesForTheCurrentKey);
    });
    const result = pick(mergedClasses);
    if (Object.keys(result).length > 0) {
      mergedProps.classesList = result;
    }
    return mergedProps;
  };
  const get = (object, path, defaultValue) => {
    const result = String(path).replace(/\[/g, ".").replace(/\]/g, "").split(".").reduce((objectSoFar, step) => {
      if (typeof objectSoFar === "object" || Array.isArray(objectSoFar)) {
        return objectSoFar[step];
      }
      return void 0;
    }, object);
    return result === void 0 ? defaultValue : result;
  };
  const guessOptionValue = (option, valueAttribute) => {
    if (valueAttribute) {
      const value = get(option, valueAttribute);
      if (value === null) {
        return null;
      }
      if (typeof value === "undefined") {
        return void 0;
      }
      if (typeof value === "number" || typeof value === "string") {
        return value;
      }
      return String(value);
    }
    return option.value;
  };
  const guessOptionText = (option, textAttribute) => {
    if (textAttribute) {
      const text = get(option, textAttribute);
      if (typeof text === "undefined" || text === null) {
        return "";
      }
      if (typeof text === "number" || typeof text === "string") {
        return text;
      }
      return String(text);
    }
    return option.text;
  };
  const normalizeOption = (option, textAttribute, valueAttribute) => {
    if (typeof option === "string" || typeof option === "number") {
      return {
        value: option,
        text: option,
        raw: option
      };
    }
    const normalizedOption = {
      value: guessOptionValue(option, valueAttribute),
      text: guessOptionText(option, textAttribute),
      raw: option
    };
    if (option.disabled) {
      normalizedOption.disabled = true;
    }
    if (option.children) {
      normalizedOption.children = normalizeOptions(option.children, textAttribute, valueAttribute);
    }
    return normalizedOption;
  };
  const normalizeOptions = (options, textAttribute, valueAttribute) => {
    if (Array.isArray(options)) {
      return options.map((option) => normalizeOption(option, textAttribute, valueAttribute));
    }
    if (typeof options === "object") {
      return Object.keys(options).map((optionKey) => ({
        value: optionKey,
        text: options[optionKey]
      }));
    }
    return [];
  };
  const flattenOptions = (options) => options.flatMap((option) => {
    if (option.children) {
      return flattenOptions(option.children);
    }
    return option;
  });
  const filterOptions = (options, query) => {
    if (query === "") {
      return options;
    }
    return options.map((option) => {
      if (option.children) {
        const newOption = __spreadValues(__spreadValues({}, option), {
          children: filterOptions(option.children, query)
        });
        return newOption;
      }
      return option;
    }).filter((option) => {
      const foundText = String(option.text).toUpperCase().trim().includes(query.toUpperCase().trim());
      const hasChildren = option.children && option.children.length > 0;
      return hasChildren || foundText;
    });
  };
  const TInputConfig = {
    classes: "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  const TTextareaConfig = {
    classes: "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  const TButtonConfig = {
    classes: "block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  const TSelectConfig = {
    classes: "block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  const TCheckboxConfig = {
    classes: "text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  const TRadioConfig = {
    classes: "text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  const TTagConfig = {
    classes: ""
  };
  const TCardConfig = {
    classes: {
      wrapper: "bg-white border border-gray-100 rounded shadow-sm",
      body: "p-3",
      header: "p-3 border-b border-gray-100 rounded-t",
      footer: "p-3 border-t border-gray-100 rounded-b"
    }
  };
  const TCardClassesKeys = Object.keys(TCardConfig.classes);
  const TModalConfig = {
    fixedClasses: {
      overlay: "fixed top-0 bottom-0 left-0 right-0 w-full h-full overflow-auto scrolling-touch",
      wrapper: "relative mx-auto",
      modal: "relative overflow-visible"
    },
    classes: {
      overlay: "z-40 bg-black bg-opacity-50",
      wrapper: "z-50 max-w-lg px-3 py-12",
      close: "absolute top-0 right-0 z-10 flex items-center justify-center w-8 h-8 -m-3 text-gray-700 transition ease-in-out bg-gray-100 rounded-full shadow duration-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 hover:bg-gray-200",
      closeIcon: "w-4 h-4",
      modal: "bg-white rounded shadow",
      header: "p-3 border-b border-gray-100 rounded-t",
      body: "p-3",
      footer: "p-3 bg-gray-100 rounded-b",
      overlayEnterActiveClass: "transition duration-300 ease-out",
      overlayEnterFromClass: "transform opacity-0",
      overlayEnterToClass: "transform opacity-100",
      overlayLeaveActiveClass: "transition duration-300 ease-in",
      overlayLeaveFromClass: "transform opacity-100",
      overlayLeaveToClass: "transform opacity-0",
      enterActiveClass: "transition duration-100 ease-out",
      enterFromClass: "transform scale-95 opacity-0",
      enterToClass: "transform scale-100 opacity-100",
      leaveActiveClass: "transition duration-100 ease-in",
      leaveFromClass: "transform scale-100 opacity-100",
      leaveToClass: "transform scale-95 opacity-0"
    }
  };
  exports2.ModalHideReason = void 0;
  (function(ModalHideReason2) {
    ModalHideReason2["Outside"] = "outside";
    ModalHideReason2["Close"] = "close";
    ModalHideReason2["Esc"] = "esc";
    ModalHideReason2["Method"] = "method";
    ModalHideReason2["Value"] = "value";
    ModalHideReason2["Other"] = "other";
  })(exports2.ModalHideReason || (exports2.ModalHideReason = {}));
  const TModalClassesKeys = Object.keys(TModalConfig.classes);
  const { overlay: fixedOverlay, wrapper: fixedWrapper, modal: fixedDialog } = TModalConfig.fixedClasses;
  const { overlay, wrapper, close, closeIcon, modal: dialog, overlayEnterActiveClass, overlayEnterFromClass, overlayEnterToClass, overlayLeaveActiveClass, overlayLeaveFromClass, overlayLeaveToClass, enterActiveClass, enterFromClass, enterToClass, leaveActiveClass, leaveFromClass, leaveToClass } = TModalConfig.classes;
  const TDialogConfig = {
    fixedClasses: {
      overlay: fixedOverlay,
      wrapper: fixedWrapper,
      dialog: fixedDialog
    },
    classes: {
      overlay,
      wrapper,
      close: `${close} disabled:text-opacity-50 disabled:cursor-not-allowed`,
      closeIcon,
      dialog,
      body: "relative p-3",
      content: "flex flex-col justify-center w-full",
      iconWrapper: "flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full",
      icon: "w-6 h-6 text-gray-700",
      titleWrapper: "",
      title: "text-lg font-medium leading-6 text-center text-gray-900",
      textWrapper: "w-full text-center",
      text: "text-sm text-gray-500",
      buttons: "flex justify-center p-3 space-x-4 bg-gray-100 rounded-b",
      cancelButton: "block w-full max-w-xs px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      okButton: "block w-full max-w-xs px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      inputWrapper: "mt-3",
      inputValidationError: "mt-1 text-sm font-semibold text-red-600",
      input: TInputConfig.classes,
      errorMessage: "block p-3 mb-3 -mx-3 -mt-3 text-sm text-center text-red-500 rounded-t bg-red-50",
      busyWrapper: "absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-75",
      busyIcon: "w-6 h-6 text-gray-500",
      enterActiveClass,
      enterFromClass,
      enterToClass,
      leaveActiveClass,
      leaveFromClass,
      leaveToClass,
      overlayEnterActiveClass,
      overlayEnterFromClass,
      overlayEnterToClass,
      overlayLeaveActiveClass,
      overlayLeaveFromClass,
      overlayLeaveToClass
    }
  };
  exports2.DialogType = void 0;
  (function(DialogType2) {
    DialogType2["Alert"] = "alert";
    DialogType2["Confirm"] = "confirm";
    DialogType2["Prompt"] = "prompt";
  })(exports2.DialogType || (exports2.DialogType = {}));
  exports2.DialogIcon = void 0;
  (function(DialogIcon2) {
    DialogIcon2["Success"] = "success";
    DialogIcon2["Error"] = "error";
    DialogIcon2["Warning"] = "warning";
    DialogIcon2["Info"] = "info";
    DialogIcon2["Question"] = "question";
  })(exports2.DialogIcon || (exports2.DialogIcon = {}));
  exports2.DialogHideReason = void 0;
  (function(DialogHideReason2) {
    DialogHideReason2["Outside"] = "outside";
    DialogHideReason2["Close"] = "close";
    DialogHideReason2["Esc"] = "esc";
    DialogHideReason2["Method"] = "method";
    DialogHideReason2["Value"] = "value";
    DialogHideReason2["Other"] = "other";
    DialogHideReason2["Cancel"] = "cancel";
    DialogHideReason2["Ok"] = "ok";
  })(exports2.DialogHideReason || (exports2.DialogHideReason = {}));
  const TDialogClassesKeys = Object.keys(TDialogConfig.classes);
  const enterAndLeave = {
    enterActiveClass: "transition-opacity duration-100 ease-out",
    enterFromClass: "transform scale-95 opacity-0",
    enterToClass: "transform scale-100 opacity-100",
    leaveActiveClass: "transition-opacity duration-75 ease-in",
    leaveFromClass: "transform scale-100 opacity-100",
    leaveToClass: "transform scale-95 opacity-0"
  };
  const TAlertConfig = {
    classes: __spreadValues({
      wrapper: "relative flex items-center p-4 border-l-4 border-blue-500 rounded shadow-sm bg-blue-50",
      body: "flex-grow",
      close: "relative flex items-center justify-center flex-shrink-0 w-6 h-6 ml-4 text-blue-500 transition duration-100 ease-in-out rounded hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      closeIcon: "w-4 h-4"
    }, enterAndLeave)
  };
  const TAlertClassesKeys = Object.keys(TAlertConfig.classes);
  const TInputGroupConfig = {
    classes: {
      wrapper: "",
      label: "block",
      body: "",
      feedback: "text-sm text-gray-400",
      description: "text-sm text-gray-400"
    }
  };
  const TInputGroupClassesKeys = Object.keys(TInputGroupConfig.classes);
  const TDropdownConfig = {
    classes: __spreadValues({
      trigger: TButtonConfig.classes,
      dropdown: "w-56 bg-white rounded shadow"
    }, enterAndLeave)
  };
  const TDropdownClassesKeys = Object.keys(TDropdownConfig.classes);
  const TDropdownPopperDefaultOptions = {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10]
        }
      }
    ],
    strategy: "absolute",
    onFirstUpdate: void 0
  };
  const TRichSelectConfig = {
    classes: __spreadValues({
      wrapper: "relative",
      trigger: "flex items-center justify-between w-full px-3 py-2 text-left text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      dropdown: "z-10 bg-white rounded shadow-lg",
      dropdownContent: "p-2 space-y-2",
      clearButton: "absolute flex items-center justify-center w-6 h-6 text-gray-600 transition duration-100 ease-in-out rounded mt-2.5 mr-2 top-0 right-0 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      optionsList: "space-y-1",
      optionsListLoadingMore: "flex items-center justify-between px-3 py-2 text-sm text-gray-400",
      optionWrapper: "",
      option: "w-full rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
      selectedOption: "font-semibold text-white bg-blue-500",
      highlightedOption: "bg-blue-100",
      selectedHighlightedOption: "font-semibold text-white bg-blue-600",
      optionContent: "flex items-center justify-between px-3 py-2",
      optionLabel: "block truncate",
      optionSelectedIcon: "w-5 h-5",
      optgroup: "space-y-2",
      optgroupContent: "",
      optgroupLabel: "block px-3 py-2 text-xs text-gray-400 uppercase truncate",
      optgroupOptionsList: "px-2 pb-2",
      searchWrapper: "inline-block w-full placeholder-gray-400",
      searchInput: "inline-block w-full px-3 py-2 text-sm border border-gray-300 rounded shadow-inner bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      searchingText: "text-sm text-gray-400",
      needsMoreCharsText: "text-sm text-gray-400",
      noResultsText: "text-sm text-gray-400",
      selectButtonLabel: "block pr-4 truncate",
      selectButtonPlaceholder: "block text-gray-400 truncate",
      selectButtonSearchingPlaceholder: "block text-gray-400 truncate",
      selectButtonLoadingIcon: "flex-shrink-0 w-4 h-4 ml-1 text-gray-600",
      selectButtonSelectorIcon: "flex-shrink-0 w-4 h-4 ml-1 text-gray-600",
      tagsWrapper: "flex flex-wrap overflow-hidden -mx-2 -my-2.5 py-1 pr-8",
      tag: "bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full h-8 flex items-center cursor-pointer",
      tagLabel: "px-3",
      tagDeleteButton: "-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-r",
      tagDeleteButtonIcon: "w-3 h-3"
    }, enterAndLeave)
  };
  const TRichSelectClassesKeys = Object.keys(TRichSelectConfig.classes);
  const TDatepickerConfig = {
    classes: {
      wrapper: "flex flex-col",
      dropdownWrapper: "relative z-10",
      dropdown: "absolute mt-1 overflow-hidden origin-top-left bg-white rounded shadow",
      inlineWrapper: "",
      inlineViews: "inline-flex flex-col mt-1 bg-white border rounded",
      inputWrapper: "",
      input: "block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      clearButton: "text-gray-600 transition duration-100 ease-in-out rounded hover:bg-gray-100",
      clearButtonIcon: "",
      viewGroup: "",
      view: "",
      navigator: "px-3 pt-2",
      navigatorViewButton: "inline-flex px-2 py-1 -ml-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100",
      navigatorViewButtonIcon: "text-gray-400 fill-current",
      navigatorViewButtonBackIcon: "text-gray-400 fill-current",
      navigatorViewButtonMonth: "font-semibold text-gray-700",
      navigatorViewButtonYear: "ml-1 text-gray-500",
      navigatorViewButtonYearRange: "ml-1 text-gray-500",
      navigatorLabel: "py-1",
      navigatorLabelMonth: "font-semibold text-gray-700",
      navigatorLabelYear: "ml-1 text-gray-500",
      navigatorPrevButton: "inline-flex p-1 ml-2 ml-auto transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
      navigatorNextButton: "inline-flex p-1 -mr-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
      navigatorPrevButtonIcon: "text-gray-400",
      navigatorNextButtonIcon: "text-gray-400",
      calendarWrapper: "px-3 py-2",
      calendarHeaderWrapper: "",
      calendarHeaderWeekDay: "flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase",
      calendarDaysWrapper: "",
      calendarDaysDayWrapper: "flex items-center flex-shrink-0 w-full h-8",
      otherMonthDay: "w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed",
      emptyDay: "",
      inRangeFirstDay: "w-full h-8 text-sm text-white bg-blue-500 rounded-l-full",
      inRangeLastDay: "w-full h-8 text-sm text-white bg-blue-500 rounded-r-full",
      inRangeDay: "w-full h-8 text-sm bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed",
      selectedDay: "w-8 h-8 mx-auto text-sm text-white bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed",
      activeDay: "w-8 h-8 mx-auto text-sm bg-blue-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed",
      highlightedDay: "w-8 h-8 mx-auto text-sm bg-blue-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed",
      day: "w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed",
      today: "w-8 h-8 mx-auto text-sm border border-blue-500 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed",
      monthWrapper: "px-3 py-2",
      selectedMonth: "w-full h-12 mx-auto text-sm text-white bg-blue-500 rounded",
      activeMonth: "w-full h-12 mx-auto text-sm bg-blue-100 rounded",
      month: "w-full h-12 mx-auto text-sm rounded hover:bg-blue-100",
      yearWrapper: "px-3 py-2",
      year: "w-full h-12 mx-auto text-sm rounded hover:bg-blue-100",
      selectedYear: "w-full h-12 mx-auto text-sm text-white bg-blue-500 rounded",
      activeYear: "w-full h-12 mx-auto text-sm bg-blue-100 rounded",
      timepickerWrapper: "flex items-center px-4 py-2 space-x-2",
      timepickerTimeWrapper: "flex items-center space-x-2",
      timepickerTimeFieldsWrapper: "flex items-center w-full text-right bg-gray-100 border border-gray-100 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      timepickerOkButton: "text-sm font-semibold text-blue-600 uppercase transition duration-100 ease-in-out border border-transparent rounded cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      timepickerInput: "w-8 h-6 p-0 text-sm text-center transition duration-100 ease-in-out bg-transparent border border-transparent rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      timepickerTimeLabel: "flex-grow text-sm text-gray-500",
      timepickerAmPmWrapper: "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out bg-gray-100 border border-transparent rounded cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      timepickerAmPmWrapperChecked: "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out bg-gray-100 border border-transparent rounded cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      timepickerAmPmWrapperDisabled: "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out opacity-50 cursor-not-allowed",
      timepickerAmPmWrapperCheckedDisabled: "relative inline-flex flex-shrink-0 transition duration-200 ease-in-out opacity-50 cursor-not-allowed",
      timepickerAmPmButton: "absolute flex items-center justify-center w-6 h-6 text-xs text-gray-800 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded shadow",
      timepickerAmPmButtonChecked: "absolute flex items-center justify-center w-6 h-6 text-xs text-gray-800 transition duration-200 ease-in-out transform translate-x-full bg-white rounded shadow",
      timepickerAmPmCheckedPlaceholder: "flex items-center justify-center w-6 h-6 text-xs text-gray-500 rounded-sm",
      timepickerAmPmUncheckedPlaceholder: "flex items-center justify-center w-6 h-6 text-xs text-gray-500 rounded-sm"
    }
  };
  const TDatepickerClassesKeys = Object.keys(TDatepickerConfig.classes);
  const TToggleConfig = {
    classes: {
      wrapper: "bg-gray-100 border-2 border-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      wrapperChecked: "bg-blue-500 border-2 border-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      wrapperDisabled: "bg-gray-100 border-2 border-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      wrapperCheckedDisabled: "bg-blue-500 border-2 border-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      button: "flex items-center justify-center w-5 h-5 text-xs text-gray-400 bg-white rounded-full shadow",
      buttonChecked: "flex items-center justify-center w-5 h-5 text-xs text-blue-500 bg-white rounded-full shadow",
      checkedPlaceholder: "flex items-center justify-center w-5 h-5 text-xs text-gray-400 rounded-full",
      uncheckedPlaceholder: "flex items-center justify-center w-5 h-5 text-xs text-gray-400 rounded-full"
    },
    fixedClasses: {
      wrapper: "relative inline-flex flex-shrink-0 items-center transition-colors duration-200 ease-in-out cursor-pointer",
      wrapperChecked: "relative inline-flex flex-shrink-0 items-center transition-colors duration-200 ease-in-out cursor-pointer",
      wrapperDisabled: "relative inline-flex flex-shrink-0 items-center transition-colors duration-200 ease-in-out opacity-50 cursor-pointer cursor-not-allowed",
      wrapperCheckedDisabled: "relative inline-flex flex-shrink-0 items-center transition-colors duration-200 ease-in-out opacity-50 cursor-pointer cursor-not-allowed",
      button: "absolute transition duration-200 ease-in-out transform translate-x-0",
      buttonChecked: "absolute transition duration-200 ease-in-out transform translate-x-full",
      checkedPlaceholder: "",
      uncheckedPlaceholder: ""
    }
  };
  const TToggleClassesKeys = Object.keys(TToggleConfig.classes);
  const TWrappedRadioClassesKeys = ["wrapper", "wrapperChecked", "inputWrapper", "inputWrapperChecked", "input", "label", "labelChecked"];
  const TWrappedRadioConfig = {
    classes: {
      wrapper: "flex items-center space-x-2",
      inputWrapper: "inline-flex",
      label: "",
      input: TRadioConfig.classes
    }
  };
  const TWrappedCheckboxClassesKeys = ["wrapper", "wrapperChecked", "inputWrapper", "inputWrapperChecked", "input", "label", "labelChecked"];
  const TWrappedCheckboxConfig = {
    classes: {
      wrapper: "flex items-center space-x-2",
      inputWrapper: "inline-flex",
      label: "",
      input: TCheckboxConfig.classes
    }
  };
  const isPrimitive = (value) => {
    if (value === null) {
      return true;
    }
    return !["array", "function", "object"].includes(typeof value);
  };
  const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const clone = (obj) => {
    if (obj instanceof Date) {
      return new Date(obj.valueOf());
    }
    return JSON.parse(JSON.stringify(obj));
  };
  const debounce = (func, wait = 200) => {
    let timeout;
    const cancel = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    const debounceFn = (...args) => {
      cancel();
      timeout = setTimeout(() => {
        timeout = void 0;
        func(args);
      }, wait);
      if (!wait) {
        func(args);
      }
    };
    return Object.assign(debounceFn, { cancel });
  };
  const throttle = (func, wait = 200) => {
    let isCalled = false;
    return (...args) => {
      if (!isCalled) {
        func(...args);
        isCalled = true;
        setTimeout(() => {
          isCalled = false;
        }, wait);
      }
    };
  };
  const addToArray = (arr, value) => {
    if (!Array.isArray(arr)) {
      return [value];
    }
    return [...arr, value];
  };
  const substractFromArray = (arr, value) => {
    if (!Array.isArray(arr)) {
      return [];
    }
    const index = arr.findIndex((valueInOriginal) => isEqual(valueInOriginal, value));
    if (index === -1) {
      return arr;
    }
    const newArray = [...arr];
    newArray.splice(index, 1);
    return newArray;
  };
  const elementIsTargetOrTargetChild = (target, wrapper2) => {
    if (!(target instanceof Element)) {
      return false;
    }
    return wrapper2.contains(target);
  };
  const getFocusableElements = (element) => Array.from(element.querySelectorAll('a, button, input, textarea, select, details, [contenteditable], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute("disabled"));
  const isTouchOnlyDevice = (w) => {
    if (w === void 0) {
      if (window === void 0) {
        return false;
      }
      w = window;
    }
    return !!(w.matchMedia && w.matchMedia("(any-hover: none)").matches);
  };
  const normalizeMeasure = (measure) => {
    if (measure === null || measure === void 0) {
      return void 0;
    }
    if (typeof measure === "number") {
      return `${measure}px`;
    }
    if (String(Number(measure)) === measure) {
      return `${Number(measure)}px`;
    }
    return measure;
  };
  const normalizedOptionIsDisabled = (option) => option.disabled === true || option.disabled === "disabled";
  const promisify = (value) => {
    if (value instanceof Promise) {
      return value;
    }
    return Promise.resolve(value);
  };
  const promisifyFunctionResult = (fn, ...args) => {
    const result = fn(...args);
    return promisify(result);
  };
  const English = {
    weekdays: {
      shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    },
    months: {
      shorthand: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      longhand: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: (nth) => {
      const s = nth % 100;
      switch (s % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time24hr: false,
    timeLabel: "Time",
    okLabel: "Ok"
  };
  exports2.WeekDay = void 0;
  (function(WeekDay2) {
    WeekDay2[WeekDay2["Sunday"] = 0] = "Sunday";
    WeekDay2[WeekDay2["Monday"] = 1] = "Monday";
    WeekDay2[WeekDay2["Tuesday"] = 2] = "Tuesday";
    WeekDay2[WeekDay2["Wednesday"] = 3] = "Wednesday";
    WeekDay2[WeekDay2["Thursday"] = 4] = "Thursday";
    WeekDay2[WeekDay2["Friday"] = 5] = "Friday";
    WeekDay2[WeekDay2["Saturday"] = 6] = "Saturday";
  })(exports2.WeekDay || (exports2.WeekDay = {}));
  const getDateInDayNumber = (date, dayNumber) => new Date(date.getFullYear(), date.getMonth(), dayNumber);
  const getFirstDayOfMonth = (fromDate) => new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
  const getFirstDayOfNextMonth = (fromDate) => new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1);
  const getFirstDayOfPrevMonth = (fromDate) => new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, 1);
  const getLastDayOfMonth = (fromDate) => new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
  const getLastDayOfPrevMonth = (fromDate) => new Date(fromDate.getFullYear(), fromDate.getMonth(), 0);
  const getNextMonthDays = (firstDayOfNextMonth, monthDays, prevMonthDays) => {
    const nextMonthTotalDays = 7 - (monthDays.length + prevMonthDays.length) % 7;
    if (nextMonthTotalDays === 7) {
      return [];
    }
    return Array.from({ length: nextMonthTotalDays }, (_x, i) => i + 1).map((day) => getDateInDayNumber(firstDayOfNextMonth, day));
  };
  const getMonthDays = (month, lastDayOfMonth) => Array.from({ length: lastDayOfMonth.getDate() }, (_x, i) => i + 1).map((day) => getDateInDayNumber(month, day));
  const getPreviousMonthDays = (month, firstDayOfPrevMonth, lastDayOfPrevMonth, weekstart) => {
    let prevMonthTotalDays = getFirstDayOfMonth(month).getDay() - weekstart;
    if (prevMonthTotalDays < 0) {
      prevMonthTotalDays = 7 + prevMonthTotalDays;
    }
    return Array.from({ length: prevMonthTotalDays }, (_x, i) => lastDayOfPrevMonth.getDate() - i).reverse().map((day) => getDateInDayNumber(firstDayOfPrevMonth, day));
  };
  const visibleDaysInMonthView = (month, weekstart = exports2.WeekDay.Sunday) => {
    const firstDayOfPrevMonth = getFirstDayOfPrevMonth(month);
    const lastDayOfPrevMonth = getLastDayOfPrevMonth(month);
    const lastDayOfMonth = getLastDayOfMonth(month);
    const firstDayOfNextMonth = getFirstDayOfNextMonth(month);
    const prevMonthDays = getPreviousMonthDays(month, firstDayOfPrevMonth, lastDayOfPrevMonth, weekstart);
    const monthDays = getMonthDays(month, lastDayOfMonth);
    const nextMonthDays = getNextMonthDays(firstDayOfNextMonth, monthDays, prevMonthDays);
    return prevMonthDays.concat(monthDays, nextMonthDays);
  };
  const isSameMonth = (date1, date2) => {
    if (!date1 || !date2) {
      return false;
    }
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
  };
  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) {
      return false;
    }
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  };
  const isToday = (date) => isSameDay(date, new Date());
  const addDays = (date, amount = 1) => {
    const result = clone(date);
    result.setDate(result.getDate() + amount);
    return result;
  };
  const addMonths = (date, amount = 1) => {
    let newDate = clone(date);
    newDate.setMonth(date.getMonth() + amount);
    if (newDate.getDate() !== date.getDate()) {
      newDate = getLastDayOfPrevMonth(newDate);
    }
    return newDate;
  };
  const addYears = (date, amount = 1) => {
    let newDate = clone(date);
    newDate.setFullYear(date.getFullYear() + amount);
    if (newDate.getDate() !== date.getDate()) {
      newDate = getLastDayOfPrevMonth(newDate);
    }
    return newDate;
  };
  const boolToInt$1 = (bool) => bool === true ? 1 : 0;
  const doNothing = () => void 0;
  const tokenParsingFunctions = {
    D: doNothing,
    F(dateObj, monthName, locale) {
      dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: (dateObj, hour) => {
      dateObj.setHours(parseFloat(hour));
    },
    H: (dateObj, hour) => {
      dateObj.setHours(parseFloat(hour));
    },
    J: (dateObj, day) => {
      dateObj.setDate(parseFloat(day));
    },
    K: (dateObj, amPM, locale) => {
      dateObj.setHours(dateObj.getHours() % 12 + 12 * boolToInt$1(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M(dateObj, shortMonth, locale) {
      dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: (dateObj, seconds) => {
      dateObj.setSeconds(parseFloat(seconds));
    },
    U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1e3),
    W(dateObj, weekNum, locale) {
      const weekNumber = parseInt(weekNum, 10);
      const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
      date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
      return date;
    },
    Y: (dateObj, year) => {
      dateObj.setFullYear(parseFloat(year));
    },
    Z: (_, ISODate) => new Date(ISODate),
    d: (dateObj, day) => {
      dateObj.setDate(parseFloat(day));
    },
    h: (dateObj, hour) => {
      dateObj.setHours(parseFloat(hour));
    },
    i: (dateObj, minutes) => {
      dateObj.setMinutes(parseFloat(minutes));
    },
    j: (dateObj, day) => {
      dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: (dateObj, month) => {
      dateObj.setMonth(parseFloat(month) - 1);
    },
    n: (dateObj, month) => {
      dateObj.setMonth(parseFloat(month) - 1);
    },
    s: (dateObj, seconds) => {
      dateObj.setSeconds(parseFloat(seconds));
    },
    w: doNothing,
    y: (dateObj, year) => {
      dateObj.setFullYear(2e3 + parseFloat(year));
    }
  };
  const tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})"
  };
  const isTimestamp = (date) => typeof date === "number";
  const isGMTString = (date) => date.toLowerCase().endsWith("gmt");
  const isIsoString = (date) => date.toLowerCase().endsWith("z");
  const getIsBackSlash = (char) => char === "\\";
  const getTokenParsingOperationsFromFormat = (date, format, locale) => {
    const localeTokenRegex = __spreadValues({}, tokenRegex);
    localeTokenRegex.K = `(${locale.amPM[0]}|${locale.amPM[1]}|${locale.amPM[0].toLowerCase()}|${locale.amPM[1].toLowerCase()})`;
    const operations = [];
    let regexString = "";
    let matchIndex = 0;
    format.split("").forEach((token, tokenIndex) => {
      const isBackSlash = getIsBackSlash(token);
      const isEscaped = getIsBackSlash(format[tokenIndex - 1]) || isBackSlash;
      const regex = localeTokenRegex[token];
      if (!isEscaped && regex) {
        regexString += regex;
        const match = new RegExp(regexString).exec(date);
        if (match !== null) {
          matchIndex += 1;
          if (token === "Y") {
            operations.unshift({
              fn: tokenParsingFunctions[token],
              match: match[matchIndex]
            });
          } else {
            operations.push({
              fn: tokenParsingFunctions[token],
              match: match[matchIndex]
            });
          }
        }
      } else if (!isBackSlash) {
        regexString += ".";
      }
    });
    return operations;
  };
  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  const parseDate = (date, fromFormat = "Y-m-d H:i:S", timeless, customLocale) => {
    if (date !== 0 && !date) {
      return void 0;
    }
    if (date === "today") {
      return getToday();
    }
    const locale = customLocale || English;
    let parsedDate;
    const originalDate = date;
    if (date instanceof Date) {
      parsedDate = clone(date);
    } else if (isTimestamp(date)) {
      parsedDate = new Date(date);
    } else if (typeof date === "string") {
      if (isGMTString(date) || isIsoString(date)) {
        parsedDate = new Date(date);
      } else {
        const operations = getTokenParsingOperationsFromFormat(date, fromFormat, locale);
        if (operations.length === 0) {
          parsedDate = void 0;
        } else {
          parsedDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
          operations.forEach((operation) => {
            const { fn, match } = operation;
            parsedDate = fn(parsedDate, String(match), locale) || parsedDate;
          });
        }
      }
    } else {
      throw new Error(`Invalid date provided: ${originalDate}`);
    }
    if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
      throw new Error(`Invalid date provided: ${originalDate}`);
    }
    if (timeless === true) {
      parsedDate.setHours(0, 0, 0, 0);
    }
    return parsedDate;
  };
  const dateIsPartOfTheRange = (date, min, max, dateParser = parseDate, dateFormat = "Y-m-d H:i:S") => {
    const minDate = min === void 0 ? void 0 : dateParser(min, dateFormat);
    const maxDate = max === void 0 ? void 0 : dateParser(max, dateFormat);
    const time = date.getTime();
    if (minDate && maxDate) {
      return time >= minDate.getTime() && time <= maxDate.getTime();
    }
    if (minDate) {
      return time >= minDate.getTime();
    }
    if (maxDate) {
      return time <= maxDate.getTime();
    }
    return true;
  };
  const dayIsPartOfTheConditions = (date, condition, dateParser, dateFormat) => {
    if (!date) {
      return false;
    }
    if (typeof condition === "function") {
      return condition(date);
    }
    if (typeof condition === "string" || condition instanceof String) {
      const disabledDate = dateParser(condition, dateFormat);
      return isSameDay(disabledDate, date);
    }
    if (condition instanceof Date) {
      return isSameDay(condition, date);
    }
    if (Array.isArray(condition)) {
      return condition.some((c) => dayIsPartOfTheConditions(date, c, dateParser, dateFormat));
    }
    return false;
  };
  const boolToInt = (bool) => bool === true ? 1 : 0;
  const pad = (number, length = 2) => `000${number}`.slice(length * -1);
  const monthToString = (monthNumber, shorthand, locale) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
  const tokenFormatingFunctions = {
    Z: (date) => date.toISOString(),
    D(date, locale) {
      return locale.weekdays.shorthand[tokenFormatingFunctions.w(date, locale)];
    },
    F(date, locale) {
      return monthToString(tokenFormatingFunctions.n(date, locale) - 1, false, locale);
    },
    G(date, locale) {
      return pad(tokenFormatingFunctions.h(date, locale));
    },
    H: (date) => pad(date.getHours()),
    J(date, locale) {
      return date.getDate() + locale.ordinal(date.getDate());
    },
    K: (date, locale) => locale.amPM[boolToInt(date.getHours() > 11)],
    M(date, locale) {
      return monthToString(date.getMonth(), true, locale);
    },
    S: (date) => pad(date.getSeconds()),
    U: (date) => date.getTime() / 1e3,
    W(givenDate) {
      const date = new Date(givenDate.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
    },
    Y: (date) => pad(date.getFullYear(), 4),
    d: (date) => pad(date.getDate()),
    h: (date) => date.getHours() % 12 ? date.getHours() % 12 : 12,
    i: (date) => pad(date.getMinutes()),
    j: (date) => date.getDate(),
    l(date, locale) {
      return locale.weekdays.longhand[date.getDay()];
    },
    m: (date) => pad(date.getMonth() + 1),
    n: (date) => date.getMonth() + 1,
    s: (date) => date.getSeconds(),
    w: (date) => date.getDay(),
    y: (date) => String(date.getFullYear()).substring(2)
  };
  const formatDate = (date, format, customLocale) => {
    if (!date) {
      return "";
    }
    const locale = customLocale || English;
    return format.split("").map((char, i, arr) => {
      if (tokenFormatingFunctions[char] && arr[i - 1] !== "\\") {
        return tokenFormatingFunctions[char](date, locale);
      }
      if (char !== "\\") {
        return char;
      }
      return "";
    }).join("");
  };
  const buildDateParser = (locale, customDateParser) => (date, format = "Y-m-d H:i:S", timeless) => {
    if (customDateParser) {
      return customDateParser(date, format, timeless, locale);
    }
    return parseDate(date, format, timeless, locale);
  };
  const buildDateFormatter = (locale, customDateFormatter) => (date, format = "Y-m-d H:i:S") => {
    if (customDateFormatter) {
      return customDateFormatter(date, format, locale);
    }
    return formatDate(date, format, locale);
  };
  exports2.TAlertClassesKeys = TAlertClassesKeys;
  exports2.TAlertConfig = TAlertConfig;
  exports2.TButtonConfig = TButtonConfig;
  exports2.TCardClassesKeys = TCardClassesKeys;
  exports2.TCardConfig = TCardConfig;
  exports2.TCheckboxConfig = TCheckboxConfig;
  exports2.TDatepickerClassesKeys = TDatepickerClassesKeys;
  exports2.TDatepickerConfig = TDatepickerConfig;
  exports2.TDialogClassesKeys = TDialogClassesKeys;
  exports2.TDialogConfig = TDialogConfig;
  exports2.TDropdownClassesKeys = TDropdownClassesKeys;
  exports2.TDropdownConfig = TDropdownConfig;
  exports2.TDropdownPopperDefaultOptions = TDropdownPopperDefaultOptions;
  exports2.TInputConfig = TInputConfig;
  exports2.TInputGroupClassesKeys = TInputGroupClassesKeys;
  exports2.TInputGroupConfig = TInputGroupConfig;
  exports2.TModalClassesKeys = TModalClassesKeys;
  exports2.TModalConfig = TModalConfig;
  exports2.TRadioConfig = TRadioConfig;
  exports2.TRichSelectClassesKeys = TRichSelectClassesKeys;
  exports2.TRichSelectConfig = TRichSelectConfig;
  exports2.TSelectConfig = TSelectConfig;
  exports2.TTagConfig = TTagConfig;
  exports2.TTextareaConfig = TTextareaConfig;
  exports2.TToggleClassesKeys = TToggleClassesKeys;
  exports2.TToggleConfig = TToggleConfig;
  exports2.TWrappedCheckboxClassesKeys = TWrappedCheckboxClassesKeys;
  exports2.TWrappedCheckboxConfig = TWrappedCheckboxConfig;
  exports2.TWrappedRadioClassesKeys = TWrappedRadioClassesKeys;
  exports2.TWrappedRadioConfig = TWrappedRadioConfig;
  exports2.addDays = addDays;
  exports2.addMonths = addMonths;
  exports2.addToArray = addToArray;
  exports2.addYears = addYears;
  exports2.buildDateFormatter = buildDateFormatter;
  exports2.buildDateParser = buildDateParser;
  exports2.clone = clone;
  exports2.dateEnglishLocale = English;
  exports2.dateIsPartOfTheRange = dateIsPartOfTheRange;
  exports2.dayIsPartOfTheConditions = dayIsPartOfTheConditions;
  exports2.debounce = debounce;
  exports2.elementIsTargetOrTargetChild = elementIsTargetOrTargetChild;
  exports2.filterOptions = filterOptions;
  exports2.flattenOptions = flattenOptions;
  exports2.formatDate = formatDate;
  exports2.get = get;
  exports2.getFocusableElements = getFocusableElements;
  exports2.hasProperty = hasProperty;
  exports2.isEqual = isEqual;
  exports2.isPrimitive = isPrimitive;
  exports2.isSameDay = isSameDay;
  exports2.isSameMonth = isSameMonth;
  exports2.isToday = isToday;
  exports2.isTouchOnlyDevice = isTouchOnlyDevice;
  exports2.mergeClasses = mergeClasses;
  exports2.normalizeMeasure = normalizeMeasure;
  exports2.normalizeOptions = normalizeOptions;
  exports2.normalizedOptionIsDisabled = normalizedOptionIsDisabled;
  exports2.parseDate = parseDate;
  exports2.parseVariant = parseVariant;
  exports2.parseVariantWithClassesList = parseVariantWithClassesList;
  exports2.pick = pick;
  exports2.promisify = promisify;
  exports2.promisifyFunctionResult = promisifyFunctionResult;
  exports2.substractFromArray = substractFromArray;
  exports2.throttle = throttle;
  exports2.visibleDaysInMonthView = visibleDaysInMonthView;
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2[Symbol.toStringTag] = "Module";
});
//# sourceMappingURL=index.umd.js.map


/***/ }),

/***/ "./node_modules/@variantjs/vue/dist/index.umd.js":
/*!*******************************************************!*\
  !*** ./node_modules/@variantjs/vue/dist/index.umd.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(global, factory) {
   true ? factory(exports, __webpack_require__(/*! vue */ "vue"), __webpack_require__(/*! @variantjs/core */ "./node_modules/@variantjs/core/dist/index.umd.js"), __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js")) : 0;
})(this, function(exports2, vue, core, core$1) {
  "use strict";
  class Emitter {
    constructor() {
      __publicField(this, "events", {});
    }
    on(name, callback) {
      if (this.events[name] === void 0) {
        this.events[name] = [callback];
      } else {
        this.events[name].push(callback);
      }
    }
    once(name, callback) {
      const listener = (...args) => {
        callback(...args);
        this.off(name, listener);
      };
      return this.on(name, listener);
    }
    emit(name, ...args) {
      const events = this.events[name];
      if (events === void 0) {
        return;
      }
      events.forEach((callback) => {
        callback(...args);
      });
    }
    off(name, callback) {
      const events = this.events[name];
      if (events === void 0) {
        return;
      }
      const index = events.findIndex((c) => c === callback);
      if (index < 0) {
        return;
      }
      events.splice(index, 1);
      this.events[name] = events;
    }
  }
  const getVariantProps = () => ({
    classes: {
      type: [String, Array, Object],
      default: void 0
    },
    fixedClasses: {
      type: [String, Array, Object],
      default: void 0
    },
    variants: {
      type: Object,
      default: void 0
    },
    variant: {
      type: String,
      default: void 0
    }
  });
  const getVariantPropsWithClassesList = () => ({
    classes: {
      type: [String, Array, Object],
      default: void 0
    },
    fixedClasses: {
      type: [String, Array, Object],
      default: void 0
    },
    variants: {
      type: Object,
      default: void 0
    },
    variant: {
      type: String,
      default: void 0
    }
  });
  const sameWidthModifier = {
    name: "sameWidth",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: (options) => {
      const { state } = options;
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: (options) => {
      const { state } = options;
      const reference = state.elements.reference;
      state.elements.popper.style.width = `${reference.offsetWidth}px`;
    }
  };
  const icons = {};
  const svgToVueComponent = (el, deep = 0) => {
    let iconAsString = null;
    if (deep === 0) {
      iconAsString = typeof el === "string" ? el : el.outerHTML;
      if (icons[iconAsString]) {
        return icons[iconAsString];
      }
    }
    let elToConvert = el;
    if (typeof elToConvert === "string") {
      const div = document.createElement("div");
      div.innerHTML = elToConvert;
      elToConvert = div.firstElementChild;
    }
    if (elToConvert === null) {
      return vue.h("span");
    }
    const attributes = Array.from(elToConvert.attributes);
    const children = Array.from(elToConvert.children);
    const attrs = {};
    attributes.filter((attribute) => !attribute.name.startsWith("on")).forEach((attribute) => {
      attrs[attribute.name] = attribute.value;
    });
    const component = vue.h(elToConvert.tagName, attrs, children.map((child) => svgToVueComponent(child, deep + 1)));
    if (deep === 0 && iconAsString !== null) {
      icons[iconAsString] = component;
    }
    return component;
  };
  const extractDefinedProps = (vm) => {
    const validProps = Object.keys(vm.props);
    const definedProps = Object.keys(vm.vnode.props || {}).map((propName) => vue.camelize(propName)).filter((propName) => validProps.includes(propName) && propName !== "modelValue");
    return definedProps;
  };
  function useAttributes(configuration) {
    const vm = vue.getCurrentInstance();
    const computedAttributes = vue.computed(() => {
      const availableProps = Object.keys(vm.props);
      return core.pick(configuration, (value, key) => core.isPrimitive(value) && !availableProps.includes(String(key)));
    });
    const attributes = vue.reactive(computedAttributes.value);
    vue.watch(computedAttributes, (newValue) => {
      Object.keys(newValue).forEach((key) => {
        if (!core.isEqual(attributes[key], newValue[key])) {
          attributes[key] = newValue[key];
        }
      });
    });
    return attributes;
  }
  function useConfigurationParts() {
    const vm = vue.getCurrentInstance();
    const variantGlobalConfiguration = vue.inject("configuration", {});
    const componentGlobalConfiguration = core.get(variantGlobalConfiguration, vm == null ? void 0 : vm.type.name, {});
    const propsValues = vue.computed(() => {
      const values = {};
      extractDefinedProps(vm).forEach((attributeName) => {
        const normalizedAttribute = vue.camelize(attributeName);
        values[normalizedAttribute] = vm.props[normalizedAttribute];
      });
      return values;
    });
    return {
      componentGlobalConfiguration,
      propsValues
    };
  }
  function useConfiguration(defaultConfiguration) {
    const vm = vue.getCurrentInstance();
    const { propsValues, componentGlobalConfiguration } = useConfigurationParts();
    const computedConfiguration = vue.computed(() => {
      const props = __spreadValues({}, vm.props);
      delete props.modelValue;
      return __spreadValues(__spreadValues({}, props), core.parseVariant(propsValues.value, componentGlobalConfiguration, defaultConfiguration));
    });
    const configuration = vue.reactive(computedConfiguration.value);
    vue.watch(computedConfiguration, (newValue) => {
      Object.keys(newValue).forEach((key) => {
        configuration[key] = newValue[key];
      });
    });
    const attributes = useAttributes(configuration);
    return {
      configuration,
      attributes
    };
  }
  function useConfigurationWithClassesList(defaultConfiguration, classesListKeys) {
    const vm = vue.getCurrentInstance();
    const { propsValues, componentGlobalConfiguration } = useConfigurationParts();
    const computedConfiguration = vue.computed(() => __spreadValues(__spreadValues({}, vm.props), core.parseVariantWithClassesList(propsValues.value, classesListKeys, componentGlobalConfiguration, defaultConfiguration)));
    const configuration = vue.reactive(computedConfiguration.value);
    vue.watch(computedConfiguration, (newValue) => {
      Object.keys(newValue).forEach((key) => {
        configuration[key] = newValue[key];
      });
    });
    const attributes = useAttributes(configuration);
    return {
      configuration,
      attributes
    };
  }
  function useVModel(props, key) {
    const vm = vue.getCurrentInstance();
    const localValue = vue.ref(props[key]);
    vue.watch(localValue, (value) => {
      vm == null ? void 0 : vm.emit(`update:${key}`, value);
    });
    vue.watch(() => props[key], (value) => {
      localValue.value = value;
    });
    return localValue;
  }
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  var hasPassiveEvents = false;
  if (typeof window !== "undefined") {
    var passiveTestOptions = {
      get passive() {
        hasPassiveEvents = true;
        return void 0;
      }
    };
    window.addEventListener("testPassive", null, passiveTestOptions);
    window.removeEventListener("testPassive", null, passiveTestOptions);
  }
  var isIosDevice = typeof window !== "undefined" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  var locks = [];
  var documentListenerAdded = false;
  var initialClientY = -1;
  var previousBodyOverflowSetting = void 0;
  var previousBodyPosition = void 0;
  var previousBodyPaddingRight = void 0;
  var allowTouchMove = function allowTouchMove2(el) {
    return locks.some(function(lock) {
      if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
        return true;
      }
      return false;
    });
  };
  var preventDefault = function preventDefault2(rawEvent) {
    var e = rawEvent || window.event;
    if (allowTouchMove(e.target)) {
      return true;
    }
    if (e.touches.length > 1)
      return true;
    if (e.preventDefault)
      e.preventDefault();
    return false;
  };
  var setOverflowHidden = function setOverflowHidden2(options) {
    if (previousBodyPaddingRight === void 0) {
      var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
      var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;
      if (_reserveScrollBarGap && scrollBarGap > 0) {
        var computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
        previousBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = computedBodyPaddingRight + scrollBarGap + "px";
      }
    }
    if (previousBodyOverflowSetting === void 0) {
      previousBodyOverflowSetting = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  };
  var restoreOverflowSetting = function restoreOverflowSetting2() {
    if (previousBodyPaddingRight !== void 0) {
      document.body.style.paddingRight = previousBodyPaddingRight;
      previousBodyPaddingRight = void 0;
    }
    if (previousBodyOverflowSetting !== void 0) {
      document.body.style.overflow = previousBodyOverflowSetting;
      previousBodyOverflowSetting = void 0;
    }
  };
  var setPositionFixed = function setPositionFixed2() {
    return window.requestAnimationFrame(function() {
      if (previousBodyPosition === void 0) {
        previousBodyPosition = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left
        };
        var _window = window, scrollY = _window.scrollY, scrollX = _window.scrollX, innerHeight = _window.innerHeight;
        document.body.style.position = "fixed";
        document.body.style.top = -scrollY;
        document.body.style.left = -scrollX;
        setTimeout(function() {
          return window.requestAnimationFrame(function() {
            var bottomBarHeight = innerHeight - window.innerHeight;
            if (bottomBarHeight && scrollY >= innerHeight) {
              document.body.style.top = -(scrollY + bottomBarHeight);
            }
          });
        }, 300);
      }
    });
  };
  var restorePositionSetting = function restorePositionSetting2() {
    if (previousBodyPosition !== void 0) {
      var y = -parseInt(document.body.style.top, 10);
      var x = -parseInt(document.body.style.left, 10);
      document.body.style.position = previousBodyPosition.position;
      document.body.style.top = previousBodyPosition.top;
      document.body.style.left = previousBodyPosition.left;
      window.scrollTo(x, y);
      previousBodyPosition = void 0;
    }
  };
  var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled2(targetElement) {
    return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
  };
  var handleScroll = function handleScroll2(event, targetElement) {
    var clientY = event.targetTouches[0].clientY - initialClientY;
    if (allowTouchMove(event.target)) {
      return false;
    }
    if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
      return preventDefault(event);
    }
    if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
      return preventDefault(event);
    }
    event.stopPropagation();
    return true;
  };
  var disableBodyScroll = function disableBodyScroll2(targetElement, options) {
    if (!targetElement) {
      console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
      return;
    }
    if (locks.some(function(lock2) {
      return lock2.targetElement === targetElement;
    })) {
      return;
    }
    var lock = {
      targetElement,
      options: options || {}
    };
    locks = [].concat(_toConsumableArray(locks), [lock]);
    if (isIosDevice) {
      setPositionFixed();
    } else {
      setOverflowHidden(options);
    }
    if (isIosDevice) {
      targetElement.ontouchstart = function(event) {
        if (event.targetTouches.length === 1) {
          initialClientY = event.targetTouches[0].clientY;
        }
      };
      targetElement.ontouchmove = function(event) {
        if (event.targetTouches.length === 1) {
          handleScroll(event, targetElement);
        }
      };
      if (!documentListenerAdded) {
        document.addEventListener("touchmove", preventDefault, hasPassiveEvents ? { passive: false } : void 0);
        documentListenerAdded = true;
      }
    }
  };
  var enableBodyScroll = function enableBodyScroll2(targetElement) {
    if (!targetElement) {
      console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
      return;
    }
    locks = locks.filter(function(lock) {
      return lock.targetElement !== targetElement;
    });
    if (isIosDevice) {
      targetElement.ontouchstart = null;
      targetElement.ontouchmove = null;
      if (documentListenerAdded && locks.length === 0) {
        document.removeEventListener("touchmove", preventDefault, hasPassiveEvents ? { passive: false } : void 0);
        documentListenerAdded = false;
      }
    }
    if (isIosDevice) {
      restorePositionSetting();
    } else {
      restoreOverflowSetting();
    }
  };
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$F = {};
  const _hoisted_1$n = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  };
  const _hoisted_2$h = /* @__PURE__ */ vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  }, null, -1);
  const _hoisted_3$f = [
    _hoisted_2$h
  ];
  function _sfc_render$F(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$n, _hoisted_3$f);
  }
  var CloseIcon = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$F]]);
  const _sfc_main$E = vue.defineComponent({
    name: "Transitionable",
    compatConfig: {
      MODE: 3
    },
    props: {
      classesList: {
        type: Object,
        default: () => ({})
      },
      enabled: {
        type: Boolean,
        default: true
      }
    }
  });
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b, _c, _d, _e, _f;
    return vue.openBlock(), vue.createBlock(vue.Transition, {
      "enter-active-class": (_a = _ctx.classesList) == null ? void 0 : _a.enterActiveClass,
      "enter-from-class": (_b = _ctx.classesList) == null ? void 0 : _b.enterFromClass,
      "enter-to-class": (_c = _ctx.classesList) == null ? void 0 : _c.enterToClass,
      "leave-active-class": (_d = _ctx.classesList) == null ? void 0 : _d.leaveActiveClass,
      "leave-from-class": (_e = _ctx.classesList) == null ? void 0 : _e.leaveFromClass,
      "leave-to-class": (_f = _ctx.classesList) == null ? void 0 : _f.leaveToClass,
      css: _ctx.enabled
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["enter-active-class", "enter-from-class", "enter-to-class", "leave-active-class", "leave-from-class", "leave-to-class", "css"]);
  }
  var Transitionable = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$E]]);
  const _sfc_main$D = vue.defineComponent({
    name: "TModal",
    compatConfig: {
      MODE: 3
    },
    components: {
      CloseIcon,
      Transitionable
    },
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      name: {
        type: String,
        default: void 0
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      modalAttributes: {
        type: Object,
        default: () => ({})
      },
      header: {
        type: String,
        default: void 0
      },
      body: {
        type: String,
        default: void 0
      },
      footer: {
        type: String,
        default: void 0
      },
      focusOnOpen: {
        type: Boolean,
        default: true
      },
      clickToClose: {
        type: Boolean,
        default: true
      },
      escToClose: {
        type: Boolean,
        default: true
      },
      disableBodyScroll: {
        type: Boolean,
        default: true
      },
      noBody: {
        type: Boolean,
        default: false
      },
      hideCloseButton: {
        type: Boolean,
        default: false
      },
      bodyScrollLockOptions: {
        type: Object,
        default: () => ({})
      },
      teleport: {
        type: Boolean,
        default: true
      },
      teleportTo: {
        type: [String, Object],
        default: "body"
      }
    }),
    emits: {
      shown: () => true,
      hidden: (reason) => true,
      "before-show": ({ cancel, params }) => true,
      "before-hide": ({ cancel, reason }) => true,
      "update:modelValue": () => true
    },
    setup(props, { emit }) {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TModalConfig, core.TModalClassesKeys);
      const overlay = vue.ref();
      let modalParameters;
      const showModel = useVModel(props, "modelValue");
      const showComponent = vue.ref(showModel.value);
      const showOverlay = vue.ref(showModel.value);
      const showModal = vue.ref(showModel.value);
      const hideReason = vue.ref(core.ModalHideReason.Value);
      const canceled = vue.ref(false);
      const hide = (reason = core.ModalHideReason.Other) => {
        hideReason.value = reason;
        showModel.value = false;
      };
      const show = (params) => {
        modalParameters = params;
        showModel.value = true;
      };
      const focusModal = () => {
        overlay.value.focus();
      };
      const initModal = () => {
        if (configuration.focusOnOpen) {
          focusModal();
        }
        if (configuration.disableBodyScroll) {
          disableBodyScroll(overlay.value, configuration.bodyScrollLockOptions);
        }
      };
      const reset = () => {
        modalParameters = void 0;
        hideReason.value = core.ModalHideReason.Value;
      };
      const onBeforeShow = () => new Promise((resolve, reject) => {
        emit("before-show", {
          cancel: reject,
          params: modalParameters
        });
        resolve();
      });
      const onBeforeHide = () => new Promise((resolve, reject) => {
        emit("before-hide", {
          cancel: reject,
          reason: hideReason.value
        });
        if (configuration.disableBodyScroll) {
          enableBodyScroll(overlay.value);
        }
        resolve();
      });
      const onShown = () => {
        emit("shown");
        initModal();
      };
      const onHidden = () => {
        emit("hidden", hideReason.value);
        reset();
      };
      vue.watch(showModel, async (isShow) => {
        if (canceled.value) {
          canceled.value = false;
          return;
        }
        if (isShow) {
          try {
            await onBeforeShow();
          } catch (e) {
            canceled.value = true;
            showModel.value = false;
            return;
          }
          showComponent.value = true;
          vue.nextTick(() => {
            showOverlay.value = true;
            vue.nextTick(() => {
              showModal.value = true;
              vue.nextTick(() => {
                onShown();
              });
            });
          });
        } else {
          try {
            await onBeforeHide();
          } catch (e) {
            canceled.value = true;
            showModel.value = true;
            return;
          }
          showModal.value = false;
          vue.nextTick(() => {
            showOverlay.value = false;
            vue.nextTick(() => {
              showComponent.value = false;
              vue.nextTick(() => {
                onHidden();
              });
            });
          });
        }
      });
      const onKeydownEscapeHandler = () => {
        if (!configuration.escToClose) {
          return;
        }
        hide(core.ModalHideReason.Esc);
      };
      const onClickHandler = () => {
        if (!configuration.clickToClose) {
          return;
        }
        hide(core.ModalHideReason.Outside);
      };
      vue.onMounted(() => {
        if (showModel.value) {
          initModal();
        }
      });
      vue.onBeforeUnmount(() => {
        reset();
        if (configuration.disableBodyScroll) {
          enableBodyScroll(overlay.value);
        }
      });
      if (configuration.name) {
        const emitter = vue.inject("emitter");
        emitter.on("modal:show", (name, params) => {
          if (configuration.name !== name) {
            return;
          }
          show(params);
        });
        emitter.on("modal:hide", (name) => {
          if (configuration.name !== name) {
            return;
          }
          hide(core.ModalHideReason.Method);
        });
      }
      const overlayTransitionClassesList = vue.computed(() => ({
        enterActiveClass: configuration.classesList.overlayEnterActiveClass,
        enterFromClass: configuration.classesList.overlayEnterFromClass,
        enterToClass: configuration.classesList.overlayEnterToClass,
        leaveActiveClass: configuration.classesList.overlayLeaveActiveClass,
        leaveFromClass: configuration.classesList.overlayLeaveFromClass,
        leaveToClass: configuration.classesList.overlayLeaveToClass
      }));
      return {
        configuration,
        attributes,
        showOverlay,
        showModal,
        showComponent,
        overlay,
        overlayTransitionClassesList,
        show,
        hide,
        focusModal,
        onKeydownEscapeHandler,
        onClickHandler,
        ModalHideReason: core.ModalHideReason
      };
    }
  });
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_close_icon = vue.resolveComponent("close-icon");
    const _component_transitionable = vue.resolveComponent("transitionable");
    return _ctx.showComponent ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
      key: 0,
      to: _ctx.configuration.teleportTo,
      disabled: !_ctx.configuration.teleport
    }, [
      vue.createVNode(_component_transitionable, { "classes-list": _ctx.overlayTransitionClassesList }, {
        default: vue.withCtx(() => {
          var _a;
          return [
            vue.withDirectives(vue.createElementVNode("div", vue.mergeProps(_ctx.attributes, {
              ref: "overlay",
              tabindex: "0",
              class: (_a = _ctx.configuration.classesList) == null ? void 0 : _a.overlay,
              onKeydown: _cache[2] || (_cache[2] = vue.withKeys((...args) => _ctx.onKeydownEscapeHandler && _ctx.onKeydownEscapeHandler(...args), ["escape"])),
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.onClickHandler && _ctx.onClickHandler(...args))
            }), [
              vue.createVNode(_component_transitionable, {
                "classes-list": _ctx.configuration.classesList
              }, {
                default: vue.withCtx(() => {
                  var _a2, _b, _c, _d, _e;
                  return [
                    vue.withDirectives(vue.createElementVNode("div", vue.mergeProps(_ctx.configuration.modalAttributes, {
                      ref: "modal",
                      class: (_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2.wrapper,
                      onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                      }, ["stop"]))
                    }), [
                      _ctx.noBody ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock("div", {
                        key: 1,
                        class: vue.normalizeClass((_b = _ctx.configuration.classesList) == null ? void 0 : _b.modal)
                      }, [
                        !_ctx.configuration.hideCloseButton ? vue.renderSlot(_ctx.$slots, "closeButton", {
                          key: 0,
                          hide: _ctx.hide
                        }, () => {
                          var _a3;
                          return [
                            vue.createElementVNode("button", {
                              type: "button",
                              class: vue.normalizeClass((_a3 = _ctx.configuration.classesList) == null ? void 0 : _a3.close),
                              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.hide(_ctx.ModalHideReason.Close))
                            }, [
                              vue.renderSlot(_ctx.$slots, "closeButtonIcon", { hide: _ctx.hide }, () => {
                                var _a4;
                                return [
                                  vue.createVNode(_component_close_icon, {
                                    class: vue.normalizeClass((_a4 = _ctx.configuration.classesList) == null ? void 0 : _a4.closeIcon)
                                  }, null, 8, ["class"])
                                ];
                              })
                            ], 2)
                          ];
                        }) : vue.createCommentVNode("", true),
                        _ctx.$slots.header || _ctx.configuration.header ? (vue.openBlock(), vue.createElementBlock("div", {
                          key: 1,
                          ref: "header",
                          class: vue.normalizeClass((_c = _ctx.configuration.classesList) == null ? void 0 : _c.header)
                        }, [
                          vue.renderSlot(_ctx.$slots, "header", { hide: _ctx.hide }, () => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.configuration.header), 1)
                          ])
                        ], 2)) : vue.createCommentVNode("", true),
                        _ctx.$slots.default || _ctx.configuration.body ? (vue.openBlock(), vue.createElementBlock("div", {
                          key: 2,
                          ref: "body",
                          class: vue.normalizeClass((_d = _ctx.configuration.classesList) == null ? void 0 : _d.body)
                        }, [
                          vue.renderSlot(_ctx.$slots, "default", { hide: _ctx.hide }, () => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.configuration.body), 1)
                          ])
                        ], 2)) : vue.createCommentVNode("", true),
                        _ctx.$slots.footer || _ctx.configuration.footer ? (vue.openBlock(), vue.createElementBlock("div", {
                          key: 3,
                          ref: "footer",
                          class: vue.normalizeClass((_e = _ctx.configuration.classesList) == null ? void 0 : _e.footer)
                        }, [
                          vue.renderSlot(_ctx.$slots, "footer", { hide: _ctx.hide }, () => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.configuration.footer), 1)
                          ])
                        ], 2)) : vue.createCommentVNode("", true)
                      ], 2))
                    ], 16), [
                      [vue.vShow, _ctx.showModal]
                    ])
                  ];
                }),
                _: 3
              }, 8, ["classes-list"])
            ], 16), [
              [vue.vShow, _ctx.showOverlay]
            ])
          ];
        }),
        _: 3
      }, 8, ["classes-list"])
    ], 8, ["to", "disabled"])) : vue.createCommentVNode("", true);
  }
  var TModal = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$D]]);
  const _sfc_main$C = {};
  const _hoisted_1$m = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  };
  const _hoisted_2$g = /* @__PURE__ */ vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  }, null, -1);
  const _hoisted_3$e = [
    _hoisted_2$g
  ];
  function _sfc_render$C(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$m, _hoisted_3$e);
  }
  var CheckCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C]]);
  const _sfc_main$B = {};
  const _hoisted_1$l = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  };
  const _hoisted_2$f = /* @__PURE__ */ vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }, null, -1);
  const _hoisted_3$d = [
    _hoisted_2$f
  ];
  function _sfc_render$B(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$l, _hoisted_3$d);
  }
  var QuestionMarkCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B]]);
  const _sfc_main$A = {};
  const _hoisted_1$k = {
    xmlns: "http://www.w3.org/2000/svg",
    class: "w-6 h-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  };
  const _hoisted_2$e = /* @__PURE__ */ vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }, null, -1);
  const _hoisted_3$c = [
    _hoisted_2$e
  ];
  function _sfc_render$A(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$k, _hoisted_3$c);
  }
  var InformationCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A]]);
  const _sfc_main$z = {};
  const _hoisted_1$j = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  };
  const _hoisted_2$d = /* @__PURE__ */ vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  }, null, -1);
  const _hoisted_3$b = [
    _hoisted_2$d
  ];
  function _sfc_render$z(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$j, _hoisted_3$b);
  }
  var ExclamationIcon = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z]]);
  const _sfc_main$y = {};
  const _hoisted_1$i = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  };
  const _hoisted_2$c = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_3$a = [
    _hoisted_2$c
  ];
  function _sfc_render$y(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$i, _hoisted_3$a);
  }
  var SolidCheckCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y]]);
  const _sfc_main$x = {};
  const _hoisted_1$h = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  };
  const _hoisted_2$b = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_3$9 = [
    _hoisted_2$b
  ];
  function _sfc_render$x(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$h, _hoisted_3$9);
  }
  var SolidQuestionMarkCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x]]);
  const _sfc_main$w = {};
  const _hoisted_1$g = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  };
  const _hoisted_2$a = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_3$8 = [
    _hoisted_2$a
  ];
  function _sfc_render$w(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$g, _hoisted_3$8);
  }
  var SolidInformationCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w]]);
  const _sfc_main$v = {};
  const _hoisted_1$f = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  };
  const _hoisted_2$9 = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_3$7 = [
    _hoisted_2$9
  ];
  function _sfc_render$v(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$f, _hoisted_3$7);
  }
  var SolidExclamationIcon = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v]]);
  const _sfc_main$u = {};
  const _hoisted_1$e = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  };
  const _hoisted_2$8 = /* @__PURE__ */ vue.createElementVNode("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
  }, null, -1);
  const _hoisted_3$6 = [
    _hoisted_2$8
  ];
  function _sfc_render$u(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$e, _hoisted_3$6);
  }
  var CrossCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u]]);
  const _sfc_main$t = {};
  const _hoisted_1$d = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  };
  const _hoisted_2$7 = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_3$5 = [
    _hoisted_2$7
  ];
  function _sfc_render$t(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$d, _hoisted_3$5);
  }
  var SolidCrossCircleIcon = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t]]);
  const _sfc_main$s = {};
  const _hoisted_1$c = {
    viewBox: "0 0 20 20",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_2$6 = /* @__PURE__ */ vue.createElementVNode("circle", {
    cx: "10",
    cy: "10",
    fill: "none",
    r: "8",
    "stroke-width": "2",
    stroke: "currentColor",
    "transform-origin": "center",
    opacity: "0.2"
  }, null, -1);
  const _hoisted_3$4 = /* @__PURE__ */ vue.createElementVNode("circle", {
    cx: "10",
    cy: "10",
    fill: "none",
    r: "8",
    "stroke-width": "2",
    stroke: "currentColor",
    "stroke-dasharray": "80",
    "stroke-dashoffset": "60",
    "transform-origin": "center"
  }, [
    /* @__PURE__ */ vue.createElementVNode("animateTransform", {
      attributeType: "xml",
      attributeName: "transform",
      type: "rotate",
      from: "0",
      to: "360",
      begin: "0",
      dur: "1s",
      repeatCount: "indefinite"
    })
  ], -1);
  const _hoisted_4$1 = [
    _hoisted_2$6,
    _hoisted_3$4
  ];
  function _sfc_render$s(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$c, _hoisted_4$1);
  }
  var LoadingIcon = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s]]);
  const _sfc_main$r = vue.defineComponent({
    name: "TDialog",
    compatConfig: {
      MODE: 3
    },
    components: {
      TModal,
      CloseIcon,
      LoadingIcon,
      CrossCircleIcon,
      SolidCrossCircleIcon,
      CheckCircleIcon,
      QuestionMarkCircleIcon,
      InformationCircleIcon,
      ExclamationIcon,
      SolidQuestionMarkCircleIcon,
      SolidInformationCircleIcon,
      SolidExclamationIcon,
      SolidCheckCircleIcon
    },
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      type: {
        type: String,
        default: core.DialogType.Alert
      },
      icon: {
        type: String,
        default: void 0
      },
      useSolidIcon: {
        type: Boolean,
        default: false
      },
      rejectOnCancel: {
        type: Boolean,
        default: true
      },
      rejectOnDismiss: {
        type: Boolean,
        default: void 0
      },
      title: {
        type: String,
        default: void 0
      },
      titleTag: {
        type: String,
        default: "h3"
      },
      textTag: {
        type: String,
        default: "p"
      },
      text: {
        type: String,
        default: void 0
      },
      cancelButtonText: {
        type: String,
        default: "Cancel"
      },
      cancelButtonAriaLabel: {
        type: String,
        default: "Cancel"
      },
      okButtonText: {
        type: String,
        default: "OK"
      },
      okButtonAriaLabel: {
        type: String,
        default: "OK"
      },
      preConfirm: {
        type: Function,
        default: void 0
      },
      name: {
        type: String,
        default: void 0
      },
      modelValue: {
        type: Boolean,
        default: false
      },
      dialogAttributes: {
        type: Object,
        default: () => ({})
      },
      focusOnOpen: {
        type: Boolean,
        default: true
      },
      clickToClose: {
        type: Boolean,
        default: true
      },
      escToClose: {
        type: Boolean,
        default: true
      },
      showCloseButton: {
        type: Boolean,
        default: true
      },
      disableBodyScroll: {
        type: Boolean,
        default: true
      },
      bodyScrollLockOptions: {
        type: Object,
        default: () => ({})
      },
      teleport: {
        type: Boolean,
        default: true
      },
      teleportTo: {
        type: [String, Object],
        default: "body"
      },
      inputAttributes: {
        type: Object,
        default: () => ({})
      },
      inputType: {
        type: String,
        default: "text"
      },
      inputValidator: {
        type: Function,
        default: void 0
      },
      inputValue: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: void 0
      }
    }),
    emits: {
      shown: () => true,
      hidden: (response) => true,
      error: (response) => true,
      "validation-error": (message) => true,
      "before-show": (e) => true,
      "before-hide": (e) => true,
      "update:modelValue": () => true
    },
    setup(props, { emit }) {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TDialogConfig, core.TDialogClassesKeys);
      const inputWrapperRef = vue.ref();
      const modalRef = vue.ref();
      const showModel = useVModel(props, "modelValue");
      const inputModel = vue.ref(props.inputValue);
      const busy = vue.ref(false);
      const errorMessage = vue.ref(void 0);
      const validationErrorMessage = vue.ref(void 0);
      const hideReason = vue.ref(void 0);
      const dialogResponse = vue.ref(void 0);
      const preConfirmResponse = vue.ref(void 0);
      const promiseResolve = vue.ref(void 0);
      const promiseReject = vue.ref(void 0);
      const isPrompt = vue.computed(() => configuration.type === core.DialogType.Prompt);
      const setError = (error) => {
        if (error instanceof Error) {
          errorMessage.value = error.message;
        } else {
          errorMessage.value = error;
        }
      };
      const setValidationError = (error) => {
        validationErrorMessage.value = error;
      };
      const focusDialog = () => {
        modalRef.value.focusModal();
      };
      const focusPromptInput = () => {
        const focusableField = core.getFocusableElements(inputWrapperRef.value).shift();
        if (focusableField) {
          focusableField.focus();
        } else {
          focusDialog();
        }
      };
      const initDialog = () => {
        if (configuration.focusOnOpen) {
          if (isPrompt.value) {
            focusPromptInput();
          } else {
            focusDialog();
          }
        }
      };
      vue.onMounted(() => {
        if (showModel.value) {
          initDialog();
        }
      });
      const setInputValue = (value) => {
        inputModel.value = value;
      };
      const reset = () => {
        promiseResolve.value = void 0;
        promiseReject.value = void 0;
        hideReason.value = void 0;
        dialogResponse.value = void 0;
        busy.value = false;
        setError(void 0);
        setValidationError(void 0);
        preConfirmResponse.value = void 0;
        setInputValue(props.inputValue);
      };
      const onBeforeShow = (e) => {
        emit("before-show", e);
      };
      const onBeforeHide = (e) => {
        const hideReasonValue = hideReason.value !== void 0 ? hideReason.value : e.reason;
        if (busy.value && hideReasonValue !== core.DialogHideReason.Ok) {
          e.cancel();
          return;
        }
        const response = {
          hideReason: hideReasonValue,
          isOk: hideReasonValue === core.DialogHideReason.Ok,
          isCancel: hideReasonValue === core.DialogHideReason.Cancel,
          isDismissed: ![core.DialogHideReason.Cancel, core.DialogHideReason.Ok].includes(hideReasonValue)
        };
        if (configuration.preConfirm) {
          response.response = preConfirmResponse.value;
        }
        if (isPrompt.value) {
          response.input = inputModel.value;
        }
        dialogResponse.value = response;
        emit("before-hide", {
          cancel: e.cancel,
          response
        });
      };
      const rejectOnDismiss = vue.computed(() => {
        if (configuration.rejectOnDismiss === void 0) {
          return configuration.type !== core.DialogType.Alert;
        }
        return configuration.rejectOnDismiss;
      });
      const onHidden = () => {
        const response = dialogResponse.value;
        emit("hidden", response);
        if (response.isCancel && configuration.rejectOnCancel || response.isDismissed && rejectOnDismiss.value) {
          if (promiseReject.value) {
            promiseReject.value(response);
          }
        } else if (promiseResolve.value) {
          promiseResolve.value(response);
        }
        reset();
      };
      const onShown = () => {
        emit("shown");
        initDialog();
      };
      const hide = (reason = core.DialogHideReason.Other) => {
        hideReason.value = reason;
        showModel.value = false;
      };
      const ok = () => {
        setValidationError(void 0);
        setError(void 0);
        if (configuration.inputValidator && isPrompt.value) {
          const response = configuration.inputValidator(inputModel.value);
          if (typeof response === "string" && response.length > 0) {
            setValidationError(response);
            emit("validation-error", response);
            return;
          }
        }
        if (configuration.preConfirm) {
          const promise = core.promisifyFunctionResult(configuration.preConfirm, inputModel.value);
          busy.value = true;
          promise.then((response) => {
            preConfirmResponse.value = response;
            hide(core.DialogHideReason.Ok);
          }).catch((error) => {
            setError(error);
            emit("error", error);
          }).then(() => {
            busy.value = false;
          });
        } else {
          hide(core.DialogHideReason.Ok);
        }
      };
      const cancel = () => {
        hide(core.DialogHideReason.Cancel);
      };
      const show = () => {
        const promise = new Promise((resolve, reject) => {
          promiseResolve.value = resolve;
          promiseReject.value = reject;
          showModel.value = true;
        });
        return promise;
      };
      if (configuration.name) {
        const emitter = vue.inject("emitter");
        emitter.on("dialog:show", (name, resolve, reject) => {
          if (configuration.name !== name) {
            return;
          }
          promiseResolve.value = resolve;
          promiseReject.value = reject;
          showModel.value = true;
        });
        emitter.on("dialog:hide", (name) => {
          if (configuration.name !== name) {
            return;
          }
          hide(core.DialogHideReason.Method);
        });
      }
      vue.watch(inputModel, () => {
        if (!configuration.inputValidator) {
          return;
        }
        const response = configuration.inputValidator(inputModel.value);
        if (typeof response === "string" && response.length > 0) {
          setValidationError(response);
          emit("validation-error", response);
        } else {
          setValidationError(void 0);
        }
      });
      const modalClasses = vue.computed(() => ({
        overlay: configuration.classesList.overlay,
        wrapper: configuration.classesList.wrapper,
        modal: configuration.classesList.dialog,
        body: configuration.classesList.body,
        footer: configuration.classesList.buttons,
        overlayEnterActiveClass: configuration.classesList.overlayEnterActiveClass,
        overlayEnterFromClass: configuration.classesList.overlayEnterFromClass,
        overlayEnterToClass: configuration.classesList.overlayEnterToClass,
        overlayLeaveActiveClass: configuration.classesList.overlayLeaveActiveClass,
        overlayLeaveFromClass: configuration.classesList.overlayLeaveFromClass,
        overlayLeaveToClass: configuration.classesList.overlayLeaveToClass,
        enterActiveClass: configuration.classesList.enterActiveClass,
        enterFromClass: configuration.classesList.enterFromClass,
        enterToClass: configuration.classesList.enterToClass,
        leaveActiveClass: configuration.classesList.leaveActiveClass,
        leaveFromClass: configuration.classesList.leaveFromClass,
        leaveToClass: configuration.classesList.leaveToClass
      }));
      const showCancelButton = vue.computed(() => configuration.type !== core.DialogType.Alert);
      return {
        configuration,
        attributes,
        showModel,
        modalClasses,
        showCancelButton,
        DialogHideReason: core.DialogHideReason,
        inputModel,
        busy,
        show,
        hide,
        ok,
        cancel,
        onBeforeShow,
        onBeforeHide,
        onShown,
        onHidden,
        setInputValue,
        setError,
        setValidationError,
        errorMessage,
        validationErrorMessage,
        inputWrapperRef,
        modalRef
      };
    }
  });
  const _hoisted_1$b = ["disabled"];
  const _hoisted_2$5 = ["variant", "type"];
  const _hoisted_3$3 = ["aria-label", "disabled"];
  const _hoisted_4 = ["aria-label", "disabled"];
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_close_icon = vue.resolveComponent("close-icon");
    const _component_loading_icon = vue.resolveComponent("loading-icon");
    const _component_solid_check_circle_icon = vue.resolveComponent("solid-check-circle-icon");
    const _component_solid_question_mark_circle_icon = vue.resolveComponent("solid-question-mark-circle-icon");
    const _component_solid_information_circle_icon = vue.resolveComponent("solid-information-circle-icon");
    const _component_solid_exclamation_icon = vue.resolveComponent("solid-exclamation-icon");
    const _component_solid_cross_circle_icon = vue.resolveComponent("solid-cross-circle-icon");
    const _component_check_circle_icon = vue.resolveComponent("check-circle-icon");
    const _component_question_mark_circle_icon = vue.resolveComponent("question-mark-circle-icon");
    const _component_information_circle_icon = vue.resolveComponent("information-circle-icon");
    const _component_exclamation_icon = vue.resolveComponent("exclamation-icon");
    const _component_cross_circle_icon = vue.resolveComponent("cross-circle-icon");
    const _component_t_modal = vue.resolveComponent("t-modal");
    return vue.openBlock(), vue.createBlock(_component_t_modal, {
      ref: "modalRef",
      modelValue: _ctx.showModel,
      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.showModel = $event),
      "modal-attributes": _ctx.configuration.dialogAttributes,
      "focus-on-open": false,
      "click-to-close": _ctx.configuration.clickToClose,
      "esc-to-close": _ctx.configuration.escToClose,
      "hide-close-button": !_ctx.configuration.showCloseButton,
      "disable-body-scroll": _ctx.configuration.disableBodyScroll,
      "body-scroll-lock-options": _ctx.configuration.bodyScrollLockOptions,
      teleport: _ctx.configuration.teleport,
      "teleport-to": _ctx.configuration.teleportTo,
      classes: _ctx.modalClasses,
      "fixed-classes": void 0,
      onShown: _ctx.onShown,
      onHidden: _ctx.onHidden,
      onBeforeShow: _ctx.onBeforeShow,
      onBeforeHide: _ctx.onBeforeHide
    }, {
      closeButton: vue.withCtx(() => {
        var _a;
        return [
          !_ctx.configuration.hideCloseButton ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            type: "button",
            disabled: _ctx.busy,
            class: vue.normalizeClass((_a = _ctx.configuration.classesList) == null ? void 0 : _a.close),
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.hide(_ctx.DialogHideReason.Close))
          }, [
            vue.renderSlot(_ctx.$slots, "closeButtonIcon", { hide: _ctx.hide }, () => {
              var _a2;
              return [
                vue.createVNode(_component_close_icon, {
                  class: vue.normalizeClass((_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2.closeIcon)
                }, null, 8, ["class"])
              ];
            })
          ], 10, _hoisted_1$b)) : vue.createCommentVNode("", true)
        ];
      }),
      footer: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "footer", {
          hide: _ctx.hide,
          ok: _ctx.ok,
          cancel: _ctx.cancel
        }, () => {
          var _a, _b;
          return [
            _ctx.showCancelButton ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              ref: "cancelButton",
              type: "button",
              class: vue.normalizeClass((_a = _ctx.configuration.classesList) == null ? void 0 : _a.cancelButton),
              "aria-label": _ctx.cancelButtonAriaLabel,
              disabled: _ctx.busy,
              onClick: _cache[2] || (_cache[2] = (...args) => _ctx.cancel && _ctx.cancel(...args))
            }, vue.toDisplayString(_ctx.cancelButtonText), 11, _hoisted_3$3)) : vue.createCommentVNode("", true),
            vue.createElementVNode("button", {
              ref: "okButton",
              type: "button",
              class: vue.normalizeClass((_b = _ctx.configuration.classesList) == null ? void 0 : _b.okButton),
              "aria-label": _ctx.okButtonAriaLabel,
              disabled: _ctx.busy,
              onClick: _cache[3] || (_cache[3] = (...args) => _ctx.ok && _ctx.ok(...args))
            }, vue.toDisplayString(_ctx.okButtonText), 11, _hoisted_4)
          ];
        })
      ]),
      default: vue.withCtx(() => {
        var _a, _b;
        return [
          _ctx.busy ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass((_a = _ctx.configuration.classesList) == null ? void 0 : _a.busyWrapper)
          }, [
            vue.createVNode(_component_loading_icon, {
              class: vue.normalizeClass((_b = _ctx.configuration.classesList) == null ? void 0 : _b.busyIcon)
            }, null, 8, ["class"])
          ], 2)) : vue.createCommentVNode("", true),
          vue.renderSlot(_ctx.$slots, "default", {
            hide: _ctx.hide,
            ok: _ctx.ok,
            cancel: _ctx.cancel
          }, () => {
            var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
            return [
              _ctx.errorMessage !== void 0 ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: vue.normalizeClass((_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2.errorMessage)
              }, [
                vue.renderSlot(_ctx.$slots, "error", {
                  setError: _ctx.setError,
                  hide: _ctx.hide,
                  errorMessage: _ctx.errorMessage
                }, () => [
                  vue.createTextVNode(vue.toDisplayString(_ctx.errorMessage), 1)
                ])
              ], 2)) : vue.createCommentVNode("", true),
              _ctx.configuration.icon ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 1,
                ref: "iconWrapperRef",
                class: vue.normalizeClass((_b2 = _ctx.configuration.classesList) == null ? void 0 : _b2.iconWrapper)
              }, [
                vue.renderSlot(_ctx.$slots, "icon", {
                  hide: _ctx.hide,
                  ok: _ctx.ok,
                  cancel: _ctx.cancel
                }, () => {
                  var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j;
                  return [
                    _ctx.configuration.useSolidIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      _ctx.configuration.icon === "success" ? (vue.openBlock(), vue.createBlock(_component_solid_check_circle_icon, {
                        key: 0,
                        class: vue.normalizeClass((_a3 = _ctx.configuration.classesList) == null ? void 0 : _a3.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "question" ? (vue.openBlock(), vue.createBlock(_component_solid_question_mark_circle_icon, {
                        key: 1,
                        class: vue.normalizeClass((_b3 = _ctx.configuration.classesList) == null ? void 0 : _b3.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "info" ? (vue.openBlock(), vue.createBlock(_component_solid_information_circle_icon, {
                        key: 2,
                        class: vue.normalizeClass((_c2 = _ctx.configuration.classesList) == null ? void 0 : _c2.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "warning" ? (vue.openBlock(), vue.createBlock(_component_solid_exclamation_icon, {
                        key: 3,
                        class: vue.normalizeClass((_d2 = _ctx.configuration.classesList) == null ? void 0 : _d2.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "error" ? (vue.openBlock(), vue.createBlock(_component_solid_cross_circle_icon, {
                        key: 4,
                        class: vue.normalizeClass((_e2 = _ctx.configuration.classesList) == null ? void 0 : _e2.icon)
                      }, null, 8, ["class"])) : vue.createCommentVNode("", true)
                    ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                      _ctx.configuration.icon === "success" ? (vue.openBlock(), vue.createBlock(_component_check_circle_icon, {
                        key: 0,
                        class: vue.normalizeClass((_f2 = _ctx.configuration.classesList) == null ? void 0 : _f2.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "question" ? (vue.openBlock(), vue.createBlock(_component_question_mark_circle_icon, {
                        key: 1,
                        class: vue.normalizeClass((_g2 = _ctx.configuration.classesList) == null ? void 0 : _g2.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "info" ? (vue.openBlock(), vue.createBlock(_component_information_circle_icon, {
                        key: 2,
                        class: vue.normalizeClass((_h2 = _ctx.configuration.classesList) == null ? void 0 : _h2.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "warning" ? (vue.openBlock(), vue.createBlock(_component_exclamation_icon, {
                        key: 3,
                        class: vue.normalizeClass((_i2 = _ctx.configuration.classesList) == null ? void 0 : _i2.icon)
                      }, null, 8, ["class"])) : _ctx.configuration.icon === "error" ? (vue.openBlock(), vue.createBlock(_component_cross_circle_icon, {
                        key: 4,
                        class: vue.normalizeClass((_j = _ctx.configuration.classesList) == null ? void 0 : _j.icon)
                      }, null, 8, ["class"])) : vue.createCommentVNode("", true)
                    ], 64))
                  ];
                })
              ], 2)) : vue.createCommentVNode("", true),
              vue.createElementVNode("div", {
                class: vue.normalizeClass((_c = _ctx.configuration.classesList) == null ? void 0 : _c.content)
              }, [
                _ctx.configuration.title !== void 0 || _ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: vue.normalizeClass((_d = _ctx.configuration.classesList) == null ? void 0 : _d.titleWrapper)
                }, [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.configuration.titleTag), {
                    class: vue.normalizeClass((_e = _ctx.configuration.classesList) == null ? void 0 : _e.title)
                  }, {
                    default: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "title", {
                        hide: _ctx.hide,
                        ok: _ctx.ok,
                        cancel: _ctx.cancel
                      }, () => [
                        vue.createTextVNode(vue.toDisplayString(_ctx.configuration.title), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["class"]))
                ], 2)) : vue.createCommentVNode("", true),
                _ctx.configuration.text !== void 0 || _ctx.$slots.text ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: vue.normalizeClass((_f = _ctx.configuration.classesList) == null ? void 0 : _f.textWrapper)
                }, [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.configuration.textTag), {
                    class: vue.normalizeClass((_g = _ctx.configuration.classesList) == null ? void 0 : _g.text)
                  }, {
                    default: vue.withCtx(() => [
                      vue.renderSlot(_ctx.$slots, "text", {
                        hide: _ctx.hide,
                        ok: _ctx.ok,
                        cancel: _ctx.cancel
                      }, () => [
                        vue.createTextVNode(vue.toDisplayString(_ctx.configuration.text), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["class"]))
                ], 2)) : vue.createCommentVNode("", true),
                _ctx.configuration.type === "prompt" ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 2,
                  ref: "inputWrapperRef",
                  class: vue.normalizeClass((_h = _ctx.configuration.classesList) == null ? void 0 : _h.inputWrapper)
                }, [
                  vue.renderSlot(_ctx.$slots, "input", {
                    hide: _ctx.hide,
                    ok: _ctx.ok,
                    cancel: _ctx.cancel,
                    setInputValue: _ctx.setInputValue,
                    inputValue: _ctx.inputValue,
                    variant: _ctx.configuration.inputVariant,
                    inputAttributes: _ctx.configuration.inputAttributes
                  }, () => {
                    var _a3;
                    return [
                      vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.inputModel = $event),
                        variant: _ctx.configuration.inputVariant,
                        type: _ctx.configuration.inputType,
                        class: (_a3 = _ctx.configuration.classesList) == null ? void 0 : _a3.input
                      }, _ctx.configuration.inputAttributes), null, 16, _hoisted_2$5), [
                        [vue.vModelDynamic, _ctx.inputModel]
                      ])
                    ];
                  }),
                  _ctx.validationErrorMessage !== void 0 ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass((_i = _ctx.configuration.classesList) == null ? void 0 : _i.inputValidationError)
                  }, [
                    vue.renderSlot(_ctx.$slots, "validation-error", {
                      setError: _ctx.setValidationError,
                      hide: _ctx.hide,
                      errorMessage: _ctx.validationErrorMessage
                    }, () => [
                      vue.createTextVNode(vue.toDisplayString(_ctx.validationErrorMessage), 1)
                    ])
                  ], 2)) : vue.createCommentVNode("", true)
                ], 2)) : vue.createCommentVNode("", true)
              ], 2)
            ];
          })
        ];
      }),
      _: 3
    }, 8, ["modelValue", "modal-attributes", "click-to-close", "esc-to-close", "hide-close-button", "disable-body-scroll", "body-scroll-lock-options", "teleport", "teleport-to", "classes", "onShown", "onHidden", "onBeforeShow", "onBeforeHide"]);
  }
  var TDialog = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r]]);
  const createDialogProgramatically = (configuration, type, titleOrDialogOptions, text, icon) => {
    const { props } = TDialog;
    if (typeof titleOrDialogOptions === "string") {
      props.title.default = titleOrDialogOptions;
    } else {
      Object.keys(titleOrDialogOptions).forEach((key) => {
        props[key].default = titleOrDialogOptions[key];
      });
    }
    if (typeof text === "string") {
      props.text.default = text;
    }
    if (typeof icon === "string") {
      props.icon.default = icon;
    }
    props.type.default = type;
    const instance = vue.createApp(TDialog);
    instance.provide("configuration", configuration);
    const dialogInstance = instance.mount(document.createElement("div"));
    const promise = dialogInstance.show();
    return promise.then((response) => {
      instance.unmount();
      return Promise.resolve(response);
    }).catch((error) => {
      instance.unmount();
      return Promise.reject(error);
    });
  };
  const plugin = {
    install: (app, configuration = {}) => {
      const emitter = new Emitter();
      app.config.globalProperties.$variantJS = true;
      app.config.globalProperties.$modal = {
        show(name, params) {
          emitter.emit("modal:show", name, params);
        },
        hide(name) {
          emitter.emit("modal:hide", name);
        }
      };
      const alert = (titleOrDialogOptions, text, icon) => createDialogProgramatically(configuration, core.DialogType.Alert, titleOrDialogOptions, text, icon);
      const prompt = (titleOrDialogOptions, text, icon) => createDialogProgramatically(configuration, core.DialogType.Prompt, titleOrDialogOptions, text, icon);
      const confirm = (titleOrDialogOptions, text, icon) => createDialogProgramatically(configuration, core.DialogType.Confirm, titleOrDialogOptions, text, icon);
      app.config.globalProperties.$dialog = {
        show(name) {
          const promise = new Promise((resolve, reject) => {
            emitter.emit("dialog:show", name, resolve, reject);
          });
          return promise;
        },
        hide(name) {
          emitter.emit("dialog:hide", name);
        },
        alert,
        confirm,
        prompt
      };
      app.config.globalProperties.$alert = alert;
      app.config.globalProperties.$confirm = confirm;
      app.config.globalProperties.$prompt = prompt;
      app.provide("configuration", configuration);
      app.provide("emitter", emitter);
    }
  };
  const _sfc_main$q = vue.defineComponent({
    name: "TInput",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      modelValue: {
        type: [String, Number],
        default: void 0
      }
    }),
    setup(props) {
      const vm = vue.getCurrentInstance();
      const definedProps = vm.vnode.props;
      const usesVModel = definedProps && definedProps.modelValue !== void 0;
      const localValue = useVModel(props, "modelValue");
      const { configuration, attributes } = useConfiguration(core.TInputConfig);
      return {
        localValue,
        configuration,
        attributes,
        usesVModel
      };
    }
  });
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.usesVModel ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
      key: 0,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event)
    }, _ctx.attributes), null, 16)), [
      [vue.vModelDynamic, _ctx.localValue]
    ]) : (vue.openBlock(), vue.createElementBlock("input", vue.normalizeProps(vue.mergeProps({ key: 1 }, _ctx.attributes)), null, 16));
  }
  var TInput = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q]]);
  const _sfc_main$p = vue.defineComponent({
    name: "TButton",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      tagName: {
        type: String,
        default: "button",
        validator: (value) => ["button", "a"].indexOf(value) !== -1
      },
      href: {
        type: String,
        default: void 0
      },
      to: {
        type: [String, Object],
        default: void 0
      },
      replace: {
        type: Boolean,
        default: false
      },
      activeClass: {
        type: String,
        default: void 0
      },
      exactActiveClass: {
        type: String,
        default: void 0
      },
      custom: {
        type: Boolean,
        default: false
      },
      ariaCurrentValue: {
        type: String,
        default: "page"
      }
    }),
    setup() {
      const { configuration, attributes } = useConfiguration(core.TButtonConfig);
      return { configuration, attributes };
    },
    computed: {
      guessedTagName() {
        if (this.configuration.href !== void 0) {
          return "a";
        }
        return this.tagName;
      },
      routerLinkComponentAvailable() {
        return this.routerLinkTag !== null;
      },
      useRouterLink() {
        return this.configuration.to !== void 0 && this.routerLinkComponentAvailable;
      },
      routerLinkTag() {
        const { components } = this.$.appContext;
        if (components.RouterLink !== void 0) {
          return "RouterLink";
        }
        if (components.NuxtLink !== void 0) {
          return "NuxtLink";
        }
        return null;
      }
    }
  });
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.useRouterLink ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.routerLinkTag), vue.mergeProps({
      key: 0,
      to: _ctx.configuration.to,
      replace: _ctx.configuration.replace,
      "active-class": _ctx.configuration.activeClass,
      "exact-active-class": _ctx.configuration.exactActiveClass,
      custom: _ctx.configuration.custom,
      "aria-current-value": _ctx.configuration.ariaCurrentValue
    }, _ctx.attributes), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16, ["to", "replace", "active-class", "exact-active-class", "custom", "aria-current-value"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.guessedTagName), vue.mergeProps({
      key: 1,
      href: _ctx.configuration.href
    }, _ctx.attributes), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 16, ["href"]));
  }
  var TButton = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p]]);
  const _sfc_main$o = vue.defineComponent({
    name: "TTextarea",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      modelValue: {
        type: [String, Number],
        default: void 0
      }
    }),
    setup(props) {
      const vm = vue.getCurrentInstance();
      const definedProps = vm.vnode.props;
      const usesVModel = definedProps && definedProps.modelValue !== void 0;
      const localValue = useVModel(props, "modelValue");
      const { configuration, attributes } = useConfiguration(core.TTextareaConfig);
      return {
        usesVModel,
        localValue,
        configuration,
        attributes
      };
    }
  });
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return _ctx.usesVModel ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
      key: 0,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event)
    }, _ctx.attributes), null, 16)), [
      [vue.vModelText, _ctx.localValue]
    ]) : (vue.openBlock(), vue.createElementBlock("textarea", vue.normalizeProps(vue.mergeProps({ key: 1 }, _ctx.attributes)), null, 16));
  }
  var TTextarea = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o]]);
  const _sfc_main$n = vue.defineComponent({
    name: "TSelectOption",
    compatConfig: {
      MODE: 3
    },
    props: {
      option: {
        type: [Object],
        required: true
      }
    },
    computed: {
      hasChildren() {
        return this.option.children !== void 0 && this.option.children.length > 0;
      }
    }
  });
  const _hoisted_1$a = ["data-value", "label", "disabled"];
  const _hoisted_2$4 = ["value", "disabled", "textContent"];
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_t_select_option = vue.resolveComponent("t-select-option", true);
    return _ctx.hasChildren ? (vue.openBlock(), vue.createElementBlock("optgroup", {
      key: 0,
      "data-value": _ctx.option.value !== void 0 ? String(_ctx.option.value) : void 0,
      label: _ctx.option.text !== void 0 ? String(_ctx.option.text) : void 0,
      disabled: !!_ctx.option.disabled
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.option.children, (childrenOption, index) => {
        return vue.openBlock(), vue.createBlock(_component_t_select_option, {
          key: `${childrenOption.value}-${childrenOption.text}-${index}`,
          option: childrenOption
        }, null, 8, ["option"]);
      }), 128))
    ], 8, _hoisted_1$a)) : (vue.openBlock(), vue.createElementBlock("option", {
      key: 1,
      value: _ctx.option.value === null ? void 0 : _ctx.option.value,
      disabled: !!_ctx.option.disabled,
      textContent: vue.toDisplayString(_ctx.option.text)
    }, null, 8, _hoisted_2$4));
  }
  var TSelectOption = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n]]);
  function useMulipleableVModel(props, key, configuration) {
    const vm = vue.getCurrentInstance();
    const isMultiple = vue.computed(() => configuration === void 0 ? false : configuration.multiple !== null && configuration.multiple !== void 0 && configuration.multiple !== false);
    const getDefaultValue = () => {
      if (isMultiple.value) {
        return [];
      }
      return void 0;
    };
    const initialValue = props[key];
    const localValue = vue.ref(initialValue === void 0 ? getDefaultValue() : initialValue);
    vue.watch(localValue, (value) => {
      vm == null ? void 0 : vm.emit(`update:${key}`, value);
    });
    vue.watch(() => props[key], (value) => {
      localValue.value = value;
    });
    const clearValue = () => {
      localValue.value = getDefaultValue();
    };
    vue.watch(isMultiple, () => {
      clearValue();
    });
    return {
      localValue,
      clearValue
    };
  }
  function useMultioptions(options, textAttribute, valueAttribute, normalize) {
    const normalizedOptions = vue.computed(() => {
      if (!normalize.value) {
        return options.value;
      }
      return core.normalizeOptions(options.value, textAttribute.value, valueAttribute.value);
    });
    const flattenedOptions = vue.computed(() => core.flattenOptions(normalizedOptions.value));
    return {
      normalizedOptions,
      flattenedOptions
    };
  }
  const _sfc_main$m = vue.defineComponent({
    name: "TSelect",
    compatConfig: {
      MODE: 3
    },
    components: {
      TSelectOption
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      modelValue: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: void 0
      },
      options: {
        type: [Array, Object],
        default: void 0
      },
      normalizeOptions: {
        type: Boolean,
        default: true
      },
      valueAttribute: {
        type: String,
        default: void 0
      },
      textAttribute: {
        type: String,
        default: void 0
      },
      multiple: {
        type: [String, Boolean],
        default: false
      }
    }),
    setup(props) {
      const { configuration, attributes } = useConfiguration(core.TSelectConfig);
      const { localValue } = useMulipleableVModel(props, "modelValue", configuration);
      const {
        normalizedOptions
      } = useMultioptions(vue.computed(() => configuration.options), vue.computed(() => configuration.textAttribute), vue.computed(() => configuration.valueAttribute), vue.computed(() => configuration.normalizeOptions));
      return {
        localValue,
        configuration,
        attributes,
        normalizedOptions
      };
    }
  });
  const _hoisted_1$9 = ["multiple"];
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_t_select_option = vue.resolveComponent("t-select-option");
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("select", vue.mergeProps({
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
      multiple: _ctx.configuration.multiple
    }, _ctx.attributes), [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.normalizedOptions, (option, index) => {
        return vue.openBlock(), vue.createBlock(_component_t_select_option, {
          key: `${option.value}-${index}`,
          option
        }, null, 8, ["option"]);
      }), 128))
    ], 16, _hoisted_1$9)), [
      [vue.vModelSelect, _ctx.localValue]
    ]);
  }
  var TSelect = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m]]);
  const _sfc_main$l = vue.defineComponent({
    name: "TCheckbox",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      modelValue: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: void 0
      }
    }),
    setup(props) {
      const localValue = useVModel(props, "modelValue");
      const { attributes } = useConfiguration(core.TCheckboxConfig);
      return {
        localValue,
        attributes
      };
    }
  });
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
      type: "checkbox"
    }, _ctx.attributes), null, 16)), [
      [vue.vModelCheckbox, _ctx.localValue]
    ]);
  }
  var TCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l]]);
  const _sfc_main$k = vue.defineComponent({
    name: "TRadio",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      modelValue: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: void 0
      }
    }),
    setup(props) {
      const localValue = useVModel(props, "modelValue");
      const { configuration, attributes } = useConfiguration(core.TRadioConfig);
      return { localValue, configuration, attributes };
    }
  });
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
      type: "radio"
    }, _ctx.attributes), null, 16)), [
      [vue.vModelRadio, _ctx.localValue]
    ]);
  }
  var TRadio = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
  const _sfc_main$j = vue.defineComponent({
    name: "CustomIcon",
    compatConfig: {
      MODE: 3
    },
    props: {
      icon: {
        type: [Object, String],
        required: true
      }
    },
    data() {
      return {
        child: this.icon instanceof Element || typeof this.icon === "string" ? svgToVueComponent(this.icon) : this.icon
      };
    }
  });
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.child));
  }
  var CustomIcon = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j]]);
  const _sfc_main$i = vue.defineComponent({
    name: "TAlert",
    compatConfig: {
      MODE: 3
    },
    components: {
      CustomIcon,
      CloseIcon,
      Transitionable
    },
    inheritAttrs: false,
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      text: {
        type: String,
        default: void 0
      },
      tagName: {
        type: String,
        default: "div"
      },
      bodyTagName: {
        type: String,
        default: "div"
      },
      dismissible: {
        type: Boolean,
        default: true
      },
      show: {
        type: Boolean,
        default: true
      },
      timeout: {
        type: Number,
        default: void 0
      },
      animate: {
        type: Boolean,
        default: true
      },
      closeIcon: {
        type: [Object, String],
        default: void 0
      }
    }),
    emits: {
      "update:show": (show) => typeof show === "boolean"
    },
    setup() {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TAlertConfig, core.TAlertClassesKeys);
      return { configuration, attributes };
    },
    data({ configuration }) {
      return {
        shown: configuration.show,
        timer: null
      };
    },
    watch: {
      shown(shown) {
        this.$emit("update:show", shown);
      },
      "configuration.show": function configurationShowWatch(show) {
        if (show) {
          this.doShow();
        } else {
          this.doHide();
        }
      }
    },
    mounted() {
      if (this.timeout) {
        this.timer = setTimeout(() => this.doHide(), this.timeout);
      }
    },
    unmounted() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    methods: {
      doToggle() {
        if (!this.shown) {
          this.doShow();
        } else {
          this.doHide();
        }
      },
      doShow() {
        this.shown = true;
      },
      doHide() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.shown = false;
      }
    }
  });
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_custom_icon = vue.resolveComponent("custom-icon");
    const _component_close_icon = vue.resolveComponent("close-icon");
    const _component_transitionable = vue.resolveComponent("transitionable");
    return vue.openBlock(), vue.createBlock(_component_transitionable, {
      "classes-list": _ctx.configuration.classesList,
      enabled: _ctx.animate
    }, {
      default: vue.withCtx(() => {
        var _a;
        return [
          _ctx.shown ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tagName), vue.mergeProps({
            key: 0,
            ref: "wrapper",
            class: (_a = _ctx.configuration.classesList) == null ? void 0 : _a.wrapper
          }, _ctx.attributes), {
            default: vue.withCtx(() => {
              var _a2;
              return [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.bodyTagName), {
                  ref: "body",
                  class: vue.normalizeClass((_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2.body)
                }, {
                  default: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "default", {
                      show: _ctx.doShow,
                      hide: _ctx.doHide,
                      toggle: _ctx.doToggle,
                      configuration: _ctx.configuration
                    }, () => [
                      vue.createTextVNode(vue.toDisplayString(_ctx.configuration.text), 1)
                    ])
                  ]),
                  _: 3
                }, 8, ["class"])),
                _ctx.dismissible ? vue.renderSlot(_ctx.$slots, "closeButton", {
                  key: 0,
                  show: _ctx.doShow,
                  hide: _ctx.doHide,
                  toggle: _ctx.doToggle,
                  configuration: _ctx.configuration
                }, () => {
                  var _a3, _b;
                  return [
                    vue.createElementVNode("button", {
                      ref: "close",
                      type: "button",
                      class: vue.normalizeClass((_a3 = _ctx.configuration.classesList) == null ? void 0 : _a3.close),
                      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.doHide && _ctx.doHide(...args))
                    }, [
                      _ctx.closeIcon ? (vue.openBlock(), vue.createBlock(_component_custom_icon, {
                        key: 0,
                        ref: "closeIcon",
                        icon: _ctx.closeIcon,
                        class: vue.normalizeClass((_b = _ctx.configuration.classesList) == null ? void 0 : _b.closeIcon)
                      }, null, 8, ["icon", "class"])) : (vue.openBlock(), vue.createBlock(_component_close_icon, {
                        key: 1,
                        ref: "closeIcon"
                      }, null, 512))
                    ], 2)
                  ];
                }) : vue.createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 16, ["class"])) : vue.createCommentVNode("", true)
        ];
      }),
      _: 3
    }, 8, ["classes-list", "enabled"]);
  }
  var TAlert = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
  const _sfc_main$h = vue.defineComponent({
    name: "TCard",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      tagName: {
        type: String,
        default: "div"
      },
      header: {
        type: String,
        default: void 0
      },
      body: {
        type: String,
        default: void 0
      },
      footer: {
        type: String,
        default: void 0
      }
    }),
    setup() {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TCardConfig, core.TCardClassesKeys);
      return { configuration, attributes };
    }
  });
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.configuration.tagName), vue.mergeProps({
      class: (_a = _ctx.configuration.classesList) == null ? void 0 : _a.wrapper
    }, _ctx.attributes), {
      default: vue.withCtx(() => {
        var _a2, _b, _c;
        return [
          _ctx.$slots.header || _ctx.configuration.header ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            ref: "header",
            class: vue.normalizeClass((_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2.header)
          }, [
            vue.renderSlot(_ctx.$slots, "header", { configuration: _ctx.configuration }, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.configuration.header), 1)
            ])
          ], 2)) : vue.createCommentVNode("", true),
          _ctx.$slots.default || _ctx.configuration.body ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            ref: "body",
            class: vue.normalizeClass((_b = _ctx.configuration.classesList) == null ? void 0 : _b.body)
          }, [
            vue.renderSlot(_ctx.$slots, "default", { configuration: _ctx.configuration }, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.configuration.body), 1)
            ])
          ], 2)) : vue.createCommentVNode("", true),
          _ctx.$slots.footer || _ctx.configuration.footer ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 2,
            ref: "footer",
            class: vue.normalizeClass((_c = _ctx.configuration.classesList) == null ? void 0 : _c.footer)
          }, [
            vue.renderSlot(_ctx.$slots, "footer", { configuration: _ctx.configuration }, () => [
              vue.createTextVNode(vue.toDisplayString(_ctx.configuration.footer), 1)
            ])
          ], 2)) : vue.createCommentVNode("", true)
        ];
      }),
      _: 3
    }, 16, ["class"]);
  }
  var TCard = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
  const validDropdownPlacements = [
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "right",
    "right-start",
    "right-end",
    "left",
    "left-start",
    "left-end"
  ];
  const _sfc_main$g = vue.defineComponent({
    name: "TDropdown",
    compatConfig: {
      MODE: 3
    },
    components: { Transitionable },
    inheritAttrs: false,
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      text: {
        type: String,
        default: void 0
      },
      teleport: {
        type: Boolean,
        default: false
      },
      teleportTo: {
        type: [String, Object],
        default: "body"
      },
      tagName: {
        type: String,
        default: "button"
      },
      dropdownTagName: {
        type: String,
        default: "div"
      },
      dropdownAttributes: {
        type: Object,
        default: void 0
      },
      disabled: {
        type: Boolean,
        default: void 0
      },
      toggleOnFocus: {
        type: Boolean,
        default: true
      },
      toggleOnClick: {
        type: Boolean,
        default: true
      },
      toggleOnHover: {
        type: Boolean,
        default: false
      },
      hideOnLeaveTimeout: {
        type: Number,
        default: 250
      },
      show: {
        type: Boolean,
        default: false
      },
      placement: {
        type: String,
        default: void 0,
        validator: (value) => validDropdownPlacements.includes(value)
      },
      popperOptions: {
        type: Object,
        default: () => core.TDropdownPopperDefaultOptions
      }
    }),
    emits: {
      "update:show": (show) => typeof show === "boolean",
      focus: (e) => e instanceof FocusEvent,
      blur: (e) => e instanceof FocusEvent,
      "blur-on-child": (e) => e instanceof FocusEvent,
      click: (e) => e instanceof MouseEvent,
      mouseover: (e) => e instanceof MouseEvent,
      mouseleave: (e) => e instanceof MouseEvent,
      touchstart: (e) => e instanceof TouchEvent,
      shown: () => true,
      hidden: () => true,
      "before-show": () => true,
      "before-hide": () => true
    },
    setup() {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TDropdownConfig, core.TDropdownClassesKeys);
      const isTouchOnlyDevice = vue.ref(false);
      vue.onMounted(() => {
        isTouchOnlyDevice.value = core.isTouchOnlyDevice();
      });
      return { configuration, attributes, isTouchOnlyDevice };
    },
    data({ configuration }) {
      return {
        shown: configuration.show,
        initAsShow: configuration.show,
        hideTimeout: null,
        focusableElements: [],
        throttledToggle: null,
        adjustingPopper: false,
        popperIsAdjusted: false,
        popperAdjusterListener: null,
        popper: null
      };
    },
    computed: {
      fullPopperOptions() {
        const popperOptions = this.configuration.popperOptions;
        if (this.configuration.placement !== void 0) {
          popperOptions.placement = this.configuration.placement;
        }
        return popperOptions;
      },
      shouldShowWhenClicked() {
        return this.isTouchOnlyDevice && (this.configuration.toggleOnFocus === true || this.configuration.toggleOnHover === true);
      }
    },
    watch: {
      popperIsAdjusted(popperIsAdjusted) {
        if (popperIsAdjusted) {
          this.enablePopperNeedsAdjustmentListener();
        } else {
          this.disablePopperNeedsAdjustmentListener();
        }
      },
      "configuration.show": function configurationShowWatch(show) {
        if (show) {
          this.doShow();
        } else {
          this.doHide();
        }
      }
    },
    mounted() {
      if (this.isTouchOnlyDevice && this.shown) {
        window.addEventListener("touchstart", this.touchstartHandler);
      }
      if (this.configuration.show) {
        this.updatePopper().then(() => {
          this.initAsShow = false;
        });
      }
    },
    created() {
      this.throttledToggle = core.throttle(this.doToggle, 200);
      this.popperAdjusterListener = core.debounce(() => {
        this.popperIsAdjusted = false;
      }, 200);
    },
    beforeUnmount() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      this.disablePopperNeedsAdjustmentListener();
      if (this.isTouchOnlyDevice && this.shown) {
        window.removeEventListener("touchstart", this.touchstartHandler);
      }
    },
    methods: {
      focus() {
        this.getTriggerElement().focus();
      },
      onShown() {
        this.$emit("shown");
        this.$emit("update:show", true);
        if (this.isTouchOnlyDevice) {
          window.addEventListener("touchstart", this.touchstartHandler);
        } else {
          this.addBlurListenersToChildElements();
        }
      },
      onHidden() {
        this.$emit("hidden");
        this.$emit("update:show", false);
        if (this.isTouchOnlyDevice) {
          window.removeEventListener("touchstart", this.touchstartHandler);
        } else {
          this.removeBlurListenersFromChildElements();
        }
      },
      onBeforeShown() {
        this.$emit("before-show");
        if (this.isTouchOnlyDevice) {
          window.addEventListener("touchstart", this.touchstartHandler);
        }
      },
      onBeforeHide() {
        this.$emit("before-hide");
        if (this.isTouchOnlyDevice) {
          window.removeEventListener("touchstart", this.touchstartHandler);
        }
      },
      addBlurListenersToChildElements() {
        const dropdown = this.getDropdownElement();
        this.focusableElements = core.getFocusableElements(dropdown);
        this.focusableElements.forEach((element) => element.addEventListener("blur", this.blurHandler));
      },
      removeBlurListenersFromChildElements() {
        this.focusableElements.forEach((element) => element.removeEventListener("blur", this.blurHandler));
        this.focusableElements = [];
      },
      dropdownAfterLeave() {
        this.getDropdownElement().style.removeProperty("visibility");
      },
      async adjustPopper() {
        return new Promise(async (resolve) => {
          if (this.shown === false && this.adjustingPopper === false) {
            this.popperIsAdjusted = false;
            resolve();
            return;
          }
          if (!this.popper) {
            this.popper = await this.createPopper();
          }
          await this.popper.update();
          resolve();
        });
      },
      updatePopper() {
        return new Promise(async (resolve) => {
          if (this.popperIsAdjusted) {
            resolve();
            return;
          }
          this.adjustingPopper = true;
          await this.$nextTick();
          await this.adjustPopper();
          this.adjustingPopper = false;
          await this.$nextTick();
          this.popperIsAdjusted = true;
          await this.$nextTick();
          resolve();
        });
      },
      createPopper() {
        let popper;
        return new Promise((resolve) => {
          const popperOptions = this.fullPopperOptions;
          const originalOnFirstUpdate = popperOptions.onFirstUpdate;
          popperOptions.onFirstUpdate = async (arg) => {
            if (originalOnFirstUpdate) {
              originalOnFirstUpdate(arg);
            }
            resolve(popper);
          };
          popper = core$1.createPopper(this.getTriggerElement(), this.getDropdownElement(), this.fullPopperOptions);
        });
      },
      enablePopperNeedsAdjustmentListener() {
        window.addEventListener("resize", this.popperAdjusterListener);
        window.addEventListener("scroll", this.popperAdjusterListener);
      },
      disablePopperNeedsAdjustmentListener() {
        window.removeEventListener("resize", this.popperAdjusterListener);
        window.removeEventListener("scroll", this.popperAdjusterListener);
        this.popperAdjusterListener.cancel();
      },
      getDropdownElement() {
        const { dropdown } = this.$refs;
        return dropdown;
      },
      getTriggerElement() {
        const { trigger } = this.$refs;
        return trigger;
      },
      doToggle() {
        if (!this.shown) {
          this.doShow();
        } else {
          this.doHide();
        }
      },
      async doShow() {
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
        }
        this.onBeforeShown();
        await this.updatePopper();
        this.shown = true;
        await this.$nextTick();
        this.onShown();
      },
      async doHide() {
        this.onBeforeHide();
        this.shown = false;
        await this.$nextTick();
        this.onHidden();
      },
      clickHandler(e) {
        this.$emit("click", e);
        if (this.configuration.toggleOnClick) {
          this.throttledToggle();
        } else if (this.shouldShowWhenClicked) {
          this.doShow();
        }
      },
      focusHandler(e) {
        this.$emit("focus", e);
        if (this.isTouchOnlyDevice) {
          return;
        }
        if (this.configuration.toggleOnFocus) {
          this.throttledToggle();
        }
      },
      blurHandler(e) {
        const isChild = this.targetIsChild(e.relatedTarget);
        if (!isChild) {
          this.$emit("blur", e);
        } else {
          this.$emit("blur-on-child", e);
        }
        if (this.isTouchOnlyDevice) {
          return;
        }
        if (this.configuration.toggleOnFocus && !isChild) {
          this.doHide();
        }
      },
      targetIsChild(target) {
        return core.elementIsTargetOrTargetChild(target, this.getDropdownElement()) || core.elementIsTargetOrTargetChild(target, this.getTriggerElement());
      },
      mouseoverHandler(e) {
        this.$emit("mouseover", e);
        if (this.isTouchOnlyDevice) {
          return;
        }
        if (this.configuration.toggleOnHover) {
          this.doShow();
        }
      },
      mouseleaveHandler(e) {
        this.$emit("mouseleave", e);
        if (this.isTouchOnlyDevice) {
          return;
        }
        if (this.configuration.toggleOnHover && !this.targetIsChild(e.relatedTarget)) {
          this.hideAfterTimeout();
        }
      },
      touchstartHandler(e) {
        this.$emit("touchstart", e);
        if (Array.from(e.targetTouches).some((touch) => this.targetIsChild(touch.target))) {
          return;
        }
        if (this.configuration.toggleOnFocus || this.configuration.toggleOnHover) {
          this.doHide();
        }
      },
      hideAfterTimeout() {
        if (!this.configuration.hideOnLeaveTimeout) {
          this.doHide();
        } else {
          this.hideTimeout = setTimeout(() => {
            this.doHide();
            this.hideTimeout = null;
          }, this.configuration.hideOnLeaveTimeout);
        }
      }
    }
  });
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_transitionable = vue.resolveComponent("transitionable");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tagName), vue.mergeProps({
        ref: "trigger",
        type: _ctx.tagName === "button" ? "button" : void 0,
        "aria-expanded": _ctx.shown,
        class: (_a = _ctx.configuration.classesList) == null ? void 0 : _a.trigger,
        disabled: _ctx.configuration.disabled
      }, __spreadValues(__spreadValues({}, _ctx.attributes), _ctx.$attrs), {
        onClick: _ctx.clickHandler,
        onFocus: _ctx.focusHandler,
        onBlur: _ctx.blurHandler,
        onMouseover: _ctx.mouseoverHandler,
        onMouseleave: _ctx.mouseleaveHandler
      }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "trigger", {
            configuration: _ctx.configuration,
            isShow: _ctx.shown,
            popper: _ctx.popper
          }, () => [
            vue.createTextVNode(vue.toDisplayString(_ctx.configuration.text), 1)
          ])
        ]),
        _: 3
      }, 16, ["type", "aria-expanded", "class", "disabled", "onClick", "onFocus", "onBlur", "onMouseover", "onMouseleave"])),
      (vue.openBlock(), vue.createBlock(vue.Teleport, {
        to: _ctx.configuration.teleportTo,
        disabled: !_ctx.configuration.teleport
      }, [
        vue.createVNode(_component_transitionable, {
          enabled: _ctx.popperIsAdjusted || !_ctx.initAsShow,
          "classes-list": _ctx.configuration.classesList,
          onAfterLeave: _ctx.dropdownAfterLeave
        }, {
          default: vue.withCtx(() => {
            var _a2;
            return [
              vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.dropdownTagName), vue.mergeProps({
                ref: "dropdown",
                style: _ctx.adjustingPopper ? "opacity:0" : void 0,
                class: (_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2.dropdown,
                "aria-hidden": !_ctx.shown,
                tabindex: "-1"
              }, _ctx.dropdownAttributes, {
                onBlur: _ctx.blurHandler,
                onMouseover: _ctx.mouseoverHandler,
                onMouseleave: _ctx.mouseleaveHandler
              }), {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "default", {
                    show: _ctx.doShow,
                    hide: _ctx.doHide,
                    toggle: _ctx.doToggle,
                    configuration: _ctx.configuration,
                    popper: _ctx.popper
                  })
                ]),
                _: 3
              }, 16, ["style", "class", "aria-hidden", "onBlur", "onMouseover", "onMouseleave"])), [
                [vue.vShow, _ctx.shown || _ctx.adjustingPopper || _ctx.initAsShow]
              ])
            ];
          }),
          _: 3
        }, 8, ["enabled", "classes-list", "onAfterLeave"])
      ], 8, ["to", "disabled"]))
    ], 64);
  }
  var TDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
  const _sfc_main$f = vue.defineComponent({
    name: "TInputGroup",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      label: {
        type: String,
        default: void 0
      },
      description: {
        type: String,
        default: void 0
      },
      feedback: {
        type: String,
        default: void 0
      },
      body: {
        type: String,
        default: void 0
      },
      tagName: {
        type: String,
        default: "div"
      },
      bodyTagName: {
        type: String,
        default: "div"
      },
      labelTagName: {
        type: String,
        default: "label"
      },
      feedbackTagName: {
        type: String,
        default: "div"
      },
      descriptionTagName: {
        type: String,
        default: "div"
      },
      sortedElements: {
        type: Array,
        default: () => ["label", "default", "feedback", "description"],
        validator: (value) => {
          const expectedValues = ["default", "description", "feedback", "label"];
          return value.every((key) => expectedValues.find((k) => k === key) !== null);
        }
      }
    }),
    setup() {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TInputGroupConfig, core.TInputGroupClassesKeys);
      return { configuration, attributes };
    },
    computed: {
      elementsToRender() {
        const { configuration } = this;
        const slots = this.$slots;
        return this.sortedElements.filter((e) => e === "default" ? !!configuration.body || !!slots.default : !!configuration[e] || !!slots[e]).map((e) => ({
          name: e,
          tagName: e === "default" ? configuration.bodyTagName : configuration[`${e}TagName`]
        }));
      }
    }
  });
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tagName), vue.mergeProps({
      ref: "wrapper",
      class: (_a = _ctx.configuration.classesList) == null ? void 0 : _a.wrapper
    }, _ctx.attributes), {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.elementsToRender, (element) => {
          var _a2;
          return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(element.tagName), {
            key: element.name,
            ref_for: true,
            ref: element.name,
            class: vue.normalizeClass((_a2 = _ctx.configuration.classesList) == null ? void 0 : _a2[element.name === "default" ? "body" : element.name])
          }, {
            default: vue.withCtx(() => [
              _ctx.$slots[element.name] ? vue.renderSlot(_ctx.$slots, element.name, { key: 0 }) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.createTextVNode(vue.toDisplayString(_ctx.configuration[element.name === "default" ? "body" : element.name]), 1)
              ], 64))
            ]),
            _: 2
          }, 1032, ["class"]);
        }), 128))
      ]),
      _: 3
    }, 16, ["class"]);
  }
  var TInputGroup = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f]]);
  function useActivableOption(options, localValue) {
    const getActiveOption = () => {
      const selectedOption = options.value.find((option) => core.isEqual(option.value, localValue.value) && !core.normalizedOptionIsDisabled(option));
      if (selectedOption !== void 0) {
        return selectedOption;
      }
      if (options.value.length > 0) {
        return options.value.find((option) => !core.normalizedOptionIsDisabled(option)) || null;
      }
      return null;
    };
    const activeOption = vue.ref(getActiveOption());
    const activeOptionIndex = vue.computed(() => {
      if (activeOption.value === null) {
        return 0;
      }
      const index = options.value.findIndex((option) => core.isEqual(option.value, activeOption.value.value));
      return index < 0 ? 0 : index;
    });
    const optionIsActive = (option) => activeOption.value === null ? false : core.isEqual(activeOption.value.value, option.value);
    const setActiveOption = (option) => {
      activeOption.value = option;
    };
    const setNextOptionActive = () => {
      let newActiveOption;
      let nextIndex = activeOptionIndex.value + 1;
      while (nextIndex < options.value.length && newActiveOption === void 0) {
        const option = options.value[nextIndex];
        const optionIsDisabled = core.normalizedOptionIsDisabled(option);
        if (!optionIsDisabled) {
          newActiveOption = option;
        }
        nextIndex += 1;
      }
      if (newActiveOption) {
        setActiveOption(newActiveOption);
      }
    };
    const setPrevOptionActive = () => {
      let newActiveOption;
      let nextIndex = activeOptionIndex.value - 1;
      while (nextIndex >= 0 && newActiveOption === void 0) {
        const option = options.value[nextIndex];
        const optionIsDisabled = core.normalizedOptionIsDisabled(option);
        if (!optionIsDisabled) {
          newActiveOption = option;
        }
        nextIndex -= 1;
      }
      if (newActiveOption) {
        setActiveOption(newActiveOption);
      }
    };
    const initActiveOption = () => {
      activeOption.value = getActiveOption();
    };
    vue.watch(options, (newOptions, oldOptions) => {
      const firstNewOption = newOptions.find((o) => !oldOptions.includes(o) && !core.normalizedOptionIsDisabled(o));
      if (firstNewOption) {
        setActiveOption(firstNewOption);
      } else {
        initActiveOption();
      }
    });
    return {
      activeOption,
      initActiveOption,
      optionIsActive,
      setActiveOption,
      setNextOptionActive,
      setPrevOptionActive
    };
  }
  function useFetchsOptions(localValue, options, textAttribute, valueAttribute, normalize, searchQuery, fetchFn, prefetchFn, fetchDelay, fetchMinimumInputLength, fetchMinimumInputLengthText) {
    const { emit } = vue.getCurrentInstance();
    const getNormalizedOptions = (rawOptions) => normalize.value ? core.normalizeOptions(rawOptions, textAttribute.value, valueAttribute.value) : rawOptions;
    const fetchedOptions = vue.ref(getNormalizedOptions(options.value || []));
    vue.watch(options, () => {
      fetchedOptions.value = getNormalizedOptions(options.value || []);
    });
    const optionsWereFetched = vue.ref(false);
    const normalizedOptions = vue.computed(() => {
      if (typeof fetchFn.value !== "function" && typeof prefetchFn.value !== "function") {
        const normalized = getNormalizedOptions(options.value || []);
        if (searchQuery.value) {
          return core.filterOptions(normalized, searchQuery.value);
        }
        return normalized;
      }
      return fetchedOptions.value;
    });
    const flattenedOptions = vue.computed(() => core.flattenOptions(normalizedOptions.value));
    const fetchsOptions = vue.computed(() => fetchFn.value !== void 0);
    const needsMoreCharsToFetch = vue.computed(() => {
      if (!fetchsOptions.value) {
        return false;
      }
      if (!fetchMinimumInputLength.value) {
        return false;
      }
      return !searchQuery.value || searchQuery.value.length < fetchMinimumInputLength.value;
    });
    const fetchNextPage = vue.ref(void 0);
    const fetchingOptions = vue.ref(false);
    const fetchingMoreOptions = vue.ref(false);
    const fetchedOptionsHaveMorePages = vue.computed(() => fetchNextPage.value !== void 0);
    const fetchOptionsFn = ([nextPage]) => {
      fetchFn.value(searchQuery.value, nextPage).then((response) => {
        if (typeof response === "object" && Object.prototype.hasOwnProperty.call(response, "results")) {
          const { results, hasMorePages } = response;
          if (!Array.isArray(results) && results !== void 0 && typeof results !== "object") {
            throw new Error(`Response.results must be an array or object, got ${typeof results}`);
          }
          if (nextPage !== void 0 && nextPage >= 2) {
            fetchedOptions.value = fetchedOptions.value.concat(getNormalizedOptions(results));
          } else {
            fetchedOptions.value = getNormalizedOptions(results);
          }
          if (hasMorePages) {
            fetchNextPage.value = fetchNextPage.value === void 0 ? 2 : fetchNextPage.value + 1;
          } else {
            fetchNextPage.value = void 0;
          }
        } else {
          throw new Error("Options response must be an object with `results` property.");
        }
        optionsWereFetched.value = true;
        emit("fetch-options-success", response);
      }).catch((error) => {
        emit("fetch-options-error", error);
      }).then(() => {
        fetchingOptions.value = false;
        fetchingMoreOptions.value = false;
      });
    };
    const debouncedFetchOptions = core.debounce(fetchOptionsFn, fetchDelay.value);
    const fetchOptionsCancel = () => {
      debouncedFetchOptions.cancel();
      fetchingOptions.value = false;
      fetchingMoreOptions.value = false;
    };
    const fetchOptions = (nextPage) => {
      if (!fetchsOptions.value) {
        fetchOptionsCancel();
        return;
      }
      if (nextPage !== void 0 && nextPage >= 2) {
        fetchingMoreOptions.value = true;
      } else {
        fetchingOptions.value = true;
      }
      debouncedFetchOptions(nextPage);
    };
    const fetchMoreOptions = () => {
      fetchOptions(fetchNextPage.value);
    };
    vue.watch(searchQuery, () => {
      if (!fetchsOptions.value || needsMoreCharsToFetch.value) {
        return;
      }
      optionsWereFetched.value = false;
      fetchOptions();
    });
    const needsMoreCharsMessage = vue.computed(() => {
      if (typeof fetchMinimumInputLengthText.value === "string") {
        return fetchMinimumInputLengthText.value;
      }
      return fetchMinimumInputLengthText.value(fetchMinimumInputLength.value, searchQuery.value);
    });
    const prefetchOptions = () => {
      if (typeof prefetchFn.value !== "function") {
        fetchOptions();
        return;
      }
      fetchingOptions.value = true;
      prefetchFn.value(localValue.value).then((results) => {
        if (!Array.isArray(results) && results !== void 0 && typeof results !== "object") {
          throw new Error(`Response must be an array or object, got ${typeof results}`);
        }
        fetchedOptions.value = getNormalizedOptions(results);
        optionsWereFetched.value = true;
        emit("fetch-options-success", results);
      }).catch((error) => {
        emit("fetch-options-error", error);
      }).then(() => {
        fetchingOptions.value = false;
      });
    };
    return {
      normalizedOptions,
      flattenedOptions,
      fetchsOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
      fetchingOptions,
      fetchingMoreOptions,
      fetchedOptionsHaveMorePages,
      optionsWereFetched,
      fetchOptions,
      prefetchOptions,
      fetchMoreOptions,
      fetchOptionsCancel
    };
  }
  function useSelectableOption(options, localValue, multiple) {
    const optionIsSelected = (option) => {
      if (multiple.value === true) {
        return Array.isArray(localValue.value) && localValue.value.some((value) => core.isEqual(value, option.value));
      }
      return core.isEqual(localValue.value, option.value);
    };
    const getSelectedOption = (currentSelectedOption) => {
      let allOptions = options.value;
      if (Array.isArray(currentSelectedOption)) {
        allOptions = allOptions.filter((option) => !currentSelectedOption.some((selectedOption2) => core.isEqual(selectedOption2.value, option.value))).concat(currentSelectedOption);
      } else if (currentSelectedOption !== void 0) {
        allOptions = allOptions.filter((option) => !core.isEqual(currentSelectedOption.value, option.value)).concat([currentSelectedOption]);
      }
      if (multiple.value === true) {
        if (Array.isArray(localValue.value)) {
          return allOptions.filter((option) => optionIsSelected(option));
        }
        return [];
      }
      return allOptions.find((option) => optionIsSelected(option));
    };
    const selectedOption = vue.ref(getSelectedOption());
    const selectOption = (option) => {
      if (optionIsSelected(option)) {
        return;
      }
      if (multiple.value === true) {
        if (Array.isArray(localValue.value)) {
          localValue.value = core.addToArray(localValue.value, option.value);
          selectedOption.value = core.addToArray(selectedOption.value, option);
        } else {
          localValue.value = [option.value];
          selectedOption.value = [option];
        }
      } else {
        localValue.value = option.value;
        selectedOption.value = option;
      }
    };
    const toggleOption = (option) => {
      if (optionIsSelected(option)) {
        if (multiple.value === true) {
          localValue.value = core.substractFromArray(localValue.value, option.value);
        } else {
          localValue.value = void 0;
        }
      } else if (multiple.value === true) {
        if (Array.isArray(localValue.value)) {
          localValue.value = core.addToArray(localValue.value, option.value);
        } else {
          localValue.value = [option.value];
        }
      } else {
        localValue.value = option.value;
      }
    };
    vue.watch([options, localValue], () => {
      selectedOption.value = getSelectedOption(selectedOption.value);
    });
    const hasSelectedOption = vue.computed(() => {
      if (multiple.value === true) {
        return selectedOption.value.length > 0;
      }
      return selectedOption.value !== void 0;
    });
    return {
      selectedOption,
      hasSelectedOption,
      selectOption,
      toggleOption,
      optionIsSelected
    };
  }
  function useInjectsConfiguration() {
    return vue.inject("configuration", {});
  }
  function useInjectsClassesListClass(property) {
    const configuration = useInjectsConfiguration();
    return vue.computed(() => core.get(configuration.classesList, property, ""));
  }
  const _sfc_main$e = vue.defineComponent({
    name: "TextPlaceholder",
    compatConfig: {
      MODE: 3
    },
    props: {
      classProperty: {
        type: String,
        default: "placeholder"
      },
      placeholder: {
        type: String,
        default: void 0
      }
    },
    setup(props) {
      const className = useInjectsClassesListClass(props.classProperty);
      return { className };
    }
  });
  const _hoisted_1$8 = /* @__PURE__ */ vue.createTextVNode("\xA0");
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("span", {
      class: vue.normalizeClass(_ctx.className)
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        _ctx.placeholder !== void 0 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createTextVNode(vue.toDisplayString(_ctx.placeholder), 1)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          _hoisted_1$8
        ], 64))
      ])
    ], 2);
  }
  var TextPlaceholder = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e]]);
  function useInjectsClassesList() {
    const configuration = useInjectsConfiguration();
    return vue.computed(() => configuration.classesList || {});
  }
  const _sfc_main$d = vue.defineComponent({
    name: "RichSelectTriggerTagsTag",
    compatConfig: {
      MODE: 3
    },
    components: {
      CloseIcon
    },
    props: {
      option: {
        type: Object,
        required: true
      }
    },
    setup() {
      const toggleOption = vue.inject("toggleOption");
      const classesList = useInjectsClassesList();
      return { toggleOption, classesList };
    },
    computed: {
      dataValueAttribute() {
        if (typeof this.option.value === "object") {
          return JSON.stringify(this.option.value);
        }
        return String(this.option.value);
      },
      isDisabled() {
        return core.normalizedOptionIsDisabled(this.option);
      }
    },
    methods: {
      focus() {
        this.$el.focus();
      },
      getElementIndex() {
        const elements = Array.from(this.$el.parentElement.children);
        return Array.from(elements).findIndex((el) => el.isSameNode(this.$el));
      },
      focusNextElement() {
        const { parentElement } = this.$el;
        const currentElementIndex = this.getElementIndex();
        const elements = Array.from(parentElement.children);
        if (currentElementIndex < elements.length - 1) {
          elements[currentElementIndex + 1].focus();
        }
      },
      focusPrevElement() {
        const { parentElement } = this.$el;
        const currentElementIndex = this.getElementIndex();
        const elements = Array.from(parentElement.children);
        if (currentElementIndex > 0) {
          elements[currentElementIndex - 1].focus();
        }
      },
      async unselect() {
        const { parentElement } = this.$el;
        const elementIndex = this.getElementIndex();
        this.toggleOption(this.option);
        await this.$nextTick();
        const nextElement = parentElement.children[elementIndex];
        if (nextElement) {
          nextElement.focus();
        } else if (elementIndex > 0) {
          parentElement.children[elementIndex - 1].focus();
        }
      }
    }
  });
  const _hoisted_1$7 = ["disabled", "data-value"];
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_close_icon = vue.resolveComponent("close-icon");
    return vue.openBlock(), vue.createElementBlock("button", {
      type: "button",
      class: vue.normalizeClass(_ctx.classesList.tag),
      disabled: _ctx.isDisabled,
      "data-rich-select-focusable": "",
      "data-rich-select-tag": "",
      "data-value": _ctx.dataValueAttribute,
      onMousedown: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.focus && _ctx.focus(...args), ["prevent", "stop"])),
      onKeydown: [
        _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers((...args) => _ctx.unselect && _ctx.unselect(...args), ["prevent", "stop"]), ["backspace"])),
        _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => _ctx.focusNextElement && _ctx.focusNextElement(...args), ["prevent", "stop"]), ["right"])),
        _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers((...args) => _ctx.focusPrevElement && _ctx.focusPrevElement(...args), ["prevent", "stop"]), ["left"])),
        _cache[7] || (_cache[7] = vue.withKeys(vue.withModifiers(() => {
        }, ["prevent", "stop"]), ["enter"]))
      ]
    }, [
      vue.createElementVNode("span", {
        class: vue.normalizeClass(_ctx.classesList.tagLabel)
      }, [
        vue.renderSlot(_ctx.$slots, "tagLabel", {
          option: _ctx.option,
          isDisabled: _ctx.isDisabled
        }, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.option.text), 1)
        ])
      ], 2),
      !_ctx.isDisabled ? (vue.openBlock(), vue.createElementBlock("span", {
        key: 0,
        tabindex: "0",
        class: vue.normalizeClass(_ctx.classesList.tagDeleteButton),
        "data-rich-select-focusable": "",
        onMousedown: _cache[0] || (_cache[0] = vue.withModifiers((...args) => _ctx.unselect && _ctx.unselect(...args), ["prevent", "stop"])),
        onKeydown: [
          _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers((...args) => _ctx.unselect && _ctx.unselect(...args), ["prevent", "stop"]), ["backspace"])),
          _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((...args) => _ctx.unselect && _ctx.unselect(...args), ["prevent", "stop"]), ["enter"]))
        ]
      }, [
        vue.renderSlot(_ctx.$slots, "tagCloseIcon", { option: _ctx.option }, () => [
          vue.createVNode(_component_close_icon, {
            ref: "closeIcon",
            class: vue.normalizeClass(_ctx.classesList.tagDeleteButtonIcon)
          }, null, 8, ["class"])
        ])
      ], 34)) : vue.createCommentVNode("", true)
    ], 42, _hoisted_1$7);
  }
  var RichSelectTriggerTagsTag = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
  const _sfc_main$c = vue.defineComponent({
    name: "RichSelectTriggerTags",
    compatConfig: {
      MODE: 3
    },
    components: {
      RichSelectTriggerTagsTag
    },
    setup() {
      const selectedOptions = vue.inject("selectedOption");
      const className = useInjectsClassesListClass("tagsWrapper");
      return {
        selectedOptions,
        className
      };
    }
  });
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_rich_select_trigger_tags_tag = vue.resolveComponent("rich-select-trigger-tags-tag");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.className)
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.selectedOptions, (option, index) => {
        return vue.openBlock(), vue.createBlock(_component_rich_select_trigger_tags_tag, {
          key: `${option.value}-${index}`,
          option
        }, {
          tagCloseIcon: vue.withCtx((props) => [
            vue.renderSlot(_ctx.$slots, "tagCloseIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
          ]),
          tagLabel: vue.withCtx((props) => [
            vue.renderSlot(_ctx.$slots, "tagLabel", vue.normalizeProps(vue.guardReactiveProps(props)))
          ]),
          _: 2
        }, 1032, ["option"]);
      }), 128))
    ], 2);
  }
  var RichSelectTriggerTags = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c]]);
  const _sfc_main$b = {};
  const _hoisted_1$6 = {
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20"
  };
  const _hoisted_2$3 = /* @__PURE__ */ vue.createElementVNode("path", {
    "clip-rule": "evenodd",
    "fill-rule": "evenodd",
    d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
  }, null, -1);
  const _hoisted_3$2 = [
    _hoisted_2$3
  ];
  function _sfc_render$b(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$6, _hoisted_3$2);
  }
  var SelectorIcon = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b]]);
  const _sfc_main$a = vue.defineComponent({
    name: "RichSelectTrigger",
    compatConfig: {
      MODE: 3
    },
    components: {
      RichSelectTriggerTags,
      TextPlaceholder,
      SelectorIcon,
      LoadingIcon
    },
    setup() {
      const configuration = useInjectsConfiguration();
      const selectedOption = vue.inject("selectedOption");
      const hasSelectedOption = vue.inject("hasSelectedOption");
      const fetchingOptions = vue.inject("fetchingOptions");
      const shown = vue.inject("shown");
      const usesTags = vue.inject("usesTags");
      const classesList = useInjectsClassesList();
      return {
        selectedOption,
        hasSelectedOption,
        configuration,
        fetchingOptions,
        shown,
        usesTags,
        classesList
      };
    },
    computed: {
      label() {
        if (!this.hasSelectedOption) {
          return void 0;
        }
        if (this.multiple) {
          return this.selectedOption.map((o) => o.text).join(", ");
        }
        return String(this.selectedOption.text);
      },
      isFetchingOptionsWhileClosed() {
        return this.fetchingOptions && !this.shown;
      },
      multiple() {
        return Array.isArray(this.selectedOption);
      },
      showSelectorIcon() {
        if (this.isFetchingOptionsWhileClosed) {
          return false;
        }
        if (!this.configuration.clearable) {
          return true;
        }
        return !this.hasSelectedOption || this.configuration.disabled === true;
      }
    }
  });
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_text_placeholder = vue.resolveComponent("text-placeholder");
    const _component_loading_icon = vue.resolveComponent("loading-icon");
    const _component_rich_select_trigger_tags = vue.resolveComponent("rich-select-trigger-tags");
    const _component_selector_icon = vue.resolveComponent("selector-icon");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      _ctx.isFetchingOptionsWhileClosed || !_ctx.hasSelectedOption ? vue.renderSlot(_ctx.$slots, "placeholder", {
        key: 0,
        isFetchingOptionsWhileClosed: _ctx.isFetchingOptionsWhileClosed
      }, () => [
        _ctx.isFetchingOptionsWhileClosed ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createVNode(_component_text_placeholder, {
            ref: "fetchingPlaceholder",
            "class-property": "selectButtonSearchingPlaceholder",
            placeholder: _ctx.configuration.loadingClosedPlaceholder
          }, null, 8, ["placeholder"]),
          vue.createVNode(_component_loading_icon, {
            ref: "loadingIcon",
            class: vue.normalizeClass(_ctx.classesList.selectButtonLoadingIcon)
          }, null, 8, ["class"])
        ], 64)) : (vue.openBlock(), vue.createBlock(_component_text_placeholder, {
          key: 1,
          ref: "placeholder",
          "class-property": "selectButtonPlaceholder",
          placeholder: _ctx.configuration.placeholder
        }, null, 8, ["placeholder"]))
      ]) : _ctx.usesTags ? (vue.openBlock(), vue.createBlock(_component_rich_select_trigger_tags, { key: 1 }, {
        tagCloseIcon: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "tagCloseIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
        ]),
        tagLabel: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "tagLabel", vue.normalizeProps(vue.guardReactiveProps(props)))
        ]),
        _: 3
      })) : (vue.openBlock(), vue.createElementBlock("span", {
        key: 2,
        ref: "label",
        class: vue.normalizeClass(_ctx.classesList.selectButtonLabel)
      }, [
        vue.renderSlot(_ctx.$slots, "label", {
          label: _ctx.label,
          selectedOption: _ctx.selectedOption
        }, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
        ])
      ], 2)),
      _ctx.showSelectorIcon ? vue.renderSlot(_ctx.$slots, "selectorIcon", { key: 3 }, () => [
        vue.createVNode(_component_selector_icon, {
          ref: "selectorIcon",
          class: vue.normalizeClass(_ctx.classesList.selectButtonSelectorIcon)
        }, null, 8, ["class"])
      ]) : vue.createCommentVNode("", true)
    ], 64);
  }
  var RichSelectTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a]]);
  const _sfc_main$9 = {};
  const _hoisted_1$5 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("path", {
    "fill-rule": "evenodd",
    d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    "clip-rule": "evenodd"
  }, null, -1);
  const _hoisted_3$1 = [
    _hoisted_2$2
  ];
  function _sfc_render$9(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$5, _hoisted_3$1);
  }
  var CheckmarkIcon = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]);
  const _sfc_main$8 = vue.defineComponent({
    name: "RichSelectOption",
    compatConfig: {
      MODE: 3
    },
    components: {
      CheckmarkIcon
    },
    props: {
      option: {
        type: [Object],
        required: true
      },
      deep: {
        type: Number,
        default: 0
      }
    },
    setup() {
      const toggleOption = vue.inject("toggleOption");
      const setActiveOption = vue.inject("setActiveOption");
      const optionIsSelected = vue.inject("optionIsSelected");
      const optionIsActive = vue.inject("optionIsActive");
      const shown = vue.inject("shown");
      const classesList = useInjectsClassesList();
      return {
        setActiveOption,
        toggleOption,
        optionIsSelected,
        optionIsActive,
        shown,
        classesList
      };
    },
    computed: {
      optionClasses() {
        const classes = [this.classesList.option];
        if (this.isSelected) {
          if (this.isActive) {
            classes.push(this.classesList.selectedHighlightedOption);
          } else {
            classes.push(this.classesList.selectedOption);
          }
        } else if (this.isActive) {
          classes.push(this.classesList.highlightedOption);
        }
        return classes;
      },
      valueAttribute() {
        if (typeof this.option.value === "object") {
          return JSON.stringify(this.option.value);
        }
        return String(this.option.value);
      },
      hasChildren() {
        return this.option.children !== void 0 && this.option.children.length > 0;
      },
      isSelected() {
        return this.optionIsSelected(this.option);
      },
      isActive() {
        return this.optionIsActive(this.option);
      },
      isDisabled() {
        return core.normalizedOptionIsDisabled(this.option);
      }
    },
    watch: {
      shown: {
        async handler() {
          await this.$nextTick();
          this.scrollIntoViewIfNeccesary();
        },
        immediate: true
      },
      isActive() {
        this.scrollIntoViewIfNeccesary();
      }
    },
    beforeCreate() {
      this.$options.components.RichSelectOptionsList = vue.defineAsyncComponent(() => Promise.resolve().then(function() {
        return RichSelectOptionsList$1;
      }));
    },
    methods: {
      scrollIntoViewIfNeccesary() {
        if (this.shown && this.isActive) {
          const li = this.$el;
          li.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      },
      mousemoveHandler() {
        if (this.isDisabled) {
          return;
        }
        this.setActiveOption(this.option);
      },
      mousewheelHandler() {
        if (this.isDisabled) {
          return;
        }
        this.setActiveOption(this.option);
      },
      clickHandler() {
        if (this.isDisabled) {
          return;
        }
        this.toggleOption(this.option);
      }
    }
  });
  const _hoisted_1$4 = ["aria-selected", "disabled", "value"];
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_rich_select_options_list = vue.resolveComponent("rich-select-options-list");
    const _component_checkmark_icon = vue.resolveComponent("checkmark-icon");
    return _ctx.hasChildren ? (vue.openBlock(), vue.createElementBlock("li", {
      key: 0,
      role: "optgroup",
      class: vue.normalizeClass(_ctx.classesList.optgroup)
    }, [
      vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.classesList.optgroupContent)
      }, [
        vue.createElementVNode("span", {
          class: vue.normalizeClass(_ctx.classesList.optgroupLabel)
        }, vue.toDisplayString(_ctx.option.text), 3),
        vue.createVNode(_component_rich_select_options_list, {
          ref: "childrenOptions",
          class: vue.normalizeClass(_ctx.classesList.optgroupOptionsList),
          options: _ctx.option.children,
          deep: _ctx.deep + 1
        }, null, 8, ["class", "options", "deep"])
      ], 2)
    ], 2)) : (vue.openBlock(), vue.createElementBlock("li", {
      key: 1,
      class: vue.normalizeClass(_ctx.classesList.optionWrapper),
      onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.mousemoveHandler && _ctx.mousemoveHandler(...args)),
      onMousewheel: _cache[1] || (_cache[1] = (...args) => _ctx.mousewheelHandler && _ctx.mousewheelHandler(...args)),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "option", {
        className: _ctx.optionClasses,
        option: _ctx.option,
        isDisabled: _ctx.isDisabled,
        isActive: _ctx.isActive,
        isSelected: _ctx.isSelected,
        deep: _ctx.deep
      }, () => [
        vue.createElementVNode("button", {
          role: "option",
          class: vue.normalizeClass(_ctx.optionClasses),
          "aria-selected": _ctx.isSelected,
          tabindex: "-1",
          type: "button",
          disabled: _ctx.isDisabled,
          value: _ctx.valueAttribute
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(_ctx.classesList.optionContent)
          }, [
            vue.renderSlot(_ctx.$slots, "optionLabel", {
              option: _ctx.option,
              isDisabled: _ctx.isDisabled,
              isActive: _ctx.isActive,
              isSelected: _ctx.isSelected,
              deep: _ctx.deep
            }, () => [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(_ctx.classesList.optionLabel)
              }, vue.toDisplayString(_ctx.option.text), 3)
            ]),
            vue.renderSlot(_ctx.$slots, "optionIcon", {
              className: _ctx.optionClasses,
              option: _ctx.option,
              isDisabled: _ctx.isDisabled,
              isActive: _ctx.isActive,
              isSelected: _ctx.isSelected,
              deep: _ctx.deep
            }, () => [
              _ctx.isSelected ? (vue.openBlock(), vue.createBlock(_component_checkmark_icon, {
                key: 0,
                ref: "checkIcon",
                class: vue.normalizeClass(_ctx.classesList.optionSelectedIcon)
              }, null, 8, ["class"])) : vue.createCommentVNode("", true)
            ])
          ], 2)
        ], 10, _hoisted_1$4)
      ])
    ], 34));
  }
  var RichSelectOption = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8]]);
  const _sfc_main$7 = vue.defineComponent({
    name: "RichSelectOptionsList",
    compatConfig: {
      MODE: 3
    },
    components: {
      RichSelectOption
    },
    props: {
      options: {
        type: Array,
        required: true
      },
      deep: {
        type: Number,
        default: 0
      }
    },
    setup(props) {
      const configuration = vue.inject("configuration");
      const shown = vue.inject("shown");
      const fetchingMoreOptions = vue.inject("fetchingMoreOptions");
      const dropdownBottomReachedHandler = vue.inject("dropdownBottomReachedHandler");
      const maxHeight = vue.computed(() => core.normalizeMeasure(configuration.maxHeight));
      const usesMaxHeight = vue.computed(() => props.deep === 0 && maxHeight.value !== void 0);
      const classesList = useInjectsClassesList();
      const bottomReachedObserver = core.debounce(([event]) => {
        const element = event.target;
        const reached = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight;
        if (reached) {
          dropdownBottomReachedHandler();
        }
      }, 200);
      return {
        maxHeight,
        usesMaxHeight,
        shown,
        bottomReachedObserver,
        fetchingMoreOptions,
        configuration,
        classesList
      };
    },
    computed: {
      showOptions() {
        return this.options.length > 0;
      }
    },
    watch: {
      async showOptions(show) {
        if (show) {
          await this.$nextTick();
          this.$el.addEventListener("scroll", this.bottomReachedObserver);
        } else {
          this.$el.removeEventListener("scroll", this.bottomReachedObserver);
        }
      },
      async fetchingMoreOptions(fetchingMoreOptions) {
        if (fetchingMoreOptions) {
          await this.$nextTick();
          const el = this.$refs.fetchingMoreOptionsText;
          el.scrollIntoView({ block: "end", behavior: "smooth" });
        }
      }
    },
    mounted() {
      if (this.showOptions) {
        this.$el.addEventListener("scroll", this.bottomReachedObserver);
      }
    },
    beforeUnmount() {
      if (this.showOptions) {
        this.$el.removeEventListener("scroll", this.bottomReachedObserver);
      }
    }
  });
  const _hoisted_1$3 = ["textContent"];
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_rich_select_option = vue.resolveComponent("rich-select-option");
    return _ctx.showOptions ? (vue.openBlock(), vue.createElementBlock("ul", {
      key: 0,
      class: vue.normalizeClass(_ctx.classesList.optionsList),
      style: vue.normalizeStyle(_ctx.usesMaxHeight ? `max-height: ${_ctx.maxHeight}; overflow-x: auto;` : void 0)
    }, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.options, (option, index) => {
        return vue.openBlock(), vue.createBlock(_component_rich_select_option, {
          key: `${_ctx.deep > 0 ? `${_ctx.deep}-` : ""}${JSON.stringify(option.value)}-${index}`,
          option,
          deep: _ctx.deep
        }, {
          option: vue.withCtx((props) => [
            vue.renderSlot(_ctx.$slots, "option", vue.normalizeProps(vue.guardReactiveProps(props)))
          ]),
          optionLabel: vue.withCtx((props) => [
            vue.renderSlot(_ctx.$slots, "optionLabel", vue.normalizeProps(vue.guardReactiveProps(props)))
          ]),
          optionIcon: vue.withCtx((props) => [
            vue.renderSlot(_ctx.$slots, "optionIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
          ]),
          _: 2
        }, 1032, ["option", "deep"]);
      }), 128)),
      _ctx.fetchingMoreOptions ? (vue.openBlock(), vue.createElementBlock("li", {
        ref: "fetchingMoreOptionsText",
        key: "loading_more",
        class: vue.normalizeClass(_ctx.classesList.optionsListLoadingMore),
        textContent: vue.toDisplayString(_ctx.configuration.loadingMoreResultsText)
      }, null, 10, _hoisted_1$3)) : vue.createCommentVNode("", true)
    ], 6)) : vue.createCommentVNode("", true);
  }
  var RichSelectOptionsList = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
  var RichSelectOptionsList$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": RichSelectOptionsList
  });
  const _sfc_main$6 = vue.defineComponent({
    name: "RichSelectSearchInput",
    compatConfig: {
      MODE: 3
    },
    setup() {
      const search = vue.ref();
      const shown = vue.inject("shown");
      const searchQuery = vue.inject("searchQuery");
      const configuration = useInjectsConfiguration();
      const keydownDownHandler = vue.inject("keydownDownHandler");
      const keydownUpHandler = vue.inject("keydownUpHandler");
      const keydownEnterHandler = vue.inject("keydownEnterHandler");
      const keydownEscHandler = vue.inject("keydownEscHandler");
      const classesList = useInjectsClassesList();
      vue.watch(shown, async (isShown) => {
        if (isShown) {
          search.value.focus();
        }
      });
      return {
        configuration,
        shown,
        search,
        searchQuery,
        classesList,
        keydownUpHandler,
        keydownDownHandler,
        keydownEnterHandler,
        keydownEscHandler
      };
    }
  });
  const _hoisted_1$2 = ["placeholder"];
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.classesList.searchWrapper)
    }, [
      vue.withDirectives(vue.createElementVNode("input", {
        ref: "search",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.searchQuery = $event),
        "data-rich-select-focusable": "",
        placeholder: _ctx.configuration.searchBoxPlaceholder,
        class: vue.normalizeClass(_ctx.classesList.searchInput),
        onKeydown: [
          _cache[1] || (_cache[1] = vue.withKeys((...args) => _ctx.keydownDownHandler && _ctx.keydownDownHandler(...args), ["down"])),
          _cache[2] || (_cache[2] = vue.withKeys((...args) => _ctx.keydownUpHandler && _ctx.keydownUpHandler(...args), ["up"])),
          _cache[3] || (_cache[3] = vue.withKeys((...args) => _ctx.keydownEnterHandler && _ctx.keydownEnterHandler(...args), ["enter"])),
          _cache[4] || (_cache[4] = vue.withKeys((...args) => _ctx.keydownEscHandler && _ctx.keydownEscHandler(...args), ["esc"]))
        ]
      }, null, 42, _hoisted_1$2), [
        [vue.vModelText, _ctx.searchQuery]
      ])
    ], 2);
  }
  var RichSelectSearchInput = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
  const _sfc_main$5 = vue.defineComponent({
    name: "RichSelectState",
    compatConfig: {
      MODE: 3
    },
    setup() {
      const options = vue.inject("options");
      const fetchingOptions = vue.inject("fetchingOptions");
      const needsMoreCharsToFetch = vue.inject("needsMoreCharsToFetch");
      const needsMoreCharsMessage = vue.inject("needsMoreCharsMessage");
      const configuration = useInjectsConfiguration();
      const noResults = vue.computed(() => options.value.length === 0);
      const classesList = useInjectsClassesList();
      return {
        noResults,
        configuration,
        fetchingOptions,
        needsMoreCharsToFetch,
        needsMoreCharsMessage,
        classesList
      };
    }
  });
  const _hoisted_1$1 = ["textContent"];
  const _hoisted_2$1 = ["textContent"];
  const _hoisted_3 = ["textContent"];
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.renderSlot(_ctx.$slots, "stateFeedback", {
      fetchingOptions: _ctx.fetchingOptions,
      needsMoreCharsToFetch: _ctx.needsMoreCharsToFetch,
      noResults: _ctx.noResults
    }, () => [
      _ctx.fetchingOptions ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass(_ctx.classesList.searchingText),
        textContent: vue.toDisplayString(_ctx.configuration.searchingText)
      }, null, 10, _hoisted_1$1)) : _ctx.needsMoreCharsToFetch ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: vue.normalizeClass(_ctx.classesList.needsMoreCharsText),
        textContent: vue.toDisplayString(_ctx.needsMoreCharsMessage)
      }, null, 10, _hoisted_2$1)) : _ctx.noResults ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 2,
        class: vue.normalizeClass(_ctx.classesList.noResultsText),
        textContent: vue.toDisplayString(_ctx.configuration.noResultsText)
      }, null, 10, _hoisted_3)) : vue.createCommentVNode("", true)
    ]);
  }
  var RichSelectState = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
  const _sfc_main$4 = vue.defineComponent({
    name: "RichSelectDropdown",
    compatConfig: {
      MODE: 3
    },
    components: {
      RichSelectOptionsList,
      RichSelectSearchInput,
      RichSelectState
    },
    setup() {
      const options = vue.inject("options");
      const showSearchInput = vue.inject("showSearchInput");
      const className = useInjectsClassesListClass("dropdownContent");
      return {
        options,
        showSearchInput,
        className
      };
    }
  });
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_rich_select_search_input = vue.resolveComponent("rich-select-search-input");
    const _component_rich_select_state = vue.resolveComponent("rich-select-state");
    const _component_rich_select_options_list = vue.resolveComponent("rich-select-options-list");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(_ctx.className)
    }, [
      _ctx.showSearchInput ? (vue.openBlock(), vue.createBlock(_component_rich_select_search_input, {
        key: 0,
        ref: "searchInput"
      }, null, 512)) : vue.createCommentVNode("", true),
      vue.renderSlot(_ctx.$slots, "dropdownTop"),
      vue.createVNode(_component_rich_select_state, { ref: "state" }, {
        stateFeedback: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "stateFeedback", vue.normalizeProps(vue.guardReactiveProps(props)))
        ]),
        _: 3
      }, 512),
      vue.createVNode(_component_rich_select_options_list, {
        ref: "optionsList",
        options: _ctx.options
      }, {
        option: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "option", vue.normalizeProps(vue.guardReactiveProps(props)))
        ]),
        optionLabel: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "optionLabel", vue.normalizeProps(vue.guardReactiveProps(props)))
        ]),
        optionIcon: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "optionIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
        ]),
        _: 3
      }, 8, ["options"]),
      vue.renderSlot(_ctx.$slots, "dropdownButton")
    ], 2);
  }
  var RichSelectDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
  const _sfc_main$3 = vue.defineComponent({
    name: "RichSelectClearButton",
    compatConfig: {
      MODE: 3
    },
    components: {
      CloseIcon
    },
    setup() {
      const className = useInjectsClassesListClass("clearButton");
      return { className };
    }
  });
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_close_icon = vue.resolveComponent("close-icon");
    return vue.openBlock(), vue.createElementBlock("button", {
      type: "button",
      "data-rich-select-focusable": "",
      class: vue.normalizeClass(_ctx.className)
    }, [
      vue.renderSlot(_ctx.$slots, "clearButton", {}, () => [
        vue.createVNode(_component_close_icon, { class: "w-4 h-4" })
      ])
    ], 2);
  }
  var RichSelectClearButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
  const _sfc_main$2 = vue.defineComponent({
    name: "TRichSelect",
    compatConfig: {
      MODE: 3
    },
    components: {
      RichSelectTrigger,
      RichSelectDropdown,
      RichSelectClearButton,
      TDropdown,
      TSelect
    },
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      modelValue: {
        type: [
          String,
          Number,
          Boolean,
          Array,
          Object,
          Date,
          Function,
          Symbol
        ],
        default: void 0
      },
      name: {
        type: String,
        default: void 0
      },
      options: {
        type: [Array, Object],
        default: void 0
      },
      normalizeOptions: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      tags: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: void 0
      },
      dropdownPlacement: {
        type: String,
        default: void 0,
        validator: (value) => validDropdownPlacements.includes(value)
      },
      dropdownPopperOptions: {
        type: Object,
        default: () => __spreadProps(__spreadValues({}, core.TDropdownPopperDefaultOptions), {
          placement: "bottom",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8]
              }
            },
            sameWidthModifier
          ]
        })
      },
      closeOnSelect: {
        type: Boolean,
        default: void 0
      },
      selectOnClose: {
        type: Boolean,
        default: false
      },
      clearSearchOnClose: {
        type: Boolean,
        default: void 0
      },
      toggleOnFocus: {
        type: Boolean,
        default: false
      },
      toggleOnClick: {
        type: Boolean,
        default: true
      },
      valueAttribute: {
        type: String,
        default: void 0
      },
      textAttribute: {
        type: String,
        default: void 0
      },
      hideSearchBox: {
        type: Boolean,
        default: false
      },
      searchBoxPlaceholder: {
        type: String,
        default: "Search..."
      },
      noResultsText: {
        type: String,
        default: "No options found"
      },
      searchingText: {
        type: String,
        default: "Searching..."
      },
      loadingClosedPlaceholder: {
        type: String,
        default: "Loading..."
      },
      loadingMoreResultsText: {
        type: String,
        default: "Loading more options..."
      },
      clearable: {
        type: Boolean,
        default: true
      },
      maxHeight: {
        type: [Number, String],
        default: 250
      },
      fetchOptions: {
        type: Function,
        default: void 0
      },
      prefetchOptions: {
        type: [Function, Boolean],
        default: false
      },
      delay: {
        type: Number,
        default: 250
      },
      minimumInputLength: {
        type: Number,
        default: void 0
      },
      minimumInputLengthText: {
        type: [Function, String],
        default: () => (minimumInputLength) => `Please enter ${minimumInputLength} or more characters`
      },
      minimumResultsForSearch: {
        type: Number,
        default: void 0
      },
      teleport: {
        type: Boolean,
        default: false
      },
      teleportTo: {
        type: [String, Object],
        default: "body"
      }
    }),
    emits: {
      change: (e) => e instanceof CustomEvent,
      input: (e) => e instanceof CustomEvent,
      keydown: (e) => e instanceof KeyboardEvent,
      focus: (e) => e instanceof FocusEvent,
      blur: (e) => e instanceof FocusEvent,
      mousedown: (e) => e instanceof MouseEvent,
      mouseover: (e) => e instanceof MouseEvent,
      mouseleave: (e) => e instanceof MouseEvent,
      touchstart: (e) => e instanceof TouchEvent,
      shown: () => true,
      hidden: () => true,
      "before-show": () => true,
      "before-hide": () => true,
      "fetch-options-success": () => true,
      "fetch-options-error": () => true,
      "update:modelValue": () => true
    },
    setup(props, { emit }) {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TRichSelectConfig, core.TRichSelectClassesKeys);
      const { localValue, clearValue } = useMulipleableVModel(props, "modelValue", configuration);
      const searchQuery = vue.ref(void 0);
      const {
        normalizedOptions,
        flattenedOptions,
        fetchsOptions,
        needsMoreCharsToFetch,
        needsMoreCharsMessage,
        fetchingOptions,
        fetchingMoreOptions,
        fetchOptions: doFetchOptions,
        prefetchOptions: doPrefetchOptions,
        fetchMoreOptions,
        optionsWereFetched,
        fetchedOptionsHaveMorePages,
        fetchOptionsCancel
      } = useFetchsOptions(localValue, vue.computed(() => configuration.options), vue.computed(() => configuration.textAttribute), vue.computed(() => configuration.valueAttribute), vue.computed(() => configuration.normalizeOptions), searchQuery, vue.computed(() => configuration.fetchOptions), vue.computed(() => configuration.prefetchOptions), vue.computed(() => configuration.delay), vue.computed(() => configuration.minimumInputLength), vue.computed(() => configuration.minimumInputLengthText));
      const {
        selectedOption,
        hasSelectedOption,
        selectOption,
        toggleOption,
        optionIsSelected
      } = useSelectableOption(flattenedOptions, localValue, vue.computed(() => configuration.multiple));
      const {
        activeOption,
        optionIsActive,
        setActiveOption,
        initActiveOption,
        setNextOptionActive,
        setPrevOptionActive
      } = useActivableOption(flattenedOptions, localValue);
      const shown = vue.ref(false);
      const showSearchInput = vue.computed(() => {
        if (configuration.hideSearchBox) {
          return false;
        }
        if (configuration.minimumResultsForSearch !== void 0) {
          return normalizedOptions.value.length >= configuration.minimumResultsForSearch;
        }
        return true;
      });
      const dropdownComponent = vue.ref();
      const focusDropdownTrigger = () => {
        dropdownComponent.value.focus();
      };
      const usesTags = vue.computed(() => configuration.tags === true && configuration.multiple === true);
      const hideDropdown = () => {
        dropdownComponent.value.doHide();
      };
      const showDropdown = () => {
        dropdownComponent.value.doShow();
      };
      const adjustDropdown = async () => {
        await dropdownComponent.value.adjustPopper();
      };
      const throttledShowDropdown = core.throttle(showDropdown, 200);
      const toggleDropdown = () => {
        if (shown.value) {
          hideDropdown();
        } else {
          throttledShowDropdown();
        }
      };
      const toggleOptionFromActiveOption = () => {
        if (activeOption.value === null) {
          return;
        }
        toggleOption(activeOption.value);
      };
      const selectOptionFromActiveOption = () => {
        if (activeOption.value === null) {
          return;
        }
        selectOption(activeOption.value);
      };
      const keydownDownHandler = (e) => {
        emit("keydown", e);
        e.preventDefault();
        if (shown.value === false) {
          throttledShowDropdown();
        } else {
          setNextOptionActive();
          const lastOption = normalizedOptions.value[normalizedOptions.value.length - 1];
          if (optionIsActive(lastOption) && fetchedOptionsHaveMorePages.value && !fetchingMoreOptions.value) {
            fetchMoreOptions();
          }
        }
      };
      const keydownUpHandler = (e) => {
        emit("keydown", e);
        e.preventDefault();
        if (shown.value === false) {
          throttledShowDropdown();
        } else {
          setPrevOptionActive();
        }
      };
      const keydownEnterHandler = (e) => {
        emit("keydown", e);
        if (shown.value === true) {
          toggleOptionFromActiveOption();
        }
      };
      const keydownSpaceHandler = (e) => {
        emit("keydown", e);
        e.preventDefault();
        if (configuration.toggleOnClick && shown.value === false) {
          throttledShowDropdown();
        } else if (shown.value === true) {
          toggleOptionFromActiveOption();
        }
      };
      const keydownEscHandler = (e) => {
        emit("keydown", e);
        if (shown.value === false) {
          return;
        }
        hideDropdown();
        focusDropdownTrigger();
      };
      const dropdownBottomReachedHandler = () => {
        if (fetchedOptionsHaveMorePages.value && !fetchingMoreOptions.value) {
          fetchMoreOptions();
        }
      };
      vue.provide("configuration", configuration);
      vue.provide("options", normalizedOptions);
      vue.provide("selectedOption", selectedOption);
      vue.provide("hasSelectedOption", hasSelectedOption);
      vue.provide("toggleOption", toggleOption);
      vue.provide("setActiveOption", setActiveOption);
      vue.provide("optionIsSelected", optionIsSelected);
      vue.provide("optionIsActive", optionIsActive);
      vue.provide("keydownDownHandler", keydownDownHandler);
      vue.provide("keydownUpHandler", keydownUpHandler);
      vue.provide("keydownEscHandler", keydownEscHandler);
      vue.provide("keydownEnterHandler", keydownEnterHandler);
      vue.provide("shown", shown);
      vue.provide("showSearchInput", showSearchInput);
      vue.provide("searchQuery", searchQuery);
      vue.provide("needsMoreCharsToFetch", needsMoreCharsToFetch);
      vue.provide("needsMoreCharsMessage", needsMoreCharsMessage);
      vue.provide("fetchingOptions", fetchingOptions);
      vue.provide("fetchingMoreOptions", fetchingMoreOptions);
      vue.provide("dropdownBottomReachedHandler", dropdownBottomReachedHandler);
      vue.provide("usesTags", usesTags);
      return {
        configuration,
        attributes,
        localValue,
        activeOption,
        hasSelectedOption,
        shown,
        dropdownComponent,
        hideDropdown,
        toggleDropdown,
        throttledShowDropdown,
        keydownDownHandler,
        keydownUpHandler,
        keydownSpaceHandler,
        keydownEnterHandler,
        keydownEscHandler,
        focusDropdownTrigger,
        optionIsSelected,
        initActiveOption,
        selectOption,
        selectOptionFromActiveOption,
        clearValue,
        doFetchOptions,
        doPrefetchOptions,
        adjustDropdown,
        fetchOptionsCancel,
        fetchsOptions,
        optionsWereFetched,
        needsMoreCharsToFetch,
        showSearchInput,
        flattenedOptions,
        usesTags,
        searchQuery
      };
    },
    computed: {
      canFetchOptions() {
        return this.fetchsOptions && !this.optionsWereFetched && !this.needsMoreCharsToFetch;
      },
      canPreFetchOptions() {
        if (typeof this.configuration.prefetchOptions === "function") {
          return !this.optionsWereFetched;
        }
        return this.canFetchOptions;
      },
      dropdownClasses() {
        const {
          enterActiveClass,
          enterFromClass,
          enterToClass,
          leaveActiveClass,
          leaveFromClass,
          leaveToClass,
          trigger,
          dropdown
        } = this.configuration.classesList;
        return {
          trigger,
          dropdown,
          enterActiveClass,
          enterFromClass,
          enterToClass,
          leaveActiveClass,
          leaveFromClass,
          leaveToClass
        };
      },
      showClearButton() {
        return this.hasSelectedOption && this.configuration.clearable === true && this.configuration.disabled !== true;
      }
    },
    watch: {
      localValue() {
        this.onOptionSelected();
      }
    },
    created() {
      if (this.configuration.prefetchOptions && this.canPreFetchOptions) {
        this.doPrefetchOptions();
      }
    },
    beforeUnmount() {
      this.fetchOptionsCancel();
    },
    methods: {
      onOptionSelected() {
        this.$emit("input", new CustomEvent("input", {
          detail: this.localValue
        }));
        this.$emit("change", new CustomEvent("change", {
          detail: this.localValue
        }));
        if (this.shown === false) {
          return;
        }
        this.adjustDropdown();
        if (this.configuration.closeOnSelect === true || this.configuration.closeOnSelect === void 0 && !this.configuration.multiple) {
          this.hideDropdown();
          this.focusDropdownTrigger();
        }
      },
      beforeHideHandler() {
        var _a;
        this.$emit("before-hide");
        if (this.configuration.selectOnClose && !core.isEqual(this.localValue, (_a = this.activeOption) == null ? void 0 : _a.value)) {
          this.selectOptionFromActiveOption();
        }
      },
      shownHandler() {
        this.$emit("shown");
        this.shown = true;
      },
      hiddenHandler() {
        this.$emit("hidden");
        this.shown = false;
        if (this.clearSearchOnClose) {
          this.searchQuery = void 0;
        }
      },
      beforeShowHandler() {
        this.$emit("before-show");
        this.initActiveOption();
        if (this.canFetchOptions) {
          this.doFetchOptions();
        }
      },
      mousedownHandler(e) {
        this.$emit("mousedown", e);
        if (this.configuration.toggleOnClick) {
          if (this.showSearchInput && this.shown === false) {
            e.preventDefault();
          }
          this.toggleDropdown();
        }
      },
      focusHandler(e) {
        this.$emit("focus", e);
        if (this.configuration.toggleOnFocus) {
          this.throttledShowDropdown();
        }
      },
      blurOnChildHandler(e) {
        const target = e.target;
        const relatedTarget = e.relatedTarget;
        const relatedTargetDataset = relatedTarget instanceof HTMLElement ? relatedTarget.dataset : void 0;
        if (target.dataset.richSelectFocusable !== void 0 && relatedTargetDataset && relatedTargetDataset.richSelectFocusable === void 0) {
          target.focus();
        }
      },
      blurHandler(e) {
        this.$emit("blur", e);
        this.hideDropdown();
      }
    }
  });
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    var _a;
    const _component_t_select = vue.resolveComponent("t-select");
    const _component_rich_select_trigger = vue.resolveComponent("rich-select-trigger");
    const _component_rich_select_dropdown = vue.resolveComponent("rich-select-dropdown");
    const _component_t_dropdown = vue.resolveComponent("t-dropdown");
    const _component_rich_select_clear_button = vue.resolveComponent("rich-select-clear-button");
    return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      class: (_a = _ctx.configuration.classesList) == null ? void 0 : _a.wrapper
    }, _ctx.attributes), [
      vue.createVNode(_component_t_select, {
        modelValue: _ctx.localValue,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.localValue = $event),
        name: _ctx.configuration.name,
        style: { "display": "none" },
        "fixed-classes": void 0,
        classes: void 0,
        multiple: _ctx.configuration.multiple,
        options: _ctx.flattenedOptions
      }, null, 8, ["modelValue", "name", "multiple", "options"]),
      vue.createVNode(_component_t_dropdown, {
        ref: "dropdownComponent",
        disabled: _ctx.configuration.disabled,
        classes: _ctx.dropdownClasses,
        "fixed-classes": void 0,
        "toggle-on-focus": false,
        "toggle-on-click": false,
        "toggle-on-hover": false,
        "popper-options": _ctx.configuration.dropdownPopperOptions,
        placement: _ctx.configuration.dropdownPlacement,
        "tag-name": _ctx.usesTags ? "div" : "button",
        tabindex: _ctx.usesTags && !_ctx.hasSelectedOption ? 0 : void 0,
        teleport: _ctx.configuration.teleport,
        "teleport-to": _ctx.configuration.teleportTo,
        "data-rich-select-focusable": "",
        onMouseover: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("mouseover", $event)),
        onMouseleave: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("mouseleave", $event)),
        onTouchstart: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("touchstart", $event)),
        onShown: _ctx.shownHandler,
        onHidden: _ctx.hiddenHandler,
        onBeforeShow: _ctx.beforeShowHandler,
        onBeforeHide: _ctx.beforeHideHandler,
        onBlur: _ctx.blurHandler,
        onFocus: _ctx.focusHandler,
        onKeydown: [
          vue.withKeys(_ctx.keydownEnterHandler, ["enter"]),
          vue.withKeys(_ctx.keydownSpaceHandler, ["space"]),
          vue.withKeys(_ctx.keydownDownHandler, ["down"]),
          vue.withKeys(_ctx.keydownUpHandler, ["up"]),
          vue.withKeys(_ctx.keydownEscHandler, ["esc"])
        ],
        onMousedown: _ctx.mousedownHandler,
        onBlurOnChild: _ctx.blurOnChildHandler
      }, {
        trigger: vue.withCtx(() => [
          vue.createVNode(_component_rich_select_trigger, { ref: "trigger" }, {
            selectorIcon: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "selectorIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            placeholder: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "placeholder", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            label: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "label", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            tagCloseIcon: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "tagCloseIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            tagLabel: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "tagLabel", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            _: 3
          }, 512)
        ]),
        default: vue.withCtx(() => [
          vue.createVNode(_component_rich_select_dropdown, { ref: "dropdown" }, {
            option: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "option", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            optionLabel: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "optionLabel", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            optionIcon: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "optionIcon", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            dropdownTop: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "dropdownTop", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            dropdownButton: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "dropdownButton", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            stateFeedback: vue.withCtx((props) => [
              vue.renderSlot(_ctx.$slots, "stateFeedback", vue.normalizeProps(vue.guardReactiveProps(props)))
            ]),
            _: 3
          }, 512)
        ]),
        _: 3
      }, 8, ["disabled", "classes", "popper-options", "placement", "tag-name", "tabindex", "teleport", "teleport-to", "onShown", "onHidden", "onBeforeShow", "onBeforeHide", "onBlur", "onFocus", "onKeydown", "onMousedown", "onBlurOnChild"]),
      _ctx.showClearButton ? (vue.openBlock(), vue.createBlock(_component_rich_select_clear_button, {
        key: 0,
        ref: "clearButton",
        onClick: _ctx.clearValue
      }, {
        clearButton: vue.withCtx((props) => [
          vue.renderSlot(_ctx.$slots, "clearButton", vue.mergeProps(props, {
            classesList: _ctx.configuration.classesList
          }))
        ]),
        _: 3
      }, 8, ["onClick"])) : vue.createCommentVNode("", true)
    ], 16);
  }
  var TRichSelect = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
  const _sfc_main$1 = vue.defineComponent({
    name: "TTag",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantProps()), {
      tagName: {
        type: String,
        default: "div"
      },
      text: {
        type: String,
        default: void 0
      }
    }),
    setup() {
      const { configuration, attributes } = useConfiguration(core.TTagConfig);
      return { configuration, attributes };
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.configuration.tagName), vue.normalizeProps(vue.guardReactiveProps(_ctx.attributes)), {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "default", { configuration: _ctx.configuration }, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.configuration.text), 1)
        ])
      ]),
      _: 3
    }, 16);
  }
  var TTag = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
  const _sfc_main = vue.defineComponent({
    name: "TToggle",
    compatConfig: {
      MODE: 3
    },
    props: __spreadProps(__spreadValues({}, getVariantPropsWithClassesList()), {
      name: {
        type: String,
        default: void 0
      },
      modelValue: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: void 0
      },
      value: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: true
      },
      uncheckedValue: {
        type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
        default: false
      },
      checked: {
        type: Boolean,
        default: void 0
      },
      disabled: {
        type: Boolean,
        default: void 0
      },
      checkedPlaceholder: {
        type: String,
        default: void 0
      },
      uncheckedPlaceholder: {
        type: String,
        default: void 0
      }
    }),
    emits: {
      "update:checked": (isChecked) => true,
      "update:modelValue": (value) => true
    },
    setup(props, { emit }) {
      const { configuration, attributes } = useConfigurationWithClassesList(core.TToggleConfig, core.TToggleClassesKeys);
      const vm = vue.getCurrentInstance();
      const getInitialValue = () => {
        const modelValueIsDefined = core.hasProperty(vm.vnode.props, "modelValue");
        if (modelValueIsDefined) {
          return props.modelValue;
        }
        if (configuration.checked === true) {
          return configuration.value;
        }
        return configuration.uncheckedValue;
      };
      const localValue = vue.ref(getInitialValue());
      const isMultiple = vue.computed(() => Array.isArray(localValue.value));
      const isChecked = vue.computed(() => {
        if (isMultiple.value) {
          return localValue.value.some((value) => core.isEqual(value, configuration.value));
        }
        return core.isEqual(localValue.value, configuration.value);
      });
      const inputValue = vue.computed(() => {
        if (isChecked.value) {
          return configuration.value;
        }
        return configuration.uncheckedValue;
      });
      const check = () => {
        if (isMultiple.value) {
          localValue.value = core.addToArray(localValue.value, configuration.value);
        } else {
          localValue.value = configuration.value;
        }
      };
      const uncheck = () => {
        if (isMultiple.value) {
          localValue.value = core.substractFromArray(localValue.value, configuration.value);
        } else {
          localValue.value = configuration.uncheckedValue;
        }
      };
      const toggle = () => {
        if (isChecked.value) {
          uncheck();
        } else {
          check();
        }
      };
      vue.watch(localValue, (newValue) => {
        emit("update:modelValue", newValue);
      });
      vue.watch(isChecked, (newIsChecked) => {
        emit("update:checked", newIsChecked);
      });
      vue.watch(() => props.modelValue, (newModelValue) => {
        localValue.value = newModelValue;
      });
      vue.watch(() => configuration.checked, (newChecked) => {
        if (newChecked) {
          check();
        } else {
          uncheck();
        }
      });
      const classes = vue.computed(() => {
        if (configuration.disabled) {
          return {
            wrapper: isChecked.value ? configuration.classesList.wrapperCheckedDisabled : configuration.classesList.wrapperDisabled,
            button: isChecked.value ? configuration.classesList.buttonChecked : configuration.classesList.button
          };
        }
        return {
          wrapper: isChecked.value ? configuration.classesList.wrapperChecked : configuration.classesList.wrapper,
          button: isChecked.value ? configuration.classesList.buttonChecked : configuration.classesList.button
        };
      });
      return {
        configuration,
        attributes,
        localValue,
        isChecked,
        isMultiple,
        classes,
        inputValue,
        toggle
      };
    }
  });
  const _hoisted_1 = ["aria-checked", "disabled"];
  const _hoisted_2 = ["value", "name", "disabled"];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    var _a, _b;
    return vue.openBlock(), vue.createElementBlock("button", {
      type: "button",
      role: "checkbox",
      "aria-checked": _ctx.isChecked ? "true" : "false",
      class: vue.normalizeClass(_ctx.classes.wrapper),
      disabled: _ctx.configuration.disabled,
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggle && _ctx.toggle(...args))
    }, [
      !_ctx.isMultiple || _ctx.isChecked ? (vue.openBlock(), vue.createElementBlock("input", {
        key: 0,
        value: _ctx.inputValue,
        type: "hidden",
        name: _ctx.configuration.name,
        disabled: _ctx.configuration.disabled
      }, null, 8, _hoisted_2)) : vue.createCommentVNode("", true),
      vue.createElementVNode("span", {
        "aria-hidden": "true",
        class: vue.normalizeClass((_a = _ctx.configuration.classesList) == null ? void 0 : _a.uncheckedPlaceholder)
      }, [
        vue.renderSlot(_ctx.$slots, "unchecked", {
          value: _ctx.inputValue,
          isChecked: _ctx.isChecked
        }, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.configuration.uncheckedPlaceholder), 1)
        ])
      ], 2),
      vue.createElementVNode("span", {
        "aria-hidden": "true",
        class: vue.normalizeClass((_b = _ctx.configuration.classesList) == null ? void 0 : _b.checkedPlaceholder)
      }, [
        vue.renderSlot(_ctx.$slots, "checked", {
          value: _ctx.inputValue,
          isChecked: _ctx.isChecked
        }, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.configuration.checkedPlaceholder), 1)
        ])
      ], 2),
      vue.createElementVNode("span", {
        "aria-hidden": "true",
        class: vue.normalizeClass(_ctx.classes.button)
      }, [
        vue.renderSlot(_ctx.$slots, "default", {
          value: _ctx.inputValue,
          isChecked: _ctx.isChecked
        })
      ], 2)
    ], 10, _hoisted_1);
  }
  var TToggle = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  exports2.Emitter = Emitter;
  exports2.LoadingIcon = LoadingIcon;
  exports2.TAlert = TAlert;
  exports2.TButton = TButton;
  exports2.TCard = TCard;
  exports2.TCheckbox = TCheckbox;
  exports2.TDialog = TDialog;
  exports2.TDropdown = TDropdown;
  exports2.TInput = TInput;
  exports2.TInputGroup = TInputGroup;
  exports2.TModal = TModal;
  exports2.TRadio = TRadio;
  exports2.TRichSelect = TRichSelect;
  exports2.TSelect = TSelect;
  exports2.TTag = TTag;
  exports2.TTextarea = TTextarea;
  exports2.TToggle = TToggle;
  exports2.getVariantProps = getVariantProps;
  exports2.getVariantPropsWithClassesList = getVariantPropsWithClassesList;
  exports2.sameWidthModifier = sameWidthModifier;
  exports2.svgToVueComponent = svgToVueComponent;
  exports2.useActivableOption = useActivableOption;
  exports2.useConfiguration = useConfiguration;
  exports2.useConfigurationWithClassesList = useConfigurationWithClassesList;
  exports2.useFetchsOptions = useFetchsOptions;
  exports2.useInjectsClassesList = useInjectsClassesList;
  exports2.useInjectsClassesListClass = useInjectsClassesListClass;
  exports2.useInjectsConfiguration = useInjectsConfiguration;
  exports2.useMulipleableVModel = useMulipleableVModel;
  exports2.useMultioptions = useMultioptions;
  exports2.useSelectableOption = useSelectableOption;
  exports2.useVModel = useVModel;
  exports2.variantJS = plugin;
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2[Symbol.toStringTag] = "Module";
});
//# sourceMappingURL=index.umd.js.map


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/const.js":
/*!*********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/const.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HOOK_SETUP": function() { return /* binding */ HOOK_SETUP; },
/* harmony export */   "HOOK_PLUGIN_SETTINGS_SET": function() { return /* binding */ HOOK_PLUGIN_SETTINGS_SET; }
/* harmony export */ });
const HOOK_SETUP = 'devtools-plugin:setup';
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/env.js":
/*!*******************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/env.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDevtoolsGlobalHook": function() { return /* binding */ getDevtoolsGlobalHook; },
/* harmony export */   "getTarget": function() { return /* binding */ getTarget; },
/* harmony export */   "isProxyAvailable": function() { return /* binding */ isProxyAvailable; }
/* harmony export */ });
function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
    // @ts-ignore
    return (typeof navigator !== 'undefined' && typeof window !== 'undefined')
        ? window
        : typeof __webpack_require__.g !== 'undefined'
            ? __webpack_require__.g
            : {};
}
const isProxyAvailable = typeof Proxy === 'function';


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/index.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupDevtoolsPlugin": function() { return /* binding */ setupDevtoolsPlugin; }
/* harmony export */ });
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env */ "./node_modules/@vue/devtools-api/lib/esm/env.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const */ "./node_modules/@vue/devtools-api/lib/esm/const.js");
/* harmony import */ var _proxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./proxy */ "./node_modules/@vue/devtools-api/lib/esm/proxy.js");





function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = (0,_env__WEBPACK_IMPORTED_MODULE_0__.getTarget)();
    const hook = (0,_env__WEBPACK_IMPORTED_MODULE_0__.getDevtoolsGlobalHook)();
    const enableProxy = _env__WEBPACK_IMPORTED_MODULE_0__.isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
        hook.emit(_const__WEBPACK_IMPORTED_MODULE_1__.HOOK_SETUP, pluginDescriptor, setupFn);
    }
    else {
        const proxy = enableProxy ? new _proxy__WEBPACK_IMPORTED_MODULE_2__.ApiProxy(pluginDescriptor, hook) : null;
        const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor,
            setupFn,
            proxy,
        });
        if (proxy)
            setupFn(proxy.proxiedTarget);
    }
}


/***/ }),

/***/ "./node_modules/@vue/devtools-api/lib/esm/proxy.js":
/*!*********************************************************!*\
  !*** ./node_modules/@vue/devtools-api/lib/esm/proxy.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiProxy": function() { return /* binding */ ApiProxy; }
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./node_modules/@vue/devtools-api/lib/esm/const.js");

class ApiProxy {
    constructor(plugin, hook) {
        this.target = null;
        this.targetQueue = [];
        this.onQueue = [];
        this.plugin = plugin;
        this.hook = hook;
        const defaultSettings = {};
        if (plugin.settings) {
            for (const id in plugin.settings) {
                const item = plugin.settings[id];
                defaultSettings[id] = item.defaultValue;
            }
        }
        const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
        let currentSettings = Object.assign({}, defaultSettings);
        try {
            const raw = localStorage.getItem(localSettingsSaveId);
            const data = JSON.parse(raw);
            Object.assign(currentSettings, data);
        }
        catch (e) {
            // noop
        }
        this.fallbacks = {
            getSettings() {
                return currentSettings;
            },
            setSettings(value) {
                try {
                    localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
                }
                catch (e) {
                    // noop
                }
                currentSettings = value;
            },
        };
        if (hook) {
            hook.on(_const__WEBPACK_IMPORTED_MODULE_0__.HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
                if (pluginId === this.plugin.id) {
                    this.fallbacks.setSettings(value);
                }
            });
        }
        this.proxiedOn = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target.on[prop];
                }
                else {
                    return (...args) => {
                        this.onQueue.push({
                            method: prop,
                            args,
                        });
                    };
                }
            },
        });
        this.proxiedTarget = new Proxy({}, {
            get: (_target, prop) => {
                if (this.target) {
                    return this.target[prop];
                }
                else if (prop === 'on') {
                    return this.proxiedOn;
                }
                else if (Object.keys(this.fallbacks).includes(prop)) {
                    return (...args) => {
                        this.targetQueue.push({
                            method: prop,
                            args,
                            resolve: () => { },
                        });
                        return this.fallbacks[prop](...args);
                    };
                }
                else {
                    return (...args) => {
                        return new Promise(resolve => {
                            this.targetQueue.push({
                                method: prop,
                                args,
                                resolve,
                            });
                        });
                    };
                }
            },
        });
    }
    async setRealTarget(target) {
        this.target = target;
        for (const item of this.onQueue) {
            this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
            item.resolve(await this.target[item.method](...item.args));
        }
    }
}


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || defaults.transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = (__webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ (function(module) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ (function(module) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ (function(module) {

module.exports = {
  "version": "0.24.0"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ (function(module) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ (function(module) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ (function(module) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ (function(module) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var VERSION = (__webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version);

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = (__webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-constructor.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-constructor.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "./node_modules/core-js/internals/is-constructor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(/*! ../internals/array-species-constructor */ "./node_modules/core-js/internals/array-species-constructor.js");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "./node_modules/core-js/internals/dom-token-list-prototype.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/dom-token-list-prototype.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-native.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-native.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-constructor.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/is-constructor.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-assign.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-assign.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.20.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.assign.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "./node_modules/core-js/internals/object-assign.js");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.keys.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var nativeKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.for-each.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.for-each.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");
var DOMTokenListPrototype = __webpack_require__(/*! ../internals/dom-token-list-prototype */ "./node_modules/core-js/internals/dom-token-list-prototype.js");
var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ (function(module) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/vue-axios/dist/vue-axios.esm.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue-axios/dist/vue-axios.esm.min.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ plugin; }
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function plugin(e,n){if(!plugin.installed){var o=isAxiosLike(n)?migrateToMultipleInstances(n):n;if(isValidConfig(o)){plugin.installed=!0;var i=getVueVersion(e);if(i){var t=i<3?registerOnVue2:registerOnVue3;Object.keys(o).forEach((function(n){t(e,n,o[n])}))}else console.error("[vue-axios] unknown Vue version")}else console.error("[vue-axios] configuration is invalid, expected options are either <axios_instance> or { <registration_key>: <axios_instance> }")}}function registerOnVue2(e,n,o){Object.defineProperty(e.prototype,n,{get:function(){return o}}),e[n]=o}function registerOnVue3(e,n,o){e.config.globalProperties[n]=o,e[n]=o}function isAxiosLike(e){return e&&"function"==typeof e.get&&"function"==typeof e.post}function migrateToMultipleInstances(e){return{axios:e,$http:e}}function isValidConfig(e){return"object"===_typeof(e)&&Object.keys(e).every((function(n){return isAxiosLike(e[n])}))}function getVueVersion(e){return e&&e.version&&Number(e.version.split(".")[0])}"object"==("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=plugin:"function"==typeof define&&__webpack_require__.amdO?define([],(function(){return plugin})):window.Vue&&window.axios&&window.Vue.use&&Vue.use(plugin,window.axios);

/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.esm-bundler.js":
/*!****************************************************************!*\
  !*** ./node_modules/vue-router/dist/vue-router.esm-bundler.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigationFailureType": function() { return /* binding */ NavigationFailureType; },
/* harmony export */   "RouterLink": function() { return /* binding */ RouterLink; },
/* harmony export */   "RouterView": function() { return /* binding */ RouterView; },
/* harmony export */   "START_LOCATION": function() { return /* binding */ START_LOCATION_NORMALIZED; },
/* harmony export */   "createMemoryHistory": function() { return /* binding */ createMemoryHistory; },
/* harmony export */   "createRouter": function() { return /* binding */ createRouter; },
/* harmony export */   "createRouterMatcher": function() { return /* binding */ createRouterMatcher; },
/* harmony export */   "createWebHashHistory": function() { return /* binding */ createWebHashHistory; },
/* harmony export */   "createWebHistory": function() { return /* binding */ createWebHistory; },
/* harmony export */   "isNavigationFailure": function() { return /* binding */ isNavigationFailure; },
/* harmony export */   "matchedRouteKey": function() { return /* binding */ matchedRouteKey; },
/* harmony export */   "onBeforeRouteLeave": function() { return /* binding */ onBeforeRouteLeave; },
/* harmony export */   "onBeforeRouteUpdate": function() { return /* binding */ onBeforeRouteUpdate; },
/* harmony export */   "parseQuery": function() { return /* binding */ parseQuery; },
/* harmony export */   "routeLocationKey": function() { return /* binding */ routeLocationKey; },
/* harmony export */   "routerKey": function() { return /* binding */ routerKey; },
/* harmony export */   "routerViewLocationKey": function() { return /* binding */ routerViewLocationKey; },
/* harmony export */   "stringifyQuery": function() { return /* binding */ stringifyQuery; },
/* harmony export */   "useLink": function() { return /* binding */ useLink; },
/* harmony export */   "useRoute": function() { return /* binding */ useRoute; },
/* harmony export */   "useRouter": function() { return /* binding */ useRouter; },
/* harmony export */   "viewDepthKey": function() { return /* binding */ viewDepthKey; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _vue_devtools_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/devtools-api */ "./node_modules/@vue/devtools-api/lib/esm/index.js");
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */



const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
// vr = vue router
hasSymbol
    ? Symbol(( true) ? '[vue-router]: ' + name : 0)
    : (( true) ? '[vue-router]: ' : 0) + name;
// rvlm = Router View Location Matched
/**
 * RouteRecord being rendered by the closest ancestor Router View. Used for
 * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
 * Location Matched
 *
 * @internal
 */
const matchedRouteKey = /*#__PURE__*/ PolySymbol(( true) ? 'router view location matched' : 0);
/**
 * Allows overriding the router view depth to control which component in
 * `matched` is rendered. rvd stands for Router View Depth
 *
 * @internal
 */
const viewDepthKey = /*#__PURE__*/ PolySymbol(( true) ? 'router view depth' : 0);
/**
 * Allows overriding the router instance returned by `useRouter` in tests. r
 * stands for router
 *
 * @internal
 */
const routerKey = /*#__PURE__*/ PolySymbol(( true) ? 'router' : 0);
/**
 * Allows overriding the current route returned by `useRoute` in tests. rl
 * stands for route location
 *
 * @internal
 */
const routeLocationKey = /*#__PURE__*/ PolySymbol(( true) ? 'route location' : 0);
/**
 * Allows overriding the current route used by router-view. Internally this is
 * used when the `route` prop is passed.
 *
 * @internal
 */
const routerViewLocationKey = /*#__PURE__*/ PolySymbol(( true) ? 'router view location' : 0);

const isBrowser = typeof window !== 'undefined';

function isESModule(obj) {
    return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module');
}
const assign = Object.assign;
function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
        const value = params[key];
        newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
}
const noop = () => { };

function warn(msg) {
    // avoid using ...args as it breaks in older Edge builds
    const args = Array.from(arguments).slice(1);
    console.warn.apply(console, ['[Vue Router warn]: ' + msg].concat(args));
}

const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');
/**
 * Transforms an URI into a normalized history location
 *
 * @param parseQuery
 * @param location - URI to normalize
 * @param currentLocation - current absolute location. Allows resolving relative
 * paths. Must start with `/`. Defaults to `/`
 * @returns a normalized history location
 */
function parseURL(parseQuery, location, currentLocation = '/') {
    let path, query = {}, searchString = '', hash = '';
    // Could use URL and URLSearchParams but IE 11 doesn't support it
    const searchPos = location.indexOf('?');
    const hashPos = location.indexOf('#', searchPos > -1 ? searchPos : 0);
    if (searchPos > -1) {
        path = location.slice(0, searchPos);
        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
        query = parseQuery(searchString);
    }
    if (hashPos > -1) {
        path = path || location.slice(0, hashPos);
        // keep the # character
        hash = location.slice(hashPos, location.length);
    }
    // no search and no query
    path = resolveRelativePath(path != null ? path : location, currentLocation);
    // empty path means a relative query or hash `?foo=f`, `#thing`
    return {
        fullPath: path + (searchString && '?') + searchString + hash,
        path,
        query,
        hash,
    };
}
/**
 * Stringifies a URL object
 *
 * @param stringifyQuery
 * @param location
 */
function stringifyURL(stringifyQuery, location) {
    const query = location.query ? stringifyQuery(location.query) : '';
    return location.path + (query && '?') + query + (location.hash || '');
}
/**
 * Strips off the base from the beginning of a location.pathname in a non
 * case-sensitive way.
 *
 * @param pathname - location.pathname
 * @param base - base to strip off
 */
function stripBase(pathname, base) {
    // no base or base is not found at the beginning
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
        return pathname;
    return pathname.slice(base.length) || '/';
}
/**
 * Checks if two RouteLocation are equal. This means that both locations are
 * pointing towards the same {@link RouteRecord} and that all `params`, `query`
 * parameters and `hash` are the same
 *
 * @param a - first {@link RouteLocation}
 * @param b - second {@link RouteLocation}
 */
function isSameRouteLocation(stringifyQuery, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return (aLastIndex > -1 &&
        aLastIndex === bLastIndex &&
        isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) &&
        isSameRouteLocationParams(a.params, b.params) &&
        stringifyQuery(a.query) === stringifyQuery(b.query) &&
        a.hash === b.hash);
}
/**
 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
 * considered equal to the `RouteRecord` they are aliasing.
 *
 * @param a - first {@link RouteRecord}
 * @param b - second {@link RouteRecord}
 */
function isSameRouteRecord(a, b) {
    // since the original record has an undefined value for aliasOf
    // but all aliases point to the original record, this will always compare
    // the original record
    return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
        return false;
    for (const key in a) {
        if (!isSameRouteLocationParamsValue(a[key], b[key]))
            return false;
    }
    return true;
}
function isSameRouteLocationParamsValue(a, b) {
    return Array.isArray(a)
        ? isEquivalentArray(a, b)
        : Array.isArray(b)
            ? isEquivalentArray(b, a)
            : a === b;
}
/**
 * Check if two arrays are the same or if an array with one single entry is the
 * same as another primitive value. Used to check query and parameters
 *
 * @param a - array of values
 * @param b - array of values or a single value
 */
function isEquivalentArray(a, b) {
    return Array.isArray(b)
        ? a.length === b.length && a.every((value, i) => value === b[i])
        : a.length === 1 && a[0] === b;
}
/**
 * Resolves a relative path that starts with `.`.
 *
 * @param to - path location we are resolving
 * @param from - currentLocation.path, should start with `/`
 */
function resolveRelativePath(to, from) {
    if (to.startsWith('/'))
        return to;
    if (( true) && !from.startsWith('/')) {
        warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
        return to;
    }
    if (!to)
        return from;
    const fromSegments = from.split('/');
    const toSegments = to.split('/');
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
        segment = toSegments[toPosition];
        // can't go below zero
        if (position === 1 || segment === '.')
            continue;
        if (segment === '..')
            position--;
        // found something that is not relative path
        else
            break;
    }
    return (fromSegments.slice(0, position).join('/') +
        '/' +
        toSegments
            .slice(toPosition - (toPosition === toSegments.length ? 1 : 0))
            .join('/'));
}

var NavigationType;
(function (NavigationType) {
    NavigationType["pop"] = "pop";
    NavigationType["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function (NavigationDirection) {
    NavigationDirection["back"] = "back";
    NavigationDirection["forward"] = "forward";
    NavigationDirection["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
/**
 * Starting location for Histories
 */
const START = '';
// Generic utils
/**
 * Normalizes a base by removing any trailing slash and reading the base tag if
 * present.
 *
 * @param base - base to normalize
 */
function normalizeBase(base) {
    if (!base) {
        if (isBrowser) {
            // respect <base> tag
            const baseEl = document.querySelector('base');
            base = (baseEl && baseEl.getAttribute('href')) || '/';
            // strip full URL origin
            base = base.replace(/^\w+:\/\/[^\/]+/, '');
        }
        else {
            base = '/';
        }
    }
    // ensure leading slash when it was removed by the regex above avoid leading
    // slash with hash because the file could be read from the disk like file://
    // and the leading slash would cause problems
    if (base[0] !== '/' && base[0] !== '#')
        base = '/' + base;
    // remove the trailing slash so all other method can just do `base + fullPath`
    // to build an href
    return removeTrailingSlash(base);
}
// remove any character before the hash
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
    return base.replace(BEFORE_HASH_RE, '#') + location;
}

function getElementPosition(el, offset) {
    const docRect = document.documentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
        behavior: offset.behavior,
        left: elRect.left - docRect.left - (offset.left || 0),
        top: elRect.top - docRect.top - (offset.top || 0),
    };
}
const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset,
});
function scrollToPosition(position) {
    let scrollToOptions;
    if ('el' in position) {
        const positionEl = position.el;
        const isIdSelector = typeof positionEl === 'string' && positionEl.startsWith('#');
        /**
         * `id`s can accept pretty much any characters, including CSS combinators
         * like `>` or `~`. It's still possible to retrieve elements using
         * `document.getElementById('~')` but it needs to be escaped when using
         * `document.querySelector('#\\~')` for it to be valid. The only
         * requirements for `id`s are them to be unique on the page and to not be
         * empty (`id=""`). Because of that, when passing an id selector, it should
         * be properly escaped for it to work with `querySelector`. We could check
         * for the id selector to be simple (no CSS combinators `+ >~`) but that
         * would make things inconsistent since they are valid characters for an
         * `id` but would need to be escaped when using `querySelector`, breaking
         * their usage and ending up in no selector returned. Selectors need to be
         * escaped:
         *
         * - `#1-thing` becomes `#\31 -thing`
         * - `#with~symbols` becomes `#with\\~symbols`
         *
         * - More information about  the topic can be found at
         *   https://mathiasbynens.be/notes/html5-id-class.
         * - Practical example: https://mathiasbynens.be/demo/html5-id
         */
        if (( true) && typeof position.el === 'string') {
            if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
                try {
                    const foundEl = document.querySelector(position.el);
                    if (isIdSelector && foundEl) {
                        warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
                        // return to avoid other warnings
                        return;
                    }
                }
                catch (err) {
                    warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
                    // return to avoid other warnings
                    return;
                }
            }
        }
        const el = typeof positionEl === 'string'
            ? isIdSelector
                ? document.getElementById(positionEl.slice(1))
                : document.querySelector(positionEl)
            : positionEl;
        if (!el) {
            ( true) &&
                warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
            return;
        }
        scrollToOptions = getElementPosition(el, position);
    }
    else {
        scrollToOptions = position;
    }
    if ('scrollBehavior' in document.documentElement.style)
        window.scrollTo(scrollToOptions);
    else {
        window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
    }
}
function getScrollKey(path, delta) {
    const position = history.state ? history.state.position - delta : -1;
    return position + path;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
    const scroll = scrollPositions.get(key);
    // consume it so it's not used again
    scrollPositions.delete(key);
    return scroll;
}
// TODO: RFC about how to save scroll position
/**
 * ScrollBehavior instance used by the router to compute and restore the scroll
 * position when navigating.
 */
// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
//   // returns a scroll position that can be saved in history
//   compute(): ScrollPositionEntry
//   // can take an extended ScrollPositionEntry
//   scroll(position: ScrollPosition): void
// }
// export const scrollHandler: ScrollHandler<ScrollPosition> = {
//   compute: computeScroll,
//   scroll: scrollToPosition,
// }

let createBaseLocation = () => location.protocol + '//' + location.host;
/**
 * Creates a normalized history location from a window.location object
 * @param location -
 */
function createCurrentLocation(base, location) {
    const { pathname, search, hash } = location;
    // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
    const hashPos = base.indexOf('#');
    if (hashPos > -1) {
        let slicePos = hash.includes(base.slice(hashPos))
            ? base.slice(hashPos).length
            : 1;
        let pathFromHash = hash.slice(slicePos);
        // prepend the starting slash to hash so the url starts with /#
        if (pathFromHash[0] !== '/')
            pathFromHash = '/' + pathFromHash;
        return stripBase(pathFromHash, '');
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    // TODO: should it be a stack? a Dict. Check if the popstate listener
    // can trigger twice
    let pauseState = null;
    const popStateHandler = ({ state, }) => {
        const to = createCurrentLocation(base, location);
        const from = currentLocation.value;
        const fromState = historyState.value;
        let delta = 0;
        if (state) {
            currentLocation.value = to;
            historyState.value = state;
            // ignore the popstate and reset the pauseState
            if (pauseState && pauseState === from) {
                pauseState = null;
                return;
            }
            delta = fromState ? state.position - fromState.position : 0;
        }
        else {
            replace(to);
        }
        // console.log({ deltaFromCurrent })
        // Here we could also revert the navigation by calling history.go(-delta)
        // this listener will have to be adapted to not trigger again and to wait for the url
        // to be updated before triggering the listeners. Some kind of validation function would also
        // need to be passed to the listeners so the navigation can be accepted
        // call all listeners
        listeners.forEach(listener => {
            listener(currentLocation.value, from, {
                delta,
                type: NavigationType.pop,
                direction: delta
                    ? delta > 0
                        ? NavigationDirection.forward
                        : NavigationDirection.back
                    : NavigationDirection.unknown,
            });
        });
    };
    function pauseListeners() {
        pauseState = currentLocation.value;
    }
    function listen(callback) {
        // setup the listener and prepare teardown callbacks
        listeners.push(callback);
        const teardown = () => {
            const index = listeners.indexOf(callback);
            if (index > -1)
                listeners.splice(index, 1);
        };
        teardowns.push(teardown);
        return teardown;
    }
    function beforeUnloadListener() {
        const { history } = window;
        if (!history.state)
            return;
        history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), '');
    }
    function destroy() {
        for (const teardown of teardowns)
            teardown();
        teardowns = [];
        window.removeEventListener('popstate', popStateHandler);
        window.removeEventListener('beforeunload', beforeUnloadListener);
    }
    // setup the listeners and prepare teardown callbacks
    window.addEventListener('popstate', popStateHandler);
    window.addEventListener('beforeunload', beforeUnloadListener);
    return {
        pauseListeners,
        listen,
        destroy,
    };
}
/**
 * Creates a state object
 */
function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
        back,
        current,
        forward,
        replaced,
        position: window.history.length,
        scroll: computeScroll ? computeScrollPosition() : null,
    };
}
function useHistoryStateNavigation(base) {
    const { history, location } = window;
    // private variables
    const currentLocation = {
        value: createCurrentLocation(base, location),
    };
    const historyState = { value: history.state };
    // build current history entry as this is a fresh navigation
    if (!historyState.value) {
        changeLocation(currentLocation.value, {
            back: null,
            current: currentLocation.value,
            forward: null,
            // the length is off by one, we need to decrease it
            position: history.length - 1,
            replaced: true,
            // don't add a scroll as the user may have an anchor and we want
            // scrollBehavior to be triggered without a saved position
            scroll: null,
        }, true);
    }
    function changeLocation(to, state, replace) {
        /**
         * if a base tag is provided and we are on a normal domain, we have to
         * respect the provided `base` attribute because pushState() will use it and
         * potentially erase anything before the `#` like at
         * https://github.com/vuejs/vue-router-next/issues/685 where a base of
         * `/folder/#` but a base of `/` would erase the `/folder/` section. If
         * there is no host, the `<base>` tag makes no sense and if there isn't a
         * base tag we can just use everything after the `#`.
         */
        const hashIndex = base.indexOf('#');
        const url = hashIndex > -1
            ? (location.host && document.querySelector('base')
                ? base
                : base.slice(hashIndex)) + to
            : createBaseLocation() + base + to;
        try {
            // BROWSER QUIRK
            // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
            history[replace ? 'replaceState' : 'pushState'](state, '', url);
            historyState.value = state;
        }
        catch (err) {
            if ((true)) {
                warn('Error with push/replace State', err);
            }
            else {}
            // Force the navigation, this also resets the call count
            location[replace ? 'replace' : 'assign'](url);
        }
    }
    function replace(to, data) {
        const state = assign({}, history.state, buildState(historyState.value.back, 
        // keep back and forward entries but override current position
        to, historyState.value.forward, true), data, { position: historyState.value.position });
        changeLocation(to, state, true);
        currentLocation.value = to;
    }
    function push(to, data) {
        // Add to current entry the information of where we are going
        // as well as saving the current position
        const currentState = assign({}, 
        // use current history state to gracefully handle a wrong call to
        // history.replaceState
        // https://github.com/vuejs/vue-router-next/issues/366
        historyState.value, history.state, {
            forward: to,
            scroll: computeScrollPosition(),
        });
        if (( true) && !history.state) {
            warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\n` +
                `history.replaceState(history.state, '', url)\n\n` +
                `You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`);
        }
        changeLocation(currentState.current, currentState, true);
        const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
        changeLocation(to, state, false);
        currentLocation.value = to;
    }
    return {
        location: currentLocation,
        state: historyState,
        push,
        replace,
    };
}
/**
 * Creates an HTML5 history. Most common history for single page applications.
 *
 * @param base -
 */
function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
        if (!triggerListeners)
            historyListeners.pauseListeners();
        history.go(delta);
    }
    const routerHistory = assign({
        // it's overridden right after
        location: '',
        base,
        go,
        createHref: createHref.bind(null, base),
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, 'location', {
        enumerable: true,
        get: () => historyNavigation.location.value,
    });
    Object.defineProperty(routerHistory, 'state', {
        enumerable: true,
        get: () => historyNavigation.state.value,
    });
    return routerHistory;
}

/**
 * Creates a in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
 *
 * @param base - Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */
function createMemoryHistory(base = '') {
    let listeners = [];
    let queue = [START];
    let position = 0;
    base = normalizeBase(base);
    function setLocation(location) {
        position++;
        if (position === queue.length) {
            // we are at the end, we can simply append a new entry
            queue.push(location);
        }
        else {
            // we are in the middle, we remove everything from here in the queue
            queue.splice(position);
            queue.push(location);
        }
    }
    function triggerListeners(to, from, { direction, delta }) {
        const info = {
            direction,
            delta,
            type: NavigationType.pop,
        };
        for (const callback of listeners) {
            callback(to, from, info);
        }
    }
    const routerHistory = {
        // rewritten by Object.defineProperty
        location: START,
        // TODO: should be kept in queue
        state: {},
        base,
        createHref: createHref.bind(null, base),
        replace(to) {
            // remove current entry and decrement position
            queue.splice(position--, 1);
            setLocation(to);
        },
        push(to, data) {
            setLocation(to);
        },
        listen(callback) {
            listeners.push(callback);
            return () => {
                const index = listeners.indexOf(callback);
                if (index > -1)
                    listeners.splice(index, 1);
            };
        },
        destroy() {
            listeners = [];
            queue = [START];
            position = 0;
        },
        go(delta, shouldTrigger = true) {
            const from = this.location;
            const direction = 
            // we are considering delta === 0 going forward, but in abstract mode
            // using 0 for the delta doesn't make sense like it does in html5 where
            // it reloads the page
            delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
            position = Math.max(0, Math.min(position + delta, queue.length - 1));
            if (shouldTrigger) {
                triggerListeners(this.location, from, {
                    direction,
                    delta,
                });
            }
        },
    };
    Object.defineProperty(routerHistory, 'location', {
        enumerable: true,
        get: () => queue[position],
    });
    return routerHistory;
}

/**
 * Creates a hash history. Useful for web applications with no host (e.g.
 * `file://`) or when configuring a server to handle any URL is not possible.
 *
 * @param base - optional base to provide. Defaults to `location.pathname +
 * location.search` If there is a `<base>` tag in the `head`, its value will be
 * ignored in favor of this parameter **but note it affects all the
 * history.pushState() calls**, meaning that if you use a `<base>` tag, it's
 * `href` value **has to match this parameter** (ignoring anything after the
 * `#`).
 *
 * @example
 * ```js
 * // at https://example.com/folder
 * createWebHashHistory() // gives a url of `https://example.com/folder#`
 * createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
 * // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
 * createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
 * // you should avoid doing this because it changes the original url and breaks copying urls
 * createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
 *
 * // at file:///usr/etc/folder/index.html
 * // for locations with no `host`, the base is ignored
 * createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
 * ```
 */
function createWebHashHistory(base) {
    // Make sure this implementation is fine in terms of encoding, specially for IE11
    // for `file://`, directly use the pathname and ignore the base
    // location.pathname contains an initial `/` even at the root: `https://example.com`
    base = location.host ? base || location.pathname + location.search : '';
    // allow the user to provide a `#` in the middle: `/base/#/app`
    if (!base.includes('#'))
        base += '#';
    if (( true) && !base.endsWith('#/') && !base.endsWith('#')) {
        warn(`A hash base must end with a "#":\n"${base}" should be "${base.replace(/#.*$/, '#')}".`);
    }
    return createWebHistory(base);
}

function isRouteLocation(route) {
    return typeof route === 'string' || (route && typeof route === 'object');
}
function isRouteName(name) {
    return typeof name === 'string' || typeof name === 'symbol';
}

/**
 * Initial route location where the router is. Can be used in navigation guards
 * to differentiate the initial navigation.
 *
 * @example
 * ```js
 * import { START_LOCATION } from 'vue-router'
 *
 * router.beforeEach((to, from) => {
 *   if (from === START_LOCATION) {
 *     // initial navigation
 *   }
 * })
 * ```
 */
const START_LOCATION_NORMALIZED = {
    path: '/',
    name: undefined,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: undefined,
};

const NavigationFailureSymbol = /*#__PURE__*/ PolySymbol(( true) ? 'navigation failure' : 0);
/**
 * Enumeration with all possible types for navigation failures. Can be passed to
 * {@link isNavigationFailure} to check for specific failures.
 */
var NavigationFailureType;
(function (NavigationFailureType) {
    /**
     * An aborted navigation is a navigation that failed because a navigation
     * guard returned `false` or called `next(false)`
     */
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    /**
     * A cancelled navigation is a navigation that failed because a more recent
     * navigation finished started (not necessarily finished).
     */
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    /**
     * A duplicated navigation is a navigation that failed because it was
     * initiated while already being at the exact same location.
     */
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
// DEV only debug messages
const ErrorTypeMessages = {
    [1 /* MATCHER_NOT_FOUND */]({ location, currentLocation }) {
        return `No match for\n ${JSON.stringify(location)}${currentLocation
            ? '\nwhile being at\n' + JSON.stringify(currentLocation)
            : ''}`;
    },
    [2 /* NAVIGATION_GUARD_REDIRECT */]({ from, to, }) {
        return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
    },
    [4 /* NAVIGATION_ABORTED */]({ from, to }) {
        return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
    },
    [8 /* NAVIGATION_CANCELLED */]({ from, to }) {
        return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
    },
    [16 /* NAVIGATION_DUPLICATED */]({ from, to }) {
        return `Avoided redundant navigation to current location: "${from.fullPath}".`;
    },
};
function createRouterError(type, params) {
    // keep full error messages in cjs versions
    if (true) {
        return assign(new Error(ErrorTypeMessages[type](params)), {
            type,
            [NavigationFailureSymbol]: true,
        }, params);
    }
    else {}
}
function isNavigationFailure(error, type) {
    return (error instanceof Error &&
        NavigationFailureSymbol in error &&
        (type == null || !!(error.type & type)));
}
const propertiesToLog = ['params', 'query', 'hash'];
function stringifyRoute(to) {
    if (typeof to === 'string')
        return to;
    if ('path' in to)
        return to.path;
    const location = {};
    for (const key of propertiesToLog) {
        if (key in to)
            location[key] = to[key];
    }
    return JSON.stringify(location, null, 2);
}

// default pattern for a param: non greedy everything but /
const BASE_PARAM_PATTERN = '[^/]+?';
const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true,
};
// Special Regex characters that must be escaped in static tokens
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments - array of segments returned by tokenizePath
 * @param extraOptions - optional options for the regexp
 * @returns a PathParser
 */
function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    // the amount of scores is the same as the length of segments except for the root segment "/"
    const score = [];
    // the regexp as a string
    let pattern = options.start ? '^' : '';
    // extracted keys
    const keys = [];
    for (const segment of segments) {
        // the root segment needs special treatment
        const segmentScores = segment.length ? [] : [90 /* Root */];
        // allow trailing slash
        if (options.strict && !segment.length)
            pattern += '/';
        for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
            const token = segment[tokenIndex];
            // resets the score if we are inside a sub segment /:a-other-:b
            let subSegmentScore = 40 /* Segment */ +
                (options.sensitive ? 0.25 /* BonusCaseSensitive */ : 0);
            if (token.type === 0 /* Static */) {
                // prepend the slash if we are starting a new segment
                if (!tokenIndex)
                    pattern += '/';
                pattern += token.value.replace(REGEX_CHARS_RE, '\\$&');
                subSegmentScore += 40 /* Static */;
            }
            else if (token.type === 1 /* Param */) {
                const { value, repeatable, optional, regexp } = token;
                keys.push({
                    name: value,
                    repeatable,
                    optional,
                });
                const re = regexp ? regexp : BASE_PARAM_PATTERN;
                // the user provided a custom regexp /:id(\\d+)
                if (re !== BASE_PARAM_PATTERN) {
                    subSegmentScore += 10 /* BonusCustomRegExp */;
                    // make sure the regexp is valid before using it
                    try {
                        new RegExp(`(${re})`);
                    }
                    catch (err) {
                        throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` +
                            err.message);
                    }
                }
                // when we repeat we must take care of the repeating leading slash
                let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
                // prepend the slash if we are starting a new segment
                if (!tokenIndex)
                    subPattern =
                        // avoid an optional / if there are more segments e.g. /:p?-static
                        // or /:p?-:p2
                        optional && segment.length < 2
                            ? `(?:/${subPattern})`
                            : '/' + subPattern;
                if (optional)
                    subPattern += '?';
                pattern += subPattern;
                subSegmentScore += 20 /* Dynamic */;
                if (optional)
                    subSegmentScore += -8 /* BonusOptional */;
                if (repeatable)
                    subSegmentScore += -20 /* BonusRepeatable */;
                if (re === '.*')
                    subSegmentScore += -50 /* BonusWildcard */;
            }
            segmentScores.push(subSegmentScore);
        }
        // an empty array like /home/ -> [[{home}], []]
        // if (!segment.length) pattern += '/'
        score.push(segmentScores);
    }
    // only apply the strict bonus to the last score
    if (options.strict && options.end) {
        const i = score.length - 1;
        score[i][score[i].length - 1] += 0.7000000000000001 /* BonusStrict */;
    }
    // TODO: dev only warn double trailing slash
    if (!options.strict)
        pattern += '/?';
    if (options.end)
        pattern += '$';
    // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
    else if (options.strict)
        pattern += '(?:/|$)';
    const re = new RegExp(pattern, options.sensitive ? '' : 'i');
    function parse(path) {
        const match = path.match(re);
        const params = {};
        if (!match)
            return null;
        for (let i = 1; i < match.length; i++) {
            const value = match[i] || '';
            const key = keys[i - 1];
            params[key.name] = value && key.repeatable ? value.split('/') : value;
        }
        return params;
    }
    function stringify(params) {
        let path = '';
        // for optional parameters to allow to be empty
        let avoidDuplicatedSlash = false;
        for (const segment of segments) {
            if (!avoidDuplicatedSlash || !path.endsWith('/'))
                path += '/';
            avoidDuplicatedSlash = false;
            for (const token of segment) {
                if (token.type === 0 /* Static */) {
                    path += token.value;
                }
                else if (token.type === 1 /* Param */) {
                    const { value, repeatable, optional } = token;
                    const param = value in params ? params[value] : '';
                    if (Array.isArray(param) && !repeatable)
                        throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
                    const text = Array.isArray(param) ? param.join('/') : param;
                    if (!text) {
                        if (optional) {
                            // if we have more than one optional param like /:a?-static we
                            // don't need to care about the optional param
                            if (segment.length < 2) {
                                // remove the last slash as we could be at the end
                                if (path.endsWith('/'))
                                    path = path.slice(0, -1);
                                // do not append a slash on the next iteration
                                else
                                    avoidDuplicatedSlash = true;
                            }
                        }
                        else
                            throw new Error(`Missing required param "${value}"`);
                    }
                    path += text;
                }
            }
        }
        return path;
    }
    return {
        re,
        score,
        keys,
        parse,
        stringify,
    };
}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to `sort` an array
 *
 * @param a - first array of numbers
 * @param b - second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */
function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
        const diff = b[i] - a[i];
        // only keep going if diff === 0
        if (diff)
            return diff;
        i++;
    }
    // if the last subsegment was Static, the shorter segments should be sorted first
    // otherwise sort the longest segment first
    if (a.length < b.length) {
        return a.length === 1 && a[0] === 40 /* Static */ + 40 /* Segment */
            ? -1
            : 1;
    }
    else if (a.length > b.length) {
        return b.length === 1 && b[0] === 40 /* Static */ + 40 /* Segment */
            ? 1
            : -1;
    }
    return 0;
}
/**
 * Compare function that can be used with `sort` to sort an array of PathParser
 *
 * @param a - first PathParser
 * @param b - second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */
function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
        const comp = compareScoreArray(aScore[i], bScore[i]);
        // do not return if both are equal
        if (comp)
            return comp;
        i++;
    }
    // if a and b share the same score entries but b has more, sort b first
    return bScore.length - aScore.length;
    // this is the ternary version
    // return aScore.length < bScore.length
    //   ? 1
    //   : aScore.length > bScore.length
    //   ? -1
    //   : 0
}

const ROOT_TOKEN = {
    type: 0 /* Static */,
    value: '',
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
// After some profiling, the cache seems to be unnecessary because tokenizePath
// (the slowest part of adding a route) is very fast
// const tokenCache = new Map<string, Token[][]>()
function tokenizePath(path) {
    if (!path)
        return [[]];
    if (path === '/')
        return [[ROOT_TOKEN]];
    if (!path.startsWith('/')) {
        throw new Error(( true)
            ? `Route paths should start with a "/": "${path}" should be "/${path}".`
            : 0);
    }
    // if (tokenCache.has(path)) return tokenCache.get(path)!
    function crash(message) {
        throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0 /* Static */;
    let previousState = state;
    const tokens = [];
    // the segment will always be valid because we get into the initial state
    // with the leading /
    let segment;
    function finalizeSegment() {
        if (segment)
            tokens.push(segment);
        segment = [];
    }
    // index on the path
    let i = 0;
    // char at index
    let char;
    // buffer of the value read
    let buffer = '';
    // custom regexp for a param
    let customRe = '';
    function consumeBuffer() {
        if (!buffer)
            return;
        if (state === 0 /* Static */) {
            segment.push({
                type: 0 /* Static */,
                value: buffer,
            });
        }
        else if (state === 1 /* Param */ ||
            state === 2 /* ParamRegExp */ ||
            state === 3 /* ParamRegExpEnd */) {
            if (segment.length > 1 && (char === '*' || char === '+'))
                crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
            segment.push({
                type: 1 /* Param */,
                value: buffer,
                regexp: customRe,
                repeatable: char === '*' || char === '+',
                optional: char === '*' || char === '?',
            });
        }
        else {
            crash('Invalid state to consume buffer');
        }
        buffer = '';
    }
    function addCharToBuffer() {
        buffer += char;
    }
    while (i < path.length) {
        char = path[i++];
        if (char === '\\' && state !== 2 /* ParamRegExp */) {
            previousState = state;
            state = 4 /* EscapeNext */;
            continue;
        }
        switch (state) {
            case 0 /* Static */:
                if (char === '/') {
                    if (buffer) {
                        consumeBuffer();
                    }
                    finalizeSegment();
                }
                else if (char === ':') {
                    consumeBuffer();
                    state = 1 /* Param */;
                }
                else {
                    addCharToBuffer();
                }
                break;
            case 4 /* EscapeNext */:
                addCharToBuffer();
                state = previousState;
                break;
            case 1 /* Param */:
                if (char === '(') {
                    state = 2 /* ParamRegExp */;
                }
                else if (VALID_PARAM_RE.test(char)) {
                    addCharToBuffer();
                }
                else {
                    consumeBuffer();
                    state = 0 /* Static */;
                    // go back one character if we were not modifying
                    if (char !== '*' && char !== '?' && char !== '+')
                        i--;
                }
                break;
            case 2 /* ParamRegExp */:
                // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
                // it already works by escaping the closing )
                // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
                // is this really something people need since you can also write
                // /prefix_:p()_suffix
                if (char === ')') {
                    // handle the escaped )
                    if (customRe[customRe.length - 1] == '\\')
                        customRe = customRe.slice(0, -1) + char;
                    else
                        state = 3 /* ParamRegExpEnd */;
                }
                else {
                    customRe += char;
                }
                break;
            case 3 /* ParamRegExpEnd */:
                // same as finalizing a param
                consumeBuffer();
                state = 0 /* Static */;
                // go back one character if we were not modifying
                if (char !== '*' && char !== '?' && char !== '+')
                    i--;
                customRe = '';
                break;
            default:
                crash('Unknown state');
                break;
        }
    }
    if (state === 2 /* ParamRegExp */)
        crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    // tokenCache.set(path, tokens)
    return tokens;
}

function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    // warn against params with the same name
    if ((true)) {
        const existingKeys = new Set();
        for (const key of parser.keys) {
            if (existingKeys.has(key.name))
                warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
            existingKeys.add(key.name);
        }
    }
    const matcher = assign(parser, {
        record,
        parent,
        // these needs to be populated by the parent
        children: [],
        alias: [],
    });
    if (parent) {
        // both are aliases or both are not aliases
        // we don't want to mix them because the order is used when
        // passing originalRecord in Matcher.addRoute
        if (!matcher.record.aliasOf === !parent.record.aliasOf)
            parent.children.push(matcher);
    }
    return matcher;
}

/**
 * Creates a Router Matcher.
 *
 * @internal
 * @param routes - array of initial routes
 * @param globalOptions - global route options
 */
function createRouterMatcher(routes, globalOptions) {
    // normalized ordered array of matchers
    const matchers = [];
    const matcherMap = new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
        return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
        // used later on to remove by name
        const isRootAdd = !originalRecord;
        const mainNormalizedRecord = normalizeRouteRecord(record);
        // we might be the child of an alias
        mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
        const options = mergeOptions(globalOptions, record);
        // generate an array of records to correctly handle aliases
        const normalizedRecords = [
            mainNormalizedRecord,
        ];
        if ('alias' in record) {
            const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
            for (const alias of aliases) {
                normalizedRecords.push(assign({}, mainNormalizedRecord, {
                    // this allows us to hold a copy of the `components` option
                    // so that async components cache is hold on the original record
                    components: originalRecord
                        ? originalRecord.record.components
                        : mainNormalizedRecord.components,
                    path: alias,
                    // we might be the child of an alias
                    aliasOf: originalRecord
                        ? originalRecord.record
                        : mainNormalizedRecord,
                    // the aliases are always of the same kind as the original since they
                    // are defined on the same record
                }));
            }
        }
        let matcher;
        let originalMatcher;
        for (const normalizedRecord of normalizedRecords) {
            const { path } = normalizedRecord;
            // Build up the path for nested routes if the child isn't an absolute
            // route. Only add the / delimiter if the child path isn't empty and if the
            // parent path doesn't have a trailing slash
            if (parent && path[0] !== '/') {
                const parentPath = parent.record.path;
                const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
                normalizedRecord.path =
                    parent.record.path + (path && connectingSlash + path);
            }
            if (( true) && normalizedRecord.path === '*') {
                throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\n' +
                    'See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
            }
            // create the object before hand so it can be passed to children
            matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
            if (( true) && parent && path[0] === '/')
                checkMissingParamsInAbsolutePath(matcher, parent);
            // if we are an alias we must tell the original record that we exist
            // so we can be removed
            if (originalRecord) {
                originalRecord.alias.push(matcher);
                if ((true)) {
                    checkSameParams(originalRecord, matcher);
                }
            }
            else {
                // otherwise, the first record is the original and others are aliases
                originalMatcher = originalMatcher || matcher;
                if (originalMatcher !== matcher)
                    originalMatcher.alias.push(matcher);
                // remove the route if named and only for the top record (avoid in nested calls)
                // this works because the original record is the first one
                if (isRootAdd && record.name && !isAliasRecord(matcher))
                    removeRoute(record.name);
            }
            if ('children' in mainNormalizedRecord) {
                const children = mainNormalizedRecord.children;
                for (let i = 0; i < children.length; i++) {
                    addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
                }
            }
            // if there was no original record, then the first one was not an alias and all
            // other alias (if any) need to reference this record when adding children
            originalRecord = originalRecord || matcher;
            // TODO: add normalized records for more flexibility
            // if (parent && isAliasRecord(originalRecord)) {
            //   parent.children.push(originalRecord)
            // }
            insertMatcher(matcher);
        }
        return originalMatcher
            ? () => {
                // since other matchers are aliases, they should be removed by the original matcher
                removeRoute(originalMatcher);
            }
            : noop;
    }
    function removeRoute(matcherRef) {
        if (isRouteName(matcherRef)) {
            const matcher = matcherMap.get(matcherRef);
            if (matcher) {
                matcherMap.delete(matcherRef);
                matchers.splice(matchers.indexOf(matcher), 1);
                matcher.children.forEach(removeRoute);
                matcher.alias.forEach(removeRoute);
            }
        }
        else {
            const index = matchers.indexOf(matcherRef);
            if (index > -1) {
                matchers.splice(index, 1);
                if (matcherRef.record.name)
                    matcherMap.delete(matcherRef.record.name);
                matcherRef.children.forEach(removeRoute);
                matcherRef.alias.forEach(removeRoute);
            }
        }
    }
    function getRoutes() {
        return matchers;
    }
    function insertMatcher(matcher) {
        let i = 0;
        // console.log('i is', { i })
        while (i < matchers.length &&
            comparePathParserScore(matcher, matchers[i]) >= 0)
            i++;
        // console.log('END i is', { i })
        // while (i < matchers.length && matcher.score <= matchers[i].score) i++
        matchers.splice(i, 0, matcher);
        // only add the original record to the name map
        if (matcher.record.name && !isAliasRecord(matcher))
            matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location, currentLocation) {
        let matcher;
        let params = {};
        let path;
        let name;
        if ('name' in location && location.name) {
            matcher = matcherMap.get(location.name);
            if (!matcher)
                throw createRouterError(1 /* MATCHER_NOT_FOUND */, {
                    location,
                });
            name = matcher.record.name;
            params = assign(
            // paramsFromLocation is a new object
            paramsFromLocation(currentLocation.params, 
            // only keep params that exist in the resolved location
            // TODO: only keep optional params coming from a parent record
            matcher.keys.filter(k => !k.optional).map(k => k.name)), location.params);
            // throws if cannot be stringified
            path = matcher.stringify(params);
        }
        else if ('path' in location) {
            // no need to resolve the path with the matcher as it was provided
            // this also allows the user to control the encoding
            path = location.path;
            if (( true) && !path.startsWith('/')) {
                warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-router-next.`);
            }
            matcher = matchers.find(m => m.re.test(path));
            // matcher should have a value after the loop
            if (matcher) {
                // TODO: dev warning of unused params if provided
                // we know the matcher works because we tested the regexp
                params = matcher.parse(path);
                name = matcher.record.name;
            }
            // location is a relative path
        }
        else {
            // match by name or path of current route
            matcher = currentLocation.name
                ? matcherMap.get(currentLocation.name)
                : matchers.find(m => m.re.test(currentLocation.path));
            if (!matcher)
                throw createRouterError(1 /* MATCHER_NOT_FOUND */, {
                    location,
                    currentLocation,
                });
            name = matcher.record.name;
            // since we are navigating to the same location, we don't need to pick the
            // params like when `name` is provided
            params = assign({}, currentLocation.params, location.params);
            path = matcher.stringify(params);
        }
        const matched = [];
        let parentMatcher = matcher;
        while (parentMatcher) {
            // reversed order so parents are at the beginning
            matched.unshift(parentMatcher.record);
            parentMatcher = parentMatcher.parent;
        }
        return {
            name,
            path,
            params,
            matched,
            meta: mergeMetaFields(matched),
        };
    }
    // add initial routes
    routes.forEach(route => addRoute(route));
    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
        if (key in params)
            newParams[key] = params[key];
    }
    return newParams;
}
/**
 * Normalizes a RouteRecordRaw. Creates a copy
 *
 * @param record
 * @returns the normalized version
 */
function normalizeRouteRecord(record) {
    return {
        path: record.path,
        redirect: record.redirect,
        name: record.name,
        meta: record.meta || {},
        aliasOf: undefined,
        beforeEnter: record.beforeEnter,
        props: normalizeRecordProps(record),
        children: record.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components: 'components' in record
            ? record.components || {}
            : { default: record.component },
    };
}
/**
 * Normalize the optional `props` in a record to always be an object similar to
 * components. Also accept a boolean for components.
 * @param record
 */
function normalizeRecordProps(record) {
    const propsObject = {};
    // props does not exist on redirect records but we can set false directly
    const props = record.props || false;
    if ('component' in record) {
        propsObject.default = props;
    }
    else {
        // NOTE: we could also allow a function to be applied to every component.
        // Would need user feedback for use cases
        for (const name in record.components)
            propsObject[name] = typeof props === 'boolean' ? props : props[name];
    }
    return propsObject;
}
/**
 * Checks if a record or any of its parent is an alias
 * @param record
 */
function isAliasRecord(record) {
    while (record) {
        if (record.record.aliasOf)
            return true;
        record = record.parent;
    }
    return false;
}
/**
 * Merge meta fields of an array of records
 *
 * @param matched - array of matched records
 */
function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
        options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
}
function isSameParam(a, b) {
    return (a.name === b.name &&
        a.optional === b.optional &&
        a.repeatable === b.repeatable);
}
/**
 * Check if a path and its alias have the same required params
 *
 * @param a - original record
 * @param b - alias record
 */
function checkSameParams(a, b) {
    for (const key of a.keys) {
        if (!key.optional && !b.keys.find(isSameParam.bind(null, key)))
            return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" should have the exact same param named "${key.name}"`);
    }
    for (const key of b.keys) {
        if (!key.optional && !a.keys.find(isSameParam.bind(null, key)))
            return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" should have the exact same param named "${key.name}"`);
    }
}
function checkMissingParamsInAbsolutePath(record, parent) {
    for (const key of parent.keys) {
        if (!record.keys.find(isSameParam.bind(null, key)))
            return warn(`Absolute path "${record.record.path}" should have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
    }
}

/**
 * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
 * < > `
 *
 * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
 * defines some extra characters to be encoded. Most browsers do not encode them
 * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
 * also encode `!'()*`. Leaving unencoded only ASCII alphanumeric(`a-zA-Z0-9`)
 * plus `-._~`. This extra safety should be applied to query by patching the
 * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
 * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
 * into a `/` if directly typed in. The _backtick_ (`````) should also be
 * encoded everywhere because some browsers like FF encode it when directly
 * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
 */
// const EXTRA_RESERVED_RE = /[!'()*]/g
// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
const HASH_RE = /#/g; // %23
const AMPERSAND_RE = /&/g; // %26
const SLASH_RE = /\//g; // %2F
const EQUAL_RE = /=/g; // %3D
const IM_RE = /\?/g; // %3F
const PLUS_RE = /\+/g; // %2B
/**
 * NOTE: It's not clear to me if we should encode the + symbol in queries, it
 * seems to be less flexible than not doing so and I can't find out the legacy
 * systems requiring this for regular requests like text/html. In the standard,
 * the encoding of the plus character is only mentioned for
 * application/x-www-form-urlencoded
 * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
 * leave the plus character as is in queries. To be more flexible, we allow the
 * plus character on the query but it can also be manually encoded by the user.
 *
 * Resources:
 * - https://url.spec.whatwg.org/#urlencoded-parsing
 * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
 */
const ENC_BRACKET_OPEN_RE = /%5B/g; // [
const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
const ENC_CARET_RE = /%5E/g; // ^
const ENC_BACKTICK_RE = /%60/g; // `
const ENC_CURLY_OPEN_RE = /%7B/g; // {
const ENC_PIPE_RE = /%7C/g; // |
const ENC_CURLY_CLOSE_RE = /%7D/g; // }
const ENC_SPACE_RE = /%20/g; // }
/**
 * Encode characters that need to be encoded on the path, search and hash
 * sections of the URL.
 *
 * @internal
 * @param text - string to encode
 * @returns encoded string
 */
function commonEncode(text) {
    return encodeURI('' + text)
        .replace(ENC_PIPE_RE, '|')
        .replace(ENC_BRACKET_OPEN_RE, '[')
        .replace(ENC_BRACKET_CLOSE_RE, ']');
}
/**
 * Encode characters that need to be encoded on the hash section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeHash(text) {
    return commonEncode(text)
        .replace(ENC_CURLY_OPEN_RE, '{')
        .replace(ENC_CURLY_CLOSE_RE, '}')
        .replace(ENC_CARET_RE, '^');
}
/**
 * Encode characters that need to be encoded query values on the query
 * section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeQueryValue(text) {
    return (commonEncode(text)
        // Encode the space as +, encode the + to differentiate it from the space
        .replace(PLUS_RE, '%2B')
        .replace(ENC_SPACE_RE, '+')
        .replace(HASH_RE, '%23')
        .replace(AMPERSAND_RE, '%26')
        .replace(ENC_BACKTICK_RE, '`')
        .replace(ENC_CURLY_OPEN_RE, '{')
        .replace(ENC_CURLY_CLOSE_RE, '}')
        .replace(ENC_CARET_RE, '^'));
}
/**
 * Like `encodeQueryValue` but also encodes the `=` character.
 *
 * @param text - string to encode
 */
function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
}
/**
 * Encode characters that need to be encoded on the path section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
}
/**
 * Encode characters that need to be encoded on the path section of the URL as a
 * param. This function encodes everything {@link encodePath} does plus the
 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
 * string instead.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeParam(text) {
    return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
}
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
function decode(text) {
    try {
        return decodeURIComponent('' + text);
    }
    catch (err) {
        ( true) && warn(`Error decoding "${text}". Using original value`);
    }
    return '' + text;
}

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
    const query = {};
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?')
        return query;
    const hasLeadingIM = search[0] === '?';
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for (let i = 0; i < searchParams.length; ++i) {
        // pre decode the + into space
        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
        // allow the = character
        const eqPos = searchParam.indexOf('=');
        const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
        const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
        if (key in query) {
            // an extra variable for ts types
            let currentValue = query[key];
            if (!Array.isArray(currentValue)) {
                currentValue = query[key] = [currentValue];
            }
            currentValue.push(value);
        }
        else {
            query[key] = value;
        }
    }
    return query;
}
/**
 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */
function stringifyQuery(query) {
    let search = '';
    for (let key in query) {
        const value = query[key];
        key = encodeQueryKey(key);
        if (value == null) {
            // only null adds the value
            if (value !== undefined) {
                search += (search.length ? '&' : '') + key;
            }
            continue;
        }
        // keep null values
        const values = Array.isArray(value)
            ? value.map(v => v && encodeQueryValue(v))
            : [value && encodeQueryValue(value)];
        values.forEach(value => {
            // skip undefined values in arrays as if they were not present
            // smaller code than using filter
            if (value !== undefined) {
                // only append & with non-empty search
                search += (search.length ? '&' : '') + key;
                if (value != null)
                    search += '=' + value;
            }
        });
    }
    return search;
}
/**
 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
 * numbers into strings, removing keys with an undefined value and replacing
 * undefined with null in arrays
 *
 * @param query - query object to normalize
 * @returns a normalized query object
 */
function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
        const value = query[key];
        if (value !== undefined) {
            normalizedQuery[key] = Array.isArray(value)
                ? value.map(v => (v == null ? null : '' + v))
                : value == null
                    ? value
                    : '' + value;
        }
    }
    return normalizedQuery;
}

/**
 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
 */
function useCallbacks() {
    let handlers = [];
    function add(handler) {
        handlers.push(handler);
        return () => {
            const i = handlers.indexOf(handler);
            if (i > -1)
                handlers.splice(i, 1);
        };
    }
    function reset() {
        handlers = [];
    }
    return {
        add,
        list: () => handlers,
        reset,
    };
}

function registerGuard(record, name, guard) {
    const removeFromList = () => {
        record[name].delete(guard);
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(removeFromList);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onDeactivated)(removeFromList);
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onActivated)(() => {
        record[name].add(guard);
    });
    record[name].add(guard);
}
/**
 * Add a navigation guard that triggers whenever the component for the current
 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
 * used in any component. The guard is removed when the component is unmounted.
 *
 * @param leaveGuard - {@link NavigationGuard}
 */
function onBeforeRouteLeave(leaveGuard) {
    if (( true) && !(0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()) {
        warn('getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function');
        return;
    }
    const activeRecord = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(matchedRouteKey, 
    // to avoid warning
    {}).value;
    if (!activeRecord) {
        ( true) &&
            warn('No active route record was found when calling `onBeforeRouteLeave()`. Make sure you call this function inside of a component child of <router-view>. Maybe you called it inside of App.vue?');
        return;
    }
    registerGuard(activeRecord, 'leaveGuards', leaveGuard);
}
/**
 * Add a navigation guard that triggers whenever the current location is about
 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
 * component. The guard is removed when the component is unmounted.
 *
 * @param updateGuard - {@link NavigationGuard}
 */
function onBeforeRouteUpdate(updateGuard) {
    if (( true) && !(0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)()) {
        warn('getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function');
        return;
    }
    const activeRecord = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(matchedRouteKey, 
    // to avoid warning
    {}).value;
    if (!activeRecord) {
        ( true) &&
            warn('No active route record was found when calling `onBeforeRouteUpdate()`. Make sure you call this function inside of a component child of <router-view>. Maybe you called it inside of App.vue?');
        return;
    }
    registerGuard(activeRecord, 'updateGuards', updateGuard);
}
function guardToPromiseFn(guard, to, from, record, name) {
    // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
    const enterCallbackArray = record &&
        // name is defined if record is because of the function overload
        (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
        const next = (valid) => {
            if (valid === false)
                reject(createRouterError(4 /* NAVIGATION_ABORTED */, {
                    from,
                    to,
                }));
            else if (valid instanceof Error) {
                reject(valid);
            }
            else if (isRouteLocation(valid)) {
                reject(createRouterError(2 /* NAVIGATION_GUARD_REDIRECT */, {
                    from: to,
                    to: valid,
                }));
            }
            else {
                if (enterCallbackArray &&
                    // since enterCallbackArray is truthy, both record and name also are
                    record.enterCallbacks[name] === enterCallbackArray &&
                    typeof valid === 'function')
                    enterCallbackArray.push(valid);
                resolve();
            }
        };
        // wrapping with Promise.resolve allows it to work with both async and sync guards
        const guardReturn = guard.call(record && record.instances[name], to, from, ( true) ? canOnlyBeCalledOnce(next, to, from) : 0);
        let guardCall = Promise.resolve(guardReturn);
        if (guard.length < 3)
            guardCall = guardCall.then(next);
        if (( true) && guard.length > 2) {
            const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ''}:\n${guard.toString()}\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
            if (typeof guardReturn === 'object' && 'then' in guardReturn) {
                guardCall = guardCall.then(resolvedValue => {
                    // @ts-expect-error: _called is added at canOnlyBeCalledOnce
                    if (!next._called) {
                        warn(message);
                        return Promise.reject(new Error('Invalid navigation guard'));
                    }
                    return resolvedValue;
                });
                // TODO: test me!
            }
            else if (guardReturn !== undefined) {
                // @ts-expect-error: _called is added at canOnlyBeCalledOnce
                if (!next._called) {
                    warn(message);
                    reject(new Error('Invalid navigation guard'));
                    return;
                }
            }
        }
        guardCall.catch(err => reject(err));
    });
}
function canOnlyBeCalledOnce(next, to, from) {
    let called = 0;
    return function () {
        if (called++ === 1)
            warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
        // @ts-expect-error: we put it in the original one because it's easier to check
        next._called = true;
        if (called === 1)
            next.apply(null, arguments);
    };
}
function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
        for (const name in record.components) {
            let rawComponent = record.components[name];
            if ((true)) {
                if (!rawComponent ||
                    (typeof rawComponent !== 'object' &&
                        typeof rawComponent !== 'function')) {
                    warn(`Component "${name}" in record with path "${record.path}" is not` +
                        ` a valid component. Received "${String(rawComponent)}".`);
                    // throw to ensure we stop here but warn to ensure the message isn't
                    // missed by the user
                    throw new Error('Invalid route component');
                }
                else if ('then' in rawComponent) {
                    // warn if user wrote import('/component.vue') instead of () =>
                    // import('./component.vue')
                    warn(`Component "${name}" in record with path "${record.path}" is a ` +
                        `Promise instead of a function that returns a Promise. Did you ` +
                        `write "import('./MyPage.vue')" instead of ` +
                        `"() => import('./MyPage.vue')" ? This will break in ` +
                        `production if not fixed.`);
                    const promise = rawComponent;
                    rawComponent = () => promise;
                }
                else if (rawComponent.__asyncLoader &&
                    // warn only once per component
                    !rawComponent.__warnedDefineAsync) {
                    rawComponent.__warnedDefineAsync = true;
                    warn(`Component "${name}" in record with path "${record.path}" is defined ` +
                        `using "defineAsyncComponent()". ` +
                        `Write "() => import('./MyPage.vue')" instead of ` +
                        `"defineAsyncComponent(() => import('./MyPage.vue'))".`);
                }
            }
            // skip update and leave guards if the route component is not mounted
            if (guardType !== 'beforeRouteEnter' && !record.instances[name])
                continue;
            if (isRouteComponent(rawComponent)) {
                // __vccOpts is added by vue-class-component and contain the regular options
                const options = rawComponent.__vccOpts || rawComponent;
                const guard = options[guardType];
                guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
            }
            else {
                // start requesting the chunk already
                let componentPromise = rawComponent();
                if (( true) && !('catch' in componentPromise)) {
                    warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
                    componentPromise = Promise.resolve(componentPromise);
                }
                guards.push(() => componentPromise.then(resolved => {
                    if (!resolved)
                        return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
                    const resolvedComponent = isESModule(resolved)
                        ? resolved.default
                        : resolved;
                    // replace the function with the resolved component
                    record.components[name] = resolvedComponent;
                    // __vccOpts is added by vue-class-component and contain the regular options
                    const options = resolvedComponent.__vccOpts || resolvedComponent;
                    const guard = options[guardType];
                    return guard && guardToPromiseFn(guard, to, from, record, name)();
                }));
            }
        }
    }
    return guards;
}
/**
 * Allows differentiating lazy components from functional components and vue-class-component
 *
 * @param component
 */
function isRouteComponent(component) {
    return (typeof component === 'object' ||
        'displayName' in component ||
        'props' in component ||
        '__vccOpts' in component);
}

// TODO: we could allow currentRoute as a prop to expose `isActive` and
// `isExactActive` behavior should go through an RFC
function useLink(props) {
    const router = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(routerKey);
    const currentRoute = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(routeLocationKey);
    const route = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => router.resolve((0,vue__WEBPACK_IMPORTED_MODULE_0__.unref)(props.to)));
    const activeRecordIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
        const { matched } = route.value;
        const { length } = matched;
        const routeMatched = matched[length - 1];
        const currentMatched = currentRoute.matched;
        if (!routeMatched || !currentMatched.length)
            return -1;
        const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
        if (index > -1)
            return index;
        // possible parent record
        const parentRecordPath = getOriginalPath(matched[length - 2]);
        return (
        // we are dealing with nested routes
        length > 1 &&
            // if the parent and matched route have the same path, this link is
            // referring to the empty child. Or we currently are on a different
            // child of the same parent
            getOriginalPath(routeMatched) === parentRecordPath &&
            // avoid comparing the child with its parent
            currentMatched[currentMatched.length - 1].path !== parentRecordPath
            ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]))
            : index);
    });
    const isActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => activeRecordIndex.value > -1 &&
        includesParams(currentRoute.params, route.value.params));
    const isExactActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => activeRecordIndex.value > -1 &&
        activeRecordIndex.value === currentRoute.matched.length - 1 &&
        isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
        if (guardEvent(e)) {
            return router[(0,vue__WEBPACK_IMPORTED_MODULE_0__.unref)(props.replace) ? 'replace' : 'push']((0,vue__WEBPACK_IMPORTED_MODULE_0__.unref)(props.to)
            // avoid uncaught errors are they are logged anyway
            ).catch(noop);
        }
        return Promise.resolve();
    }
    // devtools only
    if (( true) && isBrowser) {
        const instance = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
        if (instance) {
            const linkContextDevtools = {
                route: route.value,
                isActive: isActive.value,
                isExactActive: isExactActive.value,
            };
            // @ts-expect-error: this is internal
            instance.__vrl_devtools = instance.__vrl_devtools || [];
            // @ts-expect-error: this is internal
            instance.__vrl_devtools.push(linkContextDevtools);
            (0,vue__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(() => {
                linkContextDevtools.route = route.value;
                linkContextDevtools.isActive = isActive.value;
                linkContextDevtools.isExactActive = isExactActive.value;
            }, { flush: 'post' });
        }
    }
    return {
        route,
        href: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => route.value.href),
        isActive,
        isExactActive,
        navigate,
    };
}
const RouterLinkImpl = /*#__PURE__*/ (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: 'RouterLink',
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
        replace: Boolean,
        activeClass: String,
        // inactiveClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: 'page',
        },
    },
    useLink,
    setup(props, { slots }) {
        const link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)(useLink(props));
        const { options } = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(routerKey);
        const elClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => ({
            [getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active')]: link.isActive,
            // [getLinkClass(
            //   props.inactiveClass,
            //   options.linkInactiveClass,
            //   'router-link-inactive'
            // )]: !link.isExactActive,
            [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active')]: link.isExactActive,
        }));
        return () => {
            const children = slots.default && slots.default(link);
            return props.custom
                ? children
                : (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)('a', {
                    'aria-current': link.isExactActive
                        ? props.ariaCurrentValue
                        : null,
                    href: link.href,
                    // this would override user added attrs but Vue will still add
                    // the listener so we end up triggering both
                    onClick: link.navigate,
                    class: elClass.value,
                }, children);
        };
    },
});
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to render a link that triggers a navigation on click.
 */
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
    // don't redirect with control keys
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        return;
    // don't redirect when preventDefault called
    if (e.defaultPrevented)
        return;
    // don't redirect on right click
    if (e.button !== undefined && e.button !== 0)
        return;
    // don't redirect if `target="_blank"`
    // @ts-expect-error getAttribute does exist
    if (e.currentTarget && e.currentTarget.getAttribute) {
        // @ts-expect-error getAttribute exists
        const target = e.currentTarget.getAttribute('target');
        if (/\b_blank\b/i.test(target))
            return;
    }
    // this may be a Weex event which doesn't have this method
    if (e.preventDefault)
        e.preventDefault();
    return true;
}
function includesParams(outer, inner) {
    for (const key in inner) {
        const innerValue = inner[key];
        const outerValue = outer[key];
        if (typeof innerValue === 'string') {
            if (innerValue !== outerValue)
                return false;
        }
        else {
            if (!Array.isArray(outerValue) ||
                outerValue.length !== innerValue.length ||
                innerValue.some((value, i) => value !== outerValue[i]))
                return false;
        }
    }
    return true;
}
/**
 * Get the original path value of a record by following its aliasOf
 * @param record
 */
function getOriginalPath(record) {
    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : '';
}
/**
 * Utility class to get the active class based on defaults.
 * @param propClass
 * @param globalClass
 * @param defaultClass
 */
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null
    ? propClass
    : globalClass != null
        ? globalClass
        : defaultClass;

const RouterViewImpl = /*#__PURE__*/ (0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
    name: 'RouterView',
    // #674 we manually inherit them
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: 'default',
        },
        route: Object,
    },
    setup(props, { attrs, slots }) {
        ( true) && warnDeprecatedUsage();
        const injectedRoute = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(routerViewLocationKey);
        const routeToDisplay = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => props.route || injectedRoute.value);
        const depth = (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(viewDepthKey, 0);
        const matchedRouteRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => routeToDisplay.value.matched[depth]);
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(viewDepthKey, depth + 1);
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(matchedRouteKey, matchedRouteRef);
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.provide)(routerViewLocationKey, routeToDisplay);
        const viewRef = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)();
        // watch at the same time the component instance, the route record we are
        // rendering, and the name
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
            // copy reused instances
            if (to) {
                // this will update the instance for new instances as well as reused
                // instances when navigating to a new route
                to.instances[name] = instance;
                // the component instance is reused for a different route or name so
                // we copy any saved update or leave guards. With async setup, the
                // mounting component will mount before the matchedRoute changes,
                // making instance === oldInstance, so we check if guards have been
                // added before. This works because we remove guards when
                // unmounting/deactivating components
                if (from && from !== to && instance && instance === oldInstance) {
                    if (!to.leaveGuards.size) {
                        to.leaveGuards = from.leaveGuards;
                    }
                    if (!to.updateGuards.size) {
                        to.updateGuards = from.updateGuards;
                    }
                }
            }
            // trigger beforeRouteEnter next callbacks
            if (instance &&
                to &&
                // if there is no instance but to and from are the same this might be
                // the first visit
                (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
                (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
            }
        }, { flush: 'post' });
        return () => {
            const route = routeToDisplay.value;
            const matchedRoute = matchedRouteRef.value;
            const ViewComponent = matchedRoute && matchedRoute.components[props.name];
            // we need the value at the time we render because when we unmount, we
            // navigated to a different location so the value is different
            const currentName = props.name;
            if (!ViewComponent) {
                return normalizeSlot(slots.default, { Component: ViewComponent, route });
            }
            // props from route configuration
            const routePropsOption = matchedRoute.props[props.name];
            const routeProps = routePropsOption
                ? routePropsOption === true
                    ? route.params
                    : typeof routePropsOption === 'function'
                        ? routePropsOption(route)
                        : routePropsOption
                : null;
            const onVnodeUnmounted = vnode => {
                // remove the instance reference to prevent leak
                if (vnode.component.isUnmounted) {
                    matchedRoute.instances[currentName] = null;
                }
            };
            const component = (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(ViewComponent, assign({}, routeProps, attrs, {
                onVnodeUnmounted,
                ref: viewRef,
            }));
            if (( true) &&
                isBrowser &&
                component.ref) {
                // TODO: can display if it's an alias, its props
                const info = {
                    depth,
                    name: matchedRoute.name,
                    path: matchedRoute.path,
                    meta: matchedRoute.meta,
                };
                const internalInstances = Array.isArray(component.ref)
                    ? component.ref.map(r => r.i)
                    : [component.ref.i];
                internalInstances.forEach(instance => {
                    // @ts-expect-error
                    instance.__vrv_devtools = info;
                });
            }
            return (
            // pass the vnode to the slot as a prop.
            // h and <component :is="..."> both accept vnodes
            normalizeSlot(slots.default, { Component: component, route }) ||
                component);
        };
    },
});
function normalizeSlot(slot, data) {
    if (!slot)
        return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
}
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to display the current route the user is at.
 */
const RouterView = RouterViewImpl;
// warn against deprecated usage with <transition> & <keep-alive>
// due to functional component being no longer eager in Vue 3
function warnDeprecatedUsage() {
    const instance = (0,vue__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
    const parentName = instance.parent && instance.parent.type.name;
    if (parentName &&
        (parentName === 'KeepAlive' || parentName.includes('Transition'))) {
        const comp = parentName === 'KeepAlive' ? 'keep-alive' : 'transition';
        warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.\n` +
            `Use slot props instead:\n\n` +
            `<router-view v-slot="{ Component }">\n` +
            `  <${comp}>\n` +
            `    <component :is="Component" />\n` +
            `  </${comp}>\n` +
            `</router-view>`);
    }
}

function formatRouteLocation(routeLocation, tooltip) {
    const copy = assign({}, routeLocation, {
        // remove variables that can contain vue instances
        matched: routeLocation.matched.map(matched => omit(matched, ['instances', 'children', 'aliasOf'])),
    });
    return {
        _custom: {
            type: null,
            readOnly: true,
            display: routeLocation.fullPath,
            tooltip,
            value: copy,
        },
    };
}
function formatDisplay(display) {
    return {
        _custom: {
            display,
        },
    };
}
// to support multiple router instances
let routerId = 0;
function addDevtools(app, router, matcher) {
    // Take over router.beforeEach and afterEach
    // make sure we are not registering the devtool twice
    if (router.__hasDevtools)
        return;
    router.__hasDevtools = true;
    // increment to support multiple router instances
    const id = routerId++;
    (0,_vue_devtools_api__WEBPACK_IMPORTED_MODULE_1__.setupDevtoolsPlugin)({
        id: 'org.vuejs.router' + (id ? '.' + id : ''),
        label: 'Vue Router',
        packageName: 'vue-router',
        homepage: 'https://next.router.vuejs.org/',
        logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
        componentStateTypes: ['Routing'],
        app,
    }, api => {
        // display state added by the router
        api.on.inspectComponent((payload, ctx) => {
            if (payload.instanceData) {
                payload.instanceData.state.push({
                    type: 'Routing',
                    key: '$route',
                    editable: false,
                    value: formatRouteLocation(router.currentRoute.value, 'Current Route'),
                });
            }
        });
        // mark router-link as active and display tags on router views
        api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
            if (componentInstance.__vrv_devtools) {
                const info = componentInstance.__vrv_devtools;
                node.tags.push({
                    label: (info.name ? `${info.name.toString()}: ` : '') + info.path,
                    textColor: 0,
                    tooltip: 'This component is rendered by &lt;router-view&gt;',
                    backgroundColor: PINK_500,
                });
            }
            // if multiple useLink are used
            if (Array.isArray(componentInstance.__vrl_devtools)) {
                componentInstance.__devtoolsApi = api;
                componentInstance.__vrl_devtools.forEach(devtoolsData => {
                    let backgroundColor = ORANGE_400;
                    let tooltip = '';
                    if (devtoolsData.isExactActive) {
                        backgroundColor = LIME_500;
                        tooltip = 'This is exactly active';
                    }
                    else if (devtoolsData.isActive) {
                        backgroundColor = BLUE_600;
                        tooltip = 'This link is active';
                    }
                    node.tags.push({
                        label: devtoolsData.route.path,
                        textColor: 0,
                        tooltip,
                        backgroundColor,
                    });
                });
            }
        });
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(router.currentRoute, () => {
            // refresh active state
            refreshRoutesView();
            api.notifyComponentUpdate();
            api.sendInspectorTree(routerInspectorId);
            api.sendInspectorState(routerInspectorId);
        });
        const navigationsLayerId = 'router:navigations:' + id;
        api.addTimelineLayer({
            id: navigationsLayerId,
            label: `Router${id ? ' ' + id : ''} Navigations`,
            color: 0x40a8c4,
        });
        // const errorsLayerId = 'router:errors'
        // api.addTimelineLayer({
        //   id: errorsLayerId,
        //   label: 'Router Errors',
        //   color: 0xea5455,
        // })
        router.onError((error, to) => {
            api.addTimelineEvent({
                layerId: navigationsLayerId,
                event: {
                    title: 'Error during Navigation',
                    subtitle: to.fullPath,
                    logType: 'error',
                    time: Date.now(),
                    data: { error },
                    groupId: to.meta.__navigationId,
                },
            });
        });
        // attached to `meta` and used to group events
        let navigationId = 0;
        router.beforeEach((to, from) => {
            const data = {
                guard: formatDisplay('beforeEach'),
                from: formatRouteLocation(from, 'Current Location during this navigation'),
                to: formatRouteLocation(to, 'Target location'),
            };
            // Used to group navigations together, hide from devtools
            Object.defineProperty(to.meta, '__navigationId', {
                value: navigationId++,
            });
            api.addTimelineEvent({
                layerId: navigationsLayerId,
                event: {
                    time: Date.now(),
                    title: 'Start of navigation',
                    subtitle: to.fullPath,
                    data,
                    groupId: to.meta.__navigationId,
                },
            });
        });
        router.afterEach((to, from, failure) => {
            const data = {
                guard: formatDisplay('afterEach'),
            };
            if (failure) {
                data.failure = {
                    _custom: {
                        type: Error,
                        readOnly: true,
                        display: failure ? failure.message : '',
                        tooltip: 'Navigation Failure',
                        value: failure,
                    },
                };
                data.status = formatDisplay('❌');
            }
            else {
                data.status = formatDisplay('✅');
            }
            // we set here to have the right order
            data.from = formatRouteLocation(from, 'Current Location during this navigation');
            data.to = formatRouteLocation(to, 'Target location');
            api.addTimelineEvent({
                layerId: navigationsLayerId,
                event: {
                    title: 'End of navigation',
                    subtitle: to.fullPath,
                    time: Date.now(),
                    data,
                    logType: failure ? 'warning' : 'default',
                    groupId: to.meta.__navigationId,
                },
            });
        });
        /**
         * Inspector of Existing routes
         */
        const routerInspectorId = 'router-inspector:' + id;
        api.addInspector({
            id: routerInspectorId,
            label: 'Routes' + (id ? ' ' + id : ''),
            icon: 'book',
            treeFilterPlaceholder: 'Search routes',
        });
        function refreshRoutesView() {
            // the routes view isn't active
            if (!activeRoutesPayload)
                return;
            const payload = activeRoutesPayload;
            // children routes will appear as nested
            let routes = matcher.getRoutes().filter(route => !route.parent);
            // reset match state to false
            routes.forEach(resetMatchStateOnRouteRecord);
            // apply a match state if there is a payload
            if (payload.filter) {
                routes = routes.filter(route => 
                // save matches state based on the payload
                isRouteMatching(route, payload.filter.toLowerCase()));
            }
            // mark active routes
            routes.forEach(route => markRouteRecordActive(route, router.currentRoute.value));
            payload.rootNodes = routes.map(formatRouteRecordForInspector);
        }
        let activeRoutesPayload;
        api.on.getInspectorTree(payload => {
            activeRoutesPayload = payload;
            if (payload.app === app && payload.inspectorId === routerInspectorId) {
                refreshRoutesView();
            }
        });
        /**
         * Display information about the currently selected route record
         */
        api.on.getInspectorState(payload => {
            if (payload.app === app && payload.inspectorId === routerInspectorId) {
                const routes = matcher.getRoutes();
                const route = routes.find(route => route.record.__vd_id === payload.nodeId);
                if (route) {
                    payload.state = {
                        options: formatRouteRecordMatcherForStateInspector(route),
                    };
                }
            }
        });
        api.sendInspectorTree(routerInspectorId);
        api.sendInspectorState(routerInspectorId);
    });
}
function modifierForKey(key) {
    if (key.optional) {
        return key.repeatable ? '*' : '?';
    }
    else {
        return key.repeatable ? '+' : '';
    }
}
function formatRouteRecordMatcherForStateInspector(route) {
    const { record } = route;
    const fields = [
        { editable: false, key: 'path', value: record.path },
    ];
    if (record.name != null) {
        fields.push({
            editable: false,
            key: 'name',
            value: record.name,
        });
    }
    fields.push({ editable: false, key: 'regexp', value: route.re });
    if (route.keys.length) {
        fields.push({
            editable: false,
            key: 'keys',
            value: {
                _custom: {
                    type: null,
                    readOnly: true,
                    display: route.keys
                        .map(key => `${key.name}${modifierForKey(key)}`)
                        .join(' '),
                    tooltip: 'Param keys',
                    value: route.keys,
                },
            },
        });
    }
    if (record.redirect != null) {
        fields.push({
            editable: false,
            key: 'redirect',
            value: record.redirect,
        });
    }
    if (route.alias.length) {
        fields.push({
            editable: false,
            key: 'aliases',
            value: route.alias.map(alias => alias.record.path),
        });
    }
    fields.push({
        key: 'score',
        editable: false,
        value: {
            _custom: {
                type: null,
                readOnly: true,
                display: route.score.map(score => score.join(', ')).join(' | '),
                tooltip: 'Score used to sort routes',
                value: route.score,
            },
        },
    });
    return fields;
}
/**
 * Extracted from tailwind palette
 */
const PINK_500 = 0xec4899;
const BLUE_600 = 0x2563eb;
const LIME_500 = 0x84cc16;
const CYAN_400 = 0x22d3ee;
const ORANGE_400 = 0xfb923c;
// const GRAY_100 = 0xf4f4f5
const DARK = 0x666666;
function formatRouteRecordForInspector(route) {
    const tags = [];
    const { record } = route;
    if (record.name != null) {
        tags.push({
            label: String(record.name),
            textColor: 0,
            backgroundColor: CYAN_400,
        });
    }
    if (record.aliasOf) {
        tags.push({
            label: 'alias',
            textColor: 0,
            backgroundColor: ORANGE_400,
        });
    }
    if (route.__vd_match) {
        tags.push({
            label: 'matches',
            textColor: 0,
            backgroundColor: PINK_500,
        });
    }
    if (route.__vd_exactActive) {
        tags.push({
            label: 'exact',
            textColor: 0,
            backgroundColor: LIME_500,
        });
    }
    if (route.__vd_active) {
        tags.push({
            label: 'active',
            textColor: 0,
            backgroundColor: BLUE_600,
        });
    }
    if (record.redirect) {
        tags.push({
            label: 'redirect: ' +
                (typeof record.redirect === 'string' ? record.redirect : 'Object'),
            textColor: 0xffffff,
            backgroundColor: DARK,
        });
    }
    // add an id to be able to select it. Using the `path` is not possible because
    // empty path children would collide with their parents
    let id = record.__vd_id;
    if (id == null) {
        id = String(routeRecordId++);
        record.__vd_id = id;
    }
    return {
        id,
        label: record.path,
        tags,
        children: route.children.map(formatRouteRecordForInspector),
    };
}
//  incremental id for route records and inspector state
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
    // no route will be active if matched is empty
    // reset the matching state
    const isExactActive = currentRoute.matched.length &&
        isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
    route.__vd_exactActive = route.__vd_active = isExactActive;
    if (!isExactActive) {
        route.__vd_active = currentRoute.matched.some(match => isSameRouteRecord(match, route.record));
    }
    route.children.forEach(childRoute => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
    route.__vd_match = false;
    route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
    const found = String(route.re).match(EXTRACT_REGEXP_RE);
    route.__vd_match = false;
    if (!found || found.length < 3) {
        return false;
    }
    // use a regexp without $ at the end to match nested routes better
    const nonEndingRE = new RegExp(found[1].replace(/\$$/, ''), found[2]);
    if (nonEndingRE.test(filter)) {
        // mark children as matches
        route.children.forEach(child => isRouteMatching(child, filter));
        // exception case: `/`
        if (route.record.path !== '/' || filter === '/') {
            route.__vd_match = route.re.test(filter);
            return true;
        }
        // hide the / route
        return false;
    }
    const path = route.record.path.toLowerCase();
    const decodedPath = decode(path);
    // also allow partial matching on the path
    if (!filter.startsWith('/') &&
        (decodedPath.includes(filter) || path.includes(filter)))
        return true;
    if (decodedPath.startsWith(filter) || path.startsWith(filter))
        return true;
    if (route.record.name && String(route.record.name).includes(filter))
        return true;
    return route.children.some(child => isRouteMatching(child, filter));
}
function omit(obj, keys) {
    const ret = {};
    for (const key in obj) {
        if (!keys.includes(key)) {
            // @ts-expect-error
            ret[key] = obj[key];
        }
    }
    return ret;
}

/**
 * Creates a Router instance that can be used by a Vue app.
 *
 * @param options - {@link RouterOptions}
 */
function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    if (( true) && !routerHistory)
        throw new Error('Provide the "history" option when calling "createRouter()":' +
            ' https://next.router.vuejs.org/api/#history.');
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = (0,vue__WEBPACK_IMPORTED_MODULE_0__.shallowRef)(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    // leave the scrollRestoration if no scrollBehavior is provided
    if (isBrowser && options.scrollBehavior && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = 
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
        let parent;
        let record;
        if (isRouteName(parentOrRoute)) {
            parent = matcher.getRecordMatcher(parentOrRoute);
            record = route;
        }
        else {
            record = parentOrRoute;
        }
        return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
        const recordMatcher = matcher.getRecordMatcher(name);
        if (recordMatcher) {
            matcher.removeRoute(recordMatcher);
        }
        else if ((true)) {
            warn(`Cannot remove non-existent route "${String(name)}"`);
        }
    }
    function getRoutes() {
        return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
    }
    function hasRoute(name) {
        return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
        // const objectLocation = routerLocationAsObject(rawLocation)
        // we create a copy to modify it later
        currentLocation = assign({}, currentLocation || currentRoute.value);
        if (typeof rawLocation === 'string') {
            const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
            const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
            const href = routerHistory.createHref(locationNormalized.fullPath);
            if ((true)) {
                if (href.startsWith('//'))
                    warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
                else if (!matchedRoute.matched.length) {
                    warn(`No match found for location with path "${rawLocation}"`);
                }
            }
            // locationNormalized is always a new object
            return assign(locationNormalized, matchedRoute, {
                params: decodeParams(matchedRoute.params),
                hash: decode(locationNormalized.hash),
                redirectedFrom: undefined,
                href,
            });
        }
        let matcherLocation;
        // path could be relative in object as well
        if ('path' in rawLocation) {
            if (( true) &&
                'params' in rawLocation &&
                !('name' in rawLocation) &&
                // @ts-expect-error: the type is never
                Object.keys(rawLocation.params).length) {
                warn(`Path "${
                // @ts-expect-error: the type is never
                rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
            }
            matcherLocation = assign({}, rawLocation, {
                path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path,
            });
        }
        else {
            // remove any nullish param
            const targetParams = assign({}, rawLocation.params);
            for (const key in targetParams) {
                if (targetParams[key] == null) {
                    delete targetParams[key];
                }
            }
            // pass encoded values to the matcher so it can produce encoded path and fullPath
            matcherLocation = assign({}, rawLocation, {
                params: encodeParams(rawLocation.params),
            });
            // current location params are decoded, we need to encode them in case the
            // matcher merges the params
            currentLocation.params = encodeParams(currentLocation.params);
        }
        const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
        const hash = rawLocation.hash || '';
        if (( true) && hash && !hash.startsWith('#')) {
            warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
        }
        // decoding them) the matcher might have merged current location params so
        // we need to run the decoding again
        matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
        const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
            hash: encodeHash(hash),
            path: matchedRoute.path,
        }));
        const href = routerHistory.createHref(fullPath);
        if ((true)) {
            if (href.startsWith('//')) {
                warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
            }
            else if (!matchedRoute.matched.length) {
                warn(`No match found for location with path "${'path' in rawLocation ? rawLocation.path : rawLocation}"`);
            }
        }
        return assign({
            fullPath,
            // keep the hash encoded so fullPath is effectively path + encodedQuery +
            // hash
            hash,
            query: 
            // if the user is using a custom query lib like qs, we might have
            // nested objects, so we keep the query as is, meaning it can contain
            // numbers at `$route.query`, but at the point, the user will have to
            // use their own type anyway.
            // https://github.com/vuejs/vue-router-next/issues/328#issuecomment-649481567
            stringifyQuery$1 === stringifyQuery
                ? normalizeQuery(rawLocation.query)
                : (rawLocation.query || {}),
        }, matchedRoute, {
            redirectedFrom: undefined,
            href,
        });
    }
    function locationAsObject(to) {
        return typeof to === 'string'
            ? parseURL(parseQuery$1, to, currentRoute.value.path)
            : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
        if (pendingLocation !== to) {
            return createRouterError(8 /* NAVIGATION_CANCELLED */, {
                from,
                to,
            });
        }
    }
    function push(to) {
        return pushWithRedirect(to);
    }
    function replace(to) {
        return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
        const lastMatched = to.matched[to.matched.length - 1];
        if (lastMatched && lastMatched.redirect) {
            const { redirect } = lastMatched;
            let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
            if (typeof newTargetLocation === 'string') {
                newTargetLocation =
                    newTargetLocation.includes('?') || newTargetLocation.includes('#')
                        ? (newTargetLocation = locationAsObject(newTargetLocation))
                        : // force empty params
                            { path: newTargetLocation };
                // @ts-expect-error: force empty params when a string is passed to let
                // the router parse them again
                newTargetLocation.params = {};
            }
            if (( true) &&
                !('path' in newTargetLocation) &&
                !('name' in newTargetLocation)) {
                warn(`Invalid redirect found:\n${JSON.stringify(newTargetLocation, null, 2)}\n when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
                throw new Error('Invalid redirect');
            }
            return assign({
                query: to.query,
                hash: to.hash,
                params: to.params,
            }, newTargetLocation);
        }
    }
    function pushWithRedirect(to, redirectedFrom) {
        const targetLocation = (pendingLocation = resolve(to));
        const from = currentRoute.value;
        const data = to.state;
        const force = to.force;
        // to could be a string where `replace` is a function
        const replace = to.replace === true;
        const shouldRedirect = handleRedirectRecord(targetLocation);
        if (shouldRedirect)
            return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
                state: data,
                force,
                replace,
            }), 
            // keep original redirectedFrom if it exists
            redirectedFrom || targetLocation);
        // if it was a redirect we already called `pushWithRedirect` above
        const toLocation = targetLocation;
        toLocation.redirectedFrom = redirectedFrom;
        let failure;
        if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
            failure = createRouterError(16 /* NAVIGATION_DUPLICATED */, { to: toLocation, from });
            // trigger scroll to allow scrolling to the same anchor
            handleScroll(from, from, 
            // this is a push, the only way for it to be triggered from a
            // history.listen is with a redirect, which makes it become a push
            true, 
            // This cannot be the first navigation because the initial location
            // cannot be manually navigated to
            false);
        }
        return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
            .catch((error) => isNavigationFailure(error)
            ? error
            : // reject any unknown error
                triggerError(error, toLocation, from))
            .then((failure) => {
            if (failure) {
                if (isNavigationFailure(failure, 2 /* NAVIGATION_GUARD_REDIRECT */)) {
                    if (( true) &&
                        // we are redirecting to the same location we were already at
                        isSameRouteLocation(stringifyQuery$1, resolve(failure.to), toLocation) &&
                        // and we have done it a couple of times
                        redirectedFrom &&
                        // @ts-expect-error: added only in dev
                        (redirectedFrom._count = redirectedFrom._count
                            ? // @ts-expect-error
                                redirectedFrom._count + 1
                            : 1) > 10) {
                        warn(`Detected an infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);
                        return Promise.reject(new Error('Infinite redirect in navigation guard'));
                    }
                    return pushWithRedirect(
                    // keep options
                    assign(locationAsObject(failure.to), {
                        state: data,
                        force,
                        replace,
                    }), 
                    // preserve the original redirectedFrom if any
                    redirectedFrom || toLocation);
                }
            }
            else {
                // if we fail we don't finalize the navigation
                failure = finalizeNavigation(toLocation, from, true, replace, data);
            }
            triggerAfterEach(toLocation, from, failure);
            return failure;
        });
    }
    /**
     * Helper to reject and skip all navigation guards if a new navigation happened
     * @param to
     * @param from
     */
    function checkCanceledNavigationAndReject(to, from) {
        const error = checkCanceledNavigation(to, from);
        return error ? Promise.reject(error) : Promise.resolve();
    }
    // TODO: refactor the whole before guards by internally using router.beforeEach
    function navigate(to, from) {
        let guards;
        const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
        // all components here have been resolved once because we are leaving
        guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
        // leavingRecords is already reversed
        for (const record of leavingRecords) {
            record.leaveGuards.forEach(guard => {
                guards.push(guardToPromiseFn(guard, to, from));
            });
        }
        const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeRouteLeave guards
        return (runGuardQueue(guards)
            .then(() => {
            // check global guards beforeEach
            guards = [];
            for (const guard of beforeGuards.list()) {
                guards.push(guardToPromiseFn(guard, to, from));
            }
            guards.push(canceledNavigationCheck);
            return runGuardQueue(guards);
        })
            .then(() => {
            // check in components beforeRouteUpdate
            guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
            for (const record of updatingRecords) {
                record.updateGuards.forEach(guard => {
                    guards.push(guardToPromiseFn(guard, to, from));
                });
            }
            guards.push(canceledNavigationCheck);
            // run the queue of per route beforeEnter guards
            return runGuardQueue(guards);
        })
            .then(() => {
            // check the route beforeEnter
            guards = [];
            for (const record of to.matched) {
                // do not trigger beforeEnter on reused views
                if (record.beforeEnter && !from.matched.includes(record)) {
                    if (Array.isArray(record.beforeEnter)) {
                        for (const beforeEnter of record.beforeEnter)
                            guards.push(guardToPromiseFn(beforeEnter, to, from));
                    }
                    else {
                        guards.push(guardToPromiseFn(record.beforeEnter, to, from));
                    }
                }
            }
            guards.push(canceledNavigationCheck);
            // run the queue of per route beforeEnter guards
            return runGuardQueue(guards);
        })
            .then(() => {
            // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
            // clear existing enterCallbacks, these are added by extractComponentsGuards
            to.matched.forEach(record => (record.enterCallbacks = {}));
            // check in-component beforeRouteEnter
            guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from);
            guards.push(canceledNavigationCheck);
            // run the queue of per route beforeEnter guards
            return runGuardQueue(guards);
        })
            .then(() => {
            // check global guards beforeResolve
            guards = [];
            for (const guard of beforeResolveGuards.list()) {
                guards.push(guardToPromiseFn(guard, to, from));
            }
            guards.push(canceledNavigationCheck);
            return runGuardQueue(guards);
        })
            // catch any navigation canceled
            .catch(err => isNavigationFailure(err, 8 /* NAVIGATION_CANCELLED */)
            ? err
            : Promise.reject(err)));
    }
    function triggerAfterEach(to, from, failure) {
        // navigation is confirmed, call afterGuards
        // TODO: wrap with error handlers
        for (const guard of afterGuards.list())
            guard(to, from, failure);
    }
    /**
     * - Cleans up any navigation guards
     * - Changes the url if necessary
     * - Calls the scrollBehavior
     */
    function finalizeNavigation(toLocation, from, isPush, replace, data) {
        // a more recent navigation took place
        const error = checkCanceledNavigation(toLocation, from);
        if (error)
            return error;
        // only consider as push if it's not the first navigation
        const isFirstNavigation = from === START_LOCATION_NORMALIZED;
        const state = !isBrowser ? {} : history.state;
        // change URL only if the user did a push/replace and if it's not the initial navigation because
        // it's just reflecting the url
        if (isPush) {
            // on the initial navigation, we want to reuse the scroll position from
            // history state if it exists
            if (replace || isFirstNavigation)
                routerHistory.replace(toLocation.fullPath, assign({
                    scroll: isFirstNavigation && state && state.scroll,
                }, data));
            else
                routerHistory.push(toLocation.fullPath, data);
        }
        // accept current navigation
        currentRoute.value = toLocation;
        handleScroll(toLocation, from, isPush, isFirstNavigation);
        markAsReady();
    }
    let removeHistoryListener;
    // attach listener to history to trigger navigations
    function setupListeners() {
        removeHistoryListener = routerHistory.listen((to, _from, info) => {
            // cannot be a redirect route because it was in history
            const toLocation = resolve(to);
            // due to dynamic routing, and to hash history with manual navigation
            // (manually changing the url or calling history.hash = '#/somewhere'),
            // there could be a redirect record in history
            const shouldRedirect = handleRedirectRecord(toLocation);
            if (shouldRedirect) {
                pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
                return;
            }
            pendingLocation = toLocation;
            const from = currentRoute.value;
            // TODO: should be moved to web history?
            if (isBrowser) {
                saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
            }
            navigate(toLocation, from)
                .catch((error) => {
                if (isNavigationFailure(error, 4 /* NAVIGATION_ABORTED */ | 8 /* NAVIGATION_CANCELLED */)) {
                    return error;
                }
                if (isNavigationFailure(error, 2 /* NAVIGATION_GUARD_REDIRECT */)) {
                    // Here we could call if (info.delta) routerHistory.go(-info.delta,
                    // false) but this is bug prone as we have no way to wait the
                    // navigation to be finished before calling pushWithRedirect. Using
                    // a setTimeout of 16ms seems to work but there is not guarantee for
                    // it to work on every browser. So Instead we do not restore the
                    // history entry and trigger a new navigation as requested by the
                    // navigation guard.
                    // the error is already handled by router.push we just want to avoid
                    // logging the error
                    pushWithRedirect(error.to, toLocation
                    // avoid an uncaught rejection, let push call triggerError
                    )
                        .then(failure => {
                        // manual change in hash history #916 ending up in the URL not
                        // changing but it was changed by the manual url change, so we
                        // need to manually change it ourselves
                        if (isNavigationFailure(failure, 4 /* NAVIGATION_ABORTED */ |
                            16 /* NAVIGATION_DUPLICATED */) &&
                            !info.delta &&
                            info.type === NavigationType.pop) {
                            routerHistory.go(-1, false);
                        }
                    })
                        .catch(noop);
                    // avoid the then branch
                    return Promise.reject();
                }
                // do not restore history on unknown direction
                if (info.delta)
                    routerHistory.go(-info.delta, false);
                // unrecognized error, transfer to the global handler
                return triggerError(error, toLocation, from);
            })
                .then((failure) => {
                failure =
                    failure ||
                        finalizeNavigation(
                        // after navigation, all matched components are resolved
                        toLocation, from, false);
                // revert the navigation
                if (failure) {
                    if (info.delta) {
                        routerHistory.go(-info.delta, false);
                    }
                    else if (info.type === NavigationType.pop &&
                        isNavigationFailure(failure, 4 /* NAVIGATION_ABORTED */ | 16 /* NAVIGATION_DUPLICATED */)) {
                        // manual change in hash history #916
                        // it's like a push but lacks the information of the direction
                        routerHistory.go(-1, false);
                    }
                }
                triggerAfterEach(toLocation, from, failure);
            })
                .catch(noop);
        });
    }
    // Initialization and Errors
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    /**
     * Trigger errorHandlers added via onError and throws the error as well
     *
     * @param error - error to throw
     * @param to - location we were navigating to when the error happened
     * @param from - location we were navigating from when the error happened
     * @returns the error as a rejected promise
     */
    function triggerError(error, to, from) {
        markAsReady(error);
        const list = errorHandlers.list();
        if (list.length) {
            list.forEach(handler => handler(error, to, from));
        }
        else {
            if ((true)) {
                warn('uncaught error during route navigation:');
            }
            console.error(error);
        }
        return Promise.reject(error);
    }
    function isReady() {
        if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
            return Promise.resolve();
        return new Promise((resolve, reject) => {
            readyHandlers.add([resolve, reject]);
        });
    }
    /**
     * Mark the router as ready, resolving the promised returned by isReady(). Can
     * only be called once, otherwise does nothing.
     * @param err - optional error
     */
    function markAsReady(err) {
        if (ready)
            return;
        ready = true;
        setupListeners();
        readyHandlers
            .list()
            .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
        readyHandlers.reset();
    }
    // Scroll behavior
    function handleScroll(to, from, isPush, isFirstNavigation) {
        const { scrollBehavior } = options;
        if (!isBrowser || !scrollBehavior)
            return Promise.resolve();
        const scrollPosition = (!isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0))) ||
            ((isFirstNavigation || !isPush) &&
                history.state &&
                history.state.scroll) ||
            null;
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)()
            .then(() => scrollBehavior(to, from, scrollPosition))
            .then(position => position && scrollToPosition(position))
            .catch(err => triggerError(err, to, from));
    }
    const go = (delta) => routerHistory.go(delta);
    let started;
    const installedApps = new Set();
    const router = {
        currentRoute,
        addRoute,
        removeRoute,
        hasRoute,
        getRoutes,
        resolve,
        options,
        push,
        replace,
        go,
        back: () => go(-1),
        forward: () => go(1),
        beforeEach: beforeGuards.add,
        beforeResolve: beforeResolveGuards.add,
        afterEach: afterGuards.add,
        onError: errorHandlers.add,
        isReady,
        install(app) {
            const router = this;
            app.component('RouterLink', RouterLink);
            app.component('RouterView', RouterView);
            app.config.globalProperties.$router = router;
            Object.defineProperty(app.config.globalProperties, '$route', {
                enumerable: true,
                get: () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.unref)(currentRoute),
            });
            // this initial navigation is only necessary on client, on server it doesn't
            // make sense because it will create an extra unnecessary navigation and could
            // lead to problems
            if (isBrowser &&
                // used for the initial navigation client side to avoid pushing
                // multiple times when the router is used in multiple apps
                !started &&
                currentRoute.value === START_LOCATION_NORMALIZED) {
                // see above
                started = true;
                push(routerHistory.location).catch(err => {
                    if ((true))
                        warn('Unexpected error when starting the router:', err);
                });
            }
            const reactiveRoute = {};
            for (const key in START_LOCATION_NORMALIZED) {
                // @ts-expect-error: the key matches
                reactiveRoute[key] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => currentRoute.value[key]);
            }
            app.provide(routerKey, router);
            app.provide(routeLocationKey, (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)(reactiveRoute));
            app.provide(routerViewLocationKey, currentRoute);
            const unmountApp = app.unmount;
            installedApps.add(app);
            app.unmount = function () {
                installedApps.delete(app);
                // the router is not attached to an app anymore
                if (installedApps.size < 1) {
                    // invalidate the current navigation
                    pendingLocation = START_LOCATION_NORMALIZED;
                    removeHistoryListener && removeHistoryListener();
                    currentRoute.value = START_LOCATION_NORMALIZED;
                    started = false;
                    ready = false;
                }
                unmountApp();
            };
            if (( true) && isBrowser) {
                addDevtools(app, router, matcher);
            }
        },
    };
    return router;
}
function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
        const recordFrom = from.matched[i];
        if (recordFrom) {
            if (to.matched.find(record => isSameRouteRecord(record, recordFrom)))
                updatingRecords.push(recordFrom);
            else
                leavingRecords.push(recordFrom);
        }
        const recordTo = to.matched[i];
        if (recordTo) {
            // the type doesn't matter because we are comparing per reference
            if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
                enteringRecords.push(recordTo);
            }
        }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
}

/**
 * Returns the router instance. Equivalent to using `$router` inside
 * templates.
 */
function useRouter() {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(routerKey);
}
/**
 * Returns the current route location. Equivalent to using `$route` inside
 * templates.
 */
function useRoute() {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.inject)(routeLocationKey);
}




/***/ }),

/***/ "./node_modules/vue3-scroll-spy/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/vue3-scroll-spy/dist/index.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
!function(t,e){ true?module.exports=e():0}(self,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t,e=null){let n=0;do{isNaN(t.offsetTop)||(n+=t.offsetTop);const e=t.offsetParent;if(null===e)break;t=e}while(t&&t!==e);return n}function i(t){return t.getAttribute("data-scroll-spy-id")||t.getAttribute("scroll-spy-id")||t.getAttribute("id")||"default"}function o(t){return!!t.getAttribute("data-scroll-spy-id")||!!t.getAttribute("scroll-spy-id")}function r(t){do{if(o(t))return i(t);t=t.parentElement}while(t);return"default"}t.r(e),t.d(e,{Easing:()=>I,registerScrollSpy:()=>O});var s,a={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 1-Math.cos(t*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){return 0===t?0:1===t?1:-Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)},Out:function(t){return 0===t?0:1===t?1:Math.pow(2,-10*t)*Math.sin(5*(t-.1)*Math.PI)+1},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?-.5*Math.pow(2,10*(t-1))*Math.sin(5*(t-1.1)*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin(5*(t-1.1)*Math.PI)+1}},Back:{In:function(t){var e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-a.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*a.Bounce.In(2*t):.5*a.Bounce.Out(2*t-1)+.5}}},u="undefined"==typeof self&&"undefined"!=typeof process&&process.hrtime?function(){var t=process.hrtime();return 1e3*t[0]+t[1]/1e6}:"undefined"!=typeof self&&void 0!==self.performance&&void 0!==self.performance.now?self.performance.now.bind(self.performance):void 0!==Date.now?Date.now:function(){return(new Date).getTime()},l=function(){function t(){this._tweens={},this._tweensAddedDuringUpdate={}}return t.prototype.getAll=function(){var t=this;return Object.keys(this._tweens).map((function(e){return t._tweens[e]}))},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},t.prototype.remove=function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},t.prototype.update=function(t,e){void 0===t&&(t=u()),void 0===e&&(e=!1);var n=Object.keys(this._tweens);if(0===n.length)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var i=0;i<n.length;i++){var o=this._tweens[n[i]],r=!e;o&&!1===o.update(t,r)&&!e&&delete this._tweens[n[i]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},t}(),c={Linear:function(t,e){var n=t.length-1,i=n*e,o=Math.floor(i),r=c.Utils.Linear;return e<0?r(t[0],t[1],i):e>1?r(t[n],t[n-1],n-i):r(t[o],t[o+1>n?n:o+1],i-o)},Bezier:function(t,e){for(var n=0,i=t.length-1,o=Math.pow,r=c.Utils.Bernstein,s=0;s<=i;s++)n+=o(1-e,i-s)*o(e,s)*t[s]*r(i,s);return n},CatmullRom:function(t,e){var n=t.length-1,i=n*e,o=Math.floor(i),r=c.Utils.CatmullRom;return t[0]===t[n]?(e<0&&(o=Math.floor(i=n*(1+e))),r(t[(o-1+n)%n],t[o],t[(o+1)%n],t[(o+2)%n],i-o)):e<0?t[0]-(r(t[0],t[0],t[1],t[1],-i)-t[0]):e>1?t[n]-(r(t[n],t[n],t[n-1],t[n-1],i-n)-t[n]):r(t[o?o-1:0],t[o],t[n<o+1?n:o+1],t[n<o+2?n:o+2],i-o)},Utils:{Linear:function(t,e,n){return(e-t)*n+t},Bernstein:function(t,e){var n=c.Utils.Factorial;return n(t)/n(e)/n(t-e)},Factorial:(s=[1],function(t){var e=1;if(s[t])return s[t];for(var n=t;n>1;n--)e*=n;return s[t]=e,e}),CatmullRom:function(t,e,n,i,o){var r=.5*(n-t),s=.5*(i-e),a=o*o;return(2*e-2*n+r+s)*(o*a)+(-3*e+3*n-2*r-s)*a+r*o+e}}},h=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),p=new l,d=function(){function t(t,e){void 0===e&&(e=p),this._object=t,this._group=e,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=a.Linear.None,this._interpolationFunction=c.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=h.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.to=function(t,e){return this._valuesEnd=Object.create(t),void 0!==e&&(this._duration=e),this},t.prototype.duration=function(t){return this._duration=t,this},t.prototype.start=function(t){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed)for(var e in this._reversed=!1,this._valuesStartRepeat)this._swapEndStartRepeatValues(e),this._valuesStart[e]=this._valuesStartRepeat[e];return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=void 0!==t?"string"==typeof t?u()+parseFloat(t):t:u(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},t.prototype._setupProperties=function(t,e,n,i){for(var o in n){var r=t[o],s=Array.isArray(r),a=s?"array":typeof r,u=!s&&Array.isArray(n[o]);if("undefined"!==a&&"function"!==a){if(u){var l=n[o];if(0===l.length)continue;l=l.map(this._handleRelativeValue.bind(this,r)),n[o]=[r].concat(l)}if("object"!==a&&!s||!r||u)void 0===e[o]&&(e[o]=r),s||(e[o]*=1),i[o]=u?n[o].slice().reverse():e[o]||0;else{for(var c in e[o]=s?[]:{},r)e[o][c]=r[c];i[o]=s?[]:{},this._setupProperties(r,e[o],n[o],i[o])}}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},t.prototype.pause=function(t){return void 0===t&&(t=u()),this._isPaused||!this._isPlaying||(this._isPaused=!0,this._pauseStart=t,this._group&&this._group.remove(this)),this},t.prototype.resume=function(t){return void 0===t&&(t=u()),this._isPaused&&this._isPlaying?(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this):this},t.prototype.stopChainedTweens=function(){for(var t=0,e=this._chainedTweens.length;t<e;t++)this._chainedTweens[t].stop();return this},t.prototype.group=function(t){return this._group=t,this},t.prototype.delay=function(t){return this._delayTime=t,this},t.prototype.repeat=function(t){return this._initialRepeat=t,this._repeat=t,this},t.prototype.repeatDelay=function(t){return this._repeatDelayTime=t,this},t.prototype.yoyo=function(t){return this._yoyo=t,this},t.prototype.easing=function(t){return this._easingFunction=t,this},t.prototype.interpolation=function(t){return this._interpolationFunction=t,this},t.prototype.chain=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return this._chainedTweens=t,this},t.prototype.onStart=function(t){return this._onStartCallback=t,this},t.prototype.onUpdate=function(t){return this._onUpdateCallback=t,this},t.prototype.onRepeat=function(t){return this._onRepeatCallback=t,this},t.prototype.onComplete=function(t){return this._onCompleteCallback=t,this},t.prototype.onStop=function(t){return this._onStopCallback=t,this},t.prototype.update=function(t,e){if(void 0===t&&(t=u()),void 0===e&&(e=!0),this._isPaused)return!0;var n,i,o=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(t>o)return!1;e&&this.start(t)}if(this._goToEnd=!1,t<this._startTime)return!0;!1===this._onStartCallbackFired&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),i=(t-this._startTime)/this._duration,i=0===this._duration||i>1?1:i;var r=this._easingFunction(i);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,r),this._onUpdateCallback&&this._onUpdateCallback(this._object,i),1===i){if(this._repeat>0){for(n in isFinite(this._repeat)&&this._repeat--,this._valuesStartRepeat)this._yoyo||"string"!=typeof this._valuesEnd[n]||(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),void 0!==this._repeatDelayTime?this._startTime=t+this._repeatDelayTime:this._startTime=t+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var s=0,a=this._chainedTweens.length;s<a;s++)this._chainedTweens[s].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(t,e,n,i){for(var o in n)if(void 0!==e[o]){var r=e[o]||0,s=n[o],a=Array.isArray(t[o]),u=Array.isArray(s);!a&&u?t[o]=this._interpolationFunction(s,i):"object"==typeof s&&s?this._updateProperties(t[o],r,s,i):"number"==typeof(s=this._handleRelativeValue(r,s))&&(t[o]=r+(s-r)*i)}},t.prototype._handleRelativeValue=function(t,e){return"string"!=typeof e?e:"+"===e.charAt(0)||"-"===e.charAt(0)?t+parseFloat(e):parseFloat(e)},t.prototype._swapEndStartRepeatValues=function(t){var e=this._valuesStartRepeat[t],n=this._valuesEnd[t];this._valuesStartRepeat[t]="string"==typeof n?this._valuesStartRepeat[t]+parseFloat(n):this._valuesEnd[t],this._valuesEnd[t]=e},t}(),f=h.nextId,_=p,v=_.getAll.bind(_),y=_.removeAll.bind(_),g=_.add.bind(_),m=_.remove.bind(_),b=_.update.bind(_);const w={Easing:a,Group:l,Interpolation:c,now:u,Sequence:h,nextId:f,Tween:d,VERSION:"18.6.4",getAll:v,removeAll:y,add:g,remove:m,update:b},S=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function T(){w.update()&&S(T)}S(T);const I=w.Easing,E={allowNoActive:!1,sectionSelector:null,offset:0,time:500,steps:30,easing:null,active:{selector:null,class:"active"},link:{selector:"a"}},O=(t,e)=>{const o=Object.assign({},E,e||{}),s={};Object.defineProperty(s,"scrollTop",{get:()=>document.body.scrollTop||document.documentElement.scrollTop,set(t){document.body.scrollTop=t,document.documentElement.scrollTop=t}}),Object.defineProperty(s,"scrollHeight",{get:()=>document.body.scrollHeight||document.documentElement.scrollHeight}),Object.defineProperty(s,"offsetHeight",{get:()=>window.innerHeight});const a="@@scrollSpyContext",u={},l={},c={},h={},p={};function d(t,e,n){n.preventDefault(),_(u[e],t)}function f(t,e){const n=i(t),o=g(t,e);for(let t=0;t<o.length;t++){const e=o[t],i=d.bind(null,t,n);e[a].click||(e.addEventListener("click",i),e[a].click=i)}}function _(t,e){const o=i(t),r=l[o],{scrollEl:s,options:u}=t[a],c=s.scrollTop;if(r[e]){const t=n(r[e])-u.offset;if(u.easing)return void function(t,e,n,i,o){new w.Tween({postion:e}).to({postion:n},i).easing(o||I.Cubic.In).onUpdate((function(e){t.scrollTop=e.postion})).start(),T()}(s,c,t,u.time,u.easing);if(window.navigator.userAgent.indexOf("MSIE ")>0){const e=u.time,n=u.steps,i=parseInt(e)/parseInt(n),o=t-c;for(let t=0;t<=n;t++){const e=c+o/n*t;setTimeout((()=>{s.scrollTop=e}),i*t)}return}window.scrollTo({top:t,behavior:"smooth"})}}function v(t,e){const n=i(t),r=Object.assign({},o,{active:{selector:e.value&&e.value.selector?e.value.selector:o.active.selector,class:e.value&&e.value.class?e.value.class:o.active.class}}),s=[...g(t,r.active.selector)];h[n]=s.map((t=>(t[a].options=r,t)))}function y(t,e){const n=i(t),o=t[a],r=g(t,e);l[n]=r,r[0]&&r[0]instanceof HTMLElement&&r[0].offsetParent!==t&&(o.eventEl=window,o.scrollEl=s)}function g(t,e){if(!e)return[...t.children].map((t=>m(t)));const n=i(t),o=[];for(const i of t.querySelectorAll(e))r(i)===n&&o.push(m(i));return o}function m(t){return t[a]={onScroll:()=>{},options:o,id:"",eventEl:t,scrollEl:t},t}t.directive("scroll-spy",{created(t,e){const r=i(t);t[a]={onScroll:()=>{const e=i(t),o=l[e],{scrollEl:r,options:s}=t[a];let u;if(r.offsetHeight+r.scrollTop>=r.scrollHeight-10)u=o.length;else for(u=0;u<o.length&&!(n(o[u],r)-s.offset>r.scrollTop);u++);if(u--,u<0)u=s.allowNoActive?null:0;else if(s.allowNoActive&&u>=o.length-1){const t=o[u];t instanceof HTMLElement&&n(o[u])+t.offsetHeight<r.scrollTop&&(u=null)}if(!s.allowNoActive&&0===u||u!==p[e]){let t=c[e];t&&(t.classList.remove(t[a].options.active.class),delete c[e]);const n=p[e]=u;void 0!==p&&Object.keys(h).length>0&&null!==n&&(t=h[e][n],c[e]=t,t&&t.classList.add(t[a].options.active.class))}},options:Object.assign({},o,e.value),id:i(t),eventEl:t,scrollEl:t},u[r]=t,delete p[r]},mounted(t){const{options:{sectionSelector:e}}=t[a];y(t,e);const{eventEl:n,onScroll:i}=t[a];n.addEventListener("scroll",i),i()},updated(t,e){t[a].options=Object.assign({},o,e.value);const{onScroll:n,options:{sectionSelector:i}}=t[a];y(t,i),n()},unmounted(t){const{eventEl:e,onScroll:n}=t[a];e.removeEventListener("scroll",n)}}),t.directive("scroll-spy-active",{created:v,updated:v}),t.directive("scroll-spy-link",{mounted:function(t,e){f(t,Object.assign({},o.link,e.value).selector)},updated:function(t,e){f(t,Object.assign({},o.link,e.value).selector)},unmounted(t){const e=g(t,null);for(let n=0;n<e.length;n++){const o=e[n],r=i(t),s=d.bind(null,n,r);o[a].click&&(o.removeEventListener("click",s),delete o[a].click)}}})};return e})()}));

/***/ })

}]);