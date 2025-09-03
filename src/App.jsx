import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit} from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [Todo,setTodo] = useState("")
  const [Todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("Todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(todos)
    }
  },[])

  const savetoC = (parsms) => {
    localStorage.setItem("Todos",JSON.stringify(Todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (Todo.trim() !== "") { 
      setTodos([...Todos,{id:uuidv4(),Todo,isCompleted:false}])    
      setTodo("")
    }
    savetoC()
  }

  const handleEdit = (e,id) => {
    let t = Todos.filter(i => i.id === id)
    setTodo(t[0].Todo)
    let newtodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    savetoC()
  }

  const handleDelete = (e,id) => {
    let newtodos = Todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
    savetoC()
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...Todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    savetoC()
  }
  

  return (
    <>
      <nav className="bg-blue-900 text-white w-[100vw] fixed left-0 h-10 text-2xl flex justify-around">
        <span className="font-bold">Hi Task</span>
        <span className="font-light">Your Tasks</span></nav>
    <div className="min-h-[80vh] min-w-[40vw] bg-blue-200 rounded-xl mt-20 p-5 shadow-2xl max-[500px]:mt-9 max-[500px]:w-[100vw] max-[500px]:h-[95vh] max-[500px]:border-8 max-[500px]:border-blue-100 max-[500px]:rounded-4xl"> 
        <h1 className="w-[100%] font-semibold text-center text-2xl mb-3 text-white">Let's manage your Todos</h1>
        <h1 className="font-bold text-2xl py-3">Add a Todo</h1>
      <input type="text" placeholder="|" className="w-[80%] mr-3 bg-white rounded-3xl px-5 py-1.5 -z-10 focus:outline-0 max-[500px]:w-[75%]" value={Todo} onChange={handleChange} />
      
      <button className="bg-black text-white text-lg px-2.5 py-1 rounded-4xl active:bg-white active:text-black cursor-pointer font-bold"onClick={handleAdd}>Save</button>

      <h1 className="font-semibold pt-2 text-2xl">Your Todos</h1>
      <hr className="mt-3"/>

      <div className="Todos pt-3 ">
        {Todos.length===0 && <div>Add your Todos</div>}
        {Todos.map(item => {
          return <div key={item.id} className="Todo flex justify-between my-2">
            <div className="flex gap-3">
              <input name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} id=""/>
              <div className={item.isCompleted? "line-through" : ""}><div className="text-xl font-mono">{item.Todo}</div></div>
            </div>
             <div className="buttons flex gap-2 h-full">
               <button className="bg-blue-50 px-1.5 font-semibold py-0.5 rounded cursor-pointer active:bg-blue-100" onClick={(e)=>handleEdit(e,item.id)}><FaEdit /></button>
               <button className="bg-blue-50 px-1.5 font-semibold py-0.5 rounded cursor-pointer active:bg-blue-100" onClick={(e) => { handleDelete(e,item.id) }}><AiFillDelete /></button>
            </div>
            </div>
        })}
      </div>
    </div>
  </>
  );
}

export default App;