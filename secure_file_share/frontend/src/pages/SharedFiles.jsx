import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import ResponsiveAppBar from '../component/ResponsiveAppBar'
import "../App.css"
import FileComponent from '../component/FileComponent';
import CollabFile from '../component/CollabFile';
import instance from '../utils/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function SharedFiles() {
  const { user, token } = useSelector((state) => state.auth);
  const [sharedFiles, setSharedFiles] = useState();


  const getAllSharedFiles = async () => {
    try {
      const res = await instance.get(`/api/sharedFiles/${user.username}/`);
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
  return (
    <div style={styles.container}>
      <ResponsiveAppBar />
      <div style={{ marginTop: "30px" }}>
        <div style={{ marginTop: "30px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "30px 20px" }}>
          <div style={{ ...styles.header }}>
            <div style={styles.title}>Shared Files & Collaboration </div>
            <div style={{ fontSize: "18px" }}> Your files and those shared with you, all in one place.</div>
          </div>

          <button className='uploadBtn'  >
            <AddIcon sx={{
              marginRight: "10px",
              height: "20px",
              width: "20px",
              borderRadius: "20px",
              backgroundColor: "rgb(111, 209, 104)"
            }} />{'Create'}
          </button>
        </div>
        <div style={{ display: "flex", backgroundColor: "#fefefe", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", padding: "80px 20px", gap: "30px" }}>
          {
            sharedFiles?.map((file, index)=>{
              return(
                <SharedFile username={file}/>
              )
            })
          }
          {/* <SharedFile />
          <SharedFile />
          <SharedFile />
          <SharedFile />
          <SharedFile />
          <SharedFile /> */}
          <Collab />
        </div>

      </div>
    </div>
  )
}

export default SharedFiles

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  header: {
    padding: "0px 50px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "black",
    // textAlign: "center",
    // padding: "20px",
    paddingTop: "40px",
    paddingBottom: "10px"
  },
}

export const SharedFile = (props) => {
  const navigate = useNavigate();
  return (
    <div style={{
      width: "200px",
      borderRadius: "10px",
      border: "1px solid rgb(232, 228, 232)",
      boxShadow: "10px 10px 66px -39px rgb(211, 205, 211)",
      // backgroundColor: "lightblue"
    }}
      className='sharedFile'
    >
      <div onClick={()=>navigate(`/shared-files/${props.username}`)} style={{ margin: "10px 20px", height: "160px", width: "150px" }}>
        <FileComponent />
        <div style={{ marginTop: "50px", fontSize: "16px", fontWeight: 500, fontFamily: "Montserrat, serif" }}>
          Shared File
        </div>
        <div style={{ marginTop: "20px", fontSize: "12px", fontFamily: "Montserrat, serif" }}>
          by <span style={{ fontWeight: 500 }}>@123Qwerty</span>
        </div>
      </div>
    </div>
  )
}


export const Collab = (props) => {
  return (
    <div style={{
      width: "200px",
      borderRadius: "10px",
      border: "1px solid rgb(232, 228, 232)",
      boxShadow: "10px 10px 66px -39px rgb(211, 205, 211)"
      // backgroundColor: "lightblue"
    }}
      className='sharedFile'
    >
      <div style={{ margin: "10px 20px", height: "160px", width: "150px" }}>

        <CollabFile />
        <div style={{ marginTop: "50px", fontSize: "16px", fontWeight: 500, fontFamily: "Montserrat, serif" }}>
          Collaboration
        </div>
        <div style={{ marginTop: "20px", fontSize: "12px", fontFamily: "Montserrat, serif" }}>
          by <span style={{ fontWeight: 500 }}>@123Qwerty</span>
        </div>
      </div>
    </div>
  )
}