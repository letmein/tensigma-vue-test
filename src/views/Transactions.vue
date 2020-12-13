<template>
  <div>
    <div class="buttons mt-4">
      <button
        type="button"
        class="button is-success"
        v-on:click="start"
      >
        Запуск
      </button>
      <button
        type="button"
        class="button is-danger"
        v-on:click="stop"
      >
        Остановка
      </button>
      <button
        type="button"
        class="button is-warning"
        v-on:click="reset"
      >
        Сброс
      </button>
    </div>
    <table class="table is-bordered is-hoverable is-fullwidth">
      <caption class="is-size-4 has-text-weight-bold my-3">
        Сумма: <btc-amount v-bind:value="total" />
      </caption>
      <thead>
        <th>From</th>
        <th>To</th>
        <th>Sum</th>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" v-bind:key="tx.hash">
          <td>
            <addr-list v-bind:list="tx.fromAddr" />
          </td>
          <td>
            <addr-list v-bind:list="tx.toAddr" />
          </td>
          <td>
            <btc-amount v-bind:value="tx.amount" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BtcAmount from '../components/BtcAmount.vue'
import AddrList from '../components/AddrList.vue'

export default {
  name: 'Transactions',
  data() {
    return {
      transactions: [],
    }
  },
  computed: {
    total() {
      return this.transactions.reduce((acc, { amount }) => acc + amount, 0)
    }
  },
  methods: {
    start() {
      this.$connect()
      this.$socket.addEventListener('open', () => {
        this.$socket.sendObj({ op : 'unconfirmed_sub' })
        this.$socket.addEventListener('message', ({ data }) => this.addTransaction(data))
      })
    },
    stop() {
      this.$disconnect()
    },
    reset() {
      this.transactions = []
    },
    parseTransactionData(data) {
      const { x: { hash, inputs, out } } = JSON.parse(data)

      const fromAddr = inputs.map(({ prev_out: { addr } }) => addr)
      const toAddr = out.map(({ addr }) => addr)
      const amount = out.reduce((acc, { value }) => acc + value, 0)

      return { hash, fromAddr, toAddr, amount }
    },
    addTransaction(data) {
      const tx = this.parseTransactionData(data)

      this.transactions = [...this.transactions, tx]
    },
  },
  components: {
    BtcAmount,
    AddrList,
  }
}
</script>