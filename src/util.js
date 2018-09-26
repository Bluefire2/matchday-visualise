import axios from 'axios';
import cheerio from 'cheerio';
import {remove as removeDiacritics} from 'diacritics';


// for use at http://footballdatabase.com/
const convertTeamNameMap = {
    // PREMIER LEAGUE
    'Liverpool FC': 'Liverpool',
    'Chelsea FC (ENG)': 'Chelsea',
    'Watford (ENG)': 'Watford',
    'Wolverhampton Wanderers': 'Wolverhampton',
    'Brighton &amp; Hove Albion': 'Brighton and Hove Albion',
    'Everton FC': 'Everton',
    'Southampton FC': 'Southampton',
    'Newcastle United': 'Newcastle'
};

const convertTeamName = team => {
    if (typeof convertTeamNameMap[team] === 'undefined') return team;
    else return convertTeamNameMap[team];
};

export const getTeamLogoURL = teamName => {
    const DB = 'https://allorigins.me/get?method=raw&url=http://footballdatabase.com/clubs-list-letter/',
        firstChar = teamName.charAt(0);
    const f = teamName === 'Brighton and Hove Albion';
    console.log(teamName, f);
    return axios.get(`${DB}${firstChar}`).then(({data}) => {
        const $ = cheerio.load(data);
        const imageLinks = $('.clubbrowser').find('a.sm_logo-name');
        let correctLinkIndex = 0;
        imageLinks.each((i, link) => {
            const linkText = $(link).html();
            if (f) console.log(convertTeamName(removeDiacritics(linkText)));
            if(convertTeamName(removeDiacritics(linkText)) === teamName) {
                correctLinkIndex = i;
                return false; // break
            }
        });

        console.log(teamName, correctLinkIndex);
        const relativePath = $(imageLinks[correctLinkIndex])
            .css('background-image').replace('url(','').replace(')','').replace(/"/gi, "");
        return `http://footballdatabase.com${relativePath}`;
    });
};

export const objToMap = obj => {
    const map = new Map();
    Object.keys(obj).forEach(key => {
        map.set(key, obj[key]);
    });
    return map;
};

const initialProjections = objToMap(require('./data/projections.json')),
    initialStandings = require('./data/standings.json');

export const fauxMatchday = (league, days, samples, verbose) => {
    return Promise.resolve({
        probabilities: initialProjections,
        standings: initialStandings
    });
};

export const fauxLeaguesSupported = ['PREMIER', 'BRASILEIRAO'];

export const fillArrayWithZeros = n => {
    const arr = Array.apply(null, Array(n));
    return arr.map(x => 0);
};

export const validation = {
    required: value => value ? undefined : 'Field is required',
    gt: limit => value => parseInt(value, 10) > limit ? undefined : `Value must be strictly greater than ${limit}`,
    integral: value => Number.isInteger(parseFloat(value)) ? undefined : 'Value must be integral'
};