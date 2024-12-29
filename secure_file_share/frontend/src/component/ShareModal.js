import React, { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import UploadPage from './FileUpload';
import instance from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';

function ShareModal(props) {

    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { files, loading, error } = useSelector((state) => state.file);

    const [userSelected, setUserSelected] = useState("");
    const [accessSelected, setAccessSelected] = useState("");
    const [users, setUsers] = useState([]);
    const getAllUsers = async (username) => {
        try {
            const res = await instance.get(`/api/allUsers/${user.username}/`)
            setUsers([...res.data])
        } catch (err) {
            console.log("error:", err)
        }
    }

    const sendMailToShare = async () => {
        try {
            const body = {
                to_username: userSelected,
                from_username: user.username,
                file_id: props.fileId,
                permission_type: accessSelected
            }
            const res = await instance.post(`/api/sendEmail`, body)
        } catch (err) {
            console.log("error:", err)
        }
    }
    useEffect(() => {
        if (user && token) {
            getAllUsers();
        }
    }, [dispatch, user, token]);

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog
                color="primary"
                variant="soft"
            >
                <ModalClose />
                <div style={styles.uploadPage}>
                    <div style={styles.uploadFormContainer}>
                        <h2>Share this File</h2>
                        <form onSubmit={() => { sendMailToShare() }}>
                            <div style={styles.formInput}>
                                <label>Username:</label>
                                <Select
                                    fullWidth
                                    // style={{ width: "50%" }}
                                    id="username"
                                    value={userSelected}
                                    name='username'
                                    label="username"
                                    labelId="username-label"
                                    onChange={(e) => setUserSelected(e.target.value)}
                                    required
                                >
                                    {
                                        users.map((user, index) => {
                                            console.log("usr:", user)
                                            return (
                                                <MenuItem key={user.id} value={user.username}>
                                                    {user.username}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                    {/* <MenuItem value={"Admin"}>Admin</MenuItem> */}
                                </Select>
                            </div>
                            <div style={styles.formInput}>
                                <label>General Access:</label>
                                <Select
                                    fullWidth
                                    // style={{ width: "50%" }}
                                    id="access"
                                    value={accessSelected}
                                    name='access'
                                    label="access"
                                    labelId="access-label"
                                    onChange={(e) => setAccessSelected(e.target.value)}
                                    required
                                >
                                    <MenuItem key={1} value={"View"}>
                                        View
                                    </MenuItem>
                                    <MenuItem key={2} value={"Download"}>
                                        Download
                                    </MenuItem>
                                </Select>
                            </div>

                            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                                <button style={styles.submitButton} type="submit" disabled={loading}>
                                    {loading ? 'Sharing...' : 'Share'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </ModalDialog>
        </Modal>
    )
}

export default ShareModal

const styles = {
    uploadPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f5f5f5',
        // height: '100vh'
    },
    uploadFormContainer: {
        backgroundColor: 'white',
        padding: '20px',
        width: '35vw',
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
