<template functional>
  <ul>
    <li v-for="addr in props.list" v-bind:key="addr">
      <span v-text="addr" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: { type: Array, required: true },
  },
}
</script>