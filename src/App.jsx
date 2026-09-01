import Sidebar from "./modules/Sidebar";
import { BookmarksProvider } from "./BookmarksContext";
import SidebarFolders from "./modules/SidebarFolders";
import MainContent from "./modules/MainContent";
function App() {

  return (
    <>
      <BookmarksProvider>
      <Sidebar>
        <SidebarFolders/>
      </Sidebar>
      <div className="main">
        <div className="header"></div>
        <MainContent/>
        <div className="footer"></div>
      </div>
      </BookmarksProvider>
    </>
  )
}

export default App
