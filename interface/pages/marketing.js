import React from 'react'
import Page from '../containers/Page'
import { Container, H1, BotText } from 'react-sprucebot'
import ReactDOM from 'react-dom'

class MarketingPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	static getInitialProps(props) {
		return {
			name: props.config.NAME,
			description: props.config.DESCRIPTION,
			vimeoId: props.config.VIMEO_ID,
			public: true // does not require the user to be of a certain role
		}
	}

	// track sizes for marketing video
	sizes() {
		const container = ReactDOM.findDOMNode(this.mainContainer)
		const computed = window.getComputedStyle(container)
		const width =
			parseFloat(computed.width) -
			parseFloat(computed.paddingLeft) -
			parseFloat(computed.paddingRight)
		return {
			windowHeight: window.innerHeight,
			windowWidth: window.innerWidth,
			videoWidth: width,
			videoHeight: width * (360 / 640)
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
			<Container
				className="marketing"
				ref={container => {
					this.mainContainer = container
				}}
			>
				<H1>{this.props.name}</H1>
				<BotText>{this.props.description}</BotText>
				{this.props.vimeoId && (
					<iframe
						width={this.state.videoWidth}
						height={this.state.videoHeight}
						className="vimeo"
						title="Marketing"
						src={`https://player.vimeo.com/video/${this.props.vimeoId}`}
						frameBorder="0"
						allowFullScreen
					/>
				)}
			</Container>
		)
	}
}

export default Page(MarketingPage)
