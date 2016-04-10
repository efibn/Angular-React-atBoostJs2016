/**
 * Created by sebastianp on 05/04/2016.
 */
"use strict";

class Sample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.showTable = this.showTable.bind(this);
        this.play = this.play.bind(this);
    }

    componentWillMount() {
        this.events = new Events();
    }

    showTable() {
        this.setState({
            data: this.props.data
        });
    }

    play() {
        this.events.emit("play");
    }

    render() {
        var button = !this.state.data.length > 0 ?
            <button onClick={this.showTable}>Show Table (Rows:{rows}, Cols: {cols})</button> :
            <button onClick={this.play}>** PLAY **</button>

        return (<div>
            {button}
            <Table data={this.state.data} events={this.events}></Table>
        </div>);
    }
}

ReactDOM.render(
    <Sample data={createData(rows, cols)}></Sample>,
    document.getElementById("container")
);