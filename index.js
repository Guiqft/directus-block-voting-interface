import { inject, watch, onMounted, resolveComponent, openBlock, createBlock } from 'vue';

var script = {
    emits: ["input"],
    props: {
        value: { type: String, required: true, default: null },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        var system = inject("system");
        var values = inject("values");
        var handleInput = function (value) {
            emit("input", value);
        };
        watch(values, function () {
            console.log("--changing", values);
        });
        onMounted(function () {
            console.log(values);
            console.log(system.useAppStore());
        });
        return { handleInput: handleInput };
    },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_input = resolveComponent("v-input");

  return (openBlock(), createBlock(_component_v_input, {
    "model-value": $props.value,
    "onUpdate:modelValue": $setup.handleInput
  }, null, 8 /* PROPS */, ["model-value", "onUpdate:modelValue"]))
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
