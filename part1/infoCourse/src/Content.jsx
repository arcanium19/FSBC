import React from "react";
import Part from "./Part";

const Content = (props) => {
  return (
    <div>
        {
            props.parts.map( e => {
                console.log(e.name, e.exercises)
                return (<Part key={e.name} name={e.name} exercise={e.exercises} />)
            })
        }
    </div>
  )
}

export default Content;