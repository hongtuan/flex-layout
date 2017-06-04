import {task, src, dest} from 'gulp';
import {join} from 'path';
import {composeRelease, buildConfig, sequenceTask} from 'lib-build-tools';

// There are no type definitions available for these imports.
const gulpRename = require('gulp-rename');

const {packagesDir, outputDir} = buildConfig;

/** Path to the directory where all releases are created. */
const releasesDir = join(outputDir, 'releases');

/** Path to the output of the Flex-Layout package. */
const libOutputPath = join(outputDir, 'packages', 'flex-layout');

// Path to the sources of the Flex-layout package.
const libPath = join(packagesDir, 'lib');
// Path to the release output of Flex-Layout.
const releasePath = join(releasesDir, 'flex-layout');

/**
 * Overwrite the release task for the Flex-Layout package. The Flex-Layout release will include special
 * files, like a bundled theming SCSS file or all prebuilt themes.
 */
task('flex-layout:build-release', ['flex-layout:prepare-release'], () => composeRelease('flex-layout'));

/**
 * Task that will build the Flex-Layout package. It will also copy all prebuilt themes and build
 * a bundled SCSS file for theming
 */
task('flex-layout:prepare-release', sequenceTask(
  'flex-layout:build'
));

