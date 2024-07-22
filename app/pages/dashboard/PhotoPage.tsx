'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { useSession } from 'next-auth/react';
import { Container, 
          Grid,
          Box,
          Typography,
          TextField,
          InputAdornment,
          FormControl,
          MenuItem,
          InputLabel,
          Button,
          Card,
          CardMedia,
          CardActions,
          CardContent,
          Pagination
 } from '@mui/material';
 import SearchIcon from '@mui/icons-material/Search';
 import Select, { SelectChangeEvent } from '@mui/material/Select';
import img1 from '../../resources/img1.png'
import React, { ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { League_Spartan } from 'next/font/google';
import CancelIcon from '@mui/icons-material/Cancel';
// import usePagination from '@mui/material/usePagination/usePagination';
import { useState } from 'react';

const spartan = League_Spartan({ subsets:['latin']});

interface inter{
    id: string;
    name: string;    
    email: string;
}


export default function PhotoPage(){

    const session = useSession();
    console.log(session);

    axios.post("http://localhost:3001/AdminDbEntry",{
      name: session?.data?.user?.name,
      email: session?.data?.user?.email,
      idToken: session?.data?.idToken
    }).then((res)=>console.log(res));


  
    // styles
    const headline = {
      height: '80px',
      borderBottom: '2px solid #C5CECE'
    }
  
    const navbar = {
      height:'100px',
      // backgroundColor:'orange'
    }
  
    const inputStyle= {
      width: "100%",
      borderRadius:'50px'
    }
  
    
    // Helper States
    const [cardData, setCardData ] = useState<any[]>([]);
    const [cardData2, setCardData2 ] = useState<any[]>([]);
    const [cardData3, setCardData3] = useState<any[]>([]);
  
    const [cancel, setCancel] = useState(false);
  
    
    const [album, setAlbum] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
      if (cardData2.length != 0) setCardData(cardData2);
      setAlbum(event.target.value);
    };
  
    const [OddEven, setOddEven] = useState('None');
    const handleChange2 = (event: SelectChangeEvent) => {
      setOddEven(event.target.value);
    };

    

    // Helper Functions
    function isPrime(num){
        for(let i=2;i<=Math.sqrt(num);i++){
            if(num%i==0) return false;
        }
        return true;
    }
  
  
    useEffect(()=> {
      if(album!='All'){
        const selectedAlbum = cardData.filter((itr)=>itr.album == album);
        setCardData2(cardData);
        setCardData(selectedAlbum);
      }
    }, [album]);

  
    const [text, setText] = React.useState('');
    const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
      if(cancel==false){
        setCardData3(cardData);
        setCancel(true);
        // setSearch(false);
      }
    };
  
  
    const handleCancel = () => {
      // setSearch(true);
      setCancel(false);
    }
  
    useEffect(()=>{
      if(cancel==true){
        const searchedName = cardData.filter((itr)=>itr.name.slice(0,text.length) == text);
        setCardData(searchedName);
      }
    },[text]);
  
    useEffect(()=>{
      if(cancel==false){
        setCardData(cardData3);
        setText('');
      }
    },[cancel]);
  
  
    // Mounting
    useEffect(() =>{
        // async function fetchData() {
        //   await axios.get("http://localhost:3001/dashboard")
        //   .then((res)=>setCardData(res.data));
        // }

        async function fetchData(){
            await axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((res)=>setCardData(res.data));
        }

       

        // async function fetchData(){
        //     await axios.get('https://jsonplaceholder.typicode.com/users')
        //     .then((res)=>setCardData(res.data));
        // }
        
        fetchData();
        
    }, []);


    function usePagination(data, dataPerPage){
        const [currentPage, setCurrentPage] = React.useState(1);
        const NumPages = Math.ceil(data.length/dataPerPage);
    
        function currentData(){
            const start = (currentPage-1)*dataPerPage;
            const end = start + dataPerPage;
            return data.slice(start,end);
        }
    
        function next(){
            setCurrentPage(Math.min(currentPage+1, NumPages));
        }
    
        function prev(){
            setCurrentPage(Math.max(currentPage-1,0));
        }
    
        function jump(p){
            setCurrentPage(p);
            currentData();
        }
    
        return { next, prev, jump, currentData, currentPage, NumPages};
    }



    const paginationData = usePagination(cardData, 10);
    const [page, setPage] = React.useState(1);

    function handlePageChange(e,p){
        setPage(p);
        paginationData.jump(p);
    } 

    
    return(
    <Grid item container sx={{position:'relative'}}>
      <Grid item
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={headline}
                  >
                  <Grid item > <Typography variant="body2" color="secondary.main" > Photo Management </Typography> </Grid>
                  <Grid item sx={{display:'flex', gap:'20px', mr:'20px'}}>
                    
                  <NotificationsNoneIcon sx={{color:'black'}}/>
                     <Typography variant="body1" color="secondary.main" sx={{marginTop:'3px'}} > {session?.data?.user?.name} </Typography>
                  </Grid>
            </Grid>
  
            <Grid sx={navbar} item container direction="row" alignItems="center" justifyContent="space-between">
              <Grid item xs={3.5}>
                <TextField
                id="searchBar"
                placeholder="Search by name"
                color="success"
                sx={inputStyle}
                value={text}
                onChange={handleChange3}
                InputProps={{
                  endAdornment : <InputAdornment position='end'>
                    {!cancel && <SearchIcon
                    color='inherit'
                    sx={{
                      '&:hover':{
                        cursor:'pointer'
                      }
                    }}
                    // onClick = {handleSearch}
                    />}
                    {cancel && <CancelIcon
                    color='inherit'
                    sx={{
                      '&:hover':{
                        cursor:'pointer'
                      }
                    }}
                    onClick = {handleCancel}
                    />}
                    </InputAdornment>
                }}
                />
              </Grid>
  
              <Grid item container xs={8.5} justifyContent='flex-end'>
                <Grid item>
                  <FormControl sx={{ m: 1, width:'150px'}} color='success'>
                  <InputLabel id="albumLabel">Album</InputLabel>
                  <Select
                    labelId="albumLabel"
                    id="albumId"
                    value={album}
                    label="Album"
                    // onChange={handleChange}
                    // defaultValue={10}
                  >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'Album 1'}>Album 1</MenuItem>
                    <MenuItem value={'Album 2'}>Album 2</MenuItem>
                    <MenuItem value={'Album 3'}>Album 3</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
  
  
                <Grid item>
                  <FormControl sx={{ m: 1, width:'150px'}} color='success'>
                  <InputLabel id="OddEvenLabel">TBD</InputLabel>
                  <Select
                    labelId="OddEvenLabel"
                    id="oddEvenId"
                    value={OddEven}
                    label="OddEven"
                    onChange={handleChange2}
                    defaultValue='None'
                  >
                    {/* <MenuItem value=""> 
                      <em>None</em>
                    </MenuItem> */}
                    <MenuItem value={'None'}>None</MenuItem>
                    <MenuItem value={'Odd'}>Odd</MenuItem>
                    <MenuItem value={'Even'}>Even</MenuItem>
                    <MenuItem value={'Prime'}>Prime</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
  
                <Grid item>
                  <Button variant="contained" sx={{backgroundColor:'success.main', color:'white',
                    '&:hover': {
                      backgroundColor: 'success.main', 
                      cursor: 'pointer'
                    },
                    m:1,
                    height: '54px',
                    width: '150px'
                  }}>Add Photo</Button>
                </Grid>
              </Grid>
            </Grid>
  
            <Grid container item spacing={2}>
  
                {paginationData.currentData().map((itr)=>
                  <Grid item>
                  <Card sx={{ width: 210, height: 227, borderRadius: '30px', display:'flex', flexDirection:'column', alignItem:'center',boxShadow: '0px 6px 20px 0px #BCBCBC40', paddingBottom:'0px'}}>
                    <CardMedia
                      sx={{ height: 80, borderRadius:'50%', width: 80, marginX: 'auto', marginTop:'15px',  marginBottom:'10px' }}
                      image={img1.src}
                      title="green iguana"
                    />
                    <CardContent sx={{display: 'grid', placeItems:'center', width:'100%', overflow:'scrollx', height:'130px'}}>
                      <Box sx={{height:'18px', overflow:'hidden', display:'flex', justifyContent:'center', mx:'20px'}}>
                        <Typography variant="subtitle2">
                            {itr.name}
                        </Typography>
                      </Box>
                      <Box sx={{ backgroundColor: '#CEFFFF', padding:'3px', borderRadius:'20px', px:'15px'}}>
                        <Typography variant="body1" color="text.secondary">
                            Album 1
                        </Typography>
                      </Box>

                        {/* <Typography variant="body1" color="text.secondary">
                            {itr.album}
                        </Typography> */}

                      {/* <Typography variant="body1" color="text.secondary" sx={{marginTop:'20px'}}>
                        {itr.email}
                      </Typography> */}
                      <Box sx={{display:'grid', placeItems:'center', width:'100%', height:'50px'}}>
                    {
                        OddEven=='Odd'?(
                            (itr.id % 2)!=0?(
                                <Typography variant="body1" color="text.secondary" sx={{ height:'100%', backgroundColor:'success.main', width:'100%', marginTop:'10px', display:'grid', placeItems:'center', color:'white' }}>
                                    Odd
                                </Typography>
                            ):(
                                <Typography variant="body1" color="text.secondary" >
                                    {itr.email}
                                </Typography>
                            )
                        ) : OddEven=='Even'?(
                            (itr.id%2)==0?(
                              <Typography variant="body1" color="text.secondary" sx={{ height:'100%', backgroundColor:'success.main', width:'100%', marginTop:'10px', display:'grid', placeItems:'center', color:'white' }}>
                                    Even
                                </Typography>
                            ):(
                                <Typography variant="body1" color="text.secondary">
                                    {itr.email}
                                </Typography>
                            )
                        ) : OddEven=='Prime'?(
                            isPrime(itr.id) ? (
                              <Typography variant="body1" color="text.secondary" sx={{ height:'100%', backgroundColor:'success.main', width:'100%', marginTop:'10px', display:'grid', placeItems:'center', color:'white' }}>
                                    Prime
                                </Typography>
                            ):(
                                <Typography variant="body1" color="text.secondary">
                                    {itr.email}
                                </Typography>
                            )
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                    {itr.email}
                                </Typography>
                        )
                    }
                    </Box>
                             
                            

                      {/* { OddEven == 'Even' && (itr.id%2) == 0 && (<Typography variant="body1" color="text.secondary" sx={{marginTop:'20px', backgroundColor:'success'}} >
                        Even
                      </Typography>)}

                      { OddEven == 'Prime' && isPrime(itr.id) && (<Typography variant="body1" color="text.secondary" sx={{marginTop:'20px', backgroundColor:'success'}} >
                        Prime
                      </Typography>)}

                      { OddEven == 'None' &&  (<Typography variant="body1" color="text.secondary" sx={{marginTop:'20px'}} >
                        {itr.email}
                      </Typography>) } */}
                    </CardContent>
                  </Card>
                </Grid>
                )
                }
            </Grid>

            <Grid item container sx={{marginTop:'15px', width:'100%', psoition:'absolute', bottom:5}} justifyContent='space-between'>
                <Grid item sx={{marginTop:'10px'}}>
                    <Typography variant="body1" color="secondary.main">Showing {(page-1)*10} to {Math.min((page-1)*10 + 10, cardData.length )} of {cardData.length} entries</Typography>
                </Grid>
                <Grid item sx={{marginLeft:'40px'}}>
                    <Pagination
                        count={paginationData.NumPages}
                        size="large"
                        page={page}
                        variant="outlined"
                        onChange={handlePageChange}
                        color='secondary'
                    />
                </Grid>
            </Grid>
            
    </Grid>)
  };



