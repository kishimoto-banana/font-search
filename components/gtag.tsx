import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
const existsGaId = GA_ID !== ''

const GoogleAnalytics = () => {
  return (
    <>
      {existsGaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
            }}
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  )
}

export default GoogleAnalytics
