/** @type {import('stylelint').Config} */
export default {
    ignoreFiles: ['dist/**', 'playwright-report/**', 'test-results/**', 'tests-snapshots/**'],
    rules: {
        'no-invalid-double-slash-comments': true,
    },
}
