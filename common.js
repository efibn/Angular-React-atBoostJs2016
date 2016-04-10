/**
 * Created by sebastianp on 06/04/2016.
 */

let
    rows = 150,
    cols = 10,
    limitRandomMillis = 5000,
    createData = function (_rows, _cols) {
        let num = 1, randomData = [];

        for (var i = 0; i < _rows; ++i) {
            randomData[i] = {};
            for (var j = 0; j < _cols; ++j) {
                randomData[i][j] = num++; //Math.round(Math.random() * 10000);
            }
        }

        return randomData;
    },
    randomMillis = function () {
        return Math.floor(Math.random() * limitRandomMillis);
    };

