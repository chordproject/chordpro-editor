# ChordPro Editor

A JavaScript frontend library for editing ChordPro songs.

Inspired by: https://github.com/buzcarter/UkeGeeks.

## Overview

Reads marked-up music (lyrics + chords) extracting all of the chords used.\
Use **Ace** editor with a custom mode for Chordpro song texts.

**Part of [ChordProject](https://chordproject.com/)**

## Specifications
- ES6
- 'Ace' as Node dependence (to be able to use the latest version)
- Webpack (bundle and minify) to optimize performance (Mode Production) and debugging (Mode Development)

## Usage

`ChordProject Editor` is on npm. To install run:

```sh
$ npm i chordproject-editor
```

## Demo

1.  Clone
2.  Install dependencies:

```sh
$ npm i
```

3.  Run in mode dev:

```sh
$ npm run start
```

Open a browser and navigate to http://localhost:8080/ to load a song example.

4.  If you want a new version: Bundle files with webpack (the output will be in dist folder):

```sh
$ npm run build
```

## Screenshots

![ChordPro editor and preview](https://github.com/chordproject/chordpro-editor/blob/master/chordproject-editor.png?raw=true)

## Features
- Syntax highlighting
- Code snippets
- Code folding
- Cut, copy and paste
- Search and replace (`ctrl + f`, `ctrl + h`)
- Chord autocomplete (`ctrl + space`)
- ...

### Chord autocomplete
You can directly easily add one of the chords already used in the file by pressing `ctrl + space`.

### Snippets
You can add a code snippet by typing a few letters and then pressing tab.\
Here is a list of all the snippets currently available.

#### Meta-data directives

| Snippet                | Result                |
| -----------------------|---------------------- | 
| **!**                  | New song template     |
| **artist** or **a**    | `{artist: value}`     |
| **album**              | `{album: value}`      |
| **arranger**           | `{arranger: value}`   |
| **capo**               | `{capo: 5}`           |
| **composer**           | `{composer: value}`   |
| **copyright**          | `{copyright: value}`  |
| **duration**           | `{duration: 4:00}`    |
| **key** or **k**       | `{key: C}`            |
| **lyricist**           | `{lyricist: value}`   |
| **tempo**              | `{tempo: 120}`        |
| **title** or **t**     | `{title: value}`      |
| **subtitle** or **st** | `{subtitle: value}`   |
| **year**               | `{year: 2020}`        |
| **meta**               | `{meta: label value}` |

#### Formatting directives

| Snippet                | Result                |
| -----------------------|---------------------- | 
| **comment** or **c**   | `{comment: value}`    |

#### Environment directives

| Snippet              | Result                                                                                           |
| ---------------------|------------------------------------------------------------------------------------------------- | 
| **column** or **cb** | `{column_break}`                                                                                 |
| **chorus**           | Chorus block, beginning with `{start_of_chorus: Chorus}` and ending with `{end_of_chorus}`       |
| **verse**            | Verse block, beginning with `{start_of_verse: Verse}` and ending with `{end_of_verse}`           |
| **bridge**           | Bridge block, beginning with `{start_of_bridge: Bridge}` and ending with `{end_of_bridge}`       |
| **tab**              | Tab block, beginning with `{start_of_tab}` and ending with `{end_of_tab}` with sample tab inside |
| **soc**              | `{start_of_chorus}`                                                                              |
| **eoc**              | `{end_of_chorus}`                                                                                |
| **sov**              | `{start_of_verse}`                                                                               |
| **eov**              | `{end_of_verse}`                                                                                 |
| **sob**              | `{start_of_bridge}`                                                                              |
| **eob**              | `{end_of_bridge}`                                                                                |
| **sot**              | `{start_of_tab}`                                                                                 |
| **eot**              | `{end_of_tab}`                                                                                   |
| **define** or **d**  | `{define: Am base-fret 1 frets 0 0 0 0 0 0 fingers 0 0 0 0 0 0}`                                 |

## Contributing

This project welcomes contributions of all types. If you find any bug or want some new features, please feel free to create an issue or submit a pull request.

Join the community and chat with us on **[Discord](https://discord.gg/ZQAgwBC9c8)**

## License
[MIT License](LICENSE)