import { useParams } from 'react-router-dom';
import ResponsiveAppBar from '../component/ResponsiveAppBar';
import { useEffect, useState } from 'react';
import instance from '../utils/axios';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { generateShareableLink, handleDownload } from '../utils/usuablefuncs';

const SharedFile = () => {

    const { user, token } = useSelector((state) => state.auth);
    const [sharedFiles, setSharedFiles] = useState([]);
    const { username } = useParams();

    const getAllSharedFiles = async () => {
        try {
            const res = await instance.get(`/api/sharedFileByUser/${user.username}/${username}`);
            console.log("res:", res.data.data);
            setSharedFiles([...res.data.data]);

        }
        catch (err) {
            console.log("error:", err);
        }
    }

    useEffect(() => {
        async function handleEffect() {
            await getAllSharedFiles();
        }

        if (user && token) {
            handleEffect();
        } else {
            window.alert("loged out")
        }
    }, [user, token]);
    // Extracting the id from the URL
    // Fetch the details based on the id (using useEffect or an API call)
    // my-files
    return (
        <div style={styles.container}>
            <ResponsiveAppBar />
            <div style={{ marginTop: "30px" }}>
                <div style={{marginTop:"120px"}}>
                    <p style={{ padding:"20px 60px",  fontFamily: "Lexend, serif",}}>Showing details for file with ID: {username}</p>
                    <div style={styles.file_container}> {
                        sharedFiles.map((item, index) => {
                            return (<div style={styles.file_view}>
                                <div style={styles.file_inside}>
                                    <div  style={styles.file_inside_header}> 
                                        <div style={{ cursor:"pointer", padding:"5px 10px", borderRadius:"12px", backgroundColor:"#11a25a", color:"white" }} onClick={()=>generateShareableLink(item.file_blob)}> View </div>
                                        <div onClick={()=>handleDownload(item.file_blob, item.filename)} style={{ color:"#11a25a"}}> <DownloadIcon/></div>
                                    </div>
                                    <div style={{ height:"90%", display:"flex", justifyContent:"center", alignItems:"center" , fontSize:"2rem"}}>
                                        <text style={{ fontWeight:600, color:"#11a25a",  textTransform:"uppercase"}}> {item.filename.split('.').pop()}</text>
                                    </div>
                                </div>
                                <div style={styles.file_footer}>
                                    <div style={styles.footer_container}>
                                        <div style={{  display: "flex", alignItems:"center"
        // flexDirection: "row",
        // justifyContent: "space-between",
        }}>
                                            <Avatar sx={{ border: "1px solid rgb(232, 232, 232)", bgcolor: "#18e719" }}>{item.filename[0]}</Avatar>
                                            <div style={{ margin:"0px 10px", overflow:"clip"}}> {item.filename}</div>
                                    
                                             </div>
                                           
                                    </div>
                                </div>

                            </div>)
                        }, [])
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharedFile;

const styles = {
    container: {
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
    },
    file_container: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        flexDirection: "",
        justifyContent: "center"
    },
    file_view: {
        borderRadius: "15px",
        padding: "12px",
        width: "220px",
        // border: "1px solid grey",
        boxShadow :"10px 10px 24px -3px rgba(242,242,242,1)"
    },
    file_inside: {
        height: "150px",
        // width: "80%",
        backgroundColor: "#fef4e2",
        borderRadius: "0.5rem 0.5rem 0 0",
        padding: "1.5rem",
        fontSize: "0.875rem"
    },
    file_inside_header:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    file_footer: {
        height: "30px",
        // width: "80%",
        // backgroundColor: "lightblue",
        // borderRadius: "0.5rem 0.5rem 0 0",
        padding: "1rem",
        fontSize: "0.875rem"
    },
    footer_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    }

}
