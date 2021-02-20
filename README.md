# ChordProject Editor

A JavaScript frontend library for editing ChordPro songs.

Inspired by: https://github.com/buzcarter/UkeGeeks with the following changes:

- Chord autocomplete everywhere (without prefix)
- Use 'Ace' as a Node dependence (It allows use the latest version)
- Upgraded to ES6
- Use webpack (bundle and minify) to optimize performance (Mode Production)
- Use webpack to allow debug (Mode Development)

## Overview

Reads marked-up music (lyrics + chords) extracting all of the chords used.
Generates chord diagrams using HTML5 &lt;canvas&gt; and rewrites the music with standard HTML wrapping the chords.

#### Part of [ChordProject](https://gochord.com/)

## Usage

`ChordProject Editor` is on npm, to install run:

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

4.  Make changes (e.g. Change the options in src/main.js)
5.  Changes are deployed on browser directly!

If you want a new version: Bundle files with webpack (the output will be in dist folder):

```sh
$ npm run build
```

## ChordPro format: Lyrics and Chords

Essentially, it looks like this:

```
    {title: Praise Adonai}
    {artist: Paul Baloche}

    {sot}
    E|-----2---2-----|-------3-3---
    B|---3---3---3---|-----0-------
    G|-2-------------|---0---------
    D|---------------|---0---------
    A|---------------|-2-----------
    E|---------------|-------------
    {eot}

    [Am]Who is like [F]Him,
    The Lion and the [C]Lamb
    Seated on the [G]throne    [E7]
    [Am]Mountains bow [F]down
    Every ocean [C]roars
    To the Lord of [G]hosts

    {start_of_chorus}
    [F]Praise Ado[Am]nai
    From the [G]rising of the sun
    'Till the [Dm7]end of every [F]day[G]
    [F]Praise Ado[Am]nai
    All the [G]nations of the earth
    All the [Dm7] Angels and the [F]Saints
    [G]Sing [Bbsus2]praise
    {end_of_chorus}
```

## Contribute

Contributions are welcome!
