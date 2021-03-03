import * as ace from 'ace-builds';

ace.define(
	'ace/mode/chordpro',
	[
		'require',
		'exports',
		'module',
		'ace/lib/oop',
		'ace/mode/text',
		'ace/mode/chordpro_highlight_rules',
	],
	function (require, exports, module) {
		var oop = require('ace/lib/oop');
		// defines the parent mode
		var TextMode = require('./text').Mode;
		// defines the language specific highlighters rules
		var ChordproHighlightRules = require('./chordpro_highlight_rules')
			.ChordproHighlightRules;

		var Mode = function () {
			// set everything up
			this.HighlightRules = ChordproHighlightRules;
		};

		oop.inherits(Mode, TextMode);

		(function () {
			// create worker for live syntax checking
			this.createWorker = function (session) {
				return null;
			};

			this.$id = 'ace/mode/chordpro';
			this.snippetFileId = 'ace/snippets/chordpro';
		}.call(Mode.prototype));

		exports.Mode = Mode;
	}
);

ace.define(
	'ace/mode/chordpro_highlight_rules',
	[
		'require',
		'exports',
		'module',
		'ace/lib/oop',
		'ace/mode/text_highlight_rules',
	],
	function (require, exports, module) {
		var oop = require('ace/lib/oop');

		var TextHighlightRules = require('./text_highlight_rules')
			.TextHighlightRules;

		var ChordproHighlightRules = function () {
			// capture groups
			var regexOpenBrace = '(^\\s*{)', // no spaces allowed between "{" and the command, removed \\s*
				regexCloseBrace = '(\\s*}\\s*$)',
				regexColon = '(\\s*:)';

			// stand alone
			var regexNumber = '\\b[0-9]+\\b';

			// token (CSS classes names)
			var tkBrace = 'meta.tag',
				tkCommand = 'meta',
				tkSingleTag = 'entity.name';

			// regexp must not have capturing parentheses. Use (?:) instead.
			// regexps are ordered -> the first match is used
			this.$rules = {
				start: [
					{
						token: 'comment',
						regex: '^#.*$', // debated this, for now MUST be first character (otherwise allow \\s*)
					},
					{
						token: [tkBrace, tkSingleTag, tkBrace],
						regex:
							regexOpenBrace +
							'(column_break|new_page|np|colb|start_of_chorus|soc|end_of_chorus|eoc)' +
							regexCloseBrace,
						caseInsensitive: true,
					},
					{
						token: [tkBrace, tkSingleTag, tkBrace],
						regex: regexOpenBrace + '(start_of_tab|sot)' + regexCloseBrace,
						caseInsensitive: true,
						next: 'tabBlockTag',
					},
					{
						token: [tkBrace, tkCommand, tkBrace],
						regex: regexOpenBrace + '(define)' + regexColon,
						caseInsensitive: true,
						next: 'defineTag',
					},
					{
						// tkCommand?
						token: [tkBrace, 'meta', tkBrace, 'text', tkBrace],
						regex:
							regexOpenBrace +
							'(c|comment)' +
							regexColon +
							'(.*)' +
							regexCloseBrace,
						caseInsensitive: true,
					},
					{
						token: [tkBrace, tkCommand, tkBrace, 'string', tkBrace],
						regex:
							regexOpenBrace +
							'(album|arranger|artist|capo|composer|copyright|duration|key|lyricist|tempo|time|title|t|subtitle|st|year)' +
							regexColon +
							'(.*)' +
							regexCloseBrace,
						caseInsensitive: true,
					},
					{
						token: [tkBrace, 'invalid', tkBrace, 'string', tkBrace],
						regex:
							regexOpenBrace +
							'([-\\S]+)' +
							regexColon +
							'(.*)' +
							regexCloseBrace,
						caseInsensitive: true,
					},
					{
						token: [tkBrace, 'invalid', tkBrace],
						regex: regexOpenBrace + '(.+)' + regexCloseBrace,
						caseInsensitive: true,
					},
					{
						token: 'constant.numeric',
						regex: regexNumber,
					},
					{
						token: [
							'constant.character.escape',
							'keyword',
							'constant.character.escape',
						],
						regex: '(\\[)(.*?)(\\])',
					},
					{
						token: 'text',
						regex: '\\s+',
					},
				],

				defineTag: [
					{
						token: tkBrace,
						regex: regexCloseBrace,
						next: 'start',
					},
					{
						token: 'constant.mumeric',
						regex: regexNumber,
					},
					{
						token: 'keyword.control',
						regex: '\\b(fingers|frets|finger|fret|string)\\b',
						caseInsensitive: true,
					},
					{
						token: [tkCommand, tkBrace],
						regex: '\\b(add)' + regexColon,
						caseInsensitive: true,
					},
					{
						defaultToken: 'string',
					},
				],

				tabBlockTag: [
					{
						token: [tkBrace, tkSingleTag, tkBrace],
						regex: regexOpenBrace + '(end_of_tab|eot)' + regexCloseBrace,
						caseInsensitive: true,
						next: 'start',
					},
					{
						token: 'comment.line',
						regex: '-+',
					},
					{
						token: 'constant.character',
						regex: '\\|+',
					},
					{
						token: 'string',
						regex: '[A-G][b#]?',
					},
					{
						token: 'constant.mumeric',
						regex: regexNumber,
					},
					{
						defaultToken: 'comment',
					},
				],
			};
		};

		oop.inherits(ChordproHighlightRules, TextHighlightRules);

		exports.ChordproHighlightRules = ChordproHighlightRules;
	}
);
