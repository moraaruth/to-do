import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

//component list that takes three properties; items, removeItem and editItem
//items property - array o objects that represent items in a todo list
//removeItem - remove an item in the list
//editItem - edit item in the list
const List = ({ items, removeItem, editItem }) => {
  return (
    //items array is mapped over using the map function
    <div className="todo-list">
      
      {items.map((item) => {
        const { id, title } = item 
        return (
          <article key={id} className="todo-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              
              <button type="button" className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button type="button" className="delete-btn" onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List