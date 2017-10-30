import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps({ renderPage, query }) {
		// Build stylesheets from styled-components
		const sheet = new ServerStyleSheet()
		const page = renderPage(App => props =>
			sheet.collectStyles(<App {...props} />)
		)
		const styleTags = sheet.getStyleElement()

		return { ...page, styleTags }
	}

	componentWillMount() {
		console.log('will mount')
	}

	render() {
		console.log('rending _document')
		return (
			<html>
				<Head>
					<title>Sprucebot skill</title>
					<link
						href="https://hello.sprucebot.com/skills.css"
						rel="stylesheet"
						type="text/css"
						charset="UTF-8"
					/>
					{this.props.styleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
