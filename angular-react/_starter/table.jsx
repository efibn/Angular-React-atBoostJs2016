/**
 * Created by sebastianp on 08/04/2016.
 */
"use strict";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.handleCellClick = this.handleCellClick.bind(this);
    }

    handleCellClick(val) {
        this.props.onClick && this.props.onClick(val);

        console.log('Clicked on: ' + val + ' cell');
    }

    render() {
        let rows = this.props.data && this.props.data.map((row, i)=> {
                let cols = [];

                _.forEach(row, (item, cIdx)=> {
                    cols.push(<Cell cellValue={item} key={i.toString() + cIdx.toString()} events={this.props.events} onClick={this.handleCellClick}></Cell>);
                });

                return (<tr key={i}>
                    {cols}
                </tr>);
            });

        return (
            <table>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}
Table.propTypes = {
    data: React.PropTypes.array.isRequired,
    events: React.PropTypes.object.isRequired
};

class Cell extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.play = this.play.bind(this);

        this.state = {
            val: null
        };
    }

    componentWillMount() {
        this.setState({
            val: this.props.cellValue
        });

        this.props.events.on("play", this.play);
    }

    play() {
        setTimeout(()=> {
            this.setState({
                val: "#" + Math.random().toString(16).slice(2, 8)
            });

        }, randomMillis());
    }

    onClick() {
        this.props.onClick && this.props.onClick(this.state.val);
    }

    render() {
        return (<td className="cell" style={{color:this.state.val}} onClick={this.onClick}>
            {this.state.val}
        </td>);
    }
}
Cell.propTypes = {
    cellValue: React.PropTypes.number.isRequired,
    events: React.PropTypes.object.isRequired
};


window.Table = Table;