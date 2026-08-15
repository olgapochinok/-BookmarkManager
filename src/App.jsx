import Sidebar from "./modules/Sidebar"

function App() {

  return (
    <>
      <Sidebar>
                <h1>Sidebar</h1>
      </Sidebar>
      <div className="main">
        <div className="header"></div>
        <div className="content"></div>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App
