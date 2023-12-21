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

interface Player {
  name: string
  maxHealty: number
  currentHealty: number
  imagePath: string
}
function new_player(name: string, maxHealty: number, imagePath: string) {
  let currentHealty = maxHealty
  return {
    name,
    maxHealty,
    currentHealty,
    imagePath,
  }
}

const initialState = {
  oppPlayer: new_player("Fiend", 35, boy2),
  thisPlayer: new_player("Martyr", 27, boy1),
}

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    doDamage: (state, action: PayloadAction<number>) => {
      if (state.oppPlayer.currentHealty < action.payload) {
        state.oppPlayer.currentHealty = 0
      }
      state.oppPlayer.currentHealty -= action.payload
    },
    takeDamage: (state, action: PayloadAction<number>) => {
      if (state.thisPlayer.currentHealty < action.payload) {
        state.thisPlayer.currentHealty = 0
      }
      state.thisPlayer.currentHealty -= action.payload
    },
    alerting: (state, action: PayloadAction<string>) => {
      alert(action.payload)
    },
  },
})
export const { doDamage, takeDamage, alerting } = playersSlice.actions
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
            <button onClick={() => dispatch(alerting("Other boys"))}>
              BOYS
            </button>
            <button
              onClick={() =>
                dispatch(alerting("For this function work in progres"))
              }
            >
              BAG
            </button>
            <button onClick={() => dispatch(alerting("You truy run"))}>
              RUN
            </button>
          </div>
        ) : (
          <div className="ActionMenu-Button">
            <button onClick={() => dispatch(doDamage(3))}> FIST </button>
            <button onClick={() => dispatch(doDamage(5))}> GUN </button>
            <button onClick={() => dispatch(takeDamage(5))}> SELFHARM </button>
            <button onClick={action}> BACK </button>
          </div>
        )}
      </div>
    </>
  )
}
function PlayerHealBar({
  name,
  currentHealty,
  maxHealty,
}: {
  name: string
  currentHealty: number
  maxHealty: number
}) {
  return (
    <div className="Healbar">
      <p>{name} Lv7 </p>
      <div className="FullHealty">
        <div
          className="CurrentHealty"
          style={{
            width: ((100 / maxHealty) * currentHealty).toString() + "%",
          }}
        ></div>
      </div>
      <p>{currentHealty + "/" + maxHealty}</p>
    </div>
  )
}
function OppPlayerComponent({ style = { backgroundColor: "red", height: "100vmin" } }) {
  const player = useAppSelector(selectOppPlayer)
  return (
    <>
      <div className="Player">
        <PlayerHealBar
          name={player.name}
          maxHealty={player.maxHealty}
          currentHealty={player.currentHealty}
        />
        <div className="Playerfield"> </div>
        <img
          src={player.imagePath}
          className="App-logo Avatar"
          alt="logo"
          style={style}
        //   transitionProperty: "color",
        //   transitionDuration: "30s",
        //   color: active ? "white" : "red",
        //   // treansitionTimingFunction:
        // }}
        // onClick={action}
        />
      </div>
    </>
  )
}
function ThisPlayerComponent() {
  const player = useAppSelector(selectThisPlayer)
  const currentHealty = useAppSelector(
    (state: RootState) => state.players.oppPlayer.currentHealty,
  )
  return (
    <>
      <div className="Player">
        <div className="Playerfield"> </div>
        <img
          src={player.imagePath}
          className="App-logo Avatar"
          alt="logo"
        // style={{
        //   transitionProperty: "color",
        //   transitionDuration: "30s",
        //   color: active ? "white" : "red",
        //   // treansitionTimingFunction:
        // }}
        // onClick={action}
        />
        <PlayerHealBar
          name={player.name}
          maxHealty={player.maxHealty}
          currentHealty={player.currentHealty}
        />
      </div>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-header">
          <OppPlayerComponent />
          <div className="Space"> </div>
          <ThisPlayerComponent />
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
