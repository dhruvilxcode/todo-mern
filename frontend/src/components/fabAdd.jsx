import React from 'react'

const fabAdd = ({htmlFor}) => {
  return (
    <label className="btn btn-primary gap-2 fixed bottom-8 right-8" htmlFor={htmlFor}>
        +
        New Todo List
    </label>
  )
}

export default fabAdd