// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// export class Tabs extends Component {

// 	static propTypes = {
// 		selected: PropTypes.number
// 	};
// 	static defaultProps = {
// 		selected: 0
// 	};

// 	selectTab = (idx) => {
// 		this.setState({ selected: idx });
// 	};

// 	render() {

// 		let tabs = [];
// 		let panels = [];

// 		const { selected } = { ...this.props, ...this.state };
// 		const children = this.props.children.map ? this.props.children : [ this.props.children ];

// 		children.forEach((tab, idx) => {
// 			let className = 'btn__toggle';
// 			switch (idx) {
// 				case 0:
// 					className += ' toggle__left';
// 					break;
// 				case children.length - 1:
// 					className += ' toggle__right';
// 					break;
// 				default:
// 					className += ' toggle__middle';
// 			}
// 			if (idx === selected) {
// 				className += ' btn__toggle__active';
// 				panels.push(<div className="tab__panel" key={idx}>{tab.props.children || ''}</div>);
// 			}

// 			tabs.push(<button className={className} key={idx}
// 							  onClick={(e) => this.selectTab(idx)}>{tab.props.title}</button>);

// 		});

// 		return <div>
// 			<div className="tabs">{tabs}</div>
// 			<div className="tab__panels">{panels}</div>
// 		</div>
// 	}
// }

// export class Tab extends Component {
// 	static propTypes = {
// 		title: PropTypes.string.isRequired
// 	};
// 	static defaultProps = {
// 		title: 'No Title'
// 	};
// }
