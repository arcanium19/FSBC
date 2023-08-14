import React from "react"

const Notification = ({ message }) => {
    if (message?.message?.includes('successfully')) {
      return (
        <div className="success">
          <h2>{message.message}</h2>
        </div>
      )
    }
    if (message?.error) {
      return (
        <div className="error">
          <h2>{message.error}</h2>
        </div>
      )
    }
    return null
}

export default Notification