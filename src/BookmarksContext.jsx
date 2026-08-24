import { createContext, useContext, useState, useEffect } from "react";

const BookmarksContext = createContext(null);
export function BookmarksProvider({ children }) {
  const [treeBookmarks, setTreeBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = () => {
    
    setTreeBookmarks([
      {
        id: "1",
        title: "Papka 1",
        children: [
          {
            id: "4",
            title: "Papka 1-1",
            children: [
              { id: "6", title: "Google", url: "http://google.com" },
              { id: "7", title: "Google", url: "http://google.com" },
              { id: "8", title: "Google", url: "http://google.com" },
            ],
          },
          { id: "5", title: "Papka 1-2", children: [] },
          { id: "9", title: "Google", url: "http://google.com" },
          { id: "10", title: "Google", url: "http://google.com" },
        ],
      },
      {
        id: "2",
        title: "Papka 2",
        children: [
          { id: "11", title: "Google", url: "http://google.com" },
          { id: "12", title: "Google", url: "http://google.com" },
          { id: "13", title: "Google", url: "http://google.com" },
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
          { id: "9", title: "Google", url: "http://google.com" },
          { id: "10", title: "Google", url: "http://google.com" },
          { id: "11", title: "Google", url: "http://google.com" },
        ],
      },
    ]);
    setLoading(false);
  };
  useEffect(() => {
    loadBookmarks();
    return () => {};
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        treeBookmarks,
        loading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
export const useBookmarks = () => useContext(BookmarksContext);
