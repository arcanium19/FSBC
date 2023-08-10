import React from "react"

const Notification = ({ message }) => {
    if (message.includes('successfully')) {
      return (
        <div className="success">
          <h2>{message}</h2>
        </div>
      )
    }
    if (message.includes('removed')) {
      return (
        <div className="error">
          <h2>{message}</h2>
        </div>
      )
    }
    return null
}

export default Notification