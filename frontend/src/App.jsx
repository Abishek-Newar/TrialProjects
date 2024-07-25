import ClassComp from "./components/ClassComp"
import FunComp from "./components/FunComp"


function App() {
  return (
    <>
    <ClassComp />
    <FunComp />
    <Button />
    </>
  )
}

function Button(){
  return(
    <div>button</div>
  )
}

export default App
