import Sidebar from "./modules/Sidebar";
import { BookmarksProvider } from "./BookmarksContext";
import SidebarFolders from "./modules/SidebarFolders";
import MainContent from "./modules/MainContent";
import Toolbar from "./modules/Toolbar";
function App() {

  return (
    <>
      <BookmarksProvider>
      <Sidebar>
        <SidebarFolders/>
      </Sidebar>
      <div className="main">
        <Toolbar/>
        <MainContent/>
        <div className="footer"></div>
      </div>
      </BookmarksProvider>
    </>
  )
}

export default App
