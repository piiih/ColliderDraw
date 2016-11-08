/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Point = __webpack_require__(1);

	var _Point2 = _interopRequireDefault(_Point);

	var _PrintersManager = __webpack_require__(2);

	var _PrintersManager2 = _interopRequireDefault(_PrintersManager);

	var _Printer = __webpack_require__(3);

	var _Printer2 = _interopRequireDefault(_Printer);

	var _Mouse = __webpack_require__(4);

	var _Mouse2 = _interopRequireDefault(_Mouse);

	var _Polygon = __webpack_require__(5);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _Rectangle = __webpack_require__(6);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _Keyboard = __webpack_require__(7);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var printersManager = new _PrintersManager2.default();
	printersManager.addPrinter('draw', new _Printer2.default('draw', 0));
	printersManager.addPrinter('select', new _Printer2.default('select', 0));
	printersManager.addPrinter('selected', new _Printer2.default('selected', 0));
	printersManager.addPrinter('text', new _Printer2.default('text', 0));

	var printers = printersManager.getPrinters();

	var polygon = new _Polygon2.default(printers['draw']);

	var mouse = new _Mouse2.default();

	var rectangle = new _Rectangle2.default(printersManager.getPrinters()['select']);
	var keyboard = new _Keyboard2.default(printersManager.getPrinters()['draw'].getCanvas());

	mouse.onLeftDown(function () {
	    rectangle.setInicialPoint(new _Point2.default(mouse.getPosition().x, mouse.getPosition().y));
	}, printers['select']);

	mouse.onLeftHold(function () {
	    rectangle.setDefiningPoints(new _Point2.default(mouse.getPosition().x, mouse.getPosition().y));
	    rectangle.print(true);
	}, printers['select']);

	var selectRectangle = new _Rectangle2.default(printers['selected']);

	mouse.onLeftUp(function () {
	    printers['select'].resetCanvas();
	    var polygonPoints = polygon.getPoints();
	    var searchedPoint = null;
	    polygonPoints.forEach(function (polygonPoint, key) {
	        polygonPoints[key].selected = false;
	        searchedPoint = rectangle.searchInsideFor(polygonPoint);
	        if (searchedPoint != null) {
	            polygonPoints[key].selected = true;
	            selectRectangle.drawAround(polygonPoint, 5);
	        }
	    });
	    printers['select'].resetCanvas();
	}, printers['select']);

	keyboard.onKeyPressed("s", function (event) {
	    printersManager.bringToTop(printers['select']);
	    //console.log('select activated!')
	});
	keyboard.onKeyPressed("d", function (event) {
	    printersManager.bringToTop(printers['draw']);
	    //console.log('draw activated!')
	});

	printersManager.getPrinters()['text'].drawText();

	mouse.onLeftDown(function (event) {
	    var exitClick = false;
	    polygon.getPoints().forEach(function (point, key) {
	        if (point.selected) {
	            exitClick = true;
	        }
	    });
	    if (!exitClick) {
	        polygon.addPoint(new _Point2.default(mouse.getPosition().x, mouse.getPosition().y));
	        polygon.print(true);
	    }
	}, printers['draw']);

	mouse.onLeftHold(function (event) {
	    var polygonPoints = polygon.getPoints();
	    polygonPoints.forEach(function (polygonPoint, key) {
	        if (polygonPoint.selected) {
	            polygonPoints[key].setX(mouse.getPosition().x);
	            polygonPoints[key].setY(mouse.getPosition().y);
	            polygon.print(true);
	            selectRectangle.drawAround(polygonPoint, 5);
	        }
	    });
	}, printers['draw']);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = function () {
		function Point() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			_classCallCheck(this, Point);

			this.x = x;
			this.y = y;
			this.selected = false;
		}

		_createClass(Point, [{
			key: "setX",
			value: function setX(value) {
				this.x = value;
			}
		}, {
			key: "getX",
			value: function getX() {
				return this.x;
			}
		}, {
			key: "setY",
			value: function setY(value) {
				this.y = value;
			}
		}, {
			key: "getY",
			value: function getY() {
				return this.y;
			}
		}]);

		return Point;
	}();

	module.exports = Point;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PrintersManager = function () {
	    function PrintersManager() {
	        _classCallCheck(this, PrintersManager);

	        this.printers = {};
	    }

	    _createClass(PrintersManager, [{
	        key: "addPrinter",
	        value: function addPrinter(name, printer) {
	            this.printers[name] = printer;
	        }
	    }, {
	        key: "getPrinters",
	        value: function getPrinters() {
	            return this.printers;
	        }
	    }, {
	        key: "bringToTop",
	        value: function bringToTop(currentPrinter) {
	            for (var key in this.printers) {
	                this.printers[key].getCanvas().style.zIndex = 0;
	                if (currentPrinter.getId() == this.printers[key].getId()) {
	                    this.printers[key].getCanvas().style.zIndex = 1;
	                }
	            }
	        }
	    }]);

	    return PrintersManager;
	}();

	module.exports = PrintersManager;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Printer = function () {
		function Printer(id, zIndex) {
			_classCallCheck(this, Printer);

			this.canvas = document.createElement('canvas');
			document.body.appendChild(this.canvas);
			this.canvas.id = id;
			this.canvas.width = 600;
			this.canvas.height = 300;
			this.canvas.style.zIndex = zIndex;
			this.canvas.style.position = "absolute";
			this.canvas.style.border = "1px solid";
			// this.canvas = document.getElementById('myCanvas');
			this.context = this.canvas.getContext('2d');
		}

		_createClass(Printer, [{
			key: "resetCanvas",
			value: function resetCanvas() {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}
		}, {
			key: "getCanvas",
			value: function getCanvas() {
				return this.canvas;
			}
		}, {
			key: "getId",
			value: function getId() {
				return this.canvas.id;
			}
		}, {
			key: "drawText",
			value: function drawText() {
				this.context.font = "20px Georgia";
				this.context.fillText("Hello", 10, 50);
			}
		}, {
			key: "printPolygon",
			value: function printPolygon(polygon) {
				var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var displayStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'fill';

				if (reset) {
					this.resetCanvas();
				}

				this.context.globalAlpha = 0.3;
				this.context.fillStyle = '#f00';
				this.context.beginPath();

				var points = polygon.getPoints();
				this.context.moveTo(points[0].x, points[0].y);

				for (var i = 1; i < points.length; i++) {
					this.context.lineTo(points[i].x, points[i].y);
				}

				this.context.closePath();
				if (displayStyle === 'fill') {
					this.context.fill();
				} else if (displayStyle === 'stroke') {
					this.context.stroke();
				}
			}
		}, {
			key: "printInputsByPolygon",
			value: function printInputsByPolygon(polygon) {
				var div = document.getElementById('form');

				div.innerHTML = '';
				var counter = 0;
				polygon.getPoints().forEach(function (point, key) {
					div.innerHTML += counter + 1 + ' - x <input type="number" class="point" id="' + counter + 'x" size="5" value="' + point.x + '">';
					div.innerHTML += ' y <input type="number" class="point" id="' + counter + 'y" size="5" value="' + point.y + '">';
					div.innerHTML += '<br>';
					counter++;
				});
			}
		}]);

		return Printer;
	}();

	module.exports = Printer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mouse = function () {
		function Mouse() {
			_classCallCheck(this, Mouse);

			this.canvas = null;
			this.position = { x: 0, y: 0 };
		}

		_createClass(Mouse, [{
			key: 'getPosition',
			value: function getPosition() {
				return this.position;
			}
		}, {
			key: 'trackMousePosition',
			value: function trackMousePosition() {
				var self = this;
				self.canvas.addEventListener('mousemove', function (event) {
					var rect = self.canvas.getBoundingClientRect();
					self.position = {
						x: event.clientX - rect.left,
						y: event.clientY - rect.top
					};
				});
			}
		}, {
			key: 'onLeftDown',
			value: function onLeftDown(functionName, printer) {
				this.canvas = printer.getCanvas();
				this.trackMousePosition();
				this.canvas.addEventListener('mousedown', functionName);
			}
		}, {
			key: 'onLeftUp',
			value: function onLeftUp(functionName, printer) {
				this.canvas = printer.getCanvas();
				this.trackMousePosition();
				this.canvas.addEventListener('mouseup', functionName);
			}
		}, {
			key: 'onLeftHold',
			value: function onLeftHold(functionName, printer) {
				this.canvas = printer.getCanvas();
				this.trackMousePosition();
				var intervalId = 0;

				this.onLeftDown(function () {
					intervalId = setInterval(functionName);
				}, printer);

				this.onLeftUp(function () {
					clearInterval(intervalId);
				}, printer);
			}
		}]);

		return Mouse;
	}();

	module.exports = Mouse;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point = __webpack_require__(1);

	var _Point2 = _interopRequireDefault(_Point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Polygon = function () {
		function Polygon(printer) {
			var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			_classCallCheck(this, Polygon);

			this.points = points;
			this.printer = printer;
		}

		_createClass(Polygon, [{
			key: "getPoints",
			value: function getPoints() {
				return this.points;
			}
		}, {
			key: "addPoint",
			value: function addPoint(point) {
				this.points.push(point);
			}
		}, {
			key: "update",
			value: function update() {
				var self = this;
				// var pointInputs = document.getElementsByClassName('point');
				// for(var i = 0; i< pointInputs.length; i++){
				// 	pointInputs[i].onchange = function(){
				// 		if(this.id.slice(-1) === 'x'){
				// 			self.points[this.id.replace('x','')].x = this.value;	
				// 		}
				// 		if(this.id.slice(-1) === 'y'){
				// 			self.points[this.id.replace('y','')].y = this.value;	
				// 		}
				// 	}
				// }
				// self.print();
			}
		}, {
			key: "print",
			value: function print(reset) {
				var self = this;
				self.printer.printPolygon(this, reset);
			}
		}]);

		return Polygon;
	}();

	module.exports = Polygon;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Point = __webpack_require__(1);

	var _Point2 = _interopRequireDefault(_Point);

	var _Polygon2 = __webpack_require__(5);

	var _Polygon3 = _interopRequireDefault(_Polygon2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rectangle = function (_Polygon) {
	    _inherits(Rectangle, _Polygon);

	    function Rectangle(printer) {
	        _classCallCheck(this, Rectangle);

	        var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, printer, [new _Point2.default(), new _Point2.default(), new _Point2.default(), new _Point2.default()]));

	        _this.Y = printer.getCanvas().width;
	        _this.height = 0;
	        _this.X = 0;
	        return _this;
	    }

	    _createClass(Rectangle, [{
	        key: "getY",
	        value: function getY() {
	            var self = this;
	            var points = this.getPoints();
	            points.forEach(function (item, key) {
	                if (item.y < self.Y) {
	                    self.Y = item.y;
	                }
	            });
	            return self.Y;
	        }
	    }, {
	        key: "getHeight",
	        value: function getHeight() {
	            var self = this;
	            var points = this.getPoints();
	            points.forEach(function (item, key) {
	                if (item.y > self.height) {
	                    self.height = item.y;
	                }
	            });
	            return self.height;
	        }
	    }, {
	        key: "getX",
	        value: function getX() {
	            var points = this.getPoints();
	            this.X = points[0].x;
	            return this.X;
	        }
	    }, {
	        key: "getWidth",
	        value: function getWidth() {
	            var points = this.getPoints();
	            this.width = this.getX() + (points[3].y - points[0].y);
	            return this.width;
	        }
	    }, {
	        key: "searchInsideFor",
	        value: function searchInsideFor(polygonPoint) {
	            var rectanglePoints = this.getPoints();
	            if (polygonPoint.y > rectanglePoints[0].y && polygonPoint.y < rectanglePoints[2].y) {
	                if (polygonPoint.x > rectanglePoints[0].x && polygonPoint.x < rectanglePoints[2].x) {
	                    return polygonPoint;
	                }
	            }

	            return null;
	        }
	    }, {
	        key: "drawAround",
	        value: function drawAround(point, distance) {
	            distance = Number(distance);
	            this.setInicialPoint(new _Point2.default(point.x - distance, point.y - distance));
	            this.setDefiningPoints(new _Point2.default(point.x + distance, point.y + distance));
	            this.print(true);
	        }
	    }, {
	        key: "setInicialPoint",
	        value: function setInicialPoint(point) {
	            this.points[0] = point;
	        }
	    }, {
	        key: "setDefiningPoints",
	        value: function setDefiningPoints(point) {
	            this.points[1].setX(point.x);
	            this.points[1].setY(this.points[0].y);

	            this.points[2] = point;

	            this.points[3].setX(this.points[0].x);
	            this.points[3].setY(point.y);
	        }
	    }, {
	        key: "print",
	        value: function print(reset) {
	            this.printer.printPolygon(this, reset, 'stroke');
	        }
	    }]);

	    return Rectangle;
	}(_Polygon3.default);

	module.exports = Rectangle;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Keyboard = function () {
	  function Keyboard(canvas) {
	    _classCallCheck(this, Keyboard);

	    this.canvas = canvas;
	    this.trackKeyboard();
	  }

	  _createClass(Keyboard, [{
	    key: 'trackKeyboard',
	    value: function trackKeyboard() {
	      var self = this;
	      self.canvas.addEventListener('keydown', function (event) {
	        if (event.which) {
	          console.log(String.fromcharcode(event.which));
	        }
	      });
	    }
	  }, {
	    key: 'onKeyPressed',
	    value: function onKeyPressed(keyName, functionName) {
	      document.addEventListener('keypress', function (event) {
	        if (String.fromCharCode(event.which) == keyName) {
	          functionName();
	        }
	      });
	    }
	  }]);

	  return Keyboard;
	}();

	module.exports = Keyboard;

/***/ }
/******/ ]);