import { useState } from "react";
import { useBookmarks } from "../BookmarksContext.jsx";
import styles from "./SidebarFolders.module.scss";

function Folder({ node, level = 0 }) {
  const { activeFolderId, setActiveFolderId, moveBookmarkToFolder } =
    useBookmarks();
  const [isOpen, setIsOpen] = useState(true);
  const [dragOverFolderId, setDragOverFolderId] = useState(null);
  if (node.url) return null;

  const handleDragOver = (e, folderId) => {
    e.stopPropagation();
    e.preventDefault();
    if (dragOverFolderId !== folderId) {
      setDragOverFolderId(folderId);
    }
  };

  const handleDrop = (e, folderId) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverFolderId(null);
    const bookmarkId = e.dataTransfer.getData("text/plan");
    if (bookmarkId) {
      moveBookmarkToFolder(bookmarkId, folderId);
    }
  };
  let hasActive = false;
  if (node.id === activeFolderId) hasActive = true;

  const hasSubFolders = node.children.some((child) => !child.url);
  if (hasSubFolders) {
    if (isOpen) {
      return (
        <div
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={() => setDragOverFolderId(null)}
          onDrop={(e) => handleDrop(e, node.id)}
          style={{ marginLeft: `${5 + level * 15}px` }}
          className={styles["folders-item"]}
        >
          <button
            className={styles["folders-item__btn"]}
            onClick={() => setIsOpen(false)}
          >
            -
          </button>
          <span
            className={styles["folders-item__title"]}
            style={{
              backgroundColor:
                dragOverFolderId === node.id
                  ? "#ffffff1c"
                  : hasActive
                    ? "#ffffff1c"
                    : "transparent",
            }}
            onClick={() => setActiveFolderId(node.id)}
          >
            {node.title}
          </span>
          <span className={styles["folders-item__bage"]}>
            {node.children.filter((child) => child.url).length}
          </span>
          {node.children.map((child) => (
            <Folder key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      );
    } else {
      return (
        <div
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={() => setDragOverFolderId(null)}
          onDrop={(e) => handleDrop(e, node.id)}
          style={{ marginLeft: `${5 + level * 15}px` }}
          className={styles["folders-item"]}
        >
          <button
            className={styles["folders-item__btn"]}
            onClick={() => setIsOpen(true)}
          >
            +
          </button>
          <span
            className={styles["folders-item__title"]}
            style={{
              backgroundColor:
                dragOverFolderId === node.id
                  ? "#ffffff1c"
                  : hasActive
                    ? "#ffffff1c"
                    : "transparent",
            }}
            onClick={() => setActiveFolderId(node.id)}
          >
            {node.title}
          </span>
          <span className={styles["folders-item__bage"]}>
            {node.children.filter((child) => child.url).length}
          </span>
        </div>
      );
    }
  }
  return (
    <div
      onDragOver={(e) => handleDragOver(e, node.id)}
      onDragLeave={() => setDragOverFolderId(null)}
      onDrop={(e) => handleDrop(e, node.id)}
      style={{ marginLeft: `${5 + level * 15}px` }}
      className={styles["folders-item"]}
    >
      <span
        className={styles["folders-item__title"]}
        style={{
          backgroundColor:
            dragOverFolderId === node.id
              ? "#ffffff1c"
              : hasActive
                ? "#ffffff1c"
                : "transparent",
        }}
        onClick={() => setActiveFolderId(node.id)}
      >
        {node.title}
      </span>
      <span className={styles["folders-item__bage"]}>
        {node.children.filter((child) => child.url).length}
      </span>
    </div>
  );
}

export default function SidebarFolders() {
  const { treeBookmarks } = useBookmarks();
  return (
    <>
      <h3 className={styles["folders-title"]}>Каталоги</h3>
      <div className={styles["folders"]}>
        {treeBookmarks.map((rootNode) => (
          <Folder key={rootNode.id} node={rootNode} level={0} />
        ))}
      </div>
    </>
  );
}