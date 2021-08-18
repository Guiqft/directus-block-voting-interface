import { ref, pushScopeId, popScopeId, resolveComponent, openBlock, createBlock, createVNode, createCommentVNode, withScopeId, createTextVNode, inject, Fragment, renderList, toDisplayString, watch, withCtx } from 'vue';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || from);
}

var checkForRelationIds = function (proposicoes) {
    return proposicoes.find(function (el) { return typeof el === "number"; });
};
var checkForPropositionsObjects = function (proposicoes) {
    return proposicoes.find(function (el) { return typeof el === "object"; });
};
var getSinglePropositionsIDs = function (idList, system) { return __awaiter(void 0, void 0, void 0, function () {
    var responseData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, system.api.get("items/ordem_do_dia_proposicoes", {
                    params: {
                        filter: {
                            id: {
                                _in: idList,
                            },
                        },
                    },
                })];
            case 1:
                responseData = (_a.sent()).data.data;
                return [2, responseData.map(function (relation) { return relation.proposicoes_id; })];
        }
    });
}); };
var removeArrayDuplicates = function (arr) {
    return arr.filter(function (value, index, array) {
        return array.indexOf(value) === index;
    });
};
var getItemByItemIDs = function (propositions, system) { return __awaiter(void 0, void 0, void 0, function () {
    var idList, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                idList = [];
                if (!checkForRelationIds(propositions)) return [3, 2];
                _b = (_a = idList.push).apply;
                _c = [idList];
                return [4, getSinglePropositionsIDs(propositions.filter(function (el) { return typeof el === "number"; }), system)];
            case 1:
                _b.apply(_a, _c.concat([(_d.sent())]));
                _d.label = 2;
            case 2:
                if (checkForPropositionsObjects(propositions))
                    idList.push.apply(idList, propositions
                        .filter(function (el) { return typeof el === "object"; })
                        .map(function (el) { return el.proposicoes_id; }));
                return [2, removeArrayDuplicates(idList)];
        }
    });
}); };
var getFilters = function (propositions) {
    var filter = {
        status: {
            _eq: "aguardando",
        },
    };
    if (propositions.length > 0) {
        filter.id = { _nin: propositions };
    }
    return filter;
};
var getSelectOptions = function (validPropositions) {
    var typeMap = {
        projetoexe: "Projeto do Executivo",
        projetoleg: "Projeto do Legislativo",
        requerimento: "Requerimento",
        indicacao: "Indicação",
        mocao: "Moção",
        decreto: "Decreto Interno",
        emenda: "Emenda",
    };
    return validPropositions.map(function (el) { return ({
        text: el.titulo + " - " + el.numero + " - " + typeMap[el.tipo],
        value: { proposicoes_id: el.id },
    }); });
};
var conflictPropositions = function (values, system) { return __awaiter(void 0, void 0, void 0, function () {
    var newPropositionsItemByItemIDs, blockPropositionsIDs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newPropositionsItemByItemIDs = values.proposicao
                    .filter(function (el) { return typeof el === "object"; })
                    .map(function (el) { return el.proposicoes_id; });
                return [4, getBlockPropositionsIDs(values.proposicao_bloco, system)];
            case 1:
                blockPropositionsIDs = _a.sent();
                return [2, arrayIntersection(newPropositionsItemByItemIDs, blockPropositionsIDs)];
        }
    });
}); };
var arrayIntersection = function (array1, array2) {
    return array1.filter(function (value) { return array2.includes(value); });
};
var getBlockPropositionsIDs = function (propositions, system) { return __awaiter(void 0, void 0, void 0, function () {
    var blockPropositionsIDs, responseData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                blockPropositionsIDs = [];
                if (!propositions) return [3, 3];
                if (!checkForRelationIds(propositions)) return [3, 2];
                return [4, system.api.get("items/ordem_do_dia_proposicoes_1", {
                        params: {
                            filter: {
                                id: {
                                    _in: propositions.filter(function (el) { return typeof el === "number"; }),
                                },
                            },
                        },
                    })];
            case 1:
                responseData = (_a.sent()).data.data;
                blockPropositionsIDs.push.apply(blockPropositionsIDs, responseData.map(function (relation) { return relation.proposicoes_id; }));
                _a.label = 2;
            case 2:
                if (checkForPropositionsObjects(propositions)) {
                    blockPropositionsIDs.push.apply(blockPropositionsIDs, propositions
                        .filter(function (el) { return typeof el === "object"; })
                        .map(function (el) { return el.proposicoes_id; }));
                }
                blockPropositionsIDs = removeArrayDuplicates(blockPropositionsIDs);
                _a.label = 3;
            case 3: return [2, blockPropositionsIDs];
        }
    });
}); };

var script$2 = {
    emits: ["input", "close"],
    props: {
        open: { type: Boolean, default: false, required: true },
        options: {
            type: Array,
            required: true,
        },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        var selection = ref([]);
        var handleSelection = function (selectedItems) {
            selection.value = selectedItems;
        };
        var emitSelection = function () {
            emit("input", selection.value);
            emitClose();
        };
        var emitClose = function () {
            selection.value = [];
            emit("close");
        };
        return { selection: selection, emitClose: emitClose, handleSelection: handleSelection, emitSelection: emitSelection };
    },
};

const _withId$1 = /*#__PURE__*/withScopeId("data-v-6013fdea");

pushScopeId("data-v-6013fdea");
const _hoisted_1$2 = /*#__PURE__*/createVNode("h2", null, "Selecione uma proposição para adicionar ao bloco:", -1 /* HOISTED */);
const _hoisted_2$2 = { key: 0 };
const _hoisted_3$1 = { class: "action-buttons" };
const _hoisted_4$1 = /*#__PURE__*/createTextVNode(" Cancelar ");
const _hoisted_5$1 = /*#__PURE__*/createTextVNode(" Salvar ");
popScopeId();

const render$2 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_button = resolveComponent("v-button");
  const _component_v_sheet = resolveComponent("v-sheet");
  const _component_v_dialog = resolveComponent("v-dialog");

  return (openBlock(), createBlock(_component_v_dialog, {
    "model-value": $props.open,
    "onUpdate:modelValue": $setup.emitClose,
    onEsc: $setup.emitClose
  }, {
    default: _withId$1(() => [
      createVNode(_component_v_sheet, null, {
        default: _withId$1(() => [
          _hoisted_1$2,
          ($props.options.length === 0)
            ? (openBlock(), createBlock("p", _hoisted_2$2, "Não há proposições disponíveis"))
            : createCommentVNode("v-if", true),
          createVNode(_component_v_select, {
            "model-value": $setup.selection,
            "onUpdate:modelValue": $setup.handleSelection,
            items: $props.options,
            disabled: $props.options.length === 0,
            multiple: ""
          }, null, 8 /* PROPS */, ["model-value", "onUpdate:modelValue", "items", "disabled"]),
          createVNode("div", _hoisted_3$1, [
            createVNode(_component_v_button, {
              class: "cancel-button",
              onClick: $setup.emitClose
            }, {
              default: _withId$1(() => [
                _hoisted_4$1
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["onClick"]),
            createVNode(_component_v_button, {
              class: "save-button",
              disabled: !($setup.selection.length > 0),
              onClick: $setup.emitSelection
            }, {
              default: _withId$1(() => [
                _hoisted_5$1
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled", "onClick"])
          ])
        ]),
        _: 1 /* STABLE */
      })
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["model-value", "onUpdate:modelValue", "onEsc"]))
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$2 = ".v-sheet[data-v-6013fdea] {\n  width: 500px;\n}\n.v-sheet h2[data-v-6013fdea] {\n  margin-bottom: 25px;\n}\n.v-sheet p[data-v-6013fdea] {\n  color: var(--warning);\n}\n.v-sheet .action-buttons[data-v-6013fdea] {\n  display: flex;\n  justify-content: space-between;\n  margin: 30px 0px;\n}\n.v-sheet .action-buttons .save-button[data-v-6013fdea] {\n  --v-button-background-color-disabled: var(--background-normal-alt);\n}\n.v-sheet .action-buttons .cancel-button[data-v-6013fdea] {\n  --v-button-background-color: var(--red);\n  --v-button-background-color-hover: var(--red-75);\n  --v-button-color: #d9c5c5;\n  --v-button-color-hover: #d9c5c5;\n}";
styleInject(css_248z$2);

script$2.render = render$2;
script$2.__scopeId = "data-v-6013fdea";
script$2.__file = "src/SelectionDialog.vue";

var script$1 = {
    emits: ["update"],
    props: {
        primaryKey: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
        propositions: {
            type: Array,
            required: true,
        },
    },
    setup: function (props, _a) {
        var _this = this;
        var emit = _a.emit;
        var system = inject("system");
        var isOpen = ref(false);
        var loading = ref(false);
        var toggleOpen = function () {
            isOpen.value = !isOpen.value;
        };
        var statusList = [
            {
                title: "Aguardando",
                value: "aguardando",
            },
            {
                title: "Em discussão",
                value: "discussao",
            },
            {
                title: "Em votação",
                value: "votacao",
            },
            {
                title: "Aprovada",
                value: "aprovada",
            },
            {
                title: "Reprovada",
                value: "reprovada",
            },
        ];
        var changePropositionStatus = function (newStatus) { return __awaiter(_this, void 0, void 0, function () {
            var propositionsIDs, relationIDs, relationsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loading.value = true;
                        propositionsIDs = props.propositions
                            .filter(function (el) { return typeof el === "object"; })
                            .map(function (el) { return el.proposicoes_id; });
                        relationIDs = props.propositions.filter(function (el) { return typeof el === "number"; });
                        return [4, system.api.get("items/ordem_do_dia_proposicoes_1", {
                                params: { filter: { id: { _in: relationIDs } } },
                            })];
                    case 1:
                        relationsData = (_a.sent()).data.data;
                        relationsData.map(function (proposition) {
                            return propositionsIDs.push(proposition.proposicoes_id);
                        });
                        return [4, system.api.patch("items/proposicoes", {
                                keys: propositionsIDs,
                                data: { status: newStatus },
                            })];
                    case 2:
                        _a.sent();
                        loading.value = false;
                        emit("update");
                        return [2];
                }
            });
        }); };
        return {
            isOpen: isOpen,
            toggleOpen: toggleOpen,
            statusList: statusList,
            changePropositionStatus: changePropositionStatus,
            loading: loading,
        };
    },
};

const _withId = /*#__PURE__*/withScopeId("data-v-09353107");

pushScopeId("data-v-09353107");
const _hoisted_1$1 = { class: "status-select" };
const _hoisted_2$1 = /*#__PURE__*/createTextVNode(" Alterar status ");
popScopeId();

const render$1 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_progress_circular = resolveComponent("v-progress-circular");
  const _component_v_button = resolveComponent("v-button");
  const _component_v_list_item = resolveComponent("v-list-item");
  const _component_v_list = resolveComponent("v-list");
  const _component_transition_expand = resolveComponent("transition-expand");

  return (openBlock(), createBlock("div", _hoisted_1$1, [
    (!($props.primaryKey === '+'))
      ? (openBlock(), createBlock(_component_v_button, {
          key: 0,
          onClick: $setup.toggleOpen,
          disabled: $props.disabled || $props.propositions.length === 0,
          loading: $setup.loading
        }, {
          loading: _withId(() => [
            createVNode(_component_v_progress_circular, { indeterminate: "" })
          ]),
          default: _withId(() => [
            _hoisted_2$1,
            ($setup.isOpen)
              ? (openBlock(), createBlock(_component_v_icon, {
                  key: 0,
                  name: "arrow_drop_up"
                }))
              : (openBlock(), createBlock(_component_v_icon, {
                  key: 1,
                  name: "arrow_drop_down"
                }))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick", "disabled", "loading"]))
      : createCommentVNode("v-if", true),
    createVNode(_component_transition_expand, null, {
      default: _withId(() => [
        ($setup.isOpen)
          ? (openBlock(), createBlock(_component_v_list, { key: 0 }, {
              default: _withId(() => [
                (openBlock(true), createBlock(Fragment, null, renderList($setup.statusList, (item, idx) => {
                  return (openBlock(), createBlock(_component_v_list_item, {
                    key: idx,
                    onClick: $event => ($setup.changePropositionStatus(item.value))
                  }, {
                    default: _withId(() => [
                      createTextVNode(toDisplayString(item.title), 1 /* TEXT */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              _: 1 /* STABLE */
            }))
          : createCommentVNode("v-if", true)
      ]),
      _: 1 /* STABLE */
    })
  ]))
});

var css_248z$1 = ".status-select[data-v-09353107] {\n  position: relative;\n  margin-left: 7px;\n}\n.status-select .v-list[data-v-09353107] {\n  position: absolute;\n  background-color: var(--background-normal);\n  width: 175px !important;\n  min-width: 175px !important;\n  padding: 3px 5px;\n}\n.status-select .v-list .v-list-item[data-v-09353107] {\n  cursor: pointer;\n}\n.status-select .v-list .v-list-item[data-v-09353107]:hover {\n  background-color: var(--background-normal-alt);\n}";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-09353107";
script$1.__file = "src/StatusSelect.vue";

var script = {
    emits: ["input"],
    components: { SelectionDialog: script$2, StatusSelect: script$1 },
    props: {
        value: {
            type: Array,
            required: true,
            default: null,
        },
        primaryKey: {
            type: String,
        },
    },
    setup: function (props, _a) {
        var _this = this;
        var emit = _a.emit;
        var system = inject("system");
        var values = inject("values");
        var loading = ref(false);
        var dialogOpen = ref(false);
        var singlePropositionsIDs = ref([]);
        var invalidPropositions = ref([]);
        var update = ref(false);
        var selectionOptions = ref([]);
        watch(values, function (currentValues) { return __awaiter(_this, void 0, void 0, function () {
            var _a, conflictIDs, responseData, avaiablePropositions, _b, _c, _d, _e, _f, e_1;
            var _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        loading.value = true;
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 9, , 10]);
                        if (!currentValues.proposicao) return [3, 6];
                        _a = singlePropositionsIDs;
                        return [4, getItemByItemIDs(currentValues.proposicao, system)];
                    case 2:
                        _a.value = _j.sent();
                        return [4, conflictPropositions(currentValues, system)];
                    case 3:
                        conflictIDs = _j.sent();
                        if (!(conflictIDs.length > 0)) return [3, 5];
                        return [4, system.api.get("items/proposicoes", {
                                params: {
                                    filter: {
                                        id: {
                                            _in: conflictIDs,
                                        },
                                    },
                                },
                            })];
                    case 4:
                        responseData = (_j.sent()).data.data;
                        invalidPropositions.value = responseData.map(function (e) { return ({
                            id: e.id,
                            status: e.status,
                            titulo: e.titulo,
                            tipo: e.tipo,
                            numero: e.numero,
                        }); });
                        return [3, 6];
                    case 5:
                        invalidPropositions.value = [];
                        _j.label = 6;
                    case 6:
                        _c = (_b = system.api).get;
                        _d = ["items/proposicoes"];
                        _g = {};
                        _h = {};
                        _e = getFilters;
                        _f = [__spreadArray([], singlePropositionsIDs.value)];
                        return [4, getBlockPropositionsIDs(currentValues.proposicao_bloco, system)];
                    case 7: return [4, _c.apply(_b, _d.concat([(_g.params = (_h.filter = _e.apply(void 0, [__spreadArray.apply(void 0, _f.concat([(_j.sent())]))]),
                                _h),
                                _g)]))];
                    case 8:
                        avaiablePropositions = (_j.sent()).data.data;
                        selectionOptions.value =
                            getSelectOptions(avaiablePropositions);
                        return [3, 10];
                    case 9:
                        e_1 = _j.sent();
                        console.error(e_1);
                        return [3, 10];
                    case 10:
                        loading.value = false;
                        return [2];
                }
            });
        }); }, { immediate: true });
        var handleInput = function (propositions) {
            emit("input", __spreadArray(__spreadArray([], (props.value || [])), propositions));
        };
        var forceUpdate = function () {
            update.value = !update.value;
        };
        return {
            handleInput: handleInput,
            dialogOpen: dialogOpen,
            selectionOptions: selectionOptions,
            loading: loading,
            invalidPropositions: invalidPropositions,
            update: update,
            forceUpdate: forceUpdate,
        };
    },
};

const _hoisted_1 = { class: "block-voting" };
const _hoisted_2 = {
  key: 0,
  class: "errors"
};
const _hoisted_3 = /*#__PURE__*/createVNode("p", null, " As seguintes proposições não podem aparecer na votação por item e bloco ao mesmo tempo: ", -1 /* HOISTED */);
const _hoisted_4 = { class: "action-buttons" };
const _hoisted_5 = /*#__PURE__*/createTextVNode(" Adicionar existente ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_render_template = resolveComponent("render-template");
  const _component_interface_list_m2m = resolveComponent("interface-list-m2m");
  const _component_v_button = resolveComponent("v-button");
  const _component_status_select = resolveComponent("status-select");
  const _component_selection_dialog = resolveComponent("selection-dialog");

  return (openBlock(), createBlock("div", _hoisted_1, [
    ($setup.invalidPropositions.length > 0)
      ? (openBlock(), createBlock("div", _hoisted_2, [
          _hoisted_3,
          (openBlock(true), createBlock(Fragment, null, renderList($setup.invalidPropositions, (proposition) => {
            return (openBlock(), createBlock(_component_render_template, {
              key: proposition.id,
              collection: "proposicoes",
              item: proposition,
              template: `{{titulo}} - {{numero}} - {{tipo}}`
            }, null, 8 /* PROPS */, ["item"]))
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : createCommentVNode("v-if", true),
    createVNode(_component_interface_list_m2m, {
      key: $setup.update,
      collection: "ordem_do_dia",
      field: "proposicao_bloco",
      enableSelect: false,
      value: $props.value,
      onInput: _cache[1] || (_cache[1] = $event => (_ctx.$emit('input', $event))),
      template: `{{proposicoes_id.status}} - {{proposicoes_id.titulo}} - {{proposicoes_id.numero}} - {{proposicoes_id.tipo}}`
    }, null, 8 /* PROPS */, ["value", "template"]),
    createVNode("div", _hoisted_4, [
      createVNode(_component_v_button, {
        onClick: _cache[2] || (_cache[2] = $event => ($setup.dialogOpen = true)),
        disabled: $setup.loading
      }, {
        default: withCtx(() => [
          _hoisted_5
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["disabled"]),
      createVNode(_component_status_select, {
        propositions: $props.value,
        primaryKey: $props.primaryKey,
        disabled: $setup.loading || $setup.invalidPropositions.length > 0,
        onUpdate: _cache[3] || (_cache[3] = $event => ($setup.forceUpdate()))
      }, null, 8 /* PROPS */, ["propositions", "primaryKey", "disabled"])
    ]),
    createVNode(_component_selection_dialog, {
      open: $setup.dialogOpen,
      options: $setup.selectionOptions,
      onInput: _cache[4] || (_cache[4] = $event => ($setup.handleInput($event))),
      onClose: _cache[5] || (_cache[5] = $event => ($setup.dialogOpen = false))
    }, null, 8 /* PROPS */, ["open", "options"])
  ]))
}

var css_248z = ".block-voting .action-buttons {\n  position: absolute;\n  transform: translateY(-44px) translateX(147px);\n  display: flex;\n  flex-direction: row;\n}\n.block-voting .errors {\n  margin-bottom: 35px;\n}\n.block-voting .errors p {\n  color: var(--warning);\n}\n.block-voting .errors .render-template {\n  margin: 3px 0px;\n}";
styleInject(css_248z);

script.render = render;
script.__file = "src/Interface.vue";

var index = {
    id: "block-votinh",
    name: "Block Voting",
    description: "Interface to allow users to vote on a block of propositions",
    component: script,
    icon: "note_add",
    relational: true,
    types: ["alias"],
    groups: ["m2m", "files"],
    recommendedDisplays: ["related-values"],
};

export default index;
