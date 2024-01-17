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
  res.render('myproject', { data, title })
}

// Detail Data
function handleDetailProject(req, res) {
  const { id } = req.params
  const dataDetail = data[id]

  res.render('detail', { data: dataDetail })
}

function testimonial(req, res) {
  res.render('testimonial')
}

// Calculataion Total Month
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

// Format DD-MM-YYY
function formatDate(dateFormat) {
  const [year, month, day] = dateFormat.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
  return `${day}-${months[parseInt(month, 10) - 1]}-${year}`
}

// Checkbox data
function reqProgram(body) {
  return {
    first: body.nodejs ? true : false,
    second: body.reactjs ? true : false,
    third: body.nextjs ? true : false,
    fourth: body.typescript ? true : false,
  }
}


// POST data
function handlePostProject(req, res) {
  const program = reqProgram(req.body)
  const { name, description, startdate, enddate } = req.body

  
  const startDateFirst = new Date(startdate)
  const endDateFirst = new Date(enddate)
  const totalMonth = durationMonth(startDateFirst, endDateFirst)
  const startDateFormat = formatDate(startdate)
  const endDateFormat = formatDate(enddate)


  data.push({ name, description, program, totalMonth, startDateFormat, endDateFormat, startdate, enddate })

  res.redirect('/myproject')
}



// Delete Data
function handleDeleteProject(req, res) {
  const { id } = req.params

  data.splice(id, 1)
  res.redirect('/myproject')
}



// Edit & Post Data
function updateMyProject(req, res) {
  const { id } = req.params;
  const editData = data[id]
  res.render('updatemyproject', { id, data: editData })
}

function postMyProject(req, res) {
  const { id } = req.params

  const program = reqProgram(req.body)
  const { name, description, startdate, enddate } = req.body

  const startDateFirst = new Date(startdate)
  const endDateFirst = new Date(enddate)
  const totalMonth = durationMonth(startDateFirst, endDateFirst)
  const startDateFormat = formatDate(startdate)
  const endDateFormat = formatDate(enddate)

  data[id] = { name, description, program, totalMonth, startDateFormat, endDateFormat, startdate, enddate}

  res.redirect('/myproject')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})