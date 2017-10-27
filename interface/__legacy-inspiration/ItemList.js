// import React, { Component } from 'react'
// import PropTypes from 'prop-types'

// export class ItemList extends Component {

// 	static propTypes = {
// 		draggable: PropTypes.func
// 	};
// 	static defaultProps = {};

// 	render() {

// 		const children = React.Children.map(this.props.children,
// 			(child) => React.cloneElement(child, {
// 				draggable: !!this.props.draggable
// 			})
// 		);

// 		return <div className="item__list">{children}</div>
// 	}
// }

// export class Item extends Component {
// 	static propTypes = {
// 		className: PropTypes.string.isRequired,
// 		remove: PropTypes.func,
// 		avatar: PropTypes.string, //pass an image url to get a sweet avatar
// 		online: PropTypes.bool,
// 		draggable: PropTypes.bool.isRequired //auto set by parent
// 	};
// 	static defaultProps = {
// 		className: '',
// 		draggable: false
// 	};

// 	render() {
// 		const { remove, children, className, draggable, avatar, online } = this.props;
// 		const onlineClass = (online === false) ? 'offline' : (online) ? 'online' : '';
// 		return <div className={`item__list__item ${className}`}>
// 			{avatar && (
// 				<div className={`avatar__outer__wrapper ${onlineClass}`}>
// 					<div className="avatar__wrapper" style={ { backgroundImage: `url('${avatar}')` } }/>
// 				</div>
// 			)}
// 			{draggable && (
// 				<div className="drag__reorder"/>
// 			)}
// 			{children}
// 			{remove && (
// 				<a className="btn__remove" href onClick={remove}/>
// 			)}
// 		</div>
// 	}
// }
