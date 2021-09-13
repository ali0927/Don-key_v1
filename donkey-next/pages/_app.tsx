import { Web3Provider } from 'don-components'
import { DefaultSeo } from 'next-seo'
import "../scss/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import SEO from '../next-seo.config'

export default function MyApp({ Component, pageProps }: any) {
  return (
    /* Here we call NextSeo and pass our default configuration to it  */
    <Web3Provider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Web3Provider>
  )
}