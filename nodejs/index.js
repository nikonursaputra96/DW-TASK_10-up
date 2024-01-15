const express = require('express')
const app = express()
const port = 3000

// use handlebars
app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({ extended: false })) //body parser

app.get('/', home)
app.get('/contact', contact)
app.get('/myproject', myproject)
app.get('/detail/:id', handleDetailProject)
app.get('/testimonial', testimonial)
app.post('/myproject', handlePostProject)
app.get('/delete/:id', handleDeleteProject)
app.get('/updatemyproject/:id', updateMyProject)
app.post('/updatemyproject/:id', postMyProject)



const data = []

function home(req, res) {
  res.render('index')
}

function contact(req, res) {
  res.render('contact')
}

function myproject(req, res) {

  const title = 'Add My Project'
  res.render('myproject', { data , title })
}
// Detail Data
function handleDetailProject(req, res) {
  const {id} = req.params
  const dataDetail = data[id]

  res.render('detail', {data : dataDetail})
}

function testimonial(req, res) {
  res.render('testimonial')
}



// post data
function handlePostProject(req, res) {
  // Checkbox Data
  let program = {
    first: req.body.nodejs ? true : false,
    second: req.body.reactjs ? true : false,
    third: req.body.nextjs ? true : false,
    fourth: req.body.typescript ? true : false,
  }

  const { name, description, startdate, enddate } = req.body

  // Date Data
  const startDateFirst = new Date(startdate)
  const endDateFirst = new Date(enddate)

  function durationMonth(startDateFirst, endDateFirst) {
    let date = endDateFirst - startDateFirst
    let month = date / (1000 * 60 * 60 * 24 * 30)
    let totalMonth = Math.floor(month)
    if (totalMonth === 1) {
      return totalMonth + ' bulan'
    } else if (totalMonth < 1) {
      let day = date / (1000 * 60 * 60 * 24)
      return Math.floor(day) + ' hari'
    } else {
      return totalMonth + ' bulan'
    }
  }

  const totalMonth = durationMonth (startDateFirst,endDateFirst)


  data.push({ name, description, program, totalMonth, startdate, enddate })

  res.redirect('/myproject')
}



// Delete Card
function handleDeleteProject(req, res) {
  const { id } = req.params

  data.splice(id, 1)
  res.redirect('/myproject')
}


// Edit Data
function updateMyProject (req, res) {
  const {id} = req.params;
  const editData = data[id]
  res.render ('updatemyproject' , {id , editData})
}

function postMyProject (req, res) {
  const {id} = req.params

  let program = {
    first: req.body.nodejs ? true : false,
    second: req.body.reactjs ? true : false,
    third: req.body.nextjs ? true : false,
    fourth: req.body.typescript ? true : false,
  }

  const { name, description, startdate, enddate } = req.body

  const startDateFirst = new Date(startdate)
  const endDateFirst = new Date(enddate)

  function durationMonth(startDateFirst, endDateFirst) {
    let date = endDateFirst - startDateFirst
    let month = date / (1000 * 60 * 60 * 24 * 30)
    let totalMonth = Math.floor(month)
    if (totalMonth === 1) {
      return totalMonth + ' bulan'
    } else if (totalMonth < 1) {
      let day = date / (1000 * 60 * 60 * 24)
      return Math.floor(day) + ' hari'
    } else {
      return totalMonth + ' bulan'
    }
  }

  const totalMonth = durationMonth (startDateFirst,endDateFirst)

  data[id] = {name , description, program, totalMonth, startdate, enddate}

  res.redirect ('/myproject')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})