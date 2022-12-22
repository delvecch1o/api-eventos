import React from 'react'
import { Container } from './styles'

const ItemSidebar = ({Icon, text, type, onClick,disabled}) => {
  
  return (
    <Container
      type={type}
      text={text}
      onClick={onClick}
      disabled={disabled}
    >
       <Icon
       
       />
        {text}

    </Container>
  )
}

export default ItemSidebar