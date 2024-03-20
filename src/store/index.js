import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose
} from "redux"
import cReducer from "./reducer"

const store = createStore(cReducer)

export default store