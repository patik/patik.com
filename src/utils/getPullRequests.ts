import { getCollection, type CollectionEntry } from 'astro:content'

/** The curated running order, shared by the index and the per-entry pager. */
export async function getPullRequests(): Promise<CollectionEntry<'pullRequests'>[]> {
    return (await getCollection('pullRequests')).sort((a, b) => a.data.order - b.data.order)
}
