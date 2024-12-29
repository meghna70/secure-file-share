import React from 'react'
import ResponsiveAppBar from '../component/ResponsiveAppBar'
import FileList from '../component/FileList'
import FileUpload from '../component/FileUpload'
import FilesDataGrid from '../component/FilesDataGrid'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UploadModal from '../component/UploadModal'
function Home() {
    const [open, setOpen] = React.useState(false);
    return (
        <div style={styles.container}>
            <ResponsiveAppBar />
            <div style={styles.blob}></div>
            {/* <div style={styles.blob2}></div> */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "30px 20px" }}>
                <div style={{ ...styles.header, }}>
                    <div style={styles.title}>Your Files and Assets </div>
                    <div style={{ fontSize: "18px" }}> Your documents and attachments are here.</div>
                </div>

                <button onClick={() => setOpen(true)} style={styles.uploadBtn} type="submit" >
                    <UploadFileIcon />  {'Upload'}
                </button>
            </div>
            <UploadModal open={open} setOpen={setOpen} />
            <div style={{ padding: "12px", margin: "10px 20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FilesDataGrid />
            </div>

        </div>
    )
}

export default Home

const styles = {
    container: {
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
    },
    blob: {
        position: "absolute",
        top: "0%",
        left: "10%",
        width: "500px",
        height: "300px",
        // background: "linear-gradient(135deg, rgba(19, 81, 51, 0.4), rgba(29, 186, 63, 0.6))",
        filter: "blur(70px)",
        borderRadius: "50%",
        transform: "translate(-50%, -10%)",
        zIndex: 0,
        /* From https://css.glass */
        background: "rgba(101, 187, 125, 0.3)",

        // backdropFilter: "blur(8.7px)",

    },
    blob2: {
        position: "absolute",
        bottom: "0%",
        left: "100%",
        width: "500px",
        height: "300px",
        // background: "linear-gradient(135deg, rgba(19, 81, 51, 0.4), rgba(29, 186, 63, 0.6))",
        filter: "blur(70px)",
        borderRadius: "50%",
        transform: "translate(-50%, -10%)",
        zIndex: 0,
        /* From https://css.glass */
        background: "rgba(101, 187, 125, 0.3)",

        // backdropFilter: "blur(8.7px)",

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
    uploadBtn: {
        height: "40px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "#2ea44f",
        border: "1px solid rgba(27, 31, 35, .15)",
        borderRadius: "6px",
        boxShadow: "rgba(27, 31, 35, .1) 0 1px 0",
        color: "#fff",
        cursor: "pointer",
        //   fontFamily: "-apple-system,system-ui,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "20px",
        padding: "6px 30px",
        textAlign: "center",
        textDecoration: "none",
        marginRight: "30px"
        //   user-select: none;
        //   -webkit-user-select: none;
        //   touch-action: manipulation;
        //   vertical-align: middle;
        //   white-space: nowrap;

    }
}


