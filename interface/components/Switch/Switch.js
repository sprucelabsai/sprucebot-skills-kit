import styled from 'styled-components'

const Switch = styled.div.attrs({
	className: props => (props.on ? 'switch on' : 'switch')
})``

export default Switch
