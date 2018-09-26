import matchday from 'matchday';

export const FETCH_PROJECTIONS = 'FETCH_PROJECTIONS';
export const BEGIN_FETCH_PROJECTIONS = 'BEGIN_FETCH_PROJECTIONS';
export const SET_LEAGUE = 'SET_LEAGUE';

export const fetchProjections = ({league, days, samples}) => {
    return {
        type: FETCH_PROJECTIONS,
        payload: matchday(league, parseInt(days, 10), parseInt(samples, 10), true)
    };
};

export const beginFetchProjections = () => {
    return {
        type: BEGIN_FETCH_PROJECTIONS
    };
};

export const setLeague = league => {
    return {
        type: SET_LEAGUE,
        payload: league
    }
};