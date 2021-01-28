import { ChordFinder } from './chordFinder';
import { Settings } from './settings';
import './mode-chordpro';
import './snippets-chordpro';
import './theme-cobalt';
import 'ace-builds/src-noconflict/snippets/text';
//import * as langTools from 'ace-builds/src-noconflict/ext-language_tools';
import * as langTools from './ext-language_tools';

/**
 * Finds page Ace elements
 *
 * @class Main
 * @static
 * @singleton
 */
export const Main = (() => {
	/**
	 * attach public members to this object
	 * @property _public
	 * @type {Object}
	 */
	const _public = {};

	/**
	 *
	 * @property _editor
	 * @type object
	 * @private
	 */
	let _editor = null;

	/**
	 * Preps this class for running
	 * @method init
	 * @return {void}
	 */
	_public.init = () => {
		_editor = ace.edit(Settings.ids.editor);
		_editor.setOptions(Settings.opts);
		_editor.session.setMode('ace/mode/chordpro');
		_editor.setTheme('ace/theme/cobalt');

		langTools.setCompleters([_completer]);
	};

	/**
	 *
	 * @method init
	 * @return {void}
	 */
	_public.run = (songText) => {
		_editor.setValue(songText);
		_editor.gotoLine(1);
	};

	/**
	 *
	 * @property completers
	 * @type function
	 */
	var _completer = {
		getCompletions: function (editor, session, pos, prefix, callback) {
			const finder = new ChordFinder();
			callback(null, finder.getChords(editor.getValue()));
		},
	};

	/**
	 * returns editor
	 * @method getEditor
	 * @return object
	 */
	_public.getEditor = () => _editor;

	return _public;
})();
