import * as ace from 'ace-builds';

ace.define('ace/snippets/chordpro', ['require', 'exports', 'module'], function (require, exports, module) {

    exports.snippetText = [
        // album tag
        'snippet album',
        '	{album: ${1:value}}',

        // arranger tag
        'snippet arranger',
        '	{arranger: ${1:value}}',

        // artist tag
        'snippet a',
        '	{artist: ${1:value}}',
        'snippet artist',
        '	{artist: ${1:value}}',

        // capo tag
        'snippet capo',
        '	{capo: ${1:5}}',

        // composer tag
        'snippet composer',
        '	{composer: ${1:value}}',

        // copyright tag
        'snippet copyright',
        '	{copyright: ${1:value}}',

        // duration tag
        'snippet duration',
        '	{duration: ${1:4}:${2:00}}',

        // key tag
        'snippet k',
        '	{key: ${1:Am}}',
        'snippet key',
        '	{key: ${1:Am}}',

        // lyricist tag
        'snippet lyricist',
        '	{lyricist: ${1:value}}',

        // tempo tag
        'snippet tempo',
        '	{tempo: ${1:120}}',

        // time tag
        'snippet time',
        '	{time: ${1:4}/${2:4}}',

        // title tag
        'snippet t',
        '	{title: ${1:value}}',
        'snippet title',
        '	{title: ${1:value}}',

        // subtitle tag
        'snippet st',
        '	{subtitle: ${1:value}}',
        'snippet subtitle',
        '	{subtitle: ${1:value}}',

        // year tag
        'snippet year',
        '	{year: ${1:2020}}',

        // meta tag
        'snippet meta',
        '	{meta: ${1:label} ${2:value}}',

        // comment tag
        'snippet c',
        '	{comment: ${1:value}}',
        'snippet comment',
        '	{comment: ${1:value}}',

        // chorus block
        'snippet soc',
        '	{start_of_chorus}',
        'snippet eoc',
        '	{end_of_chorus}',
        'snippet chorus',
        '	{start_of_chorus: ${1:Chorus}}',
        '	${2:lyrics}',
        '	{end_of_chorus}',

        // verse block
        'snippet sov',
        '	{start_of_verse}',
        'snippet eov',
        '	{end_of_verse}',
        'snippet verse',
        '	{start_of_verse: ${1:Verse} ${2:1}}',
        '	${3:lyrics}',
        '	{end_of_verse}',

        // bridge block
        'snippet sob',
        '	{start_of_bridge}',
        'snippet eob',
        '	{end_of_bridge}',
        'snippet bridge',
        '	{start_of_bridge: ${1:Bridge}}',
        '	${2:lyrics}',
        '	{end_of_bridge}',
        
        // tabs block
        'snippet sot',
        '	{start_of_tab}',
        'snippet eot',
        '	{end_of_tab}',
        'snippet tab',
        '	{start_of_tab}',
        '	e|-${1:-}---------------------------------|',
        '	B|----------------------------------|',
        '	G|---------------------------------|',
        '	D|----------------------------------|',
        '	A|----------------------------------|',
        '	E|----------------------------------|',
        '	{end_of_tab}',

        // define tag
        'snippet d',
        '	{define: ${1:Am} base-fret ${2:1} frets ${3:0 0 0 0 0 0} fingers ${4:0 0 0 0 0 0}}',
        'snippet define',
        '	{define: ${1:Am} base-fret ${2:1} frets ${3:0 0 0 0 0 0} fingers ${4:0 0 0 0 0 0}}',

        // single-liners
        'snippet cb',
        '	{column_break}',
        'snippet column',
        '	{column_break}',

        // that's all folks!
        // chord usage
        'snippet [',
        '	[${1:Am}]',

        'snippet !',
        '	{title:${1:title}}',
        '	{artist:${2:artist}}',
        '	{duration:${3:04:00}}',
        '	{key:${4:C}}',
        '	',
        '	${5:lyrics}',
        '	{start_of_chorus}',
        '	${6:lyrics}',
        '	{end_of_chorus}',

    ].join("\n");

    exports.scope = "chordpro";
});