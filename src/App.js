import { useEffect, useReducer, useState } from "react";
import { motion } from "framer-motion";

const initialState = [
  {
    id: 1,
    heading: "Clean",
    desc: "You must clean the room before its too late and it should be italic",
    done: false,
  },
  {
    id: 2,
    heading: "Make the Bed",
    desc: "Here we go",
    done: false,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "removeItem":
      return state.filter(function (obj) {
        return obj.id !== action.id;
      });
      break;

    case "resetList":
      return initialState;
      break;

    case "markAsDone":
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, done: !item.done };
        } else {
          return item;
        }
      });
      break;
    case "addItem":
      const maxId = state.reduce((arr, oId) => {
        return (arr = arr > oId.id ? arr : oId.id);
      });
      return [
        ...state,
        {
          id: maxId + 1,
          heading: action.item.heading,
          desc: action.item.description,
        },
      ];
      break;
    default:
      break;
  }
}

function App() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const list = state;

  const removeItem = (id) => {
    dispatch({ type: "removeItem", id: id });
  };

  const markAsDone = (id) => {
    dispatch({ type: "markAsDone", id: id });
  };

  const handleForm = (e) => {
    e.preventDefault();
    dispatch({ type: "addItem", item: { heading, description } });
    setHeading("");
    setDescription("");
  };

  return (
    <div className="app">
      <Header />
      <Main>
        <FormArea
          heading={heading}
          setHeading={setHeading}
          description={description}
          setDescription={setDescription}
          handleForm={handleForm}
        />
        <List list={list} removeItem={removeItem} markAsDone={markAsDone} />
      </Main>
    </div>
  );
}

function FormArea({
  heading,
  setHeading,
  description,
  setDescription,
  handleForm,
}) {
  return (
    <div className="form-container">
      <form onSubmit={handleForm}>
        <div className="f-group">
          <div className="f-item">
            <label for="ti-h">Heading</label>
            <input
              id="ti-h"
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          </div>
          <div className="f-item">
            <label for="ti-desc">Description</label>
            <input
              id="ti-desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="header-container">
        <h1>Fancy ToDo List ✅</h1>
      </div>
    </header>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function List({ list, removeItem, markAsDone }) {
  return (
    <div className="td-list">
      {list.map((item, ind) => (
        <ListItem
          key={item.id}
          itemInf={item}
          removeItem={removeItem}
          markAsDone={markAsDone}
          index={ind}
        />
      ))}
    </div>
  );
}

function ListItem({ itemInf, removeItem, markAsDone, ind }) {
  const itemVariants = {
    initial: { x: "-100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };
  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3, delay: ind * 0.5 }}
      className="l-item"
    >
      <div className={`item-container ${itemInf.done ? "dnz" : ""}`}>
        <div className={`i-i`}>
          <h3>{itemInf.id}</h3>
          <div className="i-desc">
            <h2>{itemInf.heading}</h2>
            <p>{itemInf.desc}</p>
          </div>
        </div>
        {itemInf.done ? (
          <p className="dn-it">You've Done IT!</p>
        ) : (
          <div className="actions">
            <button
              type="button"
              className="btn btn-done"
              onClick={() => markAsDone(itemInf.id)}
            >
              Done ✔
            </button>
            <button
              type="button"
              className="btn btn-remove"
              onClick={() => removeItem(itemInf.id)}
            >
              Remove 𐄂
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default App;
