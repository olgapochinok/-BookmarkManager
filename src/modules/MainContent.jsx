import { useBookmarks } from "../BookmarksContext";

export default function MainContent() {
  const { currentBookmarks } = useBookmarks();
  return (
    <div className="content">
      {currentBookmarks.length && currentBookmarks.length === 0 ? (
        <p>В этой папке нет прямых ссылок</p>
      ) : null}
      {currentBookmarks.map((item) => (
        <div key={item.id}>
          <a href={item.url}>
            <span>{item.title || "Без названия"}</span>
            <span> {item.url}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
