import logo from "../assets/logo.svg"
import boy1 from "../assets/boy3.gif"
import boy2 from "../assets/boy4.gif"
import { Counter } from "./features/counter/Counter"

import WebApp from "@twa-dev/sdk"
import { useState } from "react"

const data = {
  dd: 7,
}

type UserData = {
  name: string
  // boards: Map<string, Board>;
  // active_board: string;
  // fav_tasks: [string]; //column?
  board: [CollectionData]
}

type CollectionData = [TaskData]

type TaskData = {
  name: string
  color: string
  content: string
  // date: Date;
  // tags:
  // histoty
}

function Task() {
  return (
    <>
      <li className="task">
        <button>'count is count'</button>
      </li>
    </>
  )
}

function ActionMenu({ text }: { text: string }) {
  const [active, setActive] = useState(true)
  function action() {
    setActive(!active)
  }
  return (
    <>
      <div className="Actionmenu">
        <p>{text}</p>
        {active ? (
          <div className="Button">
            <button onClick={action}> FIGHT </button>
            <button> BOYS </button>
            <button> BAG </button>
            <button> RUN </button>
          </div>
        ) : (
          <div className="Button">
            <button> FIST </button>
            <button> GUN </button>
            <button> SWORD </button>
            <button onClick={action}> BACK </button>
          </div>
        )}
      </div>
    </>
  )
}
function HealBar({ name, healty }: { name: string; healty: string }) {
  return (
    <>
      <div className="Healbar">
        <p>{name} Lv7 </p>
        <p>{healty}</p>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Player">
          <HealBar name="Fiend" healty="12/35" />
          <div className="Playerfield"> </div>
          <img src={boy2} className="App-logo Boy" alt="logo" />
        </div>
        <div className="Space"> </div>
        <div className="Player">
          <div className="Playerfield"> </div>
          <img src={boy1} className="App-logo Boy" alt="logo" />
          <HealBar name="Martyr" healty="23/27" />
        </div>
        <ActionMenu text="What will Martyr do?" />
      </div>
    </div>
  )
}

export default App

function App_first() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <body>
        <h3> Hello world </h3>
      </body>
    </div>
  )
}
