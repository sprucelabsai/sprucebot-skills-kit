import styled from 'styled-components'

export const Paragraph = styled.p.attrs({
	className: props => (props.fine ? 'fine__print' : '')
})``

export const H1 = styled.h1.attrs({
	className: props => (props.header ? 'with__subheader' : '')
})``
export const H2 = styled.h2.attrs({
	className: props => (props.subheader ? 'is__subheader' : '')
})``
export const H3 = styled.h3``
export const H4 = styled.h4``
export const H5 = styled.h5``
export const H6 = styled.h6``

export const A = styled.a``
