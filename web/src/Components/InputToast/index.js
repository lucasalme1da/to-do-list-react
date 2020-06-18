import React from 'react'
import './style.css'
import closeIcon from '../../Assets/close.svg'

const InputToast = (props) => {
  const { message, posX, posY, close } = props

  return (
    <div className="inputToastOuter" style={{
      left: posX - 40,
      top: posY + 42
    }}>
      <div className="inputToastInner">
        <div className="warningContainer">
          <div className="warning">!</div>
          <p>{message}</p>
        </div>
        <button>
          <img src={closeIcon} alt="" onClick={() => close({ state: false })} />
        </button>
      </div>
    </div>
  )
}

export default InputToast