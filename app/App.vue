<template>
  <div :class="$style.main">
		<div :class="$style.content">
			<Calculator/>
		</div>
  </div>
</template>

<script>
import Calculator from "./components/calculator/Calculator.vue";

export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {
  },
  components: {
	  Calculator
  },
  methods: {
  },
}
</script>

<style lang="scss" module>
  .main {
	  width: 100%;
	  height: 100%;
	  display: flex;
	  justify-content: center;
  }

  .content {
	  width: 100%;
	  max-width: 800px;
	  align-self: center;
  }
</style>