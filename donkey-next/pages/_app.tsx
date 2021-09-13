import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo.config'

export default function MyApp({ Component, pageProps }: any) {
  return (
    /* Here we call NextSeo and pass our default configuration to it  */
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}