import React from 'react'

export default function Field({
  label,
  name,
  type,
  defaultValue,
  placeholder
}) {
  return(
    <label>
      { label + ' ' }
      <input type={ type } name={ name } defaultValue={ defaultValue } placeholder={ placeholder } />
    </label>
  )
}
