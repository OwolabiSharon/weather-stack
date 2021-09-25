const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const request = require('postman-request');
const forcast = require('./utils/forecast');

const app = express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')




app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'sharon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'sharon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'help',
        helpText: 'This is some helpful text.',
        name: 'sharon'
    })
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    res.send({
      'error':'query an address please'
    })
  }else {
    geocode(req.query.address,(error , data={}) => {
      if (error) {
        return res.send({error});
      }else {
        forcast(data.latitude,data.longitude,(error,forecastdata) => {
          if (error) {
            res.send({error});
          }
            res.send({
              'forecast':forecastdata,
              'location':data.location,
              'address':req.query.address
            })
             })
      }

    })
  }
})

app.get('/products', (req, res) => {
  console.log(req.query);
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res) => {
  res.render('help_404', {
    title: '404',
    name: 'sharon'
  })
})

app.get('*',(req,res) => {
  res.render('404', {
    title: '404',
    name: 'sharon'
  })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})
