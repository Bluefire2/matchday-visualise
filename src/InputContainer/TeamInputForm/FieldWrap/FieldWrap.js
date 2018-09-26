import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const placeholders = {
    league: 'Enter league'
};

class FieldWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ''
        };
    }

    handleChangeBad(value) {
        console.log('test');
    }

    handleChange(event, value) {
        console.log(value);
        this.setState({
            selectedOption: value.value
        });
    }

    renderField(field) {
        const {meta: {touched, error}} = field,
            divClasses = `form-group${touched && error ? ' has-danger' : ''}`,
            baseInputClasses = `form-control${touched && error ? ' is-invalid' : ''}`,
            inputClasses = typeof field.classes === 'undefined' ? baseInputClasses : baseInputClasses + ' ' + field.classes;
        let input;
        if (field.type === 'textarea') {
            input = <textarea
                id={field.id}
                placeholder={field.placeholder}
                className={inputClasses}
                type={field.type}
                {...field.input}
            />;
        } else if (field.type === 'select') {
            input = <Select
                name="form-field-name"
                options={[
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                ]}
                {...field.input}
            />;
        } else {
            input = <input
                id={field.id}
                placeholder={field.placeholder}
                className={inputClasses}
                type={field.type}
                {...field.input}
            />;
        }

        return (
            <div className={divClasses}>
                <label>{field.label}</label>
                {input}
                <div className="invalid-feedback">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        const {label, name, type, placeholder} = this.props;
        return (
            <Field
                label={label}
                name={name}
                type={type}
                placeholder={placeholder}
                component={this.renderField.bind(this)}
            />
        );
    }
}

export default FieldWrap