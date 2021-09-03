import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [code, setCode] = useState("");
  const [language, setlanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  //submitting code
  const handleSubmit = async () => {

    const codeData = {
      language,
      code
    }

    try {
      setJobId("");
      setStatus("");
      setOutput("");
      const { data } = await axios.post("http://localhost:5000/run", codeData);
      console.log(data);
      setJobId(data.jobId);

      // we will keep requesting the status of our job 
      // untill we get the success status

      let intervalId;
      intervalId = setInterval(async () => {

        const { data: dataRes } = await axios.get(
          "http://localhost:5000/status",
          { params: { id: data.jobId } 
        });

        const {success, job, error} = dataRes;
        console.log(dataRes);

        if(success){
          const {status: jobStatus, output: jobOutput} = job;
          setStatus(jobStatus);
          if(jobStatus === "pending") return;
          
          // got the output whether success or error
          setOutput(jobOutput);
          clearInterval(intervalId);
        }else{
          setStatus("Error: Please retry!");
          console.log(error);
          clearInterval(intervalId);
          setOutput(error);
        }

        console.log(dataRes);
      }, 1000)

    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.stderr;
        setOutput(errMsg);
        console.log(response);
      } else {
        setOutput("Error connecting to server!");
      }

    }
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            setlanguage(e.target.value);
            console.log(e.target.value);
          }
          }
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <textarea rows="20" cols="75" value={code}
        onChange={(e) => {
          setCode(e.target.value)
        }}></textarea>
      <br></br>

      <button onClick={handleSubmit}>Submit</button>
      <p>{status}</p>
      <p>{jobId && `JobID: ${jobId}`}</p>
      <p>{output}</p>
    </div>
  );
}

export default App;
