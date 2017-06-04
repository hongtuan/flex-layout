import {task} from 'gulp';
import {execNodeTask} from '../util/task_helpers';
import {join} from 'path';
import {buildConfig} from 'lib-build-tools';

/** Glob that matches all SCSS or CSS files that should be linted. */
const stylesGlob = '+(tools|src)/**/!(*.bundle).+(css|scss)';

/** List of flags that will passed to the different TSLint tasks. */
const tsLintBaseFlags = ['-c', 'tslint.json', '--project', './tsconfig.json'];

/** Path to the output of the Flex-Layout package. */
const libOutPath = join(buildConfig.outputDir, 'packages', 'flex-layout');

/** Path to the output of the CDK package. */
const cdkOutPath = join(buildConfig.outputDir, 'packages', 'cdk');

task('lint', ['tslint', 'stylelint', 'madge']);

/** Task that runs madge to detect circular dependencies. */
task('madge', ['flex-layout:clean-build'], execNodeTask(
  'madge', ['--circular', libOutPath])
);

/** Task to lint Angular Flex-Layout's scss stylesheets. */
task('stylelint', execNodeTask(
  'stylelint', [stylesGlob, '--config', 'stylelint-config.json', '--syntax', 'scss']
));

/** Task to run TSLint against the e2e/ and src/ directories. */
task('tslint', execNodeTask('tslint', tsLintBaseFlags));

/** Task that automatically fixes TSLint warnings. */
task('tslint:fix', execNodeTask('tslint', [...tsLintBaseFlags, '--fix']));
