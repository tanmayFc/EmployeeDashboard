"use client";
import formik, { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { setEmail, setPass, setLogin, setName, setToken } from "../../features/LoginSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Container, FormControlLabel } from "@mui/material";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Fullscreen } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "../../page.module.css";
import { useEffect } from "react";
import FormontrolLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
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
import axios from "axios";


{/******* Yup validation structure *******/}
const validation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  pass: yup.string().required("Pass is required"),
});

const spartan = League_Spartan({ subsets: ["latin"] });

export default function Login() {
  
  {/******* Custome themes *******/}
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


  {/******* Helper States *******/}
  const [incorrect, setIncorrect] = useState(false);
  const [passvisi, setPassvisi] = useState(false);


  {/******* Instances *******/}
  const router = useRouter();
  const dispatch = useDispatch();


  {/******* Formic / Register *******/}
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      pass: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const { name, email, pass } = values;
      await axios.post("http://localhost:3001/UserRegisteration",{
        name: name,
        email: email,
        pass: pass
      })
      .then((res)=>{
        if(res.data.msg == 'user exists'){
          setIncorrect(true);
        }
        else{
        dispatch(setEmail(email));
        dispatch(setName(name));
        dispatch(setLogin(true));
        dispatch(setPass(pass));
        dispatch(setToken(res.data.token));
        console.log(name);
        router.push('/pages/dashboard');
        }
      });
    },
  });


  {/******* Styles *******/}
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

  return (
    <ThemeProvider theme={theme}>


      {/******* Parent *******/}
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "primary.light",
          display: "grid",
          placeItems: "center",
        }}
      >


        {/******* Container *******/}
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


          {/******* Left part *******/}
          <Grid item xs={12} lg={5} sx={{ height: "100%" }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                sx={{ display: "grid", placeItems: "center" }}
              >

                {/******* Title *******/}
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    color="secondary.main"
                    sx={Title}
                  >
                    Register to FewerClicks
                  </Typography>
                </Grid>


                {/******* Input Fields *******/}
                <Grid
                  container
                  item
                  alignItems="center"
                  justifyContent="center"
                  sx={{ marginTop: "50px" }}
                >

                  {incorrect && <Grid item sx={{marginBottom:'15px', color:'red'}}>User already registered. Please Login.</Grid>}


                {/******* Name *******/}
                <Grid item>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      variant="standard"
                      // multiline
                      onChange={formik.handleChange}
                      error={
                        formik.touched.name && Boolean(formik.errors.name)
                      }
                      helperText={formik.touched.name && formik.errors.name}
                      value={formik.values.name}
                      sx={{
                        width: "400px",
                        height:
                          formik.errors.name && formik.touched.name
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


                  {/******* Email *******/}
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


                  {/******* Password *******/}
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

                
                {/******* Registeration Button *******/}
                <Grid item>
                  <Button
                    color="success"
                    variant="contained"
                    sx={{
                      width: "400px",
                      borderRadius: "6px",
                      marginTop: "70px",
                    }}
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>

              </Grid>
            </form>
          </Grid>


          {/******* Right Part *******/}
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

            {/******* Images *******/}
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
