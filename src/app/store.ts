import {configureStore} from "@reduxjs/toolkit";
import {todolistApi} from "../services/todolistApi.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store=configureStore({
    reducer:{
        [todolistApi.reducerPath]:todolistApi.reducer
    },
    middleware:getDefaultMiddleware => getDefaultMiddleware().concat(todolistApi.middleware)
})

setupListeners(store.dispatch)//выхожу из закладки, возвращаюсь, и на ней не старые данные, а обновленные: здесь и в todolist-api
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>














// import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query/react'
// import {todolistApi} from "../services/todolistApi.ts";
//
// export const store = configureStore({
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistApi.middleware),
//     reducer: {
//         [todolistApi.reducerPath]: todolistApi.reducer,
//     },
// })
//
//
//
// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppGetState = typeof store.getState