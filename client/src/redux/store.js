// en este archivo se configura el almacen

import {applyMiddleware, createStore} from "redux"; //aplyMiddleware es como la aduana la que te pide ciertos permisos para pasar 

import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "../redux/reducer/reducer";
import thunk from "redux-thunk"; //redux no entiene asincronia y thunk permite agregarle la capacidad de manejar solicitudes asincronicas

//creo un store con create store que que tiene como 1 argumento indicar el reducer y 2 argumento las config extras externas 
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));