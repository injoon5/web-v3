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
        <div className="select-none space-y-2 pt-10 pb-8 md:space-y-5">
          <p className="text-5xl font-extrabold leading-14 tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl ">
            Injoon Oh.
          </p>
          <div className="flex flex-col items-center justify-center">
            <Globe></Globe>
          </div>
          <p className="text-4xl font-bold leading-10 tracking-tight text-slate-700 dark:text-slate-200 sm:text-5xl md:text-6xl md:leading-14">
            A student based in Seoul, Korea. Interested in{' '}
            <span className="text-slate-600 dark:text-slate-400">computer</span> and{' '}
            <span className="text-slate-600 dark:text-slate-400">electroincs</span>. Likes to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent ">
              code
            </span>
            .
          </p>
        </div>
        <div className="flex flex-wrap pt-20">
          <h2 className="pr-5 text-2xl font-bold">Blog Posts</h2>
          <Link
            href="/blog"
            className="rounded-2xl border border-gray-300 bg-primary-50 px-2 text-xl font-bold text-primary-500 hover:bg-primary-100 hover:text-primary-600 dark:border-gray-600 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 dark:hover:text-primary-200"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-3">
          <ul>
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <div key={slug} className="py-5">
                  <div className="rounded-lg border border-gray-300 bg-gradient-to-b from-slate-50 to-slate-100 p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
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
