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

    const classes = useStyles();

    return (
        <div className="editor">
            <div className="lang-theme">
                <TextField
                    className={classes.root}
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
                    variant="outlined"
                    label="Themes"
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    select
                >
                    <MenuItem value="github">Github</MenuItem>
                    <MenuItem value="kuroir">Kuroir</MenuItem>
                    <MenuItem value="monokai">Monokai</MenuItem>
                    <MenuItem value="solarized_dark">Solarized dark</MenuItem>
                    <MenuItem value="solarized_light">Solarized light</MenuItem>
                    <MenuItem value="textmate">Textmate</MenuItem>
                    <MenuItem value="terminal">Terminal</MenuItem>
                    <MenuItem value="tomorrow">Tomorrow</MenuItem>
                    <MenuItem value="twilight">Twilight</MenuItem>
                    <MenuItem value="xcode">XCode</MenuItem>
                </TextField>
                <TextField
                    className={classes.root}
                    value={language}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    onChange={(e) => {
                        let response = window.confirm(
                            "WARNING: If you switch the language, your code will be reset!"
                        );
                        if (response) {
                            setlanguage(e.target.value);
                        }
                    }}
                    variant="outlined"
                    label="Language"
                    select
                >
                    <MenuItem value="cpp">C++</MenuItem>
                    <MenuItem value="py">Python</MenuItem>
                </TextField>

                <Button
                    size="medium"
                    variant="outlined"
                    onClick={setDefaultLanguauge}
                >Set default</Button>
            </div>
            <AceEditor
                className="main-editor"
                width="50vw"
                height="70vh"
                fontSize="18px"
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

            <Button
                onClick={handleSubmit}
                variant="contained"
                endIcon={<PlayArrowIcon />}
                style={{backgroundColor: '#1DE9B6', color: '#FFFFFF'}}
            >Submit</Button>
            <p>{status}</p>
            <p>{jobId && `JobID: ${jobId}`}</p>
            <p>{renderTimeDetails()}</p>
            <p>{output}</p>
        </div>
    );
}

export default Editor;