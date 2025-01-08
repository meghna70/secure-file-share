import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, CircularProgress } from '@mui/material';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { fetchFiles, deleteFile } from '../redux/slices/fileSlice'; // Import the fetchFiles thunk
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import ShareModal from './ShareModal';
import NoFile from "../no_files.svg"
import DownloadBtn from './DownloadBtn';
import DeleteBtn from './DeleteBtn';
import ShareBtn from './ShareBtn';


const FilesDataGrid = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { files, loading, error } = useSelector((state) => state.file);
    const [share, setShare] = useState(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (user && token) {
            // Fetch files on component mount
            dispatch(fetchFiles({ user, token }));
        }
    }, [dispatch, user, token]);

    function formatDateTime(datetimeStr, type) {
        const date = new Date(datetimeStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        if (type === "datetime") return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        if (type === "date") return `${day}/${month}/${year}`;
        if (type === "time") return `${hours}:${minutes}:${seconds}`;
    }

    const generateShareableLink = async (base64Data) => {
        try {
            const byteCharacters = atob(base64Data);
            const byteArray = new Uint8Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error("Error opening file:", error);
        }
    };

    const handleDownload = (base64Data, filename) => {
        const byteCharacters = atob(base64Data);
        const byteArray = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    };

    const handleDelete = (fileId) => {
        dispatch(deleteFile({ fileId, token }));
    };

    const handleShare = (fileId) => {
        // dispatch(deleteFile({ fileId, token }));
        setShare(fileId)
        setOpen(true)
    };

    const columns = [
        { field: 'id', flex:1, headerName: 'ID', headerClassName: 'super-app-theme--header' },
        { field: 'filename', flex:5, minWidth:300,headerName: 'Filename', headerClassName: 'super-app-theme--header' },
        {
            flex: 3,
            field: 'upload_date',
            headerName: 'Upload Date',
            minWidth:200,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <div>
                    <div>{formatDateTime(params.row.upload_date, "time")} {formatDateTime(params.row.upload_date, "date")}</div>
                </div>
            ),
        },
        {
            field: 'file_url',
            headerName: 'File',
            flex: 3,
            minWidth:120,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Button variant="outlined" onClick={() => generateShareableLink(params.row.file_url)}>View</Button>
            ),
        },
        {
            field: 'file_actions',
            headerName: 'Actions',
            flex: 3,
            minWidth:220,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                // <Button variant="outlined" onClick={() => handleDownload(params.row.file_url, params.row.filename)}>Download</Button>
                <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }} onClick={() => handleDownload(params.row.file_url, params.row.filename)}>
                        <DownloadBtn />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", padding: "10px" }} onClick={() => handleDelete(params.row.file_id)}>
                        <DeleteBtn />
                    </div>
                    <div
                        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
                        onClick={() => handleShare(params.row.file_id)}>
                        <ShareBtn />
                    </div>
                </div>
            ),
        },

        // {
        //     field: 'file_delete',
        //     headerName: 'Delete',
        //     width: 200,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => (
        //         // <Button variant="outlined" onClick={() => handleDelete(params.row.file_id)}>
        //             // <DeleteOutlineTwoToneIcon />
        //         // </Button>


        //     ),
        // },
        // {
        //     field: 'file_share',
        //     headerName: 'Share',
        //     width: 200,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => (

        //     ),
        // },
    ];

    const rows = files.map((file, index) => ({
        id: index + 1,
        file_id: file.id,
        filename: file.filename,
        upload_date: file.upload_date,
        file_url: file.file,
    }));

    return (
        <div style={{ marginTop: "50px", height: 400, width: '100%',  }}>
            <ShareModal fileId={share} open={open} setOpen={setOpen} />
            {loading ? (
                <CircularProgress />
            ) : error ? (
                // <Typography variant="h6" color="error">{error}</Typography>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(60,253,45,1) 100%)",
                        filter: "drop-shadow(0 0 0.65rem rgb(129, 226, 227))",
                        // overflow: "hidden",
                        position: "relative",
                        transition: "all 0.2s ease-in-out",
                        cursor: "pointer",
                        borderBottom: "6px solid transparent"
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.filter = "brightness(90%)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.borderBottom = "6px solid rgba(34,193,195,1)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.filter = "drop-shadow(0 0 0.65rem rgb(129, 226, 227))";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderBottom = "6px solid transparent";
                        }}
                        onMouseDown={e => {
                            e.currentTarget.style.filter = "brightness(100%)";
                            e.currentTarget.style.transform = "translateY(8px)";
                            e.currentTarget.style.borderBottom = "2px solid rgba(34,193,195,1)";
                        }}
                        onMouseUp={e => {
                            e.currentTarget.style.filter = "brightness(110%)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.borderBottom = "6px solid rgba(34,193,195,1)";
                        }}
                    >
                        <img src={NoFile} alt={"no files available"} style={{ height: "200px", clipPath: "inset(0 0 20px 0)" }} />
                    </div>
                    <div>No Data Found</div>
                </div>

            ) : (
                <Box sx={{
                    '& .super-app-theme--header': {
                        backgroundColor: 'rgba(145, 182, 143, 0.55)',
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 600,
                        fontFamily: "Montserrat, serif"
                    },
                }}>
                    <DataGrid
                        sx={{
                            fontFamily: "Montserrat, serif",
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'rgba(145, 182, 143, 0.55)',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                        }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                    />
                </Box>
            )}
        </div>
    );
};

export default FilesDataGrid;
