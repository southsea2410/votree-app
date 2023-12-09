import React,  { useEffect } from "react";
import Login from "./pages/Login";
import {
Route,
createBrowserRouter,
createRoutesFromElements } from "react-router-dom";

function App() {

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/">
  //       <Route element={<Navigate to="/login" />} index />
  //       <Route element={<Login />} path="/login" loader={loginLoader} />
  //     </Route>
  //   )
  // )

  return (
    <React.Fragment>
      <Login></Login>
    </React.Fragment>
  )
}

export default App;

// export default function App() {
//   return (
//     <>
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//     </>
//   );
// }

// document
//   .getElementById('root')
//   .insertAdjacentHTML('afterend', '<p>helloworld</p>');
