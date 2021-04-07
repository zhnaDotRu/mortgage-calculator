export default {
    setData(state, payload) {
        state.data = payload;
    },

    setStartValue(state, payload) {
        state.bet = payload.bet.bet;
        state.valueHousing = payload.valueHousing.to;
        state.valueContribution = payload.valueHousing.to * payload.initialFeeCoefficient.to;
        state.isLoadStartData = true;
    }
}