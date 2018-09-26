import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import md5 from 'md5';
import TeamRow from './TeamRow';
import {fillArrayWithZeros} from "../util";
import {LEAGUE_ZONES, PROMOTE, REGULAR, RELEGATE, WIN} from "../constants";
import './TeamsTable.css';

class TeamsTable extends Component {
    tdClickHandler(row, column) {
        console.log(`Clicked! (${row}, ${column})`);
        // maybe add more here
    }

    render() {
        const nTeams = this.props.projections.size,
            rows = fillArrayWithZeros(nTeams),
            headers = [];
        let i = 1,
            prevZone;
        for (let [team, projection] of this.props.projections) {
            const key = md5(team),
                index = this.props.standings.findIndex(({team: teamName}) => teamName === team),
                props = {
                    team,
                    projection,
                    index,
                    tdClickHandler: this.tdClickHandler.bind(this)
                },
                zones = LEAGUE_ZONES[this.props.league];

            // eslint-disable-next-line
            rows[index] = (() => {
                if (index === 0) {
                    props.zone = WIN;
                } else if (index < zones.promote) {
                    props.zone = PROMOTE;
                } else if (nTeams - index <= zones.relegate) {
                    props.zone = RELEGATE;
                } else {
                    props.zone = REGULAR;
                }
                props.boundary = typeof prevZone !== 'undefined' && prevZone !== props.zone;
                prevZone = props.zone;
                return <TeamRow key={key} {...props}/>;
            })();
            headers.push(<th key={key}>{i++}</th>);
        }
        return (
            <div id="teams" className={`${this.props.tableLoading ? 'loading' : ''}`}>
                <div id="loading-container">
                    <div>
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height="100"
                            width="100"
                        />
                    </div>
                </div>
                <table className="teams-table">
                    <thead>
                    <tr>
                        <th colSpan={2} rowSpan={2}>Team</th>
                        <th colSpan={headers.length}>Projected position</th>
                    </tr>
                    <tr>{headers}</tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    };
}

const mapStateToProps = ({projections, standings, league, tableLoading}) => {
    return {
        projections,
        standings,
        league,
        tableLoading
    };
};

export default connect(mapStateToProps)(TeamsTable);
