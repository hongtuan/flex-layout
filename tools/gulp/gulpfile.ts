

import {createPackageBuildTasks} from 'lib-build-tools';

/** Create gulp tasks to build the different packages in the project. */
createPackageBuildTasks('flex-layout');

import './tasks/ci';
import './tasks/clean';
import './tasks/default';
import './tasks/development';
import './tasks/lint';
import './tasks/publish';
import './tasks/unit-test';
import './tasks/aot';
import './tasks/payload';
import './tasks/flex-layout-release';
