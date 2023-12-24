import { getAllPosts, hideUnpublishedValue } from '@src/lib/getPosts'

const publishedPost = {
    slug: 'alpha',
    title: 'bravo',
}

// Recreate the MD file, including frontmatter
const publishedPostFile = `---
${JSON.stringify(publishedPost)}
---
this is the contents of the alpha post
`

const unpublishedPost = {
    slug: 'charlie',
    title: 'delta',
    unpublished: 'true',
}

const unpublishedPostFile = `---
${JSON.stringify(unpublishedPost)}
---
this is the contents of the charlie post
`

jest.mock('fs', () => ({
    readFileSync: jest.fn((path) => {
        if (path.includes(publishedPost.slug)) {
            return publishedPostFile
        }

        return unpublishedPostFile
    }),
    readdirSync: jest.fn(() => [publishedPost.slug, unpublishedPost.slug]),
    existsSync: jest.fn(() => false),
}))

describe('hideUnpublishedValue', () => {
    test('excludes unpublished prop when not requested', async () => {
        expect(hideUnpublishedValue(['slug', 'title'])(unpublishedPost)).not.toHaveProperty('unpublished')
    })

    test('includes unpublished prop when it was requested', async () => {
        expect(hideUnpublishedValue(['slug', 'unpublished', 'title'])(unpublishedPost)).toHaveProperty('unpublished')
    })
})

describe('getAllPosts', () => {
    test('excludes unpublished prop when not requested', async () => {
        expect(await getAllPosts(['slug', 'title'])).toStrictEqual([
            { slug: 'alpha', title: 'bravo' },
            { slug: 'charlie', title: 'delta' },
        ])
    })

    test('includes unpublished prop when it was requested', async () => {
        expect(await getAllPosts(['slug', 'unpublished', 'title'])).toStrictEqual([publishedPost, unpublishedPost])
    })
})
