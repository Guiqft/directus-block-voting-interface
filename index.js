import { ref, resolveComponent, openBlock, createBlock, createVNode, withCtx, createTextVNode, toDisplayString } from 'vue';

var script = {
    emits: ["input"],
    props: {
        value: {
            type: Array,
            required: true,
            default: null,
        },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        var drawerOpen = ref(false);
        var selection = ref([]);
        var handleListInput = function (changes) {
            emit("input", changes);
        };
        var testhandle = function (values) {
            console.log(values);
        };
        return { handleListInput: handleListInput, drawerOpen: drawerOpen, selection: selection, testhandle: testhandle };
    },
};

const _hoisted_1 = { class: "block-voting" };
const _hoisted_2 = /*#__PURE__*/createTextVNode(" Adicionar existente ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_interface_list_m2m = resolveComponent("interface-list-m2m");
  const _component_v_button = resolveComponent("v-button");
  const _component_drawer_collection = resolveComponent("drawer-collection");

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
      onClick: _cache[1] || (_cache[1] = $event => ($setup.drawerOpen = true))
    }, {
      default: withCtx(() => [
        _hoisted_2
      ]),
      _: 1 /* STABLE */
    }),
    createTextVNode(" test: " + toDisplayString($setup.drawerOpen) + " ", 1 /* TEXT */),
    createVNode(_component_drawer_collection, {
      collection: "proposicoes",
      active: $setup.drawerOpen,
      multiple: true,
      selection: $setup.selection,
      onInput: $setup.testhandle
    }, null, 8 /* PROPS */, ["active", "selection", "onInput"])
  ]))
}

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
