var app = angular.module('myApp', []);

app.controller("myCtrl", function ($scope, gridSrv) {
    this.events = new Events();

    this.rows = rows;
    this.cols = cols;

    this.isDataLoaded = false;

    this.data = gridSrv.getData(this.rows, this.cols);

    this.showTable = ()=> {
        this.isDataLoaded = true;
    };

    this.play = ()=> {
        setTimeout(()=> {
            this.events.emit('play');
        })
    };
});

app.factory("gridSrv", ()=> {
    return {
        getData: (rows, cols)=> {
            return createData(rows, cols);
        }
    }
});

app.directive('myBoard', ()=> {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            events: '='
        },
        link(scope, elem){

            ReactDOM.render(
                React.createElement(Table, {data: scope.data, events: scope.events}),
                elem[0]);
        }

    }
});