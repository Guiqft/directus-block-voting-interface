import { resolveComponent, openBlock, createBlock } from 'vue';

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
        var handleListInput = function (changes) {
            emit("input", changes);
        };
        return { handleListInput: handleListInput };
    },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_interface_list_m2m = resolveComponent("interface-list-m2m");

  return (openBlock(), createBlock(_component_interface_list_m2m, {
    collection: "ordem_do_dia",
    field: "proposicao_bloco",
    enableSelect: false,
    value: $props.value,
    onInput: $setup.handleListInput
  }, null, 8 /* PROPS */, ["value", "onInput"]))
}

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
