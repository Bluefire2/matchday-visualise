import React, {Component} from 'react';
import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar">
                <div className="sidebar-header">
                    <h3>{this.props.header}</h3>
                </div>
                {this.props.children}
            </div>
        );
    };
}

export default Sidebar;