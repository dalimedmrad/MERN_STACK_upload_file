import React, {useState, useEffect} from 'react';
import {multipleFilesUpload} from '../data/api';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const FileUploadScreen = (props) => {
    const [multipleFiles, setMultipleFiles] = useState('');
    const [multipleProgress, setMultipleProgress] = useState(0);
    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }
    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }
    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);                      
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
        setMultipleFiles('');
        document.querySelectorAll("input").forEach(input => (input.value=""));
    }
    return (
        <div className="row mt-3">
            <div className="col-6">
                <div className="row">
                    <div className="col-10">
                    <div className="form-group files">
                        <label>Select single or Multiple File(s)</label>
                        <input  type="file"  name='file' onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                    </div>
                    </div>
                </div>                   
                <div className="row">
                        <div className="col-10">
                            <button type="button" onClick={() => UploadMultipleFiles()}  className="btn btn-primary">Upload</button>
                        </div>
                        <div className="col-2">
                            <CircularProgressbar
                                value={multipleProgress}
                                text={`${multipleProgress}%`}
                                styles={buildStyles({
                                    rotation: 0.25,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                        </div>
                </div>
            </div>
        </div>
    );
}

export default FileUploadScreen;