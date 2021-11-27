import React from 'react'

export default function UiSelect({ label, selectedValue, setSelectedValue, selectOptions }) {

    const handleOnchange = (event) => {
        // console.log(event.target.value)
        setSelectedValue(event.target.value)
    };

    return (
        <div className='ui-select'>
            <label htmlFor={'id_' + label}>{label + ':'}</label>
            <select id={'id_' + label} value={selectedValue} onChange={(event) => (handleOnchange(event))}>
                {
                    selectOptions.map((s) => (
                        <option key={s.id} value={s.value}>{s.display}</option>
                    ))
                }
            </select>
        </div>
    );
}