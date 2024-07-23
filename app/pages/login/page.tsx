"use client";
import formik, { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import {
  setEmail,
  setPass,
  setLogin,
  setName,
  setToken,
} from "../../features/LoginSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Container, FormControlLabel } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "../../page.module.css";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import img1 from "../../resources/img1.png";
import img2 from "../../resources/img2.png";
import img3 from "../../resources/img3.png";
import img4 from "../../resources/img4.png";
import img5 from "../../resources/img5.png";
import LockIcon from "@mui/icons-material/Lock";
import { League_Spartan } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import discord from "./discord-brands-solid.svg";
import axios from "axios";

const validation = yup.object({
  email: yup.string().required("Email is required"),
  pass: yup.string().required("Pass is required"),
});

const spartan = League_Spartan({ subsets: ["latin"] });

export default function Login() {
  const [passvisi, setPassvisi] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
        light: "#f5f4fe",
      },
      secondary: {
        main: "#040616",
        light: "#8697B4",
      },
      success: {
        main: "#196C6C",
      },
      info: {
        main: "#AEB8B8",
        light: "#F5F4FF",
      },
    },
    typography: {
      subtitle1: {
        fontFamily: spartan.style.fontFamily,
        fontWeightRegular: 600,
        fontSize: 28,
      },
      body1: {
        fontFamily: spartan.style.fontFamily,
        fontWeightRegular: 600,
        fontSize: 14,
      },
      body2: {
        fontFamily: spartan.style.fontFamily,
        color: "secondary.main",
        fontWeightRegular: 600,
        fontSize: 15,
      },
    },
    breakpoints: {},
  });

  const [incorrect, setIncorrect] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const { email, pass } = values;
      await axios
        .post("http://localhost:3001/UserLogin", {
          email: email,
          pass: pass,
        })
        .then((res) => {
          if (res.data.msg == "user not found") {
            setIncorrect(true);
          } else {
            dispatch(setEmail(email));
            dispatch(setPass(pass));
            dispatch(setLogin(true));
            dispatch(setToken(res.data.token));
            dispatch(setName(res.data.response.name));
            router.push("/pages/dashboard");
          }
        });
    },
  });

  const passwordVisibility = {
    color: "black",
    fontSize: "19px",
    // marginRight: ".3rem",
    cursor: "pointer",
  };

  const Title = {
    marginTop: "50px",
  };

  const InputProps = {
    color: "success.main",
    fontSize: "18px",
    fontFamily: spartan.style.fontFamily,
    fontWeight: 550,
    lineHeight: "22px",
    marginLeft: "17px",
    paddingTop: "15px",
  };

  const session = useSession();
  // console.log(session.status);

  // useEffect(() => {
  //   async function passData() {
  //     console.log(session.data?.user?.name);
  //     const name = session.data?.user?.name;
  //     const email = session.data?.user?.email;
  //     if (session.status === "authenticated") {
  //       await axios
  //                         .post("http://localhost:3001/NextAuthEntry", {
  //                           name:name,
  //                           email:email
  //                         })
  //                         .then((res)=>{
  //                           dispatch(setName(res.data.response.name));
  //                           dispatch(setEmail(res.data.response.email));
  //                           dispatch(setToken(res.data.token));
  //                           dispatch(setLogin(true));
  //                           router.push('/pages/dashboard');
  //                           // console.log(session.status);
  //                           // console.log(res);
  //                         })
  //     }
  //   }
  //   passData();
  // }, [session.status]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Container maxWidth={Fullscreen}> */}

      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "primary.light",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            position: "absolute",
            top: "60px",
            marginLeft: "14vw",
            marginRight: "14vw",
            height: "83%",
            width: { lg: "1130px", md: "500px", sm: "500px" },
            backgroundColor: "primary.main",
            display: "flex",
          }}
        >
          <Grid item xs={12} lg={5} sx={{ height: "100%" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                sx={{ display: "grid", placeItems: "center" }}
              >
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    color="secondary.main"
                    sx={Title}
                  >
                    Welcome to FewerClicks!
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  alignItems="center"
                  justifyContent="center"
                  sx={{ marginTop: "50px" }}
                >
                  {incorrect && (
                    <Grid item sx={{ marginBottom: "15px", color: "red" }}>
                      *Incorrect Email or Password*
                    </Grid>
                  )}
                  <Grid item>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      variant="standard"
                      // multiline
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      value={formik.values.email}
                      sx={{
                        width: "400px",
                        height:
                          formik.errors.email && formik.touched.email
                            ? "110px"
                            : "90px",
                        padding: "15px",
                        boxShadow: `
                                  0 -2px 2px rgba(0, 0, 0, 0.1), 
                                  -2px 0 2px rgba(0, 0, 0, 0.1),  
                                  2px 0 2px rgba(0, 0, 0, 0.1) 
                                `,
                        borderRadius: "12px 12px 0px 0px",
                        borderBottom: "1px solid #D7D7D7",
                      }}
                      InputProps={{ disableUnderline: true, style: InputProps }}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: "#8697B4",
                          fontSize: "18px",
                          marginLeft: "30px",
                          marginTop: "20px",
                        },
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      id="pass"
                      label="Password"
                      name="pass"
                      variant="standard"
                      // multiline
                      type={passvisi ? "text" : "password"}
                      value={formik.values.pass}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: "#8697B4",
                          fontSize: "18px",
                          marginLeft: "30px",
                          marginTop: "20px",
                        },
                      }}
                      InputProps={{
                        disableUnderline: true,
                        style: InputProps,

                        endAdornment: (
                          <>
                            {passvisi ? (
                              <VisibilityOff
                                sx={passwordVisibility}
                                onClick={() => setPassvisi(false)}
                              />
                            ) : (
                              <Visibility
                                sx={passwordVisibility}
                                onClick={() => setPassvisi(true)}
                              />
                            )}
                          </>
                        ),
                      }}
                      onChange={formik.handleChange}
                      error={formik.touched.pass && Boolean(formik.errors.pass)}
                      helperText={formik.touched.pass && formik.errors.pass}
                      // InputLabelProps={{shrink: true, style:{color:'theme.palette.secondary.main'}}}
                      sx={{
                        width: "400px",
                        height:
                          formik.errors.pass && formik.touched.pass
                            ? "110px"
                            : "90px",
                        padding: "15px",
                        boxShadow: `
                          2px 0 4px rgba(0, 0, 0, 0.1),   
                          -2px 0 4px rgba(0, 0, 0, 0.1),   
                          0 2px 4px rgba(0, 0, 0, 0.1)     
                        `,
                        borderRadius: "0px 0px 12px 12px",
                        borderBottom: "1px solid #D7D7D7",
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container item justifyContent="space-between">
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox defaultChecked color="success" />}
                      label="Remember me"
                      sx={{ color: "secondary.main", marginLeft: "30px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        color: "secondary.main",
                        marginTop: "15px",
                        marginRight: "35px",
                      }}
                    >
                      Forgot Password?
                    </Box>
                  </Grid>
                </Grid>

                <Grid item>
                  <Button
                    color="success"
                    variant="contained"
                    sx={{
                      width: "400px",
                      borderRadius: "6px",
                      marginTop: "40px",
                    }}
                    type="submit"
                  >
                    Log in
                  </Button>
                </Grid>

                <Grid
                  item
                  container
                  justifyContent="center"
                  direction="column"
                  alignItems="center"
                  gap="15px"
                  sx={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Typography variant="body1" color="secondary.main">
                      Or
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: "flex" }}>
                    <Typography variant="body1" color="secondary.main">
                      {" "}
                      Sign in through :
                    </Typography>

                    <GoogleIcon
                      sx={{
                        fontSize: "20px",
                        color: "success.main",
                        marginLeft: "10px",
                        "&:hover": {
                          cursor: "pointer",
                          fontSize: "22px",
                        },
                      }}
                      onClick={async () => {
                        await signIn('google')
                        const name= session?.data?.user?.name
                        const email= session?.data?.user?.email
                        await axios
                          .post("http://localhost:3001/NextAuthEntry", {
                            name:name,
                            email:email
                          })
                          .then((res)=>{
                            dispatch(setName(res.data.response.name));
                            dispatch(setEmail(res.data.response.email));
                            dispatch(setToken(res.data.token));
                            dispatch(setLogin(true));
                            router.push('/pages/dashboard');
                          })
                            
                         
                      }}
                    />
                    {/* { callbackUrl: '/pages/dashboard' } */}

                    <XIcon
                      sx={{
                        fontSize: "20px",
                        color: "success.main",
                        marginLeft: "10px",
                        "&:hover": {
                          cursor: "pointer",
                          fontSize: "22px",
                        },
                      }}
                      onClick={() => {
                        signIn("twitter");
                      }}
                    />

                    <Box
                      sx={{
                        backgroundImage: `url(${discord.src})`,
                        height: "23px",
                        width: "28px",
                        marginLeft: "10px",
                        "&:hover": {
                          cursor: "pointer",
                          height: "25px",
                          width: "30px",
                        },
                      }}
                      onClick={() => signIn("discord")}
                    ></Box>
                  </Grid>
                </Grid>

                <Grid item sx={{ marginTop: "40px", display: "inline" }}>
                  <Typography variant="body2" color="secondary.main">
                    Dont have an account yet?
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#3f51b5",
                        display: "inline",
                        marginLeft: "5px",
                        "&:hover": {
                          cursor: "pointer",
                          height: "25px",
                          width: "30px",
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => router.push("/pages/registeration")}
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid
            item
            xs={7}
            sx={{
              height: "100%",
              backgroundColor: "success.main",
              position: "relative",
              display: { lg: "block", md: "none", sm: "none", xs: "none" },
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                height: "130px",
                width: "130px",
                overflow: "hidden",
                position: "absolute",
                left: "60px",
                top: "100px",
                backgroundImage: `url(${img1.src})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
              }}
            ></Box>
            <Box
              sx={{
                borderRadius: "50%",
                height: "120px",
                width: "120px",
                overflow: "hidden",
                position: "absolute",
                right: "100px",
                top: "50px",
                backgroundImage: `url(${img2.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>

            <Box
              sx={{
                borderRadius: "50%",
                height: "100px",
                width: "100px",
                overflow: "hidden",
                position: "absolute",
                left: "300px",
                top: "250px",
                backgroundImage: `url(${img3.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>

            <Box
              sx={{
                borderRadius: "50%",
                height: "150px",
                width: "150px",
                overflow: "hidden",
                position: "absolute",
                left: "60px",
                top: "350px",
                backgroundImage: `url(${img4.src})`,
                backgroundSize: "cover",
                backgroundPosition: "left",
              }}
            ></Box>

            <Box
              sx={{
                borderRadius: "50%",
                height: "120px",
                width: "120px",
                overflow: "hidden",
                position: "absolute",
                left: "400px",
                top: "400px",
                backgroundImage: `url(${img5.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "35px",
                left: "20px",
                fontSize: "18px",
                marginRight: "20%",
                marginLeft: "7%",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit.
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </ThemeProvider>
  );
}
