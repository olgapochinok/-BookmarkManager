import { useState } from "react";
import { useBookmarks } from "../BookmarksContext";
export default function SelectSort() {
  const { bookmarkView, setBookmarkView, columnViewCount, setcolumnViewCount } =
    useBookmarks();
  const [selectedOption, setSelectedOption] = useState(bookmarkView);
  const handleRadioChange = (e) => {
    setBookmarkView(e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", textAlign: "center", marginLeft: "50px", padding: "2px" }}>
      <div style={{marginTop:"3px" }}>
        <label style={{ fontSize: "14px", marginRight:"4px" }}>
          <input
            type="radio"
            value="List"
            checked={selectedOption === "List"}
            onChange={handleRadioChange}
          />
          Список
        </label>
      </div>
      <div>
        <label style={{ fontSize: "14px" }}>
          <input
            type="radio"
            value="Column"
            checked={selectedOption === "Column"}
            onChange={handleRadioChange}
          />
          Столбцы
        </label>
        <label
          htmlFor="sort-select"
          style={{
            marginLeft: "10px",
            fontSize: "14px",
          }}
        >
          Количество столбцов
        </label>
        <select
          id="sort-select"
          value={columnViewCount}
          onChange={(e) => setcolumnViewCount(e.target.value)}
          disabled={selectedOption !== "Column"}
          style={{
            padding: "5px 10px",
            margin: "0 5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>

        </select>
      </div>
    </div>
  );
}
