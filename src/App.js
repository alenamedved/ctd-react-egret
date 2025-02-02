import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListContainer from "./components/ListContainer";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Context } from "./components/context/context";

const todoCategories = [
  {
    category: "Presentation",
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

async function fetchTable(todoCategory, token) {
  try {
    const response = await fetch(
      `/.netlify/functions/fetchTable?todoCategory=${encodeURIComponent(
        todoCategory
      )}&token=${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return console.log(error);
  }
}

//fetch using serverless netlify function
function fetchTodoTables(token) {
  return todoCategories.map((todoCategory) => {
    return fetchTable(todoCategory.category, token);
  });
}

function App() {
  const [todoCounts, setTodoCounts] = React.useState({});
  const [isDark, setIsDark] = React.useState(false);
  const [token, setToken] = useState("");

  React.useLayoutEffect(() => {
    if (isDark) {
      document.body.classList.add("isDark");
    } else {
      document.body.classList.remove("isDark");
    }
  }, [isDark]);

  React.useEffect(() => {
    let inputToken = token;
    if (!inputToken) {
      inputToken = prompt("Enter a password");
      setToken(inputToken);
    }
    Promise.all(fetchTodoTables(inputToken)).then((todoResponses) => {
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

  const updateCount = (category, delta) => {
    setTodoCounts(() => {
      return { ...todoCounts, [category]: todoCounts[category] + delta };
    });
  };

  return (
    <Router>
      <Context.Provider value={isDark}>
        <Toggle
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
          <Home />
        </Route>

        <Switch>
          {todoCategories.map((table, index) => (
            <Route path={`/${table.category}`} key={index}>
              <ListContainer
                listName={table.category}
                handleUpdate={updateCount}
                token={token}
              />
            </Route>
          ))}
        </Switch>
        <Footer />
      </Context.Provider>
    </Router>
  );
}

export default App;
