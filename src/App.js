import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListContainer from "./components/ListContainer";
import Navigation from "./components/Navigation";
import style from "./components/modules/App.module.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Context } from "./components/context";

const todoCategories = [
  {
    category: "Personal",
    imgSrc: "./logo/human.png",
  },
  {
    category: "Business",
    imgSrc: "./logo/business.jpg",
  },
  {
    category: "FurryFriend",
    imgSrc: "./logo/furry.jpg",
  },
];

async function fetchTodoItems(category) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${
        process.env.REACT_APP_AIRTABLE_BASE_ID
      }/${encodeURIComponent(category)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

async function allData() {
  try {
    const response = await fetch("/.netlify/functions/my_functions", {
      headers: {
        "X-Airtable-Client-Secret": "foo-123123",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("response?", response);
    console.log("response data?", JSON.parse(data));

    return data;
  } catch (error) {
    console.log("Error happened here!");
    return console.log(error);
  }
}

function fetchTodoTables() {
  return todoCategories.map((todoCategory) => {
    return fetchTodoItems(todoCategory.category);
  });
}

function App() {
  const [todoCounts, setTodoCounts] = React.useState({});
  const [isDark, setIsDark] = React.useState(false);
  /* console.log(isDark); */
  React.useLayoutEffect(() => {
    if (isDark) {
      document.body.classList.add("isDark");
    } else {
      document.body.classList.remove("isDark");
    }
  }, [isDark]);

  React.useEffect(() => {
    Promise.all(fetchTodoTables()).then((todoResponses) => {
      const counts = {};

      todoCategories.forEach((todoCategory, index) => {
        let count = 0;
        for (let i = 0; i < todoResponses[index].records.length; i++) {
          if (!todoResponses[index].records[i].fields.isCompleted) {
            count += 1;
          }
        }
        counts[todoCategory.category] = count;
      });

      setTodoCounts(counts);
    });
  }, []);

  function updateCount(category, delta) {
    setTodoCounts(() => {
      return { ...todoCounts, [category]: todoCounts[category] + delta };
    });
  }
  allData()
  return (
    <Router>
      <Context.Provider value={isDark}>
        <Toggle
          //className="dark-mode-toggle"//
          checked={isDark}
          className="custom-classname"
          icons={{
            checked: "🌙",
            unchecked: null,
          }}
          onChange={({ target }) => setIsDark(target.checked)}
        />
        <Navigation categories={todoCategories} counts={todoCounts} />

        <Route exact path="/">
        <div>
          <img
            src={isDark ? "./logo/guysDark.jpg" : "./logo/guys.jpg"}
            alt="Lets do it!"
            className={style.homeImg}
          ></img>
          </div>
        </Route>
        <Switch>
          {todoCategories.map((table, index) => (
            <Route path={`/${table.category}`} key={index}>
              <ListContainer
                listName={table.category}
                handleUpdate={updateCount}
              />
            </Route>
          ))}
        </Switch>
      </Context.Provider>
    </Router>
  );
}

export default App;
