import { useBookmarks } from "../BookmarksContext";

function BookmarkCol({ bookmark, favicon }) {
  return (
    <div>
      <img src={favicon} />
      <a href={bookmark.url}>
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
    <div className="content">
      {currentBookmarks.length && currentBookmarks.length === 0 ? (
        <p>В этой папке нет прямых ссылок</p>
      ) : null}
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
