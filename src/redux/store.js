import {configureStore} from '@reduxjs/toolkit'
import lslice from './loginslice'

export const store = configureStore({
    reducer: {
        Lslice:lslice
    }
})
