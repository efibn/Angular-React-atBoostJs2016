var app = angular.module('myApp', ['react']);

app.controller("myCtrl", function ($scope, gridSrv) {
    this.events = new Events();

    this.rows = rows;
    this.cols = cols;

    this.isDataLoaded = false;

    this.data = gridSrv.getData(this.rows, this.cols);

    this.showTable = ()=> {
        this.props = {
            data: this.data,
            events: this.events,
            onClick: this.onClick
        };

        this.isDataLoaded = true;
    };

    this.onClick = (val) => {
        this.cellValue = val;
    }


    this.play = ()=> {
        setTimeout(()=> {
            this.events.emit('play');
        });
    };
});

app.factory("gridSrv", ()=> {
    return {
        getData: (rows, cols)=> {
            return createData(rows, cols);
        }
    }
});