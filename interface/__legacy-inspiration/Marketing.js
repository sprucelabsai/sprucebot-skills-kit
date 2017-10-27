// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import BotText from './BotText'
// import './Marketing.css'

// const sizes = () => {
// 	return {
// 		windowHeight: window.innerHeight,
// 		windowWidth: window.innerWidth,
// 		videoWidth: window.innerWidth,
// 		videoHeight: window.innerWidth * (360 / 640)
// 	};
// };

// export default class Marketing extends Component {

// 	static propTypes = {
// 		skillName: PropTypes.string.isRequired,
// 		subHeading: PropTypes.string,
// 		vimeoId: PropTypes.number,
// 		description: PropTypes.string.isRequired
// 	};

// 	state = sizes();

// 	componentDidMount() {
// 		this.size();
// 		window.addEventListener('resize', this.didResize.bind(this));
// 		window.parent.postMessage("Skill:Loaded", '*');
// 	}

// 	componentWillUnmount() {
// 		window.removeEventListener('resize', this.didResize.bind(this));
// 	}

// 	didResize() {
// 		this.size()
// 	}

// 	size() {
// 		this.setState(sizes());
// 	}

// 	render() {
// 		return (
// 			<div className="marketing">
// 				<h1>{this.props.skillName}</h1>
// 				{this.props.subHeading &&
// 				<BotText>{this.props.subHeading}</BotText>
// 				}
// 				{this.props.vimeoId &&
// 				<iframe width={this.state.videoWidth} height={this.state.videoHeight} className="vimeo" title="Markting"
// 						src={`https://player.vimeo.com/video/${this.props.vimeoId}`}
// 						frameBorder="0"
// 						allowFullScreen/>
// 				}
// 				<p className="profile__subtitle">{this.props.description}</p>
// 			</div>
// 		)
// 	}
// }
