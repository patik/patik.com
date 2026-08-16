---
title: 'INGIANA-190 Checkpoint end-user performance testing tool and task runner'
prNumber: 8463
date: '2024-10-09'
kind: 'Tool introduction'
standfirst: 'Shipping an internal performance-testing harness, and inviting contributions.'
order: 12
---

## Description

🛃 Checkpoint 🛃 a development tool that performs routine tasks in a headless browser. 

Checkpoint handles the creation of a browser instance using [Playwright](https://playwright.dev/), running the task multiple times, gathering user options, and tracking results. Tasks are free to do anything they'd like with the browser and to report their results in any format.

## Use cases

### Comparisons

Checkpoint can be helpful when you want to compare two different 'versions' of our site. For example, you might want to test how some change to the code will affect performance:

1. Run `checkpoint lighthouse --runs 10` on your branch and make a note of the results
2. Make some changes to the code, e.g. add a new dependency
3. Run `checkpoint lighthouse --runs 10` again and compare the results

You might also test for regressions in this way, e.g. by running the same task on two different `deploy` branches.

### Lighthouse

Checkpoint can [run Lighthouse to measure web vitals](https://web.dev/articles/optimize-vitals-lighthouse) for a given URL. It can combine multiple reports and give you the aggregate scores. For example, following best practices, you can determine the 75th percentile for the [largest contentful paint](https://web.dev/articles/lcp).

### Simulate other devices

Tasks can be run with a slower CPU (with the `--cpu-throttle` flag) or with different user agents or device profiles. This can be helpful in determining how the app performs for different users.

### Anything that needs to be done in a browser

Tasks can perform any operation at all. Anything we want to do repetitively in a browser can become a Checkpoint task.

## Examples

Running a sample task 5 times:

<img src="/portfolio/pull-requests/checkpoint-performance-tool/01.webp" alt="" width="360" style="margin-bottom: 1em;">

Example output from the `lighthouse` task:

<img src="/portfolio/pull-requests/checkpoint-performance-tool/02.webp" alt="" width="640">

Example output from the `click-through` task:

<img src="/portfolio/pull-requests/checkpoint-performance-tool/03.webp" alt="" width="420">

---

# Documentation

_This is a copy of the README_

### Examples of how it can be used

-   run Lighthouse and report the scores
-   click through certain pages in the site, e.g. to determine how long it takes for those pages to load
-   run any task multiple times, e.g. to get more accurate Lighthouse readings
-   compare how the app behaves when changes are made to the frontend or backend
-   take screenshots
-   throttle the CPU

## Usage

Call `checkpoint` with the name of a task:

```sh
checkpoint name-of-task
```

### Options

Run `checkpoint --help` to see all available options.

#### Global options

These apply to all tasks:

-   `name-of-task` is the name of the task you want to run, which should be a path relative to `checkpoint/tasks/`
-   `--runs <number>` is how many times it executes the task (default to `1`)
-   `--gui` launches the browser so you can see it (i.e. this disables headless mode)
-   `--cpu-throttle <number>` means how much you want to slow the browser down, i.e. `4` means it should run at 25% the normal speed (defaults to `1`, i.e. no slowing down)

#### Task-specific options

These apply to tasks that support each feature:

-   `--verbose` displays some extra console logs
-   `--screenshots` will save screenshots of the page while the task runs; they will be saved in a subfolder of the task called 'screenshots'

Additionally, the standard `DEBUG` environment variable is supported.

### Examples

```sh
# Run the Lighthouse task once with no extra output or artifacts
checkpoint lighthouse
# Run the Lighthouse task 10 times and display the browser while it's running
checkpoint lighthouse --runs 10 --gui
# Run the Click-Through task 10 times, with the CPU slowed down by 10 times, and print extra info along the way
checkpoint click-through --cpu-throttle 10 --runs 10 --verbose
```

## Use cases

### Comparisons

Checkpoint can be helpful when you want to compare two different 'versions' of our site. For example, you might want to test how some change to the code will affect performance:

1. Run `checkpoint lighthouse --runs 10` on your branch and make a note of the results
2. Make some changes to the code, e.g. add a new dependency
3. Run `checkpoint lighthouse --runs 10` again and compare the results

You might also test for regressions in this way, e.g. by running the same task on two different `deploy` branches.

### Simulate other devices

Tasks can be run with a slower CPU (with the `--cpu-throttle` flag) or with different user agents or device profiles. This can be helpful in determining how the app performs for different users.

## Tasks

A task is a function. It can perform any operations you'd like as long as it returns something truthy when its successful runs and something falsy when it fails (or a promise that resolves to truthy/falsy).

The task function will be run as many times as specified by the `--runs` flag. It will receive a new browser instance for each run.

## How to add a task

Create a file in `checkpoint/tasks/` with two exports:

-   default export: `task: (options: TaskConfig) => Promise<unknown> | unknown` is the function that performs the task. It will receive a fresh browser context It should return something truthy if it succeeds, or something falsy if it fails.
-   named export: `report: (results: TestResults, metadata: ReportMetadata) => void | Promise<void>` is an optional function that will be called after the test completes so it can output a report.

Run the task by passing the file's name or relative path to the `checkpoint/tasks/` folder:

```sh
# This command works for both file paths:
# checkpoint/tasks/foo.ts
# checkpoint/tasks/foo/index.ts
checkpoint foo
```

Tasks are free to write artifacts to subfolders called `reports` and `screenshots`. Those folders are ignored by Git.

Use `getScreenshotsDir()` and `getReportDir()` to get the directory path for the current batch of runs. Reports can be generated every time, but screenshots should only be taken when `--screenshots` is used.

### Logging from tasks

While `console.log` is supported and will write to the terminal, it's preferred to use one of the following loggers to allow the user to determine how much output they'd like.

#### Verbose logging

These logs will only appear when the task is run using the `--verbose` flag.

##### Authoring:

```tsx
import { verboseLog } from '../util/verboseLog'

verboseLog('Something happened')
```

##### Usage:

```sh
checkpoint name-of-task --verbose
```

#### Debug logging

These logs will only appear when the POSIX standard `DEBUG` environment variable is set.

##### Authoring:

```tsx
import createDebug from 'debug'

const debug = createDebug('checkpoint:name-of-task')

debug('Your message here')
```

##### Usage:

```sh
DEBUG=checkpoint:* checkpoint name-of-task
```

### Reports

Since every task is different, the report functions are tailored to each one. Checkpoint will simply run the task, collect its output, and pass the output back to the report for processing.

Report functions are optional and may print or output anything they'd like. For example, the Lighthouse task computes statistics by combining scores from multiple task runs, while another test might simply time how long the task took to run.

To use this feature, export a function called `report` from the task's main file. The function will receive the task results and metadata.

```tsx
(results: TestResults, metadata: ReportMetadata) => void | Promise<void>`
```

Report functions will be called once, after all runs have taken place.

---

INGIANA-190
