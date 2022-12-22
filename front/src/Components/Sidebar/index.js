import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Content} from './styles'
import ItemSidebar from '../ItemSidebar'
import axios from 'axios'
import { 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaLongArrowAltRight, 
  FaUserAlt, 
  FaMoneyCheckAlt, 
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaTemperatureLow
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
      <ItemSidebar Icon={FaTemperatureLow} text="Conversor de Temperaturas" onClick={() => navegar("/temperature")}/>
      <ItemSidebar Icon={FaMoneyCheckAlt} text="Conversor de Moedas" onClick={() => navegar("/coin")} />
      <ItemSidebar Icon={FaRegFileAlt} text="Relatorio de Conversões" onClick={() => navegar("/report")} />
      <ItemSidebar Icon={FaUserAlt} text="Users" />
      <ItemSidebar Icon={FaEnvelope} text="E-mail" />
      <ItemSidebar Icon={FaRegCalendarAlt} text="Calendario" />
      <ItemSidebar Icon={FaLongArrowAltRight} text="Sair" type="button" onClick={logoutSubmit} />

      </Content>
    </Container>
  )
}

export default Sidebar