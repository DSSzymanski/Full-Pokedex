import React from 'react'

const RecordButton = (props) => {
  return (
    <div className="buttonDiv">
        <button
            className={props.active ? null : "greyscale"}
            title={props.title}
            onClick={props.updateFn}
        >
        <img
            src={props.icon}
            alt={props.title}
            className="iconImage"
        />
        </button>
    </div>
  )
}

export default RecordButton;
