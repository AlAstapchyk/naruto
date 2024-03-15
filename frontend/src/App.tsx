import { useState } from 'react';
import axios from "axios";
import "./App.scss";

interface IData {
  id?: number,
  name: string,
  number: number
}

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState<string>();
  const [data, setData] = useState<IData[]>();
  const [element, setElement] = useState<IData>();

  function fetchText() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/hello")
      .then(res => res.json())
      .then(data => {
        setText(data.data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching hello:', error);
      });
  }

  function fetchData() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/data")
      .then(res => res.json())
      .then((data: IData[]) => {
        setData(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  async function fetchElement(elId: number) {
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/data/${elId}`)
      .catch(error => {
        console.error('Error incrementing data:', error);
      });
    setElement(response?.data);

    console.log(response)

    return response;
  }

  async function incrementElementNumber(elId: number) {
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `/data/${elId}/increment`)
      .catch(error => {
        console.error('Error incrementing data:', error);
      });

    return response;
  }

  return (
    <div className='flex w-[10rem] mx-auto'>
      {import.meta.env.VITE_BACKEND_URL}
      <br/>
      <button className='red cursor-pointer' onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <button className='red cursor-pointer' onClick={fetchText}>
        Fetch text
      </button>
      <button className='red cursor-pointer' onClick={fetchData}>
        Fetch data
      </button>
      <h1 className='black'>{text}</h1>
      <h1>Elements:</h1>
      <ul>
        {data?.map(el =>
          <li>{`${el.id}. ${el.name} -- ${el.number}`}</li>
        )}
      </ul>

      <hr></hr>

      <button className='red cursor-pointer' onClick={() => fetchElement(1)}>
        Fetch element with id = 1
      </button>
      <button className='red cursor-pointer' onClick={() => incrementElementNumber(1)}>
        Increment element with id = 1
      </button>
      <button className='red cursor-pointer' onClick={() => fetchElement(2)}>
        Fetch element with id = 2
      </button>
      <button className='red cursor-pointer' onClick={() => incrementElementNumber(2)}>
        Increment element with id = 2
      </button>
      <h1>Element:</h1>
      <p>{JSON.stringify(element)}</p>
    </div>
  )
}

export default App
