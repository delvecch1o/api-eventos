import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: #2f2f2e;
`
export const Form = styled.form`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: #17181b;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
`
export const LabelLogin = styled.label`
  font-size: 16px;
  color: #676767;
`
export const LabelError = styled.label`
  font-size: 14px;
  color: red;
`

export const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f0f2f5;
  border: none;
`
export const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: #334899;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
  &:hover {
    background-color: black;
  }
`

export const Strong = styled.strong`
  cursor: pointer;
  a {
    text-decoration: none;
    color: #c1c9ff;
  }
`