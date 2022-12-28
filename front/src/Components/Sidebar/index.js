import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Content} from './styles'
import ItemSidebar from '../ItemSidebar'
import axios from 'axios'
import { 
  FaTimes, 
  FaHome, 
  FaLongArrowAltRight, 
  FaAddressCard, 
  FaRegFileAlt,
  FaListUl
} from 'react-icons/fa'

const Sidebar = ({ active }) => {
  const closeSidebar = () => {
    active(false)
  }

  const history = useHistory();
   
  const logoutSubmit = (e) =>{
      e.preventDefault();

      axios.post('/api/logout').then(res => {
          if (res.data.status === 200) {

              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_name');
              alert("Usuario saiu com Sucesso", res.data.message, "Sucesso");
              history.push('/login');

          } 
      });
  }
    const navegar = (key) => {
      history.push({
        pathname:key,
      });
    };

  
  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
      
      <ItemSidebar Icon={FaHome} text="Home" onClick={() => navegar("/")} />
      <ItemSidebar Icon={FaAddressCard} text="Cadastrar Endereço" onClick={() => navegar("/new-address")}/>
      <ItemSidebar Icon={FaRegFileAlt} text="Cadastrar um Evento" onClick={() => navegar("/event")} />
      <ItemSidebar Icon={FaListUl} text="Relatorio do Usuario" onClick={() => navegar("/report")} />
      <ItemSidebar Icon={FaLongArrowAltRight} text="Sair" type="button" onClick={logoutSubmit} />

      </Content>
    </Container>
  )
}

export default Sidebar