import React, {useState} from "react";
import Transaction from "./Transaction";

function TransactionsList({transactions, onAddItem}) {

  const list = transactions.map((item)=>{
    return <Transaction key={item.id} date={item.date} description={item.description} category={item.category} amount={item.amount} />;
  })
  return (
    <div>
      <AddTransactionForm onAddItem={onAddItem}/>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
          </tr>
          {list}
        </tbody>
      </table>
    </div>
  );
}

function AddTransactionForm({onAddItem}) {
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    const itemData = {
      date: date,
      description: description,
      category: category,
      amount: amount
    }
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => onAddItem(newItem));
     
  }
  return (
    <div className="ui segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="inline fields">
          <input className="inputField" value={date} onChange={(e) => setDate(e.target.value)} type="date" name="date" />
          <input className="ui inverted input"  value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" placeholder="Description" />
          <input  value={category} onChange={(e) => setCategory(e.target.value)} type="text" name="category" placeholder="Category" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" name="amount" placeholder="Amount" step="0.01" />
        </div><br></br>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionsList;