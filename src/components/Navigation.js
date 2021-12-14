import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import style from "./modules/Navigation.module.css";
import PropTypes from "prop-types";
import { Context } from "./context";
import Img from "./img/homesvg.svg";

const Navigation = React.memo(({ categories, counts }) => {
  /* console.log(context) */
  const isDark = useContext(Context);
  return (
    <nav
      className={`${style.navContainer} ${
        isDark ? style.navContainerDark : null
      }`}
    >
      <Link to="/" className={style.homeLink}>
        <img
          src={Img}
          height="22px"
          width="auto"
          style={{ paddingLeft: "10px" }}
          alt="Home button"
        />
      </Link>

      <ul className={style.navListContainer}>
        {categories.map((table, index) => (
          <li key={index}>
            <NavLink
              to={`/${table.category}`}
              style={(isActive) => ({
                fontWeight: isActive ? "800" : "",
              })}
            >
              <img src={table.imgSrc} alt="logo" width="50" height="50" />
              {table.category}
              <p className={style.activeTasksP}>
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
