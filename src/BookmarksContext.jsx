import { createContext, useContext, useState, useEffect } from "react";
import { useChromeStorage } from "./hooks/useChromeStorage";

const BookmarksContext = createContext(null);
export function BookmarksProvider({ children }) {
  const [treeBookmarks, setTreeBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFolderId, setActiveFolderId] = useChromeStorage('folderIdActive', "1");
  const [sortBy, setSortBy] = useChromeStorage("sortBy",'default');

  const loadBookmarks = () => {
    if (typeof chrome !== "undefined" && chrome.bookmarks) {
      chrome.bookmarks.getTree((tree) => {
        setTreeBookmarks(tree[0]?.children || []);
        setLoading(false);
      });
    } else {
      setTreeBookmarks([
        {
          id: "1",
          title: "Papka 1",
          children: [
            {
              id: "4",
              title: "Papka 1-1",
              children: [
                { id: "6", title: "Google 6", url: "http://google.com" },
                { id: "7", title: "Yandex", url: "http://yandex.ru" },
                { id: "8", title: "Google 8", url: "http://google.com" },
              ],
            },
            { id: "5", title: "Papka 1-2", children: [] },
            { id: "9", title: "Google 9", url: "http://google.com" },
            { id: "10", title: "Google 10", url: "http://google.com" },
          ],
        },
        {
          id: "2",
          title: "Papka 2",
          children: [
            { id: "11", title: "Google 11", url: "http://google.com" },
            { id: "12", title: "Google 12", url: "http://google.com" },
            { id: "13", title: "Google 13", url: "http://google.com" },
            {
              id: "14",
              title: "Papka 2-1",
              children: [
                { id: "16", title: "Papka 2-2-1", children: [] },
                { id: "17", title: "Papka 2-2-2", children: [] },
              ],
            },
            { id: "15", title: "Papka 2-2", children: [] },
          ],
        },
        {
          id: "3",
          title: "Papka 3",
          children: [
            { id: "16", title: "Google 16", url: "http://google.com" },
            { id: "17", title: "Google 17", url: "http://google.com" },
            { id: "18", title: "Google 18", url: "http://google.com" },
          ],
        },
      ]);
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
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
export const useBookmarks = () => useContext(BookmarksContext);
