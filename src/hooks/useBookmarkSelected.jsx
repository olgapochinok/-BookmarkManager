import { useState } from "react";

export function useBookmarkSelected(){
   const [isSelect, setIsSelect] = useState(false);

  function clickBookmark(event) {
    if(event) event.preventDefault();
    setIsSelect((hasSelect) => !hasSelect);
    console.log("select");
  }
  return [isSelect, clickBookmark];
}