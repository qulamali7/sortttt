import { useState, useEffect } from "react";
import "./index.scss";
const Table = () => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState([])
  useEffect(() => {
    GetAdminFetch();
    GetCategoryFetc();
  }, []);

  async function GetAdminFetch() {
    try {
      const res = await fetch("https://northwind.vercel.app/api/products");
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function GetCategoryFetc() {
    try {
      const res = await fetch("https://northwind.vercel.app/api/categories");
      const data = await res.json();
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  function sortByProperty(direction,property) {
    if (direction==="asc") {
      setProducts([...products.sort((a,b) => (a[property]< b[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0))])
      return
    }
    else(
      setProducts([...products.sort((a,b) => (a[property]> b[property]) ? 1 : ((b[property] > a[property]) ? -1 : 0))])
    )
  }
  function handleClick(id) {
    setCategory(id)
  }

  return (
    <div className="endpoint">
      <input
        type="text"
        placeholder="Search name"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button onClick={()=>sortByProperty("asc","name")}>A--Z</button>
      <button onClick={()=>sortByProperty("desc","name")}>Z--A</button>
      <div>
        {category.map((x)=><button onClick={handleClick(x.id)}>{x.name}</button>)}
      </div>
      <table>
        <thead>
          <tr>
            <th>Category Id</th>
            <th>Name</th>
            <th>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((x) => {
            if (x.name.toLowerCase().includes(input.toLowerCase())) {
              return (
                <tr key={x.id}>
                  <td>{x.categoryId}</td>
                  <td>{x.name}</td>
                  <td>{x.unitPrice}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
