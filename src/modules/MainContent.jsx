import { useState } from "react";
import { useBookmarks } from "../BookmarksContext";
import { useBookmarkSelected } from "../hooks/useBookmarkSelected";
import Modal from "react-modal";
import styles from "./MainContent.module.scss";

function BookmarkList({ bookmark, favicon, modalOpen }) {
  const [isSelect, clickBookmark] = useBookmarkSelected();

  return (
    <div
      className={`
      ${styles["bookmark-list"]}
      ${isSelect ? styles["bookmark-col--select"] : "#fff"}`}
    >
      <button
        onClick={() =>
          modalOpen(bookmark.id, bookmark.title, bookmark.url, favicon)
        }
        className={styles["bookmark-col__btn"]}
      >
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
function BookmarkCol({ bookmark, favicon, modalOpen }) {
  const [isSelect, clickBookmark] = useBookmarkSelected();

  return (
    <div
      className={`
      ${styles["bookmark-col"]}
      ${isSelect ? styles["bookmark-col--select"] : ""}`}
    >
      <button
        onClick={() =>
          modalOpen(bookmark.id, bookmark.title, bookmark.url, favicon)
        }
        className={styles["bookmark-col__btn"]}
      >
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
  const {
    currentBookmarks,
    bookmarkView,
    columnViewCount,
    deleteBookmark,
    saveChangeBookmark,
  } = useBookmarks();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editFavicon, setEditFavicon] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  function getFaviconUrl(pageUrl) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", pageUrl);
    url.searchParams.set("size", "16"); // Размер иконки (16, 32, 64)
    return url.toString();
  }

  const openModal = (id, title, url, favicon) => {
    setEditId(id);
    setEditTitle(title);
    setEditUrl(url);
    setEditFavicon(favicon);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const bookmarkDelete = () => {
    deleteBookmark(editId);
    setModalIsOpen(false);
  };
  const bookmarkSaveChange = () => {
    saveChangeBookmark(editId, editTitle, editUrl);
    setModalIsOpen(false);
  };
  const modalContent = (
    <div className={styles["modal"]}>
      <h2>Редактирование закладки</h2>
      <p>
        <img src={editFavicon} /><span> № </span> {editId}
      </p>
      <p>
        <input
          className={styles["modal__input"]}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </p>
      <p>
        <input
          className={styles["modal__input"]}
          type="texeditUrlt"
          value={editUrl}
          onChange={(e) => setEditUrl(e.target.value)}
        />
      </p>
      <p className={styles["modal__btn-wrap"]}>
        <button className={styles["modal__btn"]} onClick={bookmarkDelete}>
          Удалить закладку
        </button>
        <button className={styles["modal__btn"]} onClick={bookmarkSaveChange}>
          Сохранить изменения
        </button>
        <button className={styles["modal__btn"]} onClick={closeModal}>
          Закрыть
        </button>
      </p>
    </div>
  );
  const stylesModal = {
    content: {
      backgroundColor: "#eee",
      width: "500px", // фиксированная ширина
      height: "300px", // фиксированная высота
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)", // центрирование
    },
  };

  if (bookmarkView === "Column") {
    return (
      <div className="content" style={{ columnCount: columnViewCount }}>
        {currentBookmarks.map((item) => (
          <BookmarkCol
            key={item.id}
            bookmark={item}
            favicon={getFaviconUrl(item.url)}
            modalOpen={openModal}
          ></BookmarkCol>
        ))}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={stylesModal}
        >
          {modalContent}
        </Modal>
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
          modalOpen={openModal}
        ></BookmarkList>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={stylesModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
