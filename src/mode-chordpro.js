import * as ace from "ace-builds";

ace.define(
  "ace/mode/chordpro",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/chordpro_highlight_rules",
    "ace/mode/folding/chordpro",
  ],
  function (require, exports, module) {
    var oop = require("ace/lib/oop");
    // defines the parent mode
    var TextMode = require("./text").Mode;
    // defines the language specific highlighters rules
    var ChordproHighlightRules = require("./chordpro_highlight_rules")
      .ChordproHighlightRules;
    var FoldMode = require("./folding/chordpro").FoldMode;
    var ChordproFolding = new FoldMode();

    var Mode = function () {
      // set everything up
      this.HighlightRules = ChordproHighlightRules;
      this.foldingRules = ChordproFolding;
    };

    oop.inherits(Mode, TextMode);

    (function () {
      // create worker for live syntax checking
      this.createWorker = function (session) {
        return null;
      };

      this.$id = "ace/mode/chordpro";
      this.snippetFileId = "ace/snippets/chordpro";
    }.call(Mode.prototype));

    exports.Mode = Mode;
  }
);

ace.define(
  "ace/mode/chordpro_highlight_rules",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules",
  ],
  function (require, exports, module) {
    var oop = require("ace/lib/oop");

    var TextHighlightRules = require("./text_highlight_rules")
      .TextHighlightRules;

    var ChordproHighlightRules = function () {
      // capture groups
      var regexOpenBrace = "(^\\s*{)", // no spaces allowed between "{" and the command, removed \\s*
        regexCloseBrace = "(\\s*}\\s*$)",
        regexOpenBracket = "(\\[)",
        regexCloseBracket = "(\\])",
        regexColon = "(\\s*:)",
        regexAnything = "(.+?)",
        regexWord = "(\\s*[\\w\\-_]+\\s*)";

      // stand alone
      var regexNumber = "\\b[0-9]+\\b";

      // token (CSS classes names)
      var tkBrace = "meta.tag",
        tkCommand = "meta",
        tkSingleTag = "entity.name",
        tkText = "text",
        tkNumeric = "constant.numeric",
        tkChar = "constant.character",
        tkCharEscape = "constant.character.escape",
        tkComment = "comment",
        tkKeyword = "keyword",
        tkString = "string",
        tkInvalid = "invalid";

      // regexp must not have capturing parentheses. Use (?:) instead.
      // regexps are ordered -> the first match is used
      this.$rules = {
        start: [
          {
            token: tkComment,
            regex: "/^#.*$/", // debated this, for now MUST be first character (otherwise allow \\s*)
          },
          { // start of block, column break and new page
            token: [tkBrace, tkCommand, tkBrace],
            regex:
              regexOpenBrace +
              "(column_break|cb|new_page|np|start_of_(?:[a-z]+)|so(?:c|v|b)|end_of_(?:[a-z]+)|eo(?:c|v|b))" +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // start of block with label
            token: [tkBrace, tkCommand, tkBrace, tkString, tkBrace],
            regex:
              regexOpenBrace +
              "(start_of_(?:[a-z]+)|so(?:c|v|b))" +
              regexColon +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // start of tab block
            token: [tkBrace, tkCommand, tkBrace],
            regex: regexOpenBrace + "(start_of_tab|sot)" + regexCloseBrace,
            caseInsensitive: true,
            next: "tabBlockTag",
          },
          { // start of tab block with label
            token: [tkBrace, tkCommand, tkBrace, tkText, tkBrace],
            regex:
              regexOpenBrace +
              "(start_of_tab|sot)" +
              regexColon +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
            next: "tabBlockTag",
          },
          { // define tag
            token: [tkBrace, tkCommand, tkBrace],
            regex: regexOpenBrace + "(define)" + regexColon,
            caseInsensitive: true,
            next: "defineTag",
          },
          { // comment tag
            token: [tkBrace, tkCommand, tkBrace, tkText, tkBrace],
            regex:
              regexOpenBrace +
              "(c|comment)" +
              regexColon +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // known meta tag
            token: [tkBrace, tkCommand, tkBrace, tkString, tkBrace],
            regex:
              regexOpenBrace +
              "(album|arranger|artist|capo|composer|copyright|duration|key|lyricist|tempo|time|title|t|subtitle|st|year)" +
              regexColon +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // custom extensions
            token: [tkBrace, tkCommand, tkBrace],
            regex:
              regexOpenBrace +
              "(x_[aA-zZ0-9_]+)" +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // custom extensions with value
            token: [tkBrace, tkCommand, tkBrace, tkString, tkBrace],
            regex:
              regexOpenBrace +
              "(x_[aA-zZ0-9_]+)" +
              regexColon +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // custom meta tag
            token: [tkBrace, tkCommand, tkBrace, tkKeyword, tkString, tkBrace],
            regex:
              regexOpenBrace +
              "(meta)" +
              regexColon +
              regexWord +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // invalid meta tag with value
            token: [tkBrace, tkInvalid, tkBrace, tkString, tkBrace],
            regex:
              regexOpenBrace +
              "([-\\S]+)" +
              regexColon +
              regexAnything +
              regexCloseBrace,
            caseInsensitive: true,
          },
          { // invalid meta tag
            token: [tkBrace, tkInvalid, tkBrace],
            regex: regexOpenBrace + regexAnything + regexCloseBrace,
            caseInsensitive: true,
          },
          { // numeric value
            token: tkNumeric,
            regex: regexNumber,
          },
          { // chords
            token: [tkCharEscape, tkKeyword, tkCharEscape],
            regex:
              regexOpenBracket + "(\\*.+|(?:[A-G].*?))" + regexCloseBracket,
            caseInsensitive: true,
          },
          { // invalid chords
            token: [tkCharEscape, tkInvalid, tkCharEscape],
            regex: regexOpenBracket + regexAnything + regexCloseBracket,
          },
          { // spaces
            token: tkText,
            regex: "\\s+",
          },
        ],
        // define tag
        defineTag: [
          {
            token: tkBrace,
            regex: regexCloseBrace,
            next: "start",
          },
          {
            token: tkNumeric,
            regex: regexNumber,
          },
          {
            token: "keyword.control",
            regex: "\\b(fingers|frets|base-fret)\\b",
            caseInsensitive: true,
          },
          {
            defaultToken: tkString,
          },
        ],

        // tabs block
        tabBlockTag: [
          {
            token: [tkBrace, tkCommand, tkBrace],
            regex: regexOpenBrace + "(end_of_tab|eot)" + regexCloseBrace,
            caseInsensitive: true,
            next: "start",
          },
          {
            token: "comment.line",
            regex: "-+",
          },
          {
            token: tkChar,
            regex: "\\|+",
          },
          {
            token: tkString,
            regex: "[A-G][b#]?",
          },
          {
            token: tkNumeric,
            regex: regexNumber,
          },
          {
            defaultToken: tkComment,
          },
        ],
      };
    };

    oop.inherits(ChordproHighlightRules, TextHighlightRules);
    exports.ChordproHighlightRules = ChordproHighlightRules;
  }
);

ace.define(
  "ace/mode/folding/chordpro",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/range",
    "ace/mode/folding/fold_mode",
  ],
  function (require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Range = require("ace/range").Range;
    var BaseFoldMode = require("./fold_mode").FoldMode;

    var FoldMode = (exports.FoldMode = function () {});
    oop.inherits(FoldMode, BaseFoldMode);

    (function () {
      // regular expressions that identify starting and stopping points
      this.foldingStartMarker = /\{(so(?<name>v|b|c|t)|start_of_(?<longname>[^\s^:.]+?))(: [^\s.]+)?\}/;
      this.foldingStopMarker = /\{(eo(?<name>v|b|c|t)|end_of_(?<longname>[^\s^:.]+?))}/;

      this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.getLine(row);

        var match = line.match(this.foldingStartMarker);
        if (match) {
          const shortname = match.groups["name"];
          const longname = match.groups["longname"];
          if (!shortname && !longname) {
            return;
          }
          let name = shortname ? shortname : longname;
          return this.getRegionBlock(session, line, row, name);
        }
        return range;
      };
      this.getRegionBlock = function (session, line, row, name) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        let hasMatch = false;

        while (++row < maxRow) {
          line = session.getLine(row);
          var m = this.foldingStopMarker.exec(line);
          if (!m) continue;
          else if (m.groups["name"] === name || m.groups["longname"] === name) {
            hasMatch = true;
            break;
          }
        }

        var endRow = row;
        if (endRow > startRow && hasMatch) {
          return new Range(startRow, startColumn, endRow, line.length);
        }
      };
    }.call(FoldMode.prototype));
  }
);
