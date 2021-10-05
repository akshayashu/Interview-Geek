import './Editor.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import stubs from '../../../defaultStubs';
import moment from 'moment';
import AceEditor from 'react-ace';
import { FormControl, makeStyles, TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

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
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        width: 150,
        "& .MuiOutlinedInput-input": {
            color: "#8E8D8A"
        },
        "& .MuiInputLabel-root": {
            color: "#8E8D8A"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8E8D8A"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#E98074"
        },
        "&:hover .MuiInputLabel-root": {
            color: "#E98074"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E98074"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#D8C3A5"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#D8C3A5"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D8C3A5"
        }
    },
    resize: {
        height: 10,
        fontSize: 14
    }
});


function Editor() {

    const [code, setCode] = useState("");
    const [language, setlanguage] = useState("cpp");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState("");
    const [jobId, setJobId] = useState("");
    const [submissionTime, setSubmissionTime] = useState("");
    const [executionTime, setExecutionTime] = useState("");
    const [jobDetails, setJobDetails] = useState(null);
    const [theme, setTheme] = useState("github");
    const [isWindowOpen, setWindowOpen] = useState(false);

    useEffect(() => {
        const defaultLanguage = localStorage.getItem("default-language") || "cpp";
        const defaultTheme = localStorage.getItem("default-theme") || "github";
        setlanguage(defaultLanguage);
        setTheme(defaultTheme)
    }, []);

    useEffect(() => {
        setCode(stubs[language]);
    }, [language]);

    function toggle() {
        setWindowOpen(wasOpened => !wasOpened);
    }

    const setDefaultLanguauge = () => {
        localStorage.setItem("default-language", language);
        localStorage.setItem("default-theme", theme);
        console.log(`${language} set as default language.`)
    }

    const renderTimeDetails = () => {
        if (!jobDetails) {
            return;
        }
        let result = "";
        let { submittedAt, completedAt, startedAt } = jobDetails;

        startedAt = moment(startedAt).toString();

        result += `Submitted At: ${submittedAt}\n`;
        if (submissionTime == "") {
            setSubmissionTime(submittedAt);
        }
        if (!completedAt || !startedAt) {
            return;
        }

        const start = moment(submittedAt);
        const end = moment(completedAt);
        const executeTime = end.diff(start, 'seconds', true);
        if (executionTime == "") {
            setExecutionTime(executeTime + "s");
        }
        result += ` Execution Time: ${executeTime}s`;
        // return result;
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
            setSubmissionTime("");
            setExecutionTime("");
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
                console.log(dataRes.job);

                if (success) {
                    const { status: jobStatus, output: jobOutput } = job;
                    setStatus(jobStatus);
                    setJobDetails(job);
                    if (jobStatus === "pending") return;

                    // got the output whether success or error
                    if (jobStatus === "success") {
                        setOutput(jobOutput);
                    } else {
                        setOutput(JSON.parse(jobOutput).stderr);
                    }

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

    const classes = useStyles();

    return (
        <div className="editor">
            <div className="lang-theme">
                <div className="editor-select-box">
                    <p>Theme</p>
                    <select
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
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
                <div className="editor-select-box">
                    <p>Lang</p>
                    <select
                        value={language}
                        onChange={(e) => {
                            let response = window.confirm(
                                "WARNING: If you switch the language, your code will be reset!"
                            );
                            if (response) {
                                setlanguage(e.target.value);
                            }
                        }}
                    >
                        <option value="cpp">C++</option>
                        <option value="py">Python</option>
                    </select>
                </div>
                <div
                    className="editor-btn"
                    onClick={setDefaultLanguauge}>
                    <p>Set as default</p>
                </div>
            </div>


            <AceEditor
                className="main-editor"
                width="100%"
                height="calc(100vh - 155px)"
                fontSize="14px"
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

            {/* console */}
            <div className="editor-console">
                {/* visible window state */}
                <div className="editor-console-window">
                    <div
                        className="editor-console-toggle"
                        onClick={toggle}>
                        {
                            isWindowOpen && (<p><i className="arrow down"></i></p>)
                        }
                        {
                            !isWindowOpen && (<p><i className="arrow up"></i></p>)
                        }

                        <p>Console</p>
                    </div>
                    <div
                        className="editor-submit-btn"
                        onClick={() => {
                            handleSubmit();
                            setWindowOpen(true);
                        }}>
                        <p>Run</p>
                        <div className="arrow-right"></div>
                    </div>
                </div>

                {/* toggling state */}
                {isWindowOpen &&
                    <div style={{ marginBottom: '30px' }} onLoad={renderTimeDetails()}>
                        <p
                            style={
                                status === "success" ? { color: 'green' }
                                    : status === "error" ? { color: 'red' }
                                        : { color: 'black' }
                            }
                        >Status: {status}</p>
                        {/* <p>Job id: {jobId && `${jobId}`}</p> */}
                        <p
                            style={
                                { maxHeight: '60px', fontWeight: '700', fontSize: '16px', backgroundColor: 'honeydew', overflowY: 'scroll' }
                            }>{output}</p>
                        <p>Submitted at: {submissionTime}</p>
                        <p>Execution time: {executionTime}</p>
                    </div>
                }


            </div>
        </div>
    );
}

export default Editor;