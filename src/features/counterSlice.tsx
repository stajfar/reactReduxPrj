import { createSlice } from '@reduxjs/toolkit';

const initialState = {//1-define initial state
    count : 0
}

export const counterSlice = createSlice({//2- create slice and implement reducer actions to update the state
    name: 'counter',
    initialState,
    reducers: {
        increament: (state) => { state.count += 1; },
        decrement: (state) => { state.count -= 1; },
        rest: (state) => { state.count = 0; },
        increamentByAmount: (state, action) => { state.count += action.payload }
    }
})

export const { increament, decrement, rest, increamentByAmount } = counterSlice.actions;//3-export component reducer actions
export default counterSlice.reducer;//4-store needs these to import reducers to provide to the entire application (counterReducer)

