import React from "react";
import style from "./modules/SortingCheckbox.module.css";

const SortingCheckbox = ({ setSortChecked }) => {
  return (
    <div className={style.checkboxContainer}>
      <input
        type="checkbox"
        onClick={(e) => setSortChecked(e.target.checked)}
        className={style.sortingCheckBox}
        id="sort"
      ></input>
      <label for="sort">A🔽B</label>
    </div>
  );
};

export default SortingCheckbox;
