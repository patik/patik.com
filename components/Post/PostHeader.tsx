import DateFormatter from '../DateFormatter'
import PostTitle from './PostTitle'

type Props = {
    title: string
    coverImage: string
    date: string
}

const PostHeader = ({ title, date }: Props) => {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            {/* <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={title} src={coverImage} />
            </div> */}
            <div className="max-w-3xl mx-auto">
                <div className="mb-6 text-lg font-bold">
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    )
}

export default PostHeader
