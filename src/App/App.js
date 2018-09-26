import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import TeamsTable from '../TeamsTable';
import Sidebar from "../Sidebar/Sidebar";
import InputContainer from "../InputContainer/InputContainer";

class App extends Component {
    render() {
        return (
            <div className="App">
                {/*
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                */}
                <div id="content">
                    <Sidebar header={'Header'}>
                        <InputContainer/>
                    </Sidebar>
                    <TeamsTable/>
                </div>
            </div>
        );
    }
}

export default App;
