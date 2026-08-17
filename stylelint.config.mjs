/** @type {import('stylelint').Config} */
export default {
    ignoreFiles: ['dist/**', 'playwright-report/**', 'test-results/**', 'tests-snapshots/**'],
    rules: {
        'at-rule-disallowed-list': ['apply', 'reference', 'theme'],
        'no-invalid-double-slash-comments': true,
    },
}
