const path = require('path')
const express = require('express')
const hbs = require('hbs');
const  error = require('console');
const geocode = require('./utils/geolocation')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const assets = path.join(__dirname,'../public');
const templates = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',templates)
hbs.registerPartials(partials)
app.use(express.static(assets))



app.get('',(req,res) => {
    res.render('index', {
        title:'Weather Forecast',
        name:'Knight',
        welcomeMessage:'Now Displaying Weather Data'
    })
})


app.get('/about',(req,res) =>{
    res.render('about',{
        title:'about me',
        name:'Kendrick White'
    })
})


app.get('/help',(req,res) =>{
    res.render('help',{
        title:'help page',
        helpText:'You need help',
        name:'Knight'
    })
}) 

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
   
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {

        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,data) =>{
            if(error){
               return res.send({error})
            }

            res.send({
                location:location,
                forecast:data,
                address:req.query.address
            })

            
        })
    })
    
})

app.get('/help/*',(req,res) =>{
    res.render('404error',{
    
        title:'help page',
        errorMessage:'You need help g',
        name:'Knight'
    
   })
})

app.get('*',(req,res)=> {
   res.render('404error',{
    
        title:'Error',
        errorMessage:'Page not found g',
        name:'Knight'
    
   })
})

app.listen(port,()=> {
    console.log('server is running on port '+port);
})