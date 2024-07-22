'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { setEmail, setLogin } from '../../features/LoginSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, 
          Grid,
          Typography,
 } from '@mui/material';
import React from 'react';
import { League_Spartan } from 'next/font/google';
import PhotoPage from './PhotoPage';
import { useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Padding } from '@mui/icons-material';

const spartan = League_Spartan({ subsets:['latin']});


function Page() {

  const session = useSession();
  const dispatch = useDispatch(); 

    if(session?.data?.user?.email!=null){
      dispatch(setEmail(session?.data?.user?.email));
      dispatch(setLogin(true));
    }

    const emailVal = useSelector((state:RootState) => state.Login.email);
    const passVal = useSelector((state:RootState) => state.Login.pass);
    const loginVal = useSelector((state:RootState) => state.Login.isLogin);
    console.log(emailVal,passVal,loginVal);

    const theme = createTheme({
      palette:{
          primary:{
              main: '#FFFFFF',
              light: '#f5f4fe'
          },
          secondary:{
              main: '#040616',
              light: '#E0DEE8',
          },
          success:{
              main: '#196C6C'
          },
          info:{
              main: '#AEB8B8',
              light: '#F5F4FF'
          }
      },
      typography:{
          subtitle1:{
              fontFamily: spartan.style.fontFamily,
              fontWeightRegular: 600,
              fontSize: '28px',
              overflow:'hidden'
          },
          subtitle2:{
            fontFamily: spartan.style.fontFamily,
            fontWeightRegular: 600,
            fontSize: '17px'
          },
          body1:{
            fontFamily: spartan.style.fontFamily,
              fontWeightRegular: 600,
              fontSize: '15px',
              overflow:'hidden'
          },
          body2:{
              fontFamily: spartan.style.fontFamily,
              color: 'secondary.main',
              fontWeightRegular: 600,
              fontSize: '28px',
              overflow:'hidden'
          }
          
      },
      components:{
        MuiSelect:{
          styleOverrides:{
            root:{
              borderRadius:'20px',
              backgroundColor: '#F5F4FF',
            }
          }
        },
        MuiTextField:{
          styleOverrides:{
            root:{
              borderRadius:'50px',
            }
          }
        },
        MuiButton:{
          styleOverrides:{
            root:{
              borderRadius:'20px'
            }
          }
        },
        MuiPaginationItem:{
          styleOverrides:{
            root:{
                // backgroundColor:'green'
            }
          }
        },
        MuiCardContent:{
          styleOverrides:{
            root: {
              ":last-child": {
                padding: '0px'
              }
            }
          }
        },
        MuiCard:{
          styleOverrides:{
            root:{
              paddingBottom:'0px'
            }
          }
        },
      }
  });

  const [photoPage, setPhotoPage] = React.useState('none');
  const [handlePhoto, setHandlePhoto] = React.useState(false);


  // Style objects
  const parentGrid = {
    backgroundColor:'success.main',    
    height:'100%',
    paddingRight:'20px'
  }


  const sidebar = {
    height:'100vh',
    paddingTop:'107px',
    paddingLeft: '30px',
    // paddingRight: '20px',
    // display:'flex',
    // flexDirection: 'column',
    // justifyContent: 'start'
  }

  const mainSection = {
    backgroundColor:'primary.main', 
    minHeight:'93%', 
    borderRadius: '25px 25px 25px 25px',
    padding: '0px 35px 0px 35px',
    display:{photoPage},
    flexDirection:'column'
  }

  const topItem = {
    borderTop: '1px solid #C5CECE',
    height: '40px',
    paddingLeft: '20px',
    paddingRight: '20px',
    width:'100%'
    // marginTop: '20px'
  }

  const eachItem = {
    borderRadius: '40px 0px 0px 40px',
    '&:hover':{
      backgroundColor: 'primary.main',
      color: 'success.main',
      cursor: 'pointer'
    },
    height: '60px',
    paddingLeft: '20px'
  }

 
  function handleClickPhotos(){
    setHandlePhoto(true);
    console.log(handlePhoto);
  }

  useEffect(()=>{
    if(handlePhoto==true) setPhotoPage('flex')
  },[handlePhoto])


  return (
    <ThemeProvider theme={theme}>
      {/* <Container sx={{backgroundColor:'success.main', height:'100vh'}}>
        
      </Container> */}
      <Grid container justifyContent="center" alignItems="center" sx={parentGrid}>
        <Grid container item xs={2.5} sx={sidebar} direction='column'>
        <Grid item container alignItems="center" sx={{paddingRight:'20px', width:'95%'}}>
            <Grid item sx={topItem}></Grid>
        </Grid>
          <Grid item container sx={eachItem} alignItems="center" >
            <Grid item> <Typography variant="body1"> My info </Typography> </Grid>
            </Grid>
          <Grid container item sx={eachItem} alignItems="center">
            <Grid item><Typography variant="body1"> Blogs </Typography></Grid>
          </Grid>
          <Grid item container justifyContent="space-between" sx={eachItem} alignItems="center">
            <Grid item> <Typography variant="body1"> General info. </Typography></Grid>
            <Grid item sx={{paddingRight:'30px'}}> <KeyboardArrowRightIcon/> </Grid>
          </Grid>
          <Grid item container justifyContent="space-between" sx={eachItem} alignItems="center">
            <Grid item> <Typography variant="body1"> Teams </Typography> </Grid>
            <Grid item sx={{paddingRight:'30px'}}> <KeyboardArrowRightIcon/> </Grid>
          </Grid>
          <Grid container item sx={eachItem} alignItems="center"> <Grid item  onClick={handleClickPhotos} sx={{"&:active":{
            backgroundColor: 'white',
            color:'success.main'
          }, width:'100%'
          }}>  <Typography variant="body1"> Photos </Typography> </Grid> </Grid>
        </Grid>
        
        <Grid item container xs={9.5} sx={mainSection} alignItems='flex-start' justifyContent='flex-start'>
            {/* <PhotoPage disp={photoPage} /> */}
            <Grid item sx={{display:photoPage}}>
              <PhotoPage />
            </Grid>
              
        </Grid>
      </Grid>

      
    </ThemeProvider>
  )
}

export default Page

