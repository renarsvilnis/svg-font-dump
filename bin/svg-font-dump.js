#!/usr/bin/env node
'use strict';

const ArgumentParser = require('argparse').ArgumentParser;

const pkg = require('../package.json');
const svgFontDump = require('../lib/svgFontDump');

const parser = new ArgumentParser({
  version: pkg.version,
  addHelp: true,
  description: 'Dump SVG font to separate glyphs'
});

parser.addArgument([ '-c', '--config' ], {
  help: 'Font config file'
});

parser.addArgument([ '-i', '--src-font' ], {
  help: 'Source font path',
  required: true,
  dest: 'font'
});

parser.addArgument([ '-o', '--glyphs-dir' ], {
  help: 'Glyphs output folder',
  required: true,
  dest: 'outputDir'
});

parser.addArgument([ '-d', '--diff-config' ], {
  help: 'Difference config output file',
  dest: 'diffConfig'
});

parser.addArgument([ '-f', '--force' ], {
  help: 'Force override glyphs from config',
  action: 'storeTrue'
});

parser.addArgument([ '-n', '--names' ], {
  help: 'Try to guess new glyphs names',
  action: 'storeTrue'
});

const args = parser.parseArgs();

svgFontDump(args)
  .then(() => {
    process.exit(0);
  }, (err) => {
    console.error(err.message);
    process.exit(1);
  });
