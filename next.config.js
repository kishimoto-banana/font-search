const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  reactStrictMode: true,
  optimizeFonts: false,
}

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
