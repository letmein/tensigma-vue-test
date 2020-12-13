<template functional>
  <span>
    <span v-text="$options.format(props.value)"/> BTC
  </span>
</template>

<script>
import sb from 'satoshi-bitcoin'

export default {
  props: {
    value: { type: Number, required: true },
  },

  format(value) {
    return sb.toBitcoin(value)
  }
}
</script>