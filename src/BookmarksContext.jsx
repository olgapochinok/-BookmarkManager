import { createContext, useContext, useState, useEffect } from "react";
import { useChromeStorage } from "./hooks/useChromeStorage";

const BookmarksContext = createContext(null);
export function BookmarksProvider({ children }) {
  const [treeBookmarks, setTreeBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFolderId, setActiveFolderId] = useChromeStorage('folderIdActive', '1');
  const [sortBy, setSortBy] = useChromeStorage('sortBy','default');
  const [bookmarkView, setBookmarkView] = useChromeStorage('view', 'List' );
  const [columnViewCount, setcolumnViewCount] = useChromeStorage('columnViewCount', '1');

  const loadBookmarks = () => {
    if (typeof chrome !== "undefined" && chrome.bookmarks) {
      chrome.bookmarks.getTree((tree) => {
        setTreeBookmarks(tree[0]?.children || []);
        setLoading(false);
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    loadBookmarks();
        // Слушатели изменений в браузере
    if (typeof chrome !== 'undefined' && chrome.bookmarks) {
      chrome.bookmarks.onCreated.addListener(loadBookmarks);
      chrome.bookmarks.onRemoved.addListener(loadBookmarks);
      chrome.bookmarks.onChanged.addListener(loadBookmarks);
      chrome.bookmarks.onMoved.addListener(loadBookmarks); // Важно для страниц: отслеживает перетаскивания
    }

    return () => {
      if (typeof chrome !== 'undefined' && chrome.bookmarks) {
        chrome.bookmarks.onCreated.removeListener(loadBookmarks);
        chrome.bookmarks.onRemoved.removeListener(loadBookmarks);
        chrome.bookmarks.onChanged.removeListener(loadBookmarks);
        chrome.bookmarks.onMoved.removeListener(loadBookmarks);
      }
    };
  }, []);

  const deleteBookmark = (id) => {
    if (typeof chrome !== 'undefined' && chrome.bookmarks) {
      chrome.bookmarks.removeTree(id, () => {})
    }
  };

  const saveChangeBookmark = (id, title, url ) => {
        if (typeof chrome !== 'undefined' && chrome.bookmarks) {
      chrome.bookmarks.update(id,{title: title, url: url}, () => {})
    }
  };

  const findBookmarksInFolder = (nodes, folderId) => {
    let activeFolderNode = null;

    const recurse = (node) => {
      if (node.id === folderId) {
        activeFolderNode = node;
        return;
      }
      if (node.children) node.children.forEach(recurse);
    };

    nodes.forEach(recurse);

    return activeFolderNode && activeFolderNode.children
      ? activeFolderNode.children.filter((item) => item.url)
      : [];
  };
  const currentBookmarks = findBookmarksInFolder(treeBookmarks, activeFolderId);
  const getSortedItems = () =>{
    const itemCopy = [...currentBookmarks];
    if (sortBy === 'title'){
      return itemCopy.sort((a,b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'url'){
      return itemCopy.sort((a,b) => a.url.localeCompare(b.url));
    }
    return itemCopy;
  }
  return (
    <BookmarksContext.Provider
      value={{
        treeBookmarks,
        loading,
        currentBookmarks: getSortedItems(),
        activeFolderId,
        setActiveFolderId,
        sortBy,
        setSortBy,
        bookmarkView,
        setBookmarkView,
        columnViewCount,
        setcolumnViewCount,
        deleteBookmark,
        saveChangeBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
export const useBookmarks = () => useContext(BookmarksContext);
