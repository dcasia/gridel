# gridel

[![npm version](https://badge.fury.io/js/gridel.svg)](https://badge.fury.io/js/gridel)
[![npm downloads](https://img.shields.io/npm/dm/gridel.svg)](https://www.npmjs.com/package/gridel)
[![dependencies](https://david-dm.org/milewski/gridel.svg)](https://www.npmjs.com/package/gridel)
[![Greenkeeper badge](https://badges.greenkeeper.io/milewski/gridel.svg)](https://greenkeeper.io/)

## Notice

This is a **work in progress**, the API and overall flow are subject to change, more come soon.

## Install

1. Create a file called `.gridelrc` in your project root. See the [config documentation](#config-file) or an [example config](./.gridelrc) for help.
2. Determine how you want your grid built:
   * If you want to build once, run command `npx gridel`.
   * If you want to add the grid building to your project’s build process:
     1. Run command `npm install gridel --save-dev`.
     2. Add `scripts: { "build": "gridel" }` in your `package.json`.
     3. Run command `npm run build`.

Your `SCSS` files will be generated into the path specified into the config file.

## Usage

_The `gridel` prefix can be customized in your configuration file._

Sample HTML Markup

```html
<body>
<section class="gridel-container gridel-grid">
    <div class="header">
        <h1>Why don't you try Gridel?</h1>
        <small>it's very easy to use and setup</small>
    </div>
    <div class="content gridel-padding--horizontal">
        <p>Lorem ipsum ...</p>
    </div>
</section>
</body>
```

Sample SCSS(SASS)

```scss
body {
    color: white;
    font-family: sans-serif;
    > section > div {
        background: crimson;
    }
}

.header {
    grid-column: 4 / span 6;
    grid-row: 5 / span 4;
    text-align: center;
    h1 {
        @include baseline(2, $skip: 1)
    }
    small {
        @include baseline(1)
    }
}

.content {
    grid-column: 4 / span 6;
    grid-row: 10 / span 5;
    text-align: justify;
    p {
        @include baseline(1)
    }
}
```

This will output:

_Note_: the grid is provided by another package designed to work in conjunction with gridel [https://github.com/milewski/css-gridish-grid](https://github.com/milewski/css-gridish-grid)

## Inspiration

This project was heavily inspired at [css-gridish](https://github.com/IBM/css-gridish)

## License 

[MIT](LICENSE) © [Rafael Milewski](https://github.com/milewski)
