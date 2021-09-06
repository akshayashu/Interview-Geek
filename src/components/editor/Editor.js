import './Editor.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import stubs from './../../defaultStubs';
import moment from 'moment';
import AceEditor from 'react-ace';

// language
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
// themes
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";


function Editor() {

    const [code, setCode] = useState("");
    const [language, setlanguage] = useState("cpp");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("");
    const [jobId, setJobId] = useState("");
    const [jobDetails, setJobDetails] = useState(null);
    const [theme, setTheme] = useState("github");

    useEffect(() => {
        const defaultLanguage = localStorage.getItem("default-language") || "cpp";
        const defaultTheme = localStorage.getItem("default-theme") || "github";
        setlanguage(defaultLanguage);
        setTheme(defaultTheme)
    }, []);

    useEffect(() => {
        setCode(stubs[language]);
    }, [language]);

    const setDefaultLanguauge = () => {
        localStorage.setItem("default-language", language);
        localStorage.setItem("default-theme", theme);
        console.log(`${language} set as default language.`)
    }

    const renderTimeDetails = () => {
        if (!jobDetails) {
            return "";
        }
        let result = "";
        let { submittedAt, completedAt, startedAt } = jobDetails;

        startedAt = moment(startedAt).toString();

        result += `Submitted At: ${submittedAt}`;

        if (!completedAt || !startedAt) {
            return result;
        }
        const start = moment(submittedAt);
        const end = moment(completedAt);
        const executionTime = end.diff(start, 'seconds', true);

        result += `  Execution Time: ${executionTime}s`;
        return result;
    }
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
            setJobDetails(null);
            const { data } = await axios.post("http://localhost:5000/run", codeData);
            console.log(data);
            setJobId(data.jobId);

            // we will keep requesting the status of our job 
            // untill we get the success status

            let intervalId;
            intervalId = setInterval(async () => {

                const { data: dataRes } = await axios.get(
                    "http://localhost:5000/status",
                    {
                        params: { id: data.jobId }
                    });

                const { success, job, error } = dataRes;
                console.log(dataRes);

                if (success) {
                    const { status: jobStatus, output: jobOutput } = job;
                    setStatus(jobStatus);
                    setJobDetails(job);
                    if (jobStatus === "pending") return;

                    // got the output whether success or error
                    setOutput(jobOutput);
                    clearInterval(intervalId);
                } else {
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
        <div className="editor">
            <div className="language-selector">
                <label>Language: </label>
                <select
                    value={language}
                    onChange={(e) => {
                        let response = window.confirm(
                            "WARNING: If you switch the language, your code will be reset!"
                        );
                        if (response) {
                            setlanguage(e.target.value);
                        }
                    }
                    }
                >
                    <option value="cpp">C++</option>
                    <option value="py">Python</option>
                </select>
            </div>
            <br />
            <div>
                <label>Theme: </label>
                <select
                    value={theme}
                    onChange={(e) => {
                        setTheme(e.target.value)
                    }}
                >
                    <option value="github">Github</option>
                    <option value="kuroir">Kuroir</option>
                    <option value="monokai">Monokai</option>
                    <option value="solarized_dark">Solarized dark</option>
                    <option value="solarized_light">Solarized light</option>
                    <option value="textmate">Textmate</option>
                    <option value="terminal">Terminal</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="twilight">Twilight</option>
                    <option value="xcode">XCode</option>
                </select>
            </div>
            <br />
            <div>
                <button onClick={setDefaultLanguauge}>Set default</button>
            </div>
            <br />
            <br></br>
            <AceEditor
                className='main-editor'
                fontSize="16px"
                mode={language === "py" ? "python" : "c_cpp"}
                theme={theme}
                value={code}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
                onChange={(e) => {
                    setCode(e)
                }}
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>{status}</p>
            <p>{jobId && `JobID: ${jobId}`}</p>
            <p>{renderTimeDetails()}</p>
            <p>{output}</p>
        </div>
    );
}

export default Editor;