const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // setting is set to a value
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // This will show the default page. express.static('takes the path of folder we want to use')

app.get('',(req, res)=>{
  res.render('index',{
      title:'Weather App',
      name:'Aditi Khandelwal'
  })
})

// routes
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        message:'Practice more',
        name:'Aditi Khandelwal'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Aditi'
    })
  })
  
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You should provide address to get weather'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}= {})=>{ // data object is replaced by destructing object.Default parameter is udes to avoid crashing of server.
        if(error){
          return res.send({
              error
          })
        }
          forecast(latitude, longitude, (error, forecastData) => {  // forecastdata object is replaced by desctructing object
            if(error){
              return res.send({
                  error           // object property shorthand
              })
            }
            res.send({
                forecastData,      // object property shorthand
                location           // object property shorthand
            })
          })
      })
      
  })

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 Page',
        name:'Aditi Khandelwal',
        message:'Help article not found '
    })
})  

//wild card character used. Request for routes not listed. Placed at last to avoid giving error in existing pages
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 page',
        name:'Aditi Khandelwal',
        message:'Page not found'
    })
})

//to start the server (listen to specific port)
app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})