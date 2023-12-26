import appNetPng from '@public/images/app-net-twitter-char-count.png'
import magnetPng from '@public/images/magnet-links-preview.png'
import twitterAvatarPng from '@public/images/twitter-avatar-in-menu.png'
import Layout from '@src/components/common/Layout'
import Space from '@src/components/common/Space'
import Image from 'next/image'
import Link from 'next/link'

function UserScriptLink({ fileName }: { fileName: string }) {
    return (
        <Link
            download={`/code/user-scripts/${fileName}`}
            href={`/code/user-scripts/${fileName}`}
            className="button button-primary"
        >
            Install
        </Link>
    )
}

export default function Page() {
    return (
        <Layout
            title="User Scripts - Readable Google Reader, Twitter Avatar, and more"
            keywords={[
                'user script',
                'google reader',
                'google+',
                'css',
                'javascript',
                'greasemonkey',
                'browser extension',
                'add-on',
            ]}
        >
            <h1>User Scripts</h1>

            <p>
                Install these in Chrome, Safari, or Firefox with
                <Space />
                <a href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/">Greasemonkey</a>.
            </p>

            <section>
                <h2>Twitter avatar in menu</h2>
                <p>See which account you’re logged in under at a quick glance</p>
                <figure>
                    <Image src={twitterAvatarPng} alt="" />
                </figure>
                <p>
                    <UserScriptLink fileName="twitter-avatar-in-menu.user.js" />
                    <a href="https://gist.github.com/patik/2029861" className="button">
                        Gist
                    </a>
                </p>
            </section>

            <section>
                <h2>Magnet Link Display</h2>
                <p>
                    Displays <code>magnet://</code> links and other P2P URLs prominently. Great for sites that hide the
                    real links between obnoxious “download” ad banners or open pop ups when you click on them.
                </p>
                <figure>
                    <Link href="images/magnet-links.png">
                        <Image src={magnetPng} alt="" />
                    </Link>
                </figure>
                <p>
                    <UserScriptLink fileName="magent-links.user.js" />

                    <a href="https://gist.github.com/patik/8388768" className="button">
                        Gist
                    </a>
                </p>
            </section>

            <section>
                <h2>Alpha.App.Net Enhanced</h2>
                <p>Enhance App.net by adding useful features to the Alpha web app.</p>
                <ul>
                    <li>Repost &mdash; Easily repost/share another user’s post</li>
                    <li>Image previews &mdash; See images from posts without having to open them</li>
                    <li>
                        Twitter character count &mdash; Ensure your post will fit within Twitter’s 140-character limit
                        when you crosspost to both networks using <a href="https://twapp.phuu.net/">twapp</a>,<Space />
                        <a href="https://ifttt.com/">ifttt</a>
                        <Space />
                        or other services.
                    </li>
                </ul>
                <p>
                    <a
                        href="https://chrome.google.com/webstore/detail/agplbnminilmhgkkdngdodiallpempch"
                        className="button button-primary"
                    >
                        Chrome Extension
                    </a>
                    <Space />
                    <UserScriptLink fileName="alpha-app-net-enhanced.user.js" />
                    <Space />
                    <a href="https://gist.github.com/3542903" className="button">
                        Gist
                    </a>
                </p>
                <figure>
                    <Image src={appNetPng} alt="" />
                </figure>
            </section>

            <section>
                <h2>Readable Reader</h2>
                <p>Compact styles for Google Reader</p>
                <p>
                    <UserScriptLink fileName="readable-reader.user.js" />
                </p>
            </section>

            <section>
                <h2>Readable Google+</h2>
                <p>Cleans up Google+ Post pages. Currently only eliminates the gigantic avatar in the sidebar.</p>
                <p>
                    <UserScriptLink fileName="readable-google-plus.user.js" />
                </p>
            </section>

            <section>
                <h2>Redirect from WikiTravel to WikiVoyage</h2>
                <p>
                    When landing on a WikiTravel.org article, this script automatically redirects to the corresponding
                    article on WikiVoyage.org.
                </p>
                <p>
                    This <a href="https://en.wikipedia.org/wiki/Wikitravel#Community_fork_in_2012">brief description</a>
                    <Space />
                    of WikiVoyage’s creation reflects my reasons for preferring it. Despite updating my own bookmarks
                    and shortcuts, this script is still necessary because links to WikiTravel often show up in search
                    results, blogs, etc.
                </p>
                <p>
                    <UserScriptLink fileName="wiki-travel-voyage-redirect.user.js" />

                    <a href="https://gist.github.com/patik/4979331" className="button">
                        Gist
                    </a>
                </p>
            </section>

            <section>
                <h2>Readable Flickr</h2>
                <p>Legible (large-font) styles for Flickr</p>
                <p>
                    <UserScriptLink fileName="readable-flickr.user.js" />
                </p>
            </section>

            <section>
                <h2>Auto Login</h2>
                <p>
                    Probably not useful for anyone else, this script will determine whether I’m logged in on certain
                    sites. It then automatically navigates to the login page and, once my browser has auto-filled the
                    fields, signs me in.
                </p>
                <p>
                    <UserScriptLink fileName="auto-login.user.js" />
                </p>
            </section>
        </Layout>
    )
}
