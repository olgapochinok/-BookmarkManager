import Sidebar from "./modules/Sidebar";
import { BookmarksProvider } from "./BookmarksContext";
import SidebarFolders from "./modules/SidebarFolders";
function App() {

  return (
    <>
      <BookmarksProvider>
      <Sidebar>
        <SidebarFolders></SidebarFolders>
      </Sidebar>
      <div className="main">
        <div className="header"></div>
        <div className="content"></div>
        <div className="footer"></div>
      </div>
      </BookmarksProvider>
    </>
  )
}

export default App
