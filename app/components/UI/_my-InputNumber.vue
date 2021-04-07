<template>
	<label :class="$style.main">
		<button :class="$style.button" @click="up">+</button>
		<input
			:class="$style.input"
			v-bind="$attrs"
			v-bind:value="value"
			v-on="inputListeners"
			ref="input"
			type="number"
		>
		<button :class="$style.button" @click="down">-</button>
	</label>
</template>

<script>
export default {
	inheritAttrs: false,
	props: [
		'value'
	],
	data() {
		return {}
	},
	computed: {
		inputListeners: function () {
			return Object.assign({},
				this.$listeners,
				{
					input: (event) => {
						this.$emit('input', event.target.value)
					}
				}
			)
		}
	},
	methods: {
		down() {
			this.$refs.input.stepDown();
			this.$emit('input', this.$refs.input.value);
		},

		up() {
			this.$refs.input.stepUp();
			this.$emit('input', this.$refs.input.value);
		}
	},
	components: {}
}
</script>

<style lang="scss" module>
.main {
	display: flex;
}

.button {
	font-size: 30px;
	color: #F39C12;
	background-color: transparent;
	border: 0;
	outline: none;
	cursor: pointer;
}

.input {
	flex: 1;
	text-align: center;
	font-size: 18px;
	outline: none;
	border: solid 1px #F39C12;
	border-radius: 4px;
	color: #676767;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	margin: 0;
}
</style>