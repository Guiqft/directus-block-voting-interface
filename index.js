import { ref, pushScopeId, popScopeId, resolveComponent, openBlock, createBlock, Fragment, createVNode, toDisplayString, withScopeId, inject, watch, withCtx, createTextVNode } from 'vue';

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

var script$1 = {
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
        var emitClose = function () {
            emit("close");
        };
        return { selection: selection, emitClose: emitClose };
    },
};

const _withId = /*#__PURE__*/withScopeId("data-v-6013fdea");

pushScopeId("data-v-6013fdea");
const _hoisted_1$1 = /*#__PURE__*/createVNode("h2", null, "Selecione uma proposição para adicionar ao bloco:", -1 /* HOISTED */);
popScopeId();

const render$1 = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_sheet = resolveComponent("v-sheet");
  const _component_v_dialog = resolveComponent("v-dialog");

  return (openBlock(), createBlock(Fragment, null, [
    createVNode("p", null, "TESTE " + toDisplayString($props.open), 1 /* TEXT */),
    createVNode(_component_v_dialog, {
      "model-value": $props.open,
      "onUpdate:modelValue": $setup.emitClose,
      onEsc: $setup.emitClose
    }, {
      default: _withId(() => [
        createVNode(_component_v_sheet, null, {
          default: _withId(() => [
            _hoisted_1$1,
            createVNode(_component_v_select, { "model-value": $setup.selection }, null, 8 /* PROPS */, ["model-value"])
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["model-value", "onUpdate:modelValue", "onEsc"])
  ], 64 /* STABLE_FRAGMENT */))
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

var css_248z$1 = ".v-sheet[data-v-6013fdea] {\n  width: 500px;\n}\n.v-sheet h2[data-v-6013fdea] {\n  margin-bottom: 25px;\n}";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-6013fdea";
script$1.__file = "src/SelectionDialog.vue";

var script = {
    emits: ["input"],
    components: { SelectionDialog: script$1 },
    props: {
        value: {
            type: Array,
            required: true,
            default: null,
        },
    },
    setup: function (props, _a) {
        var _this = this;
        var emit = _a.emit;
        var system = inject("system");
        var values = inject("values");
        var dialogOpen = ref(false);
        var singlePropositionsIDs = ref([]);
        ref([]);
        watch(values, function (currentValues) { return __awaiter(_this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!currentValues.proposicao) return [3, 2];
                        _a = singlePropositionsIDs;
                        return [4, getItemByItemIDs(currentValues.proposicao, system)];
                    case 1:
                        _a.value = _b.sent();
                        _b.label = 2;
                    case 2: return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); }, { immediate: true });
        var handleListInput = function (changes) {
            emit("input", changes);
        };
        return { handleListInput: handleListInput, dialogOpen: dialogOpen };
    },
};

const _hoisted_1 = { class: "block-voting" };
const _hoisted_2 = /*#__PURE__*/createTextVNode(" Adicionar existente ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_interface_list_m2m = resolveComponent("interface-list-m2m");
  const _component_v_button = resolveComponent("v-button");
  const _component_selection_dialog = resolveComponent("selection-dialog");

  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode(_component_interface_list_m2m, {
      collection: "ordem_do_dia",
      field: "proposicao_bloco",
      enableSelect: false,
      value: $props.value,
      onInput: $setup.handleListInput,
      template: `{{proposicoes_id.status}} - {{proposicoes_id.titulo}} - {{proposicoes_id.numero}}`
    }, null, 8 /* PROPS */, ["value", "onInput", "template"]),
    createVNode(_component_v_button, {
      class: "selection-button",
      onClick: _cache[1] || (_cache[1] = $event => ($setup.dialogOpen = true))
    }, {
      default: withCtx(() => [
        _hoisted_2
      ]),
      _: 1 /* STABLE */
    }),
    createVNode(_component_selection_dialog, {
      open: $setup.dialogOpen,
      onClose: _cache[2] || (_cache[2] = $event => ($setup.dialogOpen = false))
    }, null, 8 /* PROPS */, ["open"])
  ]))
}

var css_248z = ".block-voting .selection-button {\n  position: absolute;\n  transform: translateY(-44px) translateX(147px);\n}";
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
