/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/addTask.js":
/*!************************!*\
  !*** ./src/addTask.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask)
/* harmony export */ });
/* harmony import */ var _taskList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskList.js */ "./src/taskList.js");

function addTask(tasks, description) {
  var newTask = {
    description: description,
    completed: false,
    index: tasks.length + 1
  };
  tasks.push(newTask);
  (0,_taskList_js__WEBPACK_IMPORTED_MODULE_0__.renderTaskList)(tasks);
}

/***/ }),

/***/ "./src/clearCompletedTasks.js":
/*!************************************!*\
  !*** ./src/clearCompletedTasks.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCompletedTasks: () => (/* binding */ clearCompletedTasks)
/* harmony export */ });
/* harmony import */ var _taskList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskList.js */ "./src/taskList.js");

function clearCompletedTasks(tasks) {
  var updatedTasks = tasks.filter(function (task) {
    return !task.completed;
  });
  for (var i = 0; i < updatedTasks.length; i += 1) {
    updatedTasks[i].index = i + 1;
  }
  (0,_taskList_js__WEBPACK_IMPORTED_MODULE_0__.renderTaskList)(updatedTasks);
}

/***/ }),

/***/ "./src/listUI.js":
/*!***********************!*\
  !*** ./src/listUI.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeListUI: () => (/* binding */ initializeListUI)
/* harmony export */ });
function handleListClick(event) {
  var listItem = event.target.closest('li');
  if (!listItem) return;
  var kebabMenu = listItem.querySelector('.kebab-menu');
  var trashCanIcon = listItem.querySelector('.trash-can-icon');
  if (event.target !== kebabMenu && event.target !== trashCanIcon) {
    if (kebabMenu.style.display === 'none') {
      kebabMenu.style.display = 'block';
      trashCanIcon.style.display = 'none';
      listItem.style.backgroundColor = 'initial';
    } else {
      kebabMenu.style.display = 'none';
      trashCanIcon.style.display = 'block';
      listItem.style.backgroundColor = 'yellow';
    }
  }
}
function initializeListUI() {
  var taskList = document.getElementById('task-list');
  taskList.addEventListener('click', handleListClick);
}

/***/ }),

/***/ "./src/localStorage.js":
/*!*****************************!*\
  !*** ./src/localStorage.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadTasks: () => (/* binding */ loadTasks),
/* harmony export */   saveTasks: () => (/* binding */ saveTasks)
/* harmony export */ });
// Function to save the tasks in local storage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load the tasks from local storage
function loadTasks() {
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return [];
}

/***/ }),

/***/ "./src/taskList.js":
/*!*************************!*\
  !*** ./src/taskList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderTaskList: () => (/* binding */ renderTaskList)
/* harmony export */ });
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./localStorage.js */ "./src/localStorage.js");

function renderTaskList(tasks) {
  var deleteTask = function deleteTask(task) {
    var taskIndex = tasks.findIndex(function (t) {
      return t.index === task.index;
    });
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      for (var i = taskIndex; i < tasks.length; i += 1) {
        tasks[i].index -= 1;
      }
      (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.saveTasks)(tasks);
      renderTaskList(tasks);
    }
  };
  var makeTaskDescriptionEditable = function makeTaskDescriptionEditable(taskDescription, task) {
    taskDescription.contentEditable = true;
    taskDescription.focus();
    taskDescription.classList.add('editable');
    var originalDescription = task.description;
    taskDescription.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        taskDescription.blur();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        taskDescription.innerText = originalDescription;
        taskDescription.blur();
      }
    });
    taskDescription.addEventListener('blur', function () {
      var newDescription = taskDescription.innerText.trim();
      taskDescription.contentEditable = false;
      if (newDescription !== '') {
        task.description = newDescription;
        (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_0__.saveTasks)(tasks);
        renderTaskList(tasks);
      } else {
        taskDescription.innerText = originalDescription;
      }
    });
  };
  var taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear previous list

  tasks.forEach(function (task) {
    var listItem = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    listItem.appendChild(checkbox);
    var taskDescription = document.createElement('span');
    taskDescription.innerText = task.description;
    if (task.completed) {
      taskDescription.classList.add('completed');
    }
    listItem.appendChild(taskDescription);
    var kebabMenuIcon = document.createElement('img');
    kebabMenuIcon.src = 'kebab-menu.png';
    kebabMenuIcon.alt = 'Kebab Menu';
    kebabMenuIcon.classList.add('kebab-menu');
    listItem.appendChild(kebabMenuIcon);
    var trashCanIcon = document.createElement('img');
    trashCanIcon.src = 'trash-can-icon.png';
    trashCanIcon.alt = 'Trash Can';
    trashCanIcon.classList.add('trash-can-icon');
    trashCanIcon.style.display = 'none';
    listItem.appendChild(trashCanIcon);

    // Add event listener to the checkbox
    checkbox.addEventListener('change', function () {
      task.completed = checkbox.checked;
      renderTaskList(tasks);
    });

    // Add event listener to the trash can icon
    trashCanIcon.addEventListener('click', function () {
      deleteTask(task);
    });
    taskDescription.addEventListener('click', function () {
      makeTaskDescriptionEditable(taskDescription, task);
    });
    taskList.appendChild(listItem);
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/refresh_reload_icon.png */ "./src/assets/refresh_reload_icon.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
}

#todo-list {
  width: 40%;
  box-shadow: 1px 2px 8px rgb(152, 150, 150);
  border-radius: 4px;
  margin: 50px auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding-left: 10px;
  padding-bottom: 15px;
  position: relative;
  border-bottom: 1px solid #ccc;
  margin-top: -14px;
  padding-top: 12px;
}

h3 {
  padding: 15px 10px;
  position: relative;
  border-bottom: 1px solid #ccc;
}

h3::before {
  content: "";
  position: absolute;
  top: 30%;
  right: 4%;
  width: 20px;
  height: 20px;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-size: cover;
  cursor: pointer;
}

input[type=checkbox] {
  margin-right: 15px;
}

#task-input {
  width: 97%;
  padding-left: 12px;
  padding-bottom: 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
}

#clear-button {
  border: none;
  background-color: rgb(235, 235, 235);
  width: 100%;
  padding: 15px;
  margin-top: -14px;
  cursor: pointer;
  font-size: 16px;
}

#clear-button:hover {
  background-color: rgb(210, 208, 208);
}

.completed {
  text-decoration: line-through;
  color: rgb(127, 122, 122);
}

.kebab-menu {
  width: 25px;
  cursor: move;
  background-size: cover;
  height: 24px;
  position: absolute;
  top: 12px;
  right: 20px;
}

.trash-can-icon {
  width: 25px;
  cursor: pointer;
  background-size: cover;
  height: 24px;
  position: absolute;
  top: 12px;
  right: 20px;
}

span.editable {
  border: none;
  outline: none;
}`, "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"AAAA;EACE,8BAAA;EACA,SAAA;EACA,aAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,UAAA;EACA,0CAAA;EACA,kBAAA;EACA,iBAAA;AACF;;AAEA;EACE,qBAAA;EACA,UAAA;AACF;;AAEA;EACE,mBAAA;EACA,kBAAA;EACA,oBAAA;EACA,kBAAA;EACA,6BAAA;EACA,iBAAA;EACA,iBAAA;AACF;;AAEA;EACE,kBAAA;EACA,kBAAA;EACA,6BAAA;AACF;;AAEA;EACE,WAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,yDAAA;EACA,sBAAA;EACA,eAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,UAAA;EACA,kBAAA;EACA,oBAAA;EACA,eAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;AACF;;AAEA;EACE,YAAA;EACA,oCAAA;EACA,WAAA;EACA,aAAA;EACA,iBAAA;EACA,eAAA;EACA,eAAA;AACF;;AAEA;EACE,oCAAA;AACF;;AAEA;EACE,6BAAA;EACA,yBAAA;AACF;;AAEA;EACE,WAAA;EACA,YAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;AACF;;AAEA;EACE,WAAA;EACA,eAAA;EACA,sBAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;AACF;;AAEA;EACE,YAAA;EACA,aAAA;AACF","sourcesContent":["body {\r\n  font-family: Arial, sans-serif;\r\n  margin: 0;\r\n  padding: 20px;\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n}\r\n\r\n#todo-list {\r\n  width: 40%;\r\n  box-shadow: 1px 2px 8px rgb(152, 150, 150);\r\n  border-radius: 4px;\r\n  margin: 50px auto;\r\n}\r\n\r\nul {\r\n  list-style-type: none;\r\n  padding: 0;\r\n}\r\n\r\nli {\r\n  margin-bottom: 10px;\r\n  padding-left: 10px;\r\n  padding-bottom: 15px;\r\n  position: relative;\r\n  border-bottom: 1px solid #ccc;\r\n  margin-top: -14px;\r\n  padding-top: 12px;\r\n}\r\n\r\nh3 {\r\n  padding: 15px 10px;\r\n  position: relative;\r\n  border-bottom: 1px solid #ccc;\r\n}\r\n\r\nh3::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  top: 30%;\r\n  right: 4%;\r\n  width: 20px;\r\n  height: 20px;\r\n  background-image: url(\"../assets/refresh_reload_icon.png\");\r\n  background-size: cover;\r\n  cursor: pointer;\r\n}\r\n\r\ninput[type=\"checkbox\"] {\r\n  margin-right: 15px;\r\n}\r\n\r\n#task-input {\r\n  width: 97%;\r\n  padding-left: 12px;\r\n  padding-bottom: 12px;\r\n  font-size: 16px;\r\n  border: none;\r\n  border-bottom: 1px solid #ccc;\r\n  outline: none;\r\n}\r\n\r\n#clear-button {\r\n  border: none;\r\n  background-color: rgb(235, 235, 235);\r\n  width: 100%;\r\n  padding: 15px;\r\n  margin-top: -14px;\r\n  cursor: pointer;\r\n  font-size: 16px;\r\n}\r\n\r\n#clear-button:hover {\r\n  background-color: rgb(210, 208, 208);\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: rgb(127, 122, 122);\r\n}\r\n\r\n.kebab-menu {\r\n  width: 25px;\r\n  cursor: move;\r\n  background-size: cover;\r\n  height: 24px;\r\n  position: absolute;\r\n  top: 12px;\r\n  right: 20px;\r\n}\r\n\r\n.trash-can-icon {\r\n  width: 25px;\r\n  cursor: pointer;\r\n  background-size: cover;\r\n  height: 24px;\r\n  position: absolute;\r\n  top: 12px;\r\n  right: 20px;\r\n}\r\n\r\nspan.editable {\r\n  border: none;\r\n  outline: none;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/refresh_reload_icon.png":
/*!********************************************!*\
  !*** ./src/assets/refresh_reload_icon.png ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "refresh_reload_icon.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _taskList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskList.js */ "./src/taskList.js");
/* harmony import */ var _addTask_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addTask.js */ "./src/addTask.js");
/* harmony import */ var _listUI_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listUI.js */ "./src/listUI.js");
/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localStorage.js */ "./src/localStorage.js");
/* harmony import */ var _clearCompletedTasks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clearCompletedTasks.js */ "./src/clearCompletedTasks.js");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");






var tasks = (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_3__.loadTasks)();
var taskInput = document.getElementById('task-input');
taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    var description = taskInput.value.trim();
    if (description !== '') {
      (0,_addTask_js__WEBPACK_IMPORTED_MODULE_1__.addTask)(tasks, description);
      taskInput.value = '';
      (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_3__.saveTasks)(tasks);
    }
  }
});
window.addEventListener('DOMContentLoaded', function () {
  (0,_taskList_js__WEBPACK_IMPORTED_MODULE_0__.renderTaskList)(tasks);
  (0,_listUI_js__WEBPACK_IMPORTED_MODULE_2__.initializeListUI)();
  var clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', function () {
    tasks = tasks.filter(function (task) {
      return !task.completed;
    });
    (0,_clearCompletedTasks_js__WEBPACK_IMPORTED_MODULE_4__.clearCompletedTasks)(tasks);
    (0,_taskList_js__WEBPACK_IMPORTED_MODULE_0__.renderTaskList)(tasks);
    (0,_localStorage_js__WEBPACK_IMPORTED_MODULE_3__.saveTasks)(tasks);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=main5bd35c8d514c0628ef6e.js.map