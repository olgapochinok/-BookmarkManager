import SelectSort from "../components/SelectSort";
import BookmarkView from "../components/BookmarkView"
export default function Toolbar() {
  return (
    <div className="header">
      <SelectSort />
      <BookmarkView />
    </div>
  );
}
