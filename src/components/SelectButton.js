import React from 'react'
import { styled } from '@mui/material/styles';


const ButtonComponent = styled('span')(({theme, selected}) => ({
    border: "1px solid rgb(23, 255, 197)",
    borderRadius: 5,
    padding: 10,
    paddingLft: 20,
    paddingRight: 20,
    cursor: "pointer",
    textAlign: "center",
    fontFamily: "Montserrat",
    backgroundColor: selected ? "rgb(23, 255, 197)" : "transparent",
    color: selected ? "black" : "rgb(23, 255, 197)",
    fontWeight: selected ? "bold" : "normal",
    "&:hover": {
        backgroundColor: "rgb(23, 255, 197)",
        color: "black"
    },
    width: "22%"
}))


const SelectButton = ({children, selected, onClick}) => {
  return (
    <ButtonComponent
        onClick={onClick}
        selected={selected}
    >
        {children}
    </ButtonComponent>
  )
}

export default SelectButton