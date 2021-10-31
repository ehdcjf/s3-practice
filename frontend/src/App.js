import { useState } from 'react'
import axios from 'axios'

import './App.css'

async function postImage({image, description}) {
  const formData = new FormData();
  for(let i = 0; i<image.length; i++){
    formData.append("image",image[i])
  }
  
  formData.append("description", description)
  console.log(formData)
  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function App() {

  const [file, setFile] = useState([])
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    // setImages([result.image, ...images])
  }

  const fileSelected = event => {
    console.log(event.target.files)
    const newfiles=[];
    for(let i = 0; i<event.target.files.length; i++){
      newfiles.push(event.target.files[i])
    }
		setFile(newfiles)
    console.log(newfiles)
	}

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*" multiple></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}


    </div>
  );
}

export default App;
