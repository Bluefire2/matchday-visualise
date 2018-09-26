import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import md5 from 'md5';
import './TeamInputForm.css';
import {fauxLeaguesSupported, validation} from "../../util";

const placeholders = {
    league: 'Enter league',
    days: 7
};

const initialValues = {
    // set initial form values here
    samples: 1000000,
    days: 7
};

const {required, gt, integral} = validation,
    gtzero = gt(0);

class TeamInputForm extends Component {
    renderField({id, placeholder, input, label, type, values, classes, meta: {touched, error, warning}}) {
        const divClasses = `form-group${touched && error ? ' has-danger' : ''}`,
            baseInputClasses = `form-control${touched && error ? ' is-invalid' : ''}`,
            inputClasses =
                typeof classes === 'undefined' ? baseInputClasses : baseInputClasses + ' ' + classes;
        let inputElem;
        if (type === 'select') {
            inputElem =
                <div className="form-input">
                    <input
                        id={id}
                        placeholder={placeholder}
                        className={inputClasses}
                        type="text"
                        list={input.name}
                        {...input}
                    />
                    <datalist id={input.name}>
                        {
                            values.map(value => <option value={value} key={md5(value)}/>)
                        }
                    </datalist>
                </div>;
        } else {
            const Input = type === 'textarea' ? 'textarea' : 'input';
            inputElem =
                <div className="form-input">
                    <Input
                        id={id}
                        placeholder={placeholder}
                        className={inputClasses}
                        type={type}
                        {...input}
                    />
                </div>;
        }

        return (
            <div className={divClasses}>
                <label>{label}</label>
                {inputElem}
                <div className="invalid-feedback" style={{display: error ? 'unset' : 'none'}}>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div id="team-input-form">
                <form onSubmit={handleSubmit}>
                    <Field
                        label="League:"
                        name="league"
                        type="select"
                        placeholder={placeholders.league}
                        values={fauxLeaguesSupported}
                        component={this.renderField}
                        validate={required}
                    />
                    <Field
                        label="Days to simulate:"
                        name="days"
                        type="number"
                        step="1"
                        placeholder={placeholders.days}
                        component={this.renderField}
                        validate={[required, integral, gtzero]}
                    />
                    <Field
                        label="Samples:"
                        name="samples"
                        type="number"
                        step="10000"
                        component={this.renderField}
                        validate={[required, integral, gtzero]}
                    />
                    <button type="submit" className="btn">Calculate</button>
                </form>
            </div>
        );
    }
}

const form = reduxForm({
    form: 'NewChartForm',
    initialValues
})(TeamInputForm);

const mapStateToProps = state => {
    return {
        initialValues
    }
};

export default connect(null, null)(form);