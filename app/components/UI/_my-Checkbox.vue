<template>
	<label :class="$style.checkbox">
		<input
			:class="$style.checkboxInput"
			v-bind="$attrs"
			v-bind:checked="checked"
			v-on:change="$emit('change', $event.target.checked)"
		>
		<span :class="$style.checkboxCheckmark"></span>
		<p :class="$style.checkboxText"><slot>checkbox</slot></p>
	</label>
</template>

<script>
export default {
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: {
		checked: Boolean
	},
	data() {
		return {}
	},
	computed: {},
	methods: {},
	components: {}
}
</script>

<style lang="scss" module>
.checkbox {
	display: flex;
	position: relative;
	cursor: pointer;
	font-size: 18px;
	user-select: none;
	font-weight: 300;

	> .checkboxInput {
		display: none;

		&:checked ~ .checkboxCheckmark {
			background-color: rgb(255, 255, 255);

			&:after {
				display: block;
			}
		}
	}
}

.checkboxCheckmark {
	align-self: center;
	position: relative;
	height: 20px;
	width: 20px;
	min-width: 20px;
	background-color: rgb(255, 255, 255);
	margin-right: 14px;
	border: solid 1px #F39C12;

	&:after {
		content: "";
		position: absolute;
		display: none;
		left: 6px;
		top: 2px;
		width: 6px;
		height: 11px;
		border: solid #F39C12;
		border-width: 0 2px 2px 0;
		transform: rotate(45deg);
	}
}

.checkboxText {
	margin: 0;
	line-height: 20px;
}
</style>