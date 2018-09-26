import React, {Component} from 'react';
import {getTeamLogoURL} from '../../util';
import './TeamRow.css';
import {PROMOTE, REGULAR, RELEGATE, WIN} from "../../constants";


class TeamRow extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.zone);
        this.state = {
            teamLogoURL: ''
        }
    }

    componentDidMount() {
        console.log('waiting...');
        getTeamLogoURL(this.props.team).then(url => {
            console.log(url);
            this.setState({
                teamLogoURL: url
            });
        });
    }

    static adjustOpacity(o) {
        // return Math.sqrt(Math.sin(o * Math.PI / 2));
        return Math.pow(o, 1 / 2);
    }

    render() {
        const rowIndex = this.props.index,
            boundaryClassName = this.props.boundary ? 'boundary-team-row' : '',
            zoneClassName = (() => {
                switch (this.props.zone) {
                    case WIN:
                        return 'team-row-win';
                    case PROMOTE:
                        return 'team-row-promote';
                    case RELEGATE:
                        return 'team-row-relegate';
                    case REGULAR:
                    default:
                        return 'team-row-regular';
                }
            })();
        return (
            <tr className={`zone-row ${zoneClassName} ${boundaryClassName}`}>
                <td>
                    <img src={this.state.teamLogoURL} alt="Team logo"/>
                </td>
                <td>
                    {this.props.team}
                </td>
                {
                    this.props.projection.map((p, columnIndex) => {
                        const percent = Math.round(p * 1000) / 10;
                        return <td
                            key={columnIndex}
                            className="projection-percent"
                            onClick={() => this.props.tdClickHandler(rowIndex, columnIndex)}
                            style={{
                                opacity: TeamRow.adjustOpacity(percent / 100),
                                // background: `linear-gradient(0deg, darksalmon ${percent}%, white ${percent}%)`
                            }}
                        >{`${percent}`}</td>;
                    })
                }
            </tr>
        );
    };
}

TeamRow.defaultProps = {
    zone: REGULAR
};

export default TeamRow;
