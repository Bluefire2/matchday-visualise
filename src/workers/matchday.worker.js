import matchday from "matchday";

export default () => {
    self.addEventListener("message", e => { /* eslint no-restricted-globals: 1 */
        // eslint-disable-line no-restricted-globals
        if (!e) return;

        const p = matchday(e.league, parseInt(e.days, 10), parseInt(e.samples, 10), true);

        p.then(value => {
            postMessage(value);
        });
    });
};