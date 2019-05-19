import Vue from 'vue'
import Axios from 'axios'
import hash from "object-hash";

const sectors = {
    state: {
        ids: {
            hash: ""
        },
        data: {

        },
        hash: {

        }
    },
    mutations: {
        setSector(state, payload) {
            state.data[payload.id] = { ...state.data[payload.id], ...payload.data }
        },
        createSector(state, payload) {
            Vue.set(state.data, payload.id, payload.data)
        },
        createSectorHash(state, id) {
            Vue.set(state.hash, id, { "hash": hash(state.data[id]) })
        },
        setSectorHash(state, hash) {
            state.ids.hash = hash;
        },
        createIDS(state, sectors) {
            Vue.set(state.ids, "data", sectors)
            state.ids.data.forEach((x, i) => x.id_s = i)
        },
        setSectors(state, sectors) {
            state.ids.sectors = sectors
        },
        setIDSData(state, payload) {
            state.ids.data[payload.index][payload.key] = payload.value
        },
        setObjectInArray(state, payload) {
            let object = state.data[payload.id][payload.key][payload.index]
            Vue.set(state.data[payload.id][payload.key], payload.index, { ...object, ...payload.data })
        },
        setIdsIsChanged(state, isChanged) {
            state.ids.isChanged = isChanged;
        },
        removeSector(state, index) {
            state.ids.data.splice(state.ids.data.filter(x => x.isEnabled).length + index, 1);
        },
        pushSector(state, sector) {
            state.ids.data.push(sector);
        },
        switchSectors(state, payload) {
            payload.sectors.forEach(x => x.isEnabled = payload.isEnabled)
        },

    },
    actions: {
        updateSectors: function (context, payload) {
            let sectors = context.state.ids.data.filter(x => !payload.sectors.includes(x))
            context.commit("switchSectors", payload)

            var unsequenced = payload.isEnabled ?
                payload.sectors.concat(sectors) :
                sectors.concat(payload.sectors)

            context.commit("createIDS", unsequenced)
        },
        loadSector: async function (context, id) {
            return await Axios({
                method: "get",
                url: context.rootState.api + "/sectors/" + id,
                data: {
                    token: context.rootState.admin.token
                }
            }).then(function (response) {
                if (response.status === 200) {

                    if (response.data.data.isLineUp != null) response.data.data.isLineUp = response.data.data.isLineUp === 1
                    else if (response.data.data.arrow != null) response.data.data.arrow = response.data.data.arrow === 1
                  
                    context.commit("createSector", { id: id, data: response.data.data })
                    context.commit("createSectorHash", id)
                }
            }).catch(function (error) {
                throw error
            })

        },
        loadIDS: async function (context) {
            return await Axios({
                method: "get",
                url: context.rootState.api + "/sectors",
                params: {
                    token: context.rootState.admin.token
                }
            }).then(function (response) {
                if (response.status === 200) {
                    let sorted = response.data.sectors.sort((a, b) => a.id_s - b.id_s)
                    for (var x in sorted) { sorted[x].isEnabled = sorted[x].isEnabled === 1 }
                    context.commit("createIDS", sorted)
                    context.dispatch("updateSectors", {
                        isEnabled: true,
                        sectors: context.getters.getSectors(true)
                    })
                    context.commit("setSectorHash", hash(context.state.ids.data))
                }
            }).catch(function (error) {
                throw error
            })
        }
    },
    getters: {
        getSectors: function (state) {
            return isEnabled => {
                return state.ids.data != null ?
                    state.ids.data.filter(x => {
                        return x.isEnabled == isEnabled
                    }) : null
            };
        },

        getData: state => id => {
            return state.data[id];
        },


    }
}

export { sectors }