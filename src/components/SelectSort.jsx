import { useBookmarks } from "../BookmarksContext";
export default function SelectSort() {
  const { sortBy, setSortBy } = useBookmarks();
  return (
    <div>
      <label
        htmlFor="sort-select"
        style={{
          fontSize: "14px",
        }}
      >
        Сортировка
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{
          padding: "5px 10px",
          margin: "0 5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="default">По умолчанию</option>
        <option value="title">По заголовкам</option>
        <option value="url">По URL</option>
      </select>
    </div>
  );
}
