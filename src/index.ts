import BlockVotingInterface from "./Interface.vue"

export default {
    id: "block-votinh",
    name: "Block Voting",
    description: "Interface to allow users to vote on a block of propositions",
    component: BlockVotingInterface,
    icon: "note_add",
    relational: true,
    types: ["alias"],
    groups: ["m2m", "files"],
    recommendedDisplays: ["related-values"],
}
