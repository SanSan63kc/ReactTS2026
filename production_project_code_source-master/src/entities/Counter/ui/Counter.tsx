import { useDispatch, useSelector } from "react-redux"
import { Button } from "shared/ui/Button/Button"
import { counterActions } from "../model/slice/counterSlice"
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue"

interface CounterProps {
  className?: string
}

export const Counter = () => {
  let dispatch = useDispatch()
  let counterValue = useSelector(getCounterValue)
  let increment = () => {
    dispatch(counterActions.increment())
  }
  let decrement = () => {
    dispatch(counterActions.decrement())
  }
  return (
    <div>
      <h1>value = {counterValue}</h1>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </div>
  )
}
