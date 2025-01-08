import React from 'react'
import ResponsiveAppBar from '../component/ResponsiveAppBar'
import hero from "../hero_img.png"
import first from "../a.png"
import second from "../b.png"
import third from "../c.png"
import fourth from "../d.png"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";



function Home() {
   
    const navigate = useNavigate();

    const ResponsiveDiv = styled.div`
        display: flex;
        flex-direction: row;
        gap: 12px;
        font-family: "DM Sans", serif;
        @media (max-width: 960px) {
            flex-direction: column;
    }`;

    const ResponsiveCard = styled.div`
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 20vw;

        @media (max-width: 960px) {
        width: 80vw;
        flex-direction: row;
        align-items:"center";
        justify-content:"center";
            } 
        
           `;

  


    return (
        <div style={styles.container}>
            <ResponsiveAppBar />

            {/* <div style={styles.blob}></div> */}
            <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: '80vw', maxWidth: "1090px" }}>
                    <img src={hero} alt="email"
                        style={{ width: '80vw', maxWidth: "1090px" }}
                    />
                    <div style={{ position: "absolute", left: "30px", bottom: "14%" }}>
                        <button onClick={() => navigate("/login")} style={styles.primaryBtn} type="submit" >
                            {'Get Started'}
                        </button>
                    </div>
                </div>


            </div>

            <div style={{ margin: "0px 10vw", width: '80vw' }}>
                <div style={{ margin: "40px 0px", fontWeight: 600, fontSize: "30px", }}>
                    Why FortiFile?
                </div>
                <ResponsiveDiv >
                    {/* <div style={styles.card}>
                        <div style={styles.bg}></div>
                        <Blob />
                        <div style={{
                            position: "relative",
                            zIndex: 3,
                            filter: "none",
                            color: "black",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}>
                            <img src={first} alt="email"
                                style={{ margin: "4px", width: "98%", }}
                            />
                        </div>



                    </div> */}
                    <ResponsiveCard >
                        <img src={first} alt="email" style={{ margin: "4px", width: "98%" }} />
                        <div>
                            <div style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 500
                            }}>
                                End-to-end encryption
                            </div>
                            <div style={{
                                fontSize: "14px",
                                lineHeight: "21px",
                                fontWeight: 400,
                                color: "#638763"
                            }}>
                                Your files are encrypted before they leave your device and stay encrypted until they reach the recipient.
                            </div>
                        </div>
                    </ResponsiveCard>


                    <ResponsiveCard  >
                        <img src={second} alt="email" style={{ margin: "4px", width: "98%",  }} />
                        <div>
                            <div style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 500
                            }}>Zero-knowledge privacy
                            </div>
                            <div style={{
                                fontSize: "14px",
                                lineHeight: "21px",
                                fontWeight: 400,
                                color: "#638763"
                            }}>
                                Your files are private, even from us. Only you and the people you choose can see your files.
                            </div>
                        </div>
                    </ResponsiveCard>


                    <ResponsiveCard >
                        <img src={third} alt="email" style={{ margin: "4px", width: "98%", }} />
                        <div>
                            <div style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 500
                            }}>File version history</div>
                            <div style={{
                                fontSize: "14px",
                                lineHeight: "21px",
                                fontWeight: 400,
                                color: "#638763"
                            }}>Accidentally delete a file or save over a document? No problem. You can restore files or revert changes up to 30 days.
                            </div>
                        </div>
                    </ResponsiveCard>

                    <ResponsiveCard>
                        <img src={fourth} alt="email" style={{ margin: "4px", width: "98%", }} />
                        <div>
                            <div style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 500
                            }}>
                                Secure link sharing
                            </div>
                            <div style={{
                                fontSize: "14px",
                                lineHeight: "21px",
                                fontWeight: 400,
                                color: "#638763"
                            }}>
                                Send files securely on any device. Set download limits and password protection for extra security.
                            </div>
                            <div>
                            </div>
                        </div>
                    </ResponsiveCard>
                </ResponsiveDiv>
            </div>
        </div>
    )
}

export default Home

const styles = {
    card: {
        position: "relative",
        width: "300px",
        height: "250px",
        borderRadius: "14px",
        zIndex: "1111",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
    },

    bg: {
        position: "absolute",
        top: "5px",
        left: "5px",
        width: "290px",
        height: "240px",
        zIndex: "2",
        background: "rgba(255, 255, 255, .95)",
        backdropFilter: "blur(24px)",
        borderRadius: "10px",
        overflow: "hidden",
        outline: "2px solid white",
    },



    container: {
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
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
        //   fontFamily: "-apple-system,system-ui,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "20px",
        padding: "6px 30px",
        textAlign: "center",
        textDecoration: "none",
        marginRight: "30px"
        //   user-select: none,
        //   -webkit-user-select: none,
        //   touch-action: manipulation,
        //   vertical-align: middle,
        //   white-space: nowrap;

    },
    primaryBtn: {
        // height: "40px",
        display: "flex",
        flexDirection: "row",
        fontFamily: "Poppins, serif" , 
        alignItems: "flex-end",
        backgroundColor: "#18e719",
        border: "1px solid rgba(27, 31, 35, .15)",
        borderRadius: "6px",
        boxShadow: "rgba(27, 31, 35, .1) 0 1px 0",
        color: "#000",
        cursor: "pointer",
        //   fontFamily: "-apple-system,system-ui,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";
        fontSize: "1em",
        fontWeight: 600,
        lineHeight: "20px",
        padding: "12px 30px",
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


