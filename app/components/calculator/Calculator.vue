<template>
	<div :class="$style.main">
		<div>
			<p :class="$style.title">{{isLoad ? 'Калькулятор' : 'Загрузка ...'}}</p>
			<transition :name="$style.animateCalc">
				<div :class="$style.contentCalc" v-if="isLoad">
				<div>
					<my-checkbox :class="$style.checkbox" type="checkbox" checked="checked" v-model="isCart">Я получаю зарплату на карту (isCart)</my-checkbox>
					<my-checkbox :class="$style.checkbox" type="checkbox" checked="checked" v-model="isProofIncome">Без подтверждения дохода (isProofIncome)</my-checkbox>
					<my-checkbox :class="$style.checkbox" type="checkbox" checked="checked" v-model="isLorem">(isLorem)</my-checkbox>
					<my-checkbox :class="$style.checkbox" type="checkbox" checked="checked" v-model="isLorem2">(isLorem2)</my-checkbox>
					<p>Ставка кредитования {{resultBet}}%</p>
					<p>Ежемесячный платёж {{sum}} ₽</p>
					<button @click="send">Рассчитать</button>
				</div>

				<div>
					<p :class="$style.title">Стоимость жилья, ₽</p>
					<my-input-number
						v-model="calc.valueHousing"
						step="1000"
						:min="calc.data.valueHousing.to"
						:max="calc.data.valueHousing.do"
					/>
					<p :class="$style.description">От: {{calc.data.valueHousing.to}} до: {{calc.data.valueHousing.do}}</p>

					<p :class="$style.title">Первоначальный взнос, ₽</p>
					<my-input-number
						v-model="initialFeeVal"
						step="1000"
						type="number"
						:min="initialFee.to"
						:max="initialFee.do"
					/>
					<p :class="$style.description">От: {{initialFee.to}} до: {{initialFee.do}}</p>

					<p :class="$style.title">Срок кредита, лет</p>
					<my-input-number
						v-model="years"
						step="1"
						type="number"
						:min="calc.data.years.to"
						:max="calc.data.years.do"
					/>
					<p :class="$style.description">От: {{calc.data.years.to}} до: {{calc.data.years.do}}</p>
				</div>
			</div>
			</transition>
		</div>
		<transition :name="$style.animatePopup">
			<div :class="$style.popup" v-if="isSend">
				<vueCustomScrollbar :class="$style.popupContent">
					<button :class="$style.close" @click="isSend = false"></button>
					<div :class="$style.tableHeader">
						<p :class="$style.tableTitle">Год: Месяц:</p>
						<p :class="$style.tableTitle">Сумма платежа</p>
						<p :class="$style.tableTitle">Проценты</p>
						<p :class="$style.tableTitle">Долг</p>
						<p :class="$style.tableTitle">Остаток</p>
					</div>

					<div :class="$style.tableLine" v-for="(element, i) in schedule" v-bind:key="i">
						<p>{{element.date}}₽</p>
						<p>{{element.pay}}₽</p>
						<p>{{element.payPercent}}₽</p>
						<p>{{element.payPrincipalDebt}}₽</p>
						<p>{{element.remainder}}₽</p>
					</div>
				</vueCustomScrollbar>
			</div>
		</transition>
	</div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';

export default {

	data() {
		return {
			isCart: false,
			isProofIncome: false,
			isLorem: false,
			isLorem2: false,
			num: 5,
			initialFeeVal: 0,
			years: 2,
			isSend: false,
			isLoad: false
		}
	},
	watch: {},
	mounted() {
		this.$store.dispatch('calc/getCalc').then(() => {
			this.initialFeeVal = this.initialFee.to;
			this.isLoad = true;
		});
	},
	computed: {
		schedule: function () {
			let newArr = new Array(this.years * 12).fill({});
			let allPay = this.calc.valueHousing;

			let arr = newArr.map((el, i) => {
				let payPercent = allPay * this.p;
				let payPrincipalDebt = this.sum - payPercent;
				allPay -= payPrincipalDebt;
				return {
					date: `Год: ${(i - (i % 12)) / 12 + 1} Месяц: ${(i % 12) + 1}`,
					pay: this.sum,
					payPercent: Math.round(payPercent),
					payPrincipalDebt: Math.round(payPrincipalDebt),
					remainder: Math.round(allPay)
				}
			});
			return arr;
		},

		p: function () {
			return this.resultBet / 100 / 12;
		},

		sum: function () {
			let q = Math.pow(1 + this.p, this.years * 12) - 1;
			let res = (this.calc.valueHousing - this.initialFeeVal) * (this.p + (this.p / q));
			return Math.ceil(res);
		},

		calc: function () {
			return this.$store.state.calc;
		},

		resultBet: function () {
			let bet = this.calc.bet * 100;
			const BET = this.calc.data.bet;
			if(this.isCart) bet += BET.isCart * 100;
			if(this.isProofIncome) bet += BET.isProofIncome  * 100;
			if(this.isLorem) bet += BET.isLorem  * 100;
			if(this.isLorem2) bet += BET.isLorem2  * 100;
			return bet / 100;
		},

		initialFee: function () {
			return {
				to: this.calc.valueHousing * this.calc.data.initialFeeCoefficient.to,
				do: this.calc.valueHousing * this.calc.data.initialFeeCoefficient.do,
			}
		},
	},
	components: {
		vueCustomScrollbar
	},
	methods: {
		send() {
			if(this.initialFeeVal < this.initialFee.to) this.initialFeeVal = this.initialFee.to;
			else if(this.initialFeeVal > this.initialFee.do) this.initialFeeVal = this.initialFee.do;

			let formData = new FormData();
			formData.append('valueHousing', this.calc.valueHousing);
			formData.append('initialFee', this.initialFeeVal);
			formData.append('years', this.years);
			formData.append('isCart', this.isCart);
			formData.append('isProofIncome', this.isProofIncome);
			formData.append('isLorem', this.isLorem);
			formData.append('isLorem2', this.isLorem2);
			this.$store.dispatch('calc/setCalc', formData).then(() => {
				this.isSend = true;
			});
		}
	},
}
</script>

<style lang="scss" module>
.main {
	width: 100%;
	height: 100%;
}

.contentCalc {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 30px;
}

.title {
	font-size: 16px;
	padding: 16px 0 4px 0;
	margin: 0;
	font-weight: 400;
}

.description {
	margin: 0;
	font-size: 14px;
	padding: 4px 0 0 0;
	font-weight: 300;
}

.checkbox {
	margin-top: 16px;
}

.popup {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
	display: flex;
	justify-content: center;
	background-color: rgba(33, 33, 33, 0.5);
}

.popupContent {
	position: relative;
	align-self: center;
	width: 100%;
	max-width: 900px;
	height: 90%;
	overflow-y: auto;
	background-color: #fff;
	border-radius: 4px;
	padding: 20px;
	box-sizing: border-box;
}

.animateCalc {
	&:global(-enter-active) {
		transition: all .5s;
	}

	&:global(-leave-active) {
		transition: all .5s;
	}

	&:global(-enter) {
		opacity: 0;
		transform: translateY(100%)
	}

	&:global(-leave-to) {
		opacity: 0;
	}
}

.tableHeader {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-column-gap: 10px;
}

.tableLine {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-column-gap: 10px;
}

.close {
	width: 27px;
	height: 27px;
	cursor: pointer;
	position: absolute;
	top: 10px;
	right: 15px;
	padding: 0;
	margin: 0;
	background-color: transparent;
	border: 0;
	outline: none;

	&:before,&:after {
		content: '';
		position: absolute;
		background-color: #000;
		width: 100%;
		height: 2px;
		top: 50%;
		left: 0;
		border-radius: 2px;
		transform: rotateZ(-45deg);
	}

	&:after {
		transform: rotateZ(45deg);
	}
}

.animatePopup {
	&:global(-enter-active) {
		transition: all .5s;
	}

	&:global(-leave-active) {
		transition: all .5s;
	}

	&:global(-enter) {
		opacity: 0;
	}

	&:global(-leave-to) {
		opacity: 0;
	}
}
</style>