import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
max-width: 768px;
padding: 0 1rem;
margin: 0 auto;
`
interface IProps {
    children: React.ReactNode
}

const Layout = ({children}: IProps)  => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Layout
