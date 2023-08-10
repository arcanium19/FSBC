import React from 'react'
import ReactDOM from "react-dom/client";
import App from './app';

// import Header from './Header'
// import Content from './Content'
// import Total from './Total'

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }
  

//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total total={course.parts} />
//     </div>
//   )
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// ReactDOM.render(<App />, document.getElementById('root'))