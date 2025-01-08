import { useParams } from 'react-router-dom';
import ResponsiveAppBar from '../component/ResponsiveAppBar';
import { useEffect, useState } from 'react';
import instance from '../utils/axios';
import { useSelector } from 'react-redux';

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

    return (
        <div style={styles.container}>
            <ResponsiveAppBar />
            <div style={{ marginTop: "30px" }}>
                <div>
                    <p>Showing details for file with ID: {username}</p>
                    {
                        sharedFiles.map(()=>{
                            return(<div>jjijiji</div>)
                        },[])
                    }

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
}
