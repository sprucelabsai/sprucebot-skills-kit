import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import config from 'config'

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage, query, store }) {
		// Build stylesheets from styled-components
		const sheet = new ServerStyleSheet()
		const auth = store && store.getState().auth
		let whitelabel = false

		//we have any whitelabelling happening?
		if (
			auth &&
			auth.Location &&
			auth.Location.Organization &&
			auth.Location.Organization.allowWhiteLabelling &&
			auth.Location.Organization.whiteLabellingStylesheetUrl
		) {
			whitelabel = auth.Location.Organization.whiteLabellingStylesheetUrl
		}

		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)
		const styleTags = sheet.getStyleElement()

		return { ...page, styleTags, whitelabel, name: config.NAME, auth }
	}

	render() {
		return (
			<html className="skill">
				<Head>
					<title>{this.props.name}</title>
					<link
						href="https://local.sprucebot.com/skills.css"
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8"
					/>
					{this.props.styleTags}
					{this.props.whitelabel && (
						<link
							href={this.props.whitelabel}
							rel="stylesheet"
							type="text/css"
							charSet="UTF-8"
						/>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
