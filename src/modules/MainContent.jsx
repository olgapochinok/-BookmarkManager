import { useState } from "react";
import { useBookmarks } from "../BookmarksContext";
import styles from "./MainContent.module.scss";

function BookmarkCol({ bookmark, favicon }) {
  const [isSelect, setIsSelect] = useState(false);

  function clickBookmark(event) {
    if(event) event.preventDefault();
    setIsSelect((hasSelect) => !hasSelect);
  }

  return (
    <div
      className={`
      ${styles["bookmark-col"]}
      ${isSelect ? styles["bookmark-col--select"] : ""}`}
    >
      <button className={styles["bookmark-col__btn"]}>
        <img src={favicon} />
      </button>
      <a
        className={styles["bookmark-col__link"]}
        onClick={clickBookmark}
        href={bookmark.url}
      >
        <span>{bookmark.title || "Без названия"}</span>
      </a>
    </div>
  );
}

export default function MainContent() {
  const { currentBookmarks } = useBookmarks();
  
  function getFaviconUrl(pageUrl) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", pageUrl);
    url.searchParams.set("size", "16"); // Размер иконки (16, 32, 64)
    return url.toString();
  }
  
  return (
    <div className="content" style={{ columnCount: 4 }}>
      {currentBookmarks.map((item) => (
        <BookmarkCol
          key={item.id}
          bookmark={item}
          favicon={getFaviconUrl(item.url)}
        ></BookmarkCol>
      ))}
    </div>
  );
}
