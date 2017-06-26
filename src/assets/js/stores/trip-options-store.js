import tripOptions from "assets/json/trip-options.json"

var tripNodes = {}
for (let item of tripOptions["trip-nodes"]) {
  tripNodes[item.code] = item;
}

var tripMods = {}
for (var node of tripOptions["trip-mods"]) {
  tripMods[node.code] = node;
}

var walkPurposes = {}
for (var node of tripOptions["walk-purpose"]) {
  walkPurposes[node.code] = node;
}

let walkReasons = {}
for (let node of tripOptions["walk-reason"]) {
  walkReasons[node.code] = node;
}

const state = {
  tripNodes,
  tripMods,
  walkPurposes,
  walkReasons
}

const getters = {
  getNodeDesc: (state, getters) => (code) => {
    return state.tripNodes.find(node => node.code === code);
  },
  getNodeName: (state, getters) => (code) => {
    return state.tripNodes[code] ? state.tripNodes[code].name : ""
  },
  getModDesc: (state, getters) => (code) => {
    return state.tripMods.find(mod => mod.code === code);
  },
  getModName: (state, getters) => (code) => {
    // let mod = state.tripMods.find(mod => mod.code === code);
    return state.tripMods[code] ? state.tripMods[code].name : ""
  },
  getWalkPurposeDesc: (state, getters) => (code) => {
    return state.walkPurposes.find(purpose => purpose.code === code);
  },
  getWalkReasonDesc: (state, getters) => (code) => {
    return state.walkReasons.find(reason => reason.code === code);
  },
}

const mutations = {

}

const actions = {

}

const modules = {

}

export {
  state,
  getters,
  mutations,
  actions,
  modules
};
