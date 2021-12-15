import React, {memo, useContext} from 'react';
import style from '../modules/FilterButton.module.css'
import PropTypes from "prop-types"
import { Context } from "../context";

const FilterButton = memo(({ name, isPressed, setFilter }) => {
  const isDark = useContext(Context);
  return (
    <button
      type="button"
      className={`${style.btn} ${isDark ? style.btnDark : null}`}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span> Show </span>
      <span>{ name }</span>
      <span> tasks </span>
    </button>
  );
});

FilterButton.propTypes = {
  name: PropTypes.string,
  isPressed: PropTypes.bool,
  setFilter: PropTypes.func,
}

export default FilterButton;
