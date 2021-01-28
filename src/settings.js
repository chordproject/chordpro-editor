/**
 * @class Settings
 * @static
 * @singleton
 */
export const Settings = (() => {
    /**
     * attach public members to this object
     * @property _public
     * @type {Object}
     */
    const _public = {};

    /**
     * ID's of key HTML page elements
     * @property ids
     * @type JSON Object
     */
    _public.ids = {
        editor: "gcEditor", // element holding the song's text       
    };

    /**
     * Options (Features) you can turn on or off
     * @property opts
     * @type JSON Object
     */
    _public.opts = {
        maxLines: Infinity,
        enableSnippets: true,
        enableBasicAutocompletion: true
    };

    /* return our public interface
     */
    return _public;
})();