import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const [editId, setEditId] = useState(null)
  const isFirstLoad = useRef(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  useEffect(() => {
    if(isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    saveToLS()
  }, [todos])
  
  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    setEditId(id)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
  }

  const handleAdd = () => {
    if(editId) {
      const updatedTodo = { id: editId, todo, isCompleted: false }
      const newTodos = todos.map(item => (item.id === editId ? updatedTodo : item));
      setTodos(newTodos);
      setEditId(null);
    }
    else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className='flex gap-2'>
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-white rounded-full disabled:bg-violet-400'>Save</button>
          </div>
        </div>
        <input className=' mx-2 my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>

        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <div className="todos">
          <h2 className='text-xl font-bold'>
            {showFinished ? "Finished Todos" : "Your Todos"}
          </h2>
          {/* {todos.length === 0 && <div className='my-3'>No Todos to display</div>} */}
          {/* {(showFinished && todos.length === 0) && <div className='mx-3 my-3'>No Finished Todos to display</div>} */}
          {todos
            .filter(item => showFinished ? item.isCompleted : !item.isCompleted).length === 0 && (
              <div className='mx-3 my-3'>
                {showFinished ? "No Finished Todos to display" : "No Todos to display"}
              </div>
            )}
          {todos
            .filter(item => showFinished ? item.isCompleted : !item.isCompleted)
            .map(item => {
              return <div key={item.id} className="todo flex mx-4 my-3 justify-between">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-700 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
                </div>
              </div>
            })}
        </div>
      </div >
    </>
  )
}

export default App
