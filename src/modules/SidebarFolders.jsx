import { useState } from "react";
import { useBookmarks } from "../BookmarksContext.jsx";
import styles from "./Folders.module.scss";

function Folder({ node, level = 0 }) {
  const { activeFolderId, setActiveFolderId } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  if (node.url) return null;

  let hasActive = false;
  if (node.id === activeFolderId) hasActive = true;

  const hasSubFolders = node.children.some((child) => !child.url);
  if (hasSubFolders) {
    if (isOpen) {
      return (
        <div
          style={{ marginLeft: `${15 + level * 15}px` }}
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
            style={{ backgroundColor: hasActive ? "#ffffff1c" : "transparent" }}
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
          style={{ marginLeft: `${15 + level * 15}px` }}
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
            style={{ backgroundColor: hasActive ? "#ffffff1c" : "transparent" }}
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
      style={{ marginLeft: `${15 + level * 15}px` }}
      className={styles["folders-item"]}
    >
      <span
        className={styles["folders-item__title"]}
        style={{ backgroundColor: hasActive ? "#ffffff1c" : "transparent" }}
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
