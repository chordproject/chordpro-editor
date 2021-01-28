/**
 * 
 * @class ChordFinder
 * @singleton
 */
export const ChordFinder = () => {

    /**
     * attach public members to this object
     * @property _public
     * @type {Object}
     */
    const _public = {};

    const re = /\[(.*?)\]/gi;

    // to play with IE we'll use an object instead of plain array
    const _find = text => {
        const chords = {};
        //JRM corrige bug
        //var m = text.match(re);
        const m = String(text).match(re);

        if (!m || m.length < 1) {
            return {};
        }
        for (let i = m.length - 1; i >= 0; i--) {

            if (!chords[m[i]]) {
                chords[m[i]] = 0;
            }

            chords[m[i]]++;
        }

        return chords;
    };

    const _compare = (a, b) => {
        if (a.value < b.value) {
            return -1;
        }
        return (a.value > b.value) ? 1 : 0;
    };

    _public.getChords = text => {
        const chords = _find(text);
        const map = [];
        for (const key in chords) {
            if (chords.hasOwnProperty(key)) {
                map.push({
                    value: key,
                    meta: `${chords[key]} occurrence${chords[key] > 1 ? 's' : ''}`
                });
            }
        }

        return map.sort(_compare);
    };

    /* return our public interface */
    return _public;
};