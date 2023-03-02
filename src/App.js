import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


//function that retrieves the to-do list items from `localStorage`
//if list is present, it is parsed from a JSON string and returned
//if not present, empty array is returned
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  return []
}

//function that sets up state variables that will be used by the application
function App() {
  //name of to-do item being added or edited
  const [name, setName] = useState('')
  //list - array of to-do items
  const [list, setList] = useState(getLocalStorage())
  //isEditting indicates whether an item is being edited
  const [isEditing, setIsEditing] = useState(false)
  //ID of the item being edited
  const [editID, setEditID] = useState(null)
  //an object, determines whether alert message is displayed its type and content
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  //function called when user submits the form to add or edit
  const handleSubmit = (e) => {
    //prevent default form submission and check if name is empty
    e.preventDefault()
    if(!name) {
      showAlert(true, 'danger', 'please enter a thing to do')
    }
    // function edits an existing item by updating its title property in the list array
    else if(name && isEditing) {
      setList(
        list.map((item) => {
          if(item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )

      //reset the form and editing state
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    }
    //name variable not empty, `isEditting` is true it updates the item in the list
    else {
      showAlert(true, 'success', 'thing added to the list')
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName('')
    }
  }
//function that sets the `alert` state with the passed `show`, `type` and `msg`
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }
//function that sets the `list` state to an empty array and shows an alert
  const clearList = () => {
    showAlert(true, 'success', 'list cleared')
    setList([])
  }
//function that remoes an item from the `list` state with the matching `id`
  const removeItem = (id) => {
    showAlert(true, 'danger', 'thing removed')
    setList(list.filter((item) => item.id !== id))
  }
//sets `isEditing` to true sets `editID`state with the matching `id`
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
//calls the callback function whenever the value of `list` changes
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  //JSX code to be rendered to the browser
  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>todo list</h3>
        <div className="form-control">
          <input type="text" className="todo" placeholder="add your task" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>Clear Items</button>
        </div>
      )}
    </section>
  )  
}

export default App