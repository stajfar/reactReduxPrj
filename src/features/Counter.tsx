import React from 'react';
import { useSelector, useDispatch } from 'react-redux';// component uses selector/ dispatcher to emit actions
import { increament, decrement, rest, increamentByAmount } from './counterSlice'; //import actions we defined in counter slice
import { useState } from 'react'

function Counter() {

    const counter = useSelector((state: any) => state.storeCounter.count);// selector to select the state from the store: to display
    const dispatch = useDispatch();// to dispatch slice ations

    const [increaseBy, setIncreaseBy] = useState(0);

    return (
        <section>
            <p>{counter}</p>
            <button onClick={() => {dispatch(increament()); } }>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <div>
                <input type="text" value={increaseBy} onChange={(e) => setIncreaseBy(Number(e.target.value))}></input>
                <button onClick={() => dispatch(rest())}>Reset</button>
                <button onClick={() => dispatch(increamentByAmount(increaseBy))}>Reset</button>

            </div>
        </section>

  );
}

export default Counter;