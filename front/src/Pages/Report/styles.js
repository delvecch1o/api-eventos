import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: #2f2f2e;
`

export const Label = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: #676767;
`
export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 80%;
  margin: 20px auto;
  word-break: break-all;
`

export const Thead = styled.thead`
`
export const Tr = styled.tr`
`
export const Tbody = styled.tbody`
`

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
    
`

export const Td = styled.td`
  padding-top: 15px;
  width: 3%;
`

export const TdIcone = styled.td`
  padding-top: 15px;
  width: 0.5%;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  wisth: ${(props) => (props.width ? props.width : "auto")};
    
  cursor: pointer;
  a {
    text-decoration: color;
    color: #c1c9ff;
  }
`