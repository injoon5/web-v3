import Link from '@/components/Link'
import Globe from '@/components/Globe'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { NewsletterForm } from 'pliny/ui/NewsletterForm'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'

const MAX_DISPLAY = 3

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="">
        <div className="space-y-2 pt-10 pb-8 md:space-y-5 select-none">
          <p className="font-extrabold tracking-tight text-black dark:text-white text-5xl sm:text-6xl md:text-7xl leading-14 ">
            Injoon Oh.
          </p>
          <div className="flex flex-col justify-center items-center">
            <Globe></Globe>
          </div>
          <p className="font-bold tracking-tight text-slate-700 dark:text-slate-200 text-4xl sm:text-5xl md:text-6xl leading-10 md:leading-14">
            A student based in Seoul, Korea. Interested in <span className="text-slate-600 dark:text-slate-400">computer</span> and <span className="text-slate-600 dark:text-slate-400">electroincs</span>. Likes to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-400 ">code</span>. 
          </p>
        </div>
        <div className="flex flex-wrap pt-20">
          <h2 className="text-2xl font-bold pr-5">Blog Posts</h2>
          <Link
             href="/blog"
            className="px-2 font-bold text-xl border border-gray-300 dark:border-gray-600 rounded-2xl bg-primary-50 hover:bg-primary-100 dark:bg-primary-900 dark:hover:bg-primary-800 text-primary-500 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-200"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
            <ul>
              {!posts.length && 'No posts found.'}
              {posts.slice(0, MAX_DISPLAY).map((post) => {
                const { slug, date, title, summary, tags } = post
                return (
                  <div key={slug} className="py-5">
                    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border rounded-lg border-gray-300 dark:border-slate-700 p-5">
                      <div className="space-y-2 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-5">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {title}
                                </Link>
                              </h2>
                              <div className="flex flex-wrap">
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                          </div>
                          <div className="text-base font-medium leading-6">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              aria-label={`Read "${title}"`}
                            >
                              Read more &rarr;
                            </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
      
      {siteMetadata.newsletter.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
      
    </>
  )
}
