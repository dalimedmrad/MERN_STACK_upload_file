import React, {useState, useEffect} from 'react';
import './App.css';
import FileUploadScreen from './screens/FileUploadScreen';
import {getSingleFiles, getMultipleFiles} from './data/api';

function App() {
  const [multipleFiles, setMultipleFiles] = useState([]);
  const getMultipleFilesList = async () => {
    try {
        const fileslist = await getMultipleFiles();
        setMultipleFiles(fileslist);
        console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMultipleFilesList();
  }, []);
  return (
    <>
        <div className="text-center">
          <h3 className="text-danger font-weight-bolder border-bottom text-center tt ">Single & Multiple File Upload Using MERN STACK </h3>
          <div className="offset-md-4 col-md-12">
            <FileUploadScreen getMultiple={() => getMultipleFilesList()}/>
          </div>
          <div className="col-md-12 photo">
            {multipleFiles.map((element, index) =>
                  <div key={element._id}>
                    <div className="row">
                      {element.files.map((file, index) =>
                        <img src={`http://localhost:8080/${file.filePath}`} className="cardd" height="300" width="300"  alt="img"/>  
                      )}
                    </div>
                  </div>
              )}
          </div>
       </div> 
       
    </>
  );
}

export default App;
