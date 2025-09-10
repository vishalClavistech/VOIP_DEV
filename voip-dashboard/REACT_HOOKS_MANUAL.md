# React Hooks Manual - Complete Usage Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Rules of Hooks](#rules-of-hooks)
3. [State Hooks](#state-hooks)
4. [Effect Hooks](#effect-hooks)
5. [Context Hooks](#context-hooks)
6. [Ref Hooks](#ref-hooks)
7. [Performance Hooks](#performance-hooks)
8. [Custom Hooks](#custom-hooks)
9. [Advanced Patterns](#advanced-patterns)
10. [Common Use Cases](#common-use-cases)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

---

## Introduction

React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 and provide a way to use stateful logic without writing class components.

### Key Features
- **State Management**: `useState` for local state
- **Side Effects**: `useEffect` for lifecycle events
- **Context**: `useContext` for consuming context
- **Refs**: `useRef` for DOM references
- **Performance**: `useMemo`, `useCallback` for optimization
- **Custom Logic**: Custom hooks for reusable logic

### Benefits
- **Simpler Code**: No need for class components
- **Reusable Logic**: Custom hooks can be shared
- **Better Testing**: Easier to test functional components
- **Performance**: Built-in optimization hooks

---

## Rules of Hooks

### 1. Only Call Hooks at the Top Level
```jsx
// ✅ Good - Hooks at top level
function MyComponent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  
  useEffect(() => {
    // effect logic
  }, [])
  
  return <div>{count}</div>
}

// ❌ Bad - Hooks inside conditions
function MyComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0) // Don't do this!
  }
  
  return <div>Hello</div>
}
```

### 2. Only Call Hooks from React Functions
```jsx
// ✅ Good - Inside React component
function MyComponent() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}

// ✅ Good - Inside custom hook
function useCounter() {
  const [count, setCount] = useState(0)
  return { count, setCount }
}

// ❌ Bad - Inside regular function
function regularFunction() {
  const [count, setCount] = useState(0) // Don't do this!
}
```

---

## State Hooks

### useState
The most basic hook for managing local state:

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  )
}
```

### useState with Objects
```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  })
  
  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }))
  }
  
  return (
    <div>
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
    </div>
  )
}
```

### useState with Arrays
```jsx
function TodoList() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  
  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: inputValue, completed: false }
      ])
      setInputValue('')
    }
  }
  
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }
  
  return (
    <div>
      <input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### useState with Functions
```jsx
function Counter() {
  const [count, setCount] = useState(0)
  
  // Using function to update state
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }
  
  // Using function for initial state
  const [expensiveValue, setExpensiveValue] = useState(() => {
    return computeExpensiveValue()
  })
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

---

## Effect Hooks

### useEffect
Handles side effects in functional components:

```jsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${userId}`)
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [userId]) // Dependency array
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

### useEffect with Cleanup
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)
    
    // Cleanup function
    return () => {
      clearInterval(interval)
    }
  }, []) // Empty dependency array = run once
  
  return <div>Seconds: {seconds}</div>
}
```

### useEffect with Multiple Dependencies
```jsx
function SearchResults({ query, filters }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const search = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${query}&filters=${JSON.stringify(filters)}`)
        const data = await response.json()
        setResults(data.results)
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setLoading(false)
      }
    }
    
    if (query) {
      search()
    }
  }, [query, filters]) // Re-run when query or filters change
  
  return (
    <div>
      {loading ? (
        <div>Searching...</div>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### useEffect for Event Listeners
```jsx
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div>
      <p>Width: {windowSize.width}</p>
      <p>Height: {windowSize.height}</p>
    </div>
  )
}
```

---

## Context Hooks

### useContext
Consumes context values:

```jsx
import { createContext, useContext, useState } from 'react'

// Create context
const ThemeContext = createContext()

// Context provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Context consumer
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <button 
      onClick={toggleTheme}
      className={`btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`}
    >
      Toggle Theme
    </button>
  )
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  )
}
```

### Multiple Contexts
```jsx
const UserContext = createContext()
const SettingsContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [settings, setSettings] = useState({})
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SettingsContext.Provider value={{ settings, setSettings }}>
        <Dashboard />
      </SettingsContext.Provider>
    </UserContext.Provider>
  )
}

function Dashboard() {
  const { user } = useContext(UserContext)
  const { settings } = useContext(SettingsContext)
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Theme: {settings.theme}</p>
    </div>
  )
}
```

---

## Ref Hooks

### useRef
Creates mutable references that persist across renders:

```jsx
import { useRef, useEffect } from 'react'

function TextInput() {
  const inputRef = useRef(null)
  
  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])
  
  const handleClick = () => {
    inputRef.current?.focus()
  }
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  )
}
```

### useRef for Storing Values
```jsx
function Timer() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)
  
  const startTimer = () => {
    if (intervalRef.current) return
    
    intervalRef.current = setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1000)
  }
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  )
}
```

### useRef for Previous Values
```jsx
function usePrevious(value) {
  const ref = useRef()
  
  useEffect(() => {
    ref.current = value
  })
  
  return ref.current
}

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

---

## Performance Hooks

### useMemo
Memoizes expensive calculations:

```jsx
import { useState, useMemo } from 'react'

function ExpensiveComponent({ items, filter }) {
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...')
    return items
      .filter(item => item.category === filter)
      .reduce((sum, item) => sum + item.value, 0)
  }, [items, filter]) // Only recompute when items or filter change
  
  return (
    <div>
      <p>Filtered sum: {expensiveValue}</p>
    </div>
  )
}
```

### useCallback
Memoizes functions to prevent unnecessary re-renders:

```jsx
import { useState, useCallback, memo } from 'react'

const ExpensiveChild = memo(({ onClick, label }) => {
  console.log('ExpensiveChild rendered')
  return <button onClick={onClick}>{label}</button>
})

function Parent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  
  // Without useCallback - function recreated on every render
  const handleClick = useCallback(() => {
    setCount(count + 1)
  }, [count])
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <ExpensiveChild onClick={handleClick} label={`Count: ${count}`} />
    </div>
  )
}
```

### useMemo vs useCallback
```jsx
function Example() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  
  // useMemo for values
  const expensiveValue = useMemo(() => {
    return count * 2
  }, [count])
  
  // useCallback for functions
  const handleClick = useCallback(() => {
    setCount(count + 1)
  }, [count])
  
  return (
    <div>
      <p>Value: {expensiveValue}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}
```

---

## Custom Hooks

### Basic Custom Hook
```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(initialValue)
  
  return { count, increment, decrement, reset }
}

// Usage
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

### Custom Hook with useEffect
```jsx
function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [url])
  
  return { data, loading, error }
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>User not found</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

### Custom Hook with Local Storage
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }
  
  return [storedValue, setValue]
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')
  
  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
    </div>
  )
}
```

---

## Advanced Patterns

### useReducer
For complex state management:

```jsx
import { useReducer } from 'react'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

### useImperativeHandle
Exposes methods to parent components:

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react'

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    clear: () => {
      inputRef.current.value = ''
    }
  }))
  
  return <input ref={inputRef} {...props} />
})

// Usage
function Parent() {
  const inputRef = useRef()
  
  const handleClick = () => {
    inputRef.current.focus()
  }
  
  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  )
}
```

### useLayoutEffect
Synchronous version of useEffect:

```jsx
import { useState, useLayoutEffect, useRef } from 'react'

function Tooltip({ children, content }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef()
  
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      })
    }
  }, [])
  
  return (
    <div ref={tooltipRef} className="tooltip">
      {children}
      <div 
        className="tooltip-content"
        style={{ 
          position: 'absolute',
          top: position.top,
          left: position.left
        }}
      >
        {content}
      </div>
    </div>
  )
}
```

---

## Common Use Cases

### Form Handling
```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault()
    onSubmit(values)
  }
  
  return { values, errors, handleChange, handleSubmit, setErrors }
}

// Usage
function ContactForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    name: '',
    email: '',
    message: ''
  })
  
  const onSubmit = (formData) => {
    console.log('Form submitted:', formData)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <span className="error">{errors.name}</span>}
      
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <textarea
        name="message"
        value={values.message}
        onChange={handleChange}
        placeholder="Message"
      />
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Debounced Search
```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  
  return debouncedValue
}

function SearchInput() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState([])
  
  useEffect(() => {
    if (debouncedQuery) {
      fetch(`/api/search?q=${debouncedQuery}`)
        .then(res => res.json())
        .then(data => setResults(data.results))
    } else {
      setResults([])
    }
  }, [debouncedQuery])
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Window Size Hook
```jsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    handleResize() // Call handler right away
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return windowSize
}

function ResponsiveComponent() {
  const { width, height } = useWindowSize()
  
  return (
    <div>
      <p>Window size: {width} x {height}</p>
      {width < 768 ? (
        <div>Mobile view</div>
      ) : (
        <div>Desktop view</div>
      )}
    </div>
  )
}
```

---

## Best Practices

### 1. Use Multiple useState for Unrelated State
```jsx
// ✅ Good - Separate concerns
function UserProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  return <div>{/* render */}</div>
}

// ❌ Avoid - Unrelated state in one object
function UserProfile() {
  const [state, setState] = useState({
    name: '',
    email: '',
    isLoading: false
  })
  
  return <div>{/* render */}</div>
}
```

### 2. Use useCallback for Event Handlers
```jsx
// ✅ Good - Memoized event handler
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = useCallback(() => {
    setCount(count + 1)
  }, [count])
  
  return <ExpensiveChild onClick={handleClick} />
}

// ❌ Avoid - New function on every render
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = () => {
    setCount(count + 1)
  }
  
  return <ExpensiveChild onClick={handleClick} />
}
```

### 3. Use useMemo for Expensive Calculations
```jsx
// ✅ Good - Memoized calculation
function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter)
  }, [items, filter])
  
  return <div>{/* render filteredItems */}</div>
}

// ❌ Avoid - Recalculation on every render
function ExpensiveComponent({ items, filter }) {
  const filteredItems = items.filter(item => item.category === filter)
  
  return <div>{/* render filteredItems */}</div>
}
```

### 4. Clean Up Side Effects
```jsx
// ✅ Good - Proper cleanup
function Timer() {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return <div>{seconds}</div>
}

// ❌ Bad - Memory leak
function Timer() {
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }, [])
  
  return <div>{seconds}</div>
}
```

### 5. Use Custom Hooks for Reusable Logic
```jsx
// ✅ Good - Reusable custom hook
function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // API logic
  }, [url])
  
  return { data, loading, error }
}

// Usage in multiple components
function UserList() {
  const { data: users, loading, error } = useApi('/api/users')
  // ...
}

function PostList() {
  const { data: posts, loading, error } = useApi('/api/posts')
  // ...
}
```

---

## Troubleshooting

### Common Issues

#### 1. Stale Closures
**Problem**: State values are stale in callbacks
```jsx
// ❌ Problem - Stale closure
function Counter() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1) // Always uses initial count value
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return <div>{count}</div>
}
```

**Solution**: Use functional updates
```jsx
// ✅ Solution - Functional update
function Counter() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1) // Always uses latest count value
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return <div>{count}</div>
}
```

#### 2. Infinite Loops
**Problem**: useEffect runs infinitely
```jsx
// ❌ Problem - Infinite loop
function Component() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setCount(count + 1) // Triggers re-render, which triggers effect again
  }, [count])
  
  return <div>{count}</div>
}
```

**Solution**: Fix dependencies or use useCallback
```jsx
// ✅ Solution - Correct dependencies
function Component() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(prev => prev + 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, []) // Empty dependency array
  
  return <div>{count}</div>
}
```

#### 3. Missing Dependencies
**Problem**: ESLint warnings about missing dependencies
```jsx
// ❌ Problem - Missing dependency
function Component({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, []) // Missing userId dependency
  
  return <div>{user?.name}</div>
}
```

**Solution**: Add missing dependencies
```jsx
// ✅ Solution - Correct dependencies
function Component({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId]) // Include userId in dependencies
  
  return <div>{user?.name}</div>
}
```

### Debug Tools

#### React Developer Tools
Install React Developer Tools browser extension to inspect hooks state and effects.

#### Console Logging
```jsx
function useDebugValue(value, label) {
  console.log(`${label}:`, value)
  return value
}

function MyComponent() {
  const [count, setCount] = useState(0)
  
  useDebugValue(count, 'Count')
  
  return <div>{count}</div>
}
```

---

## Examples from VoIP Dashboard

### Sidebar Context Hook
```jsx
// contexts/SidebarContext.tsx
import { createContext, useContext, useState, useEffect, useMemo } from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleSidebar = () => setIsOpen(prev => !prev)
  const openSidebar = () => setIsOpen(true)
  const closeSidebar = () => setIsOpen(false)
  
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }
    
    return () => {
      document.body.classList.remove('sidebar-open')
    }
  }, [isOpen])
  
  const value = useMemo(() => ({
    isOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }), [isOpen])
  
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
```

### Call Center Hook
```jsx
// hooks/useCallCenter.ts
import { useState, useEffect, useCallback } from 'react'

interface Call {
  id: string
  from: string
  status: 'active' | 'completed' | 'missed'
  duration?: number
}

export function useCallCenter() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const fetchCalls = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/calls')
      const data = await response.json()
      setCalls(data.calls)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calls')
    } finally {
      setLoading(false)
    }
  }, [])
  
  useEffect(() => {
    fetchCalls()
  }, [fetchCalls])
  
  const addCall = useCallback((call: Call) => {
    setCalls(prev => [...prev, call])
  }, [])
  
  const updateCall = useCallback((id: string, updates: Partial<Call>) => {
    setCalls(prev => prev.map(call => 
      call.id === id ? { ...call, ...updates } : call
    ))
  }, [])
  
  const removeCall = useCallback((id: string) => {
    setCalls(prev => prev.filter(call => call.id !== id))
  }, [])
  
  return {
    calls,
    loading,
    error,
    addCall,
    updateCall,
    removeCall,
    refetch: fetchCalls
  }
}
```

### Search Hook
```jsx
// hooks/useSearch.ts
import { useState, useEffect, useMemo } from 'react'

export function useSearch<T>(
  items: T[],
  searchFields: (keyof T)[],
  searchTerm: string
) {
  const [filteredItems, setFilteredItems] = useState<T[]>(items)
  
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return items
    }
    
    return items.filter(item =>
      searchFields.some(field => {
        const value = item[field]
        return typeof value === 'string' && 
               value.toLowerCase().includes(searchTerm.toLowerCase())
      })
    )
  }, [items, searchFields, searchTerm])
  
  useEffect(() => {
    setFilteredItems(searchResults)
  }, [searchResults])
  
  return filteredItems
}

// Usage
function CallList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { calls } = useCallCenter()
  
  const filteredCalls = useSearch(calls, ['from', 'status'], searchTerm)
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search calls..."
      />
      <ul>
        {filteredCalls.map(call => (
          <li key={call.id}>{call.from}</li>
        ))}
      </ul>
    </div>
  )
}
```

This manual provides comprehensive guidance for using React Hooks effectively in your VoIP Dashboard project. Hooks enable powerful state management, side effects, and reusable logic in functional components.