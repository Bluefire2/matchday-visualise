import React, {Component} from 'react';
import {connect} from 'react-redux';
import './InputContainer.css';
import TeamInputForm from './TeamInputForm';
import {bindActionCreators} from "redux";
import {beginFetchProjections, fetchProjections} from "../actions/index";
import worker from "../workers/matchday.worker";
import WebWorker from "../workers/WebWorker";

class InputContainer extends Component {
    componentDidMount() {
        this.worker = new WebWorker(worker);
    }

    fetchProjections(values) {
        this.worker.postMessage(values);

        this.worker.addEventListener("message", event => {
            this.setState({
                p: event.data
            });
        });
    }

    submit(values) {
        console.log(values);
        this.props.beginFetchProjections();
        // this.props.fetchProjections(values);
        this.fetchProjections(values);
    }

    render() {
        return (
            <div id="input-container">
                <TeamInputForm onSubmit={this.submit.bind(this)}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchProjections,
        beginFetchProjections
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(InputContainer);