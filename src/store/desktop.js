import without from 'lodash/without'

export default {
  namespaced: true,
  state() {
    return {
      tilesById: {},
      activeTiles: [],
      closedTiles: [],
    }
  },
  mutations: {
    addTile(state, { id, name, top, left, width, height }) {
      if (state.tilesById[id]) {
        return
      }

      state.tilesById[id] = { id, name, top, left, width, height }
      state.activeTiles = [...state.activeTiles, id]
    },
    putOnTop(state, tileId) {
      state.closedTiles = without(state.closedTiles, tileId)
      state.activeTiles = [ ...without(state.activeTiles, tileId), tileId ]
    },
    closeTile(state, tileId) {
      state.activeTiles = without(state.activeTiles, tileId)
      state.closedTiles = [ ...state.closedTiles, tileId ]
    },
    updateTile(state, { tileId, diff }) {
      const { tilesById } = state

      state.tilesById = {
        ...tilesById,
        [tileId]: { ...tilesById[tileId], ...diff }
      }
    },
  },
  getters: {
    activeTiles({ tilesById, activeTiles }) {
      return activeTiles.map(id => tilesById[id])
    },
    closedTiles({ tilesById, closedTiles }) {
      return closedTiles.map(id => tilesById[id])
    },
  },
  actions: {
    moveTile({ commit, state }, { tileId, dx, dy }) {
      const { left, top } = state.tilesById[tileId]
      const diff = { left: left + dx, top: top + dy }
      commit('updateTile', { tileId, diff })
    },
    resizeTile({ commit, state }, { tileId, dx, dy }) {
      const { width, height } = state.tilesById[tileId]
      const diff = { width: width + dx, height: height + dy }
      commit('updateTile', { tileId, diff })
    },
    restoreTile({ commit }, { tileId, width, height, containerWidth, containerHeight }) {
      const diff = {
        width,
        height,
        top: (containerHeight - height) / 2,
        left: (containerWidth - width) / 2,
      }
      commit('updateTile', { tileId, diff })
      commit('putOnTop', tileId)
    },
  },
}