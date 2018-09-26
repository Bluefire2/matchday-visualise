import React, {Component} from 'react';
import {connect} from 'react-redux';
import './InputContainer.css';
import TeamInputForm from './TeamInputForm';
import {bindActionCreators} from "redux";
import {beginFetchProjections, fetchProjections} from "../actions/index";

class InputContainer extends Component {
    submit(values) {
        console.log(values);
        console.log(this.props.fetchProjections);
        this.props.beginFetchProjections();
        this.props.fetchProjections(values);
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