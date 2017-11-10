import React from 'react'
import Page from '../containers/Page'
import { Container, H1, BotText } from 'react-sprucebot'

class MarketingPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	static getInitialProps(props) {
		return {
			public: true // does not require the user to be of a certain role
		}
	}

	// track sizes for marketing video
	sizes() {
		return {
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			videoWidth: window.innerWidth,
			videoHeight: window.innerWidth * (360 / 640)
		}
	}

	// on window resize, set the sizes
	didResize() {
		this.size()
	}

	// set sizes for window and video
	size() {
		this.setState(this.sizes())
	}

	componentDidMount() {
		window.addEventListener('resize', this.didResize.bind(this))
		this.size()
		this.props.skill.ready() // Show the skill
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.didResize.bind(this))
	}

	render() {
		return (
			<Container className="marketing">
				<H1>{this.props.config.NAME}</H1>
				<BotText>{this.props.config.DESCRIPTION}</BotText>
				{this.props.config.VIMEO_ID && (
					<iframe
						width={this.state.videoWidth}
						height={this.state.videoHeight}
						className="vimeo"
						title="Marketing"
						src={`https://player.vimeo.com/video/${this.props.config.VIMEO_ID}`}
						frameBorder="0"
						allowFullScreen
					/>
				)}
			</Container>
		)
	}
}

export default Page(MarketingPage)
