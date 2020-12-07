<template>
  <div
    class="message desktop-tile"
    v-bind:style="style"
    v-on:mousedown="$emit('tile-selected', tile.id)"
  >
    <div
      class="message-header movable"
      v-bind:class="{ moving: isMoving }"
      v-on:mousedown.prevent.stop="onTileMove"
    >
      <p v-text="tile.name"></p>
      <button
        class="delete" aria-label="delete"
        v-on:click.prevent.stop="$emit('tile-closed', tile.id)"
      ></button>
    </div>
    <div
      class="message-body desktop-tile-body"
      v-bind:style="bodyStyle"
    >
      <div class="desktop-tile-body-content">
      </div>
      <div
        class="resize-handle"
        v-on:mousedown.prevent.stop="onTileResize"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'desktop-tile',
  props: {
    tile: { type: Object, required: true },
    tileIndex: { type: Number, required: true },
    isMoving: { type: Boolean, default: false }
  },
  computed: {
    style(){
      return {
        zIndex: this.tileIndex,
        top: `${this.tile.top}px`,
        left: `${this.tile.left}px`,
      }
    },
    bodyStyle(){
      return {
        width: `${this.tile.width}px`,
        height: `${this.tile.height}px`,
      }
    },
    tileId() {
      return this.tile.id
    }
  },
  methods: {
    onTileMove(event) {
      this.$emit('tile-action', this.tileId, event, 'move')
    },
    onTileResize(event) {
      this.$emit('tile-action', this.tileId, event, 'resize')
    }
  },
}
</script>

<style scoped>
.movable {
  cursor: grab;
}
.moving {
  cursor: grabbing;
}
.desktop-tile {
  position: absolute;
  border: 1px solid grey;
}
.desktop-tile-body {
  padding: 5px;
  position: relative
}
.desktop-tile-body-content {
  cursor: default;
  min-height: 100%;
  min-width: 100%;
}
.resize-handle {
  cursor: nwse-resize;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: grey;
  clip-path: polygon(92% 50%, 100% 45%, 100% 100%, 45% 100%, 50% 92%, 92% 92%);
}
</style>