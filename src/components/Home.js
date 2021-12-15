import React, {useContext} from "react";
import { Context } from "./context";
import style from "./modules/App.module.css";

const Home = () => {
    const isDark = useContext(Context);
  return (
    <div>
      <img
        src={isDark ? "./logo/guysDark.jpg" : "./logo/guys.jpg"}
        alt="Lets do it!"
        className={style.homeImg}
      ></img>
    </div>
  );
};

export default Home;