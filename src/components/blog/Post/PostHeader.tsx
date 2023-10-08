import DateFormatter from '@src/components/blog/DateFormatter'
import PostTitle from '@src/components/blog/Post/PostTitle'

type Props = {
    title: string
    coverImage?: string
    date: string
}

export default function PostHeader({ title, date }: Props) {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            {/* <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} src={coverImage} />
            </div> */}
            <div className="mx-auto">
                <div className="mb-6 text-lg font-bold">
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    )
}
