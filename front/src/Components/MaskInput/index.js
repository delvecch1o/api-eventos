import React from "react";
import InputMask from "react-input-mask";
import styles from './Input.module.css';


const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({ name, placeholder, onChange, value, mask, disabled }) => {
    function handleChange(e) {
        console.log(e.target.name);
        onChange({
            ...e,
            target: {
                ...e.target,
                name,
                value: onlyNumbers(e.target.value),
            }
        })
    }
    return (
        <div className={styles.form_control}>
            <InputMask
                name={name}
                mask={mask}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                disabled={disabled}
            />
        </div>

    )
}

export default MaskedInput;