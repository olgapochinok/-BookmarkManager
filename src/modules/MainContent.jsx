import { useBookmarks } from "../BookmarksContext";
import { useBookmarkSelected } from "../hooks/useBookmarkSelected";
import styles from "./MainContent.module.scss";

function BookmarkList({ bookmark, favicon }) {
  const [isSelect, clickBookmark] = useBookmarkSelected();
  return (
    <div
      className={`
      ${styles["bookmark-list"]}
      ${isSelect ? styles["bookmark-col--select"] : "#fff"}`}
    >
      <button className={styles["bookmark-col__btn"]}>
        <img src={favicon} />
      </button>
      <a
        className={styles["bookmark-list__link"]}
        onClick={clickBookmark}
        href={bookmark.url}
      >
        <span>{bookmark.title || "Без названия"}</span>
      </a>
      <p className={styles["bookmark-list__url"]}>{bookmark.url}</p>
    </div>
  );
}
function BookmarkCol({ bookmark, favicon }) {
  const [isSelect, clickBookmark] = useBookmarkSelected();

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
  const { currentBookmarks, bookmarkView, columnViewCount } = useBookmarks();

  function getFaviconUrl(pageUrl) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", pageUrl);
    url.searchParams.set("size", "16"); // Размер иконки (16, 32, 64)
    return url.toString();
  }
  if (bookmarkView === "Column") {
    return (
      <div className="content" style={{ columnCount: columnViewCount }}>
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
  return (
    <div className="content">
      {currentBookmarks.map((item) => (
        <BookmarkList
          key={item.id}
          bookmark={item}
          favicon={getFaviconUrl(item.url)}
        ></BookmarkList>
      ))}
    </div>
  );
}
