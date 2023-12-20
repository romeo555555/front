import logo from "../assets/logo.svg"
import boy1 from "../assets/boy3.gif"
import boy2 from "../assets/boy4.gif"
import { Counter } from "./features/counter/Counter"

import WebApp from "@twa-dev/sdk"
import { useState } from "react"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { RootState, store } from "./app/store"
import { useAppDispatch, useAppSelector } from "./app/hooks"

class Player {
  name: string = "Empety"
  maxHealty: number = 0
  currentHealty: number = 0
  imagePath: string = ""

  constructor(name: string, maxHealty: number, imagePath: string) {
    this.name = name
    this.maxHealty = maxHealty
    this.currentHealty = maxHealty
    this.imagePath = imagePath
  }
}

const initialState = {
  oppPlayer: new Player("Fiend", 35, boy2),
  thisPlayer: new Player("Martyr", 27, boy1),
}

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    doDamage: (state, action: PayloadAction<number>) => {
      state.oppPlayer.currentHealty -= action.payload
    },
    takeDamage: (state, action: PayloadAction<number>) => {
      state.thisPlayer.currentHealty -= action.payload
    },
  },
})
export const { doDamage, takeDamage } = playersSlice.actions
export const playersReducer = playersSlice.reducer
export const selectOppPlayer = (state: RootState) => state.players.oppPlayer
export const selectThisPlayer = (state: RootState) => state.players.thisPlayer

function ActionMenu({ text }: { text: string }) {
  const oppPlayer = useAppSelector(selectOppPlayer)
  const thisPlayer = useAppSelector(selectThisPlayer)
  const dispatch = useAppDispatch()
  const [active, setActive] = useState(true)
  function action() {
    setActive(!active)
  }
  return (
    <>
      <div className="ActionMenu">
        <p className="ActionMenu-Main">{text}</p>
        {active ? (
          <div className="ActionMenu-Button">
            <button onClick={action}> FIGHT </button>
            <button> BOYS </button>
            <button> BAG </button>
            <button> RUN </button>
          </div>
        ) : (
          <div className="ActionMenu-Button">
            <button onClick={() => dispatch(doDamage(3))}> FIST </button>
            <button onClick={() => dispatch(doDamage(3))}> FIST </button>
            <button onClick={() => dispatch(doDamage(5))}> GUN </button>
            <button onClick={action}> BACK </button>
          </div>
        )}
      </div>
    </>
  )
}
function PlayerComponent({ isOpp = true }) {
  const player = useAppSelector(isOpp ? selectOppPlayer : selectThisPlayer)
  const currentHealty = useAppSelector((state: RootState) => state.players.oppPlayer.currentHealty)
  return (
    <>
      <div className="Player">
        <div className="Healbar">
          <p>{player.name} Lv7 </p>
          <div className="FullHealty">
            <div
              className="CurrentHealty"
              style={{
                width:
                  ((100 / player.maxHealty) * currentHealty).toString() + "%",
              }}
            ></div>
          </div>
          <p>{currentHealty + "/" + player.maxHealty}</p>
        </div>
        <div className="Playerfield"> </div>
        <img src={player.imagePath} className="App-logo Avatar" alt="logo" />
      </div>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <PlayerComponent />
          <div className="Space"> </div>
          <PlayerComponent isOpp={false} />
          <ActionMenu text="What will Martyr do?" />
        </div>
      </div>
    </Provider>
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
