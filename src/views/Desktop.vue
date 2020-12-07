<template>
  <div>
    <h1>
      Desktop
    </h1>
    <div
      class="container desktop-tile-container has-background-grey-lighter"
      v-bind:class="{ 'is-resizing': action === RESIZE }"
      v-on:mouseup="onMouseUp"
      v-on:mousemove="onMouseMove"
      ref="container"
    >
      <desktop-tile
        v-for="(tile, index) in activeTiles"
        v-bind:key="tile.id"
        v-bind:tile="tile"
        v-bind:tile-index="index"
        v-bind:is-moving="action === MOVE"
        v-on:tile-selected="putOnTop"
        v-on:tile-closed="closeTile"
        v-on:tile-action="onTileAction"
      />
    </div>
    <div class="level desktop-tray">
      <div class="level-left">
        <div
          v-for="tile in closedTiles"
          v-bind:key="tile.id"
          v-on:click="onRestoreTile(tile.id)"
          class="level-item tag is-light is-link is-large desktop-tray-item"
        >
          <span v-text="tile.name"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import DesktopTile from '@/components/DesktopTile.vue'
import floor from 'lodash/floor'

const quantize = n => floor(n, -1)

export default {
  name: 'Desktop',
  data() {
    return {
      position: null,
      tile: null,
      action: null,
    }
  },
  mounted() {
    for (let i = 1; i <= 5; i++) {
      this.addTile({
        id: `tile${i}`,
        name: `Tile ${i}`,
        top: i*50,
        left: i*50,
        width: this.tileWidth,
        height: this.tileHeight,
      })
    }
  },
  computed: {
    ...mapGetters('desktop', ['activeTiles', 'closedTiles']),
    tileWidth() {
      return 300
    },
    tileHeight() {
      return 100
    },
    RESIZE() {
      return 'resize'
    },
    MOVE() {
      return 'move'
    },
    containerWidth() {
      return this.$refs.container.clientWidth
    },
    containerHeight() {
      return this.$refs.container.clientHeight
    },
  },
  methods: {
    ...mapMutations('desktop', ['addTile', 'putOnTop', 'closeTile']),
    ...mapActions('desktop', ['moveTile', 'resizeTile', 'restoreTile']),
    onRestoreTile(tileId) {
      const { containerWidth, containerHeight } = this
      this.restoreTile({
        tileId,
        containerWidth,
        containerHeight,
        width: this.tileWidth,
        height: this.tileHeight,
      })
    },
    onTileAction(tileId, { screenX, screenY }, action) {
      this.putOnTop(tileId)
      this.position = [quantize(screenX), quantize(screenY)]
      this.tileId = tileId
      this.action = action
    },
    onMouseMove({ screenX, screenY }) {
      const { tileId, action } = this

      if (action === null) {
        return
      }

      const [x, y] = this.position
      const dx = quantize(screenX - x)
      const dy = quantize(screenY - y)

      if (Math.abs(dx) === 0 && Math.abs(dy) === 0) {
        return
      }

      this.position = [quantize(screenX), quantize(screenY)]
      const diff = { tileId, dx, dy }

      switch (action) {
        case this.MOVE:
          this.moveTile(diff)
          break
        case this.RESIZE:
          this.resizeTile(diff)
          break
      }
    },
    onMouseUp() {
      this.action = null
    },
  },
  components: {
    DesktopTile
  }
}
</script>

<style scoped>
.desktop-tile-container {
  position: relative;
  min-height: 85vh;
}

.is-resizing {
  cursor: nwse-resize;
}

.desktop-tray-item {
  cursor: pointer;
}
</style>