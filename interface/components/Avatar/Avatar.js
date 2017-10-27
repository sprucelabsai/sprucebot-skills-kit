import styled from 'styled-components'

const Avatar = styled.div.attrs({
	className: 'top__avatar'
})`
	background-image: ${props => `url(${props.image})`};
`

export default Avatar
