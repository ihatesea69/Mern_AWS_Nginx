## Redux

The primary purpose of a Redux store is to provide a single source of truth for your application's state, making it predictable and easier to manage across different components.

## Reducer

When a reducer is not pure, it might directly modify the existing state object instead of returning a new one. This is called mutation. Redux relies on immutability, meaning the original state should never be changed directly. Instead, reducers should always return a new state object with the desired changes.

If a reducer mutates the state, it can lead to unpredictable behavior and make it very difficult to track down bugs, because other parts of your application might still be referencing the old, modified state without realizing it has changed. Pure functions, by definition, avoid these side effects and always produce a new output based on their input, which is exactly what Redux needs for predictable state management.

## Feedback

"Further practice with JavaScript array methods for immutable updates would solidify your understanding of Redux's immutability principle. Additionally, refining your technical vocabulary to be more precise will enhance your communication in this domain."
