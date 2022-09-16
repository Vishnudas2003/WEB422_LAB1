/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: _Vishnu Das Puthukudi_____________________ Student ID: ___134735208___________ Date: _______15-09-2022_________
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/


const express= require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();

const MoviesDB = require("./moviesDB.js");
const db = new MoviesDB();

app.use(cors());
app.use(express.json());
const HTTP_PORT =process.env.PORT ||8080;

app.post("/api/movies", (req,res)=>{
     db.addNewMovies(req.body).then(()=>{
        res.status(404).json({message: `new movie added to the list`});
    }). catch((err)=>{
        res.status(404).json({message: err});
    });
});

app.get("/api/movies", async(req,res) => {
   await db.getAllMovies(req.query.page, req.query.perPage,req.query.title).then((data) => {
            res.status(404).json(data);
        }).catch((err) => {
              res.status(404).json({message: err.message});
        });
});

app.get("/api/movies/:id", async(req,res) => {
    await db.getMovieById(req.params.id).then((movies) => {
            res.status(404).json(movies);
        }) .catch((err) => {
            res.status(500).json({message: err.message});
        });
});

app.put("/api/movies/:id", async(req,res) => {
    await db.updateMovieById(req.body, req.params.id).then(() => {
        res.json({message: "movie has been updated"});
        }).catch((err) => {
            res.status(500).json({message: err.message});
        });
});

app.delete("/api/movies/:id", (req,res) => {
    db.deleteMovieById(req.params.id).then(() => {
        res.json({message: "movie deleted"});
        }).catch((err) => {
            res.status(500).json({message: err.message});
        });
});
// app.get("/api/names", async (req,res)=>{
//     const data = await nameService.getAllNames(); 
//     res.json(data);
//   });

// app.get("/api/names/:id", async (req,res)=>{
//     try{
//       const data = await nameService.getNameById(req.params.id); 
//       res.json(data);
//     }catch(err){
//       res.status(404).json({message: err});
//     }
//   });

// app.put("/api/names/:id", async (req,res)=>{
  
//     try{
//       await nameService.updateNameById(req.params.id, req.body);
//       res.json({message: "name updated"});
//     }catch(err){
//       res.status(404).json({message: err});
//     }
  
//   });

// app.delete("/api/names/:id", async (req,res)=>{
//     try{
//       await nameService.deleteNameById(req.params.id)
//       res.json({message: "name deleted"});
//     }catch(err){
//       res.status(404).json({message: err});
//     }
//   });
  


db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
   }).catch((err)=>{
    console.log(err);
   });




// app.listen(HTTP_PORT, () => {
//     console.log('Ready to handle requests on port ' + HTTP_PORT);
// });