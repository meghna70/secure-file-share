import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, fetchFiles } from "../redux/slices/fileSlice"
import "../App.css"

const UploadPage = () => {
    const dispatch = useDispatch();
    const { user, token, loading, error } = useSelector((state) => state.auth);
    const [file, setFile] = useState(null);
    console.log("user details:", user)
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState(null);
    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleUpload = async (e) => {
        e.preventDefault();
        setLoader(true);
        setErr(null);
        const formData = new FormData();
            formData.append('file', file);
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('filename', file.name);

        const uploadResult = await dispatch(uploadFile({ formData, user, token }));
        if (uploadFile.fulfilled.match(uploadResult)) {
            await dispatch(fetchFiles({ user, token })); // Fetch files after successful upload
        } else {
            console.error("File upload failed:", uploadResult.payload);
            setLoader(false);
        }
    }


    return (
        <div style={styles.uploadPage}>
            <div style={styles.uploadFormContainer}>
                <h2>Upload File</h2>
                <form onSubmit={handleUpload}>
                    <label for="images" class="drop-container" id="dropcontainer">
                        <span class="drop-title">Drop files here</span>
                        or
                        <input type="file" id="images"
                            onChange={handleFileChange}
                            accept=".doc, .docx, .pdf"
                            required />
                    </label>
                  

                    <div style={styles.submitButtonContainer}>
                        <button type="submit" style={styles.submitButton} disabled={loading}>
                            {loader ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>

                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

const styles = {
    uploadPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        // height: '100vh'
    },
    uploadFormContainer: {
        backgroundColor: 'white',
        padding: '20px',
        width: '50vw',
        // borderRadius: '20px',
        
        // boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.26)',
    },
    formInput: {
        padding: '12px',
        paddingBottom: '6px',
    },
    submitButtonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        paddingTop: '25px',
        paddingBottom: '25px',
    },
    submitButton: {
        padding: '14px 20px',
        borderRadius: '30px',
        backgroundColor: '#6CB4EE',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        width: '50%',
    },
};

export default UploadPage;
