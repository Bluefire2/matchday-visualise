import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',//this.props.placeholder,
        };
    };

    handleChange = (selectedOption) => {
        console.log('test');
        this.setState({selectedOption});
        // selectedOption can be null when the `x` (close) button is clicked
        if (selectedOption) {
            console.log(`Selected: ${selectedOption.label}`);
        }
    };

    render() {
        const {field} = this.props,
            {selectedOption} = this.state;
        /*
            <input
                id={field.id}
                placeholder={field.placeholder}
                type={field.type}
                {...field.input}
            />
         */
        return (
            <Select
                id={field.id}
                name="form-field-name"
                value={selectedOption}
                onChange={this.handleChange.bind(this)}
                options={[
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                ]}
                {...field.input}
            />
        );
    };
}

export default SelectWrap;