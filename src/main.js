import { ChordFinder } from './chordFinder';
import { Settings } from './settings';
import './mode-chordpro';
import './snippets-chordpro';
import './theme-cobalt';
import './theme-clouds';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/snippets/text';
//import * as defaultTheme from 'ace-builds/src-noconflict/theme-textmate';
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
		langTools.setCompleters([_completer]);
	};

	_public.doSetTheme = (value) => {
		if (value === 'dark') {
			_editor.setTheme('ace/theme/cobalt');
		} else {
			_editor.setTheme('ace/theme/clouds');
		}
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
