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
        this.events.emit('play');
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
        template: `
                <table>
                    <tr ng-repeat="row in data">
                        <td ng-repeat="col in row" class="cell">
                            <my-board-cell cell-value="{{col}}">
                        </td>
                    </tr>
                </table>`
    }
});

app.directive('myBoardCell', ($timeout)=> {
    return {
        scope: {
            cellValue: '@'
        },
        template: `<span style="color:{{cellValue}}">{{cellValue}}</span>`,
        link: function (scope) {
            scope.$on('play', ()=> {
                $timeout(()=> {
                    scope.cellValue = "#" + Math.random().toString(16).slice(2, 8);
                }, randomMillis());
            })
        }
    }
});