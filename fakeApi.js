module.exports = function (app) {
    let data = {
        bet: {
            bet: 12,
            isCart: -2.4,
            isProofIncome: 3.2,
            isLorem: 5.7,
            isLorem2: -9.1
        },
        valueHousing: {
            to: 200000,
            do: 99999999
        },
        initialFeeCoefficient: {
            to: 0.2,
            do: 0.9
        },
        years: {
            to: 1,
            do: 30
        }
    }

    app.post('/get/calc', (req, res) => {
        setTimeout(() => res.send(data), 1000)
    });

    app.post('/set/calc', (req, res) => {
        res.send("Ok");
    });
}