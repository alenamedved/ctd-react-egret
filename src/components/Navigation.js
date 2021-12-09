import React from "react";
import { NavLink } from "react-router-dom";
import style from "./modules/Navigation.module.css";
import PropTypes from "prop-types";
import { useContext } from "react/cjs/react.development";
import { Context } from "./context";

const Navigation = React.memo(({ categories, counts }) => {
  /* console.log(context) */
  const isDark = useContext(Context);
  return (
    <nav
      className={`${style.navContainer} ${
        isDark ? style.navContainerDark : null
      }`}
    >
      <ul className={style.navListContainer}>
        {categories.map((table, index) => (
          <li key={index}>
            <NavLink to={`/${table.category}`}>
              <img src={table.imgSrc} alt="logo" width="50" height="50" />
              {table.category}
              <p style={{ color: "#d1cece", fontSize: "small" }}>
                {counts[table.category] > 1
                  ? `${counts[table.category]} active tasks`
                  : `${counts[table.category]} active task`}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});

Navigation.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Navigation;
