const express = require('express')
const app = express()
const port = 3000

// use handlebars
app.set('view engine','hbs')
app.set('views','src/views')

app.use ('/assets' , express.static('src/assets'))


app.get('/', home)
app.get('/contact', contact)
app.get('/myproject', myproject)
app.get('/detail/:id', detail)
app.get('/testimonial', testimonial)


function home(req,res) {
  res.render('index')
}

function contact(req,res) {
  res.render('contact')
}
function myproject(req,res) {
  const data = [
    {
      id: 1,
      title: 'Javascript-Dumbways' ,
      durasi: '3 bulan' ,
      comment: 'Training Javascript by Dumbways' 
    } ,
    {
      id: 2,
      title: 'NodeJS-Dumbways' ,
      durasi: '1 bulan' ,
      comment: 'Training NodeJS by Dumbways' 
    } ,
    {
      id: 3,
      title: 'Typescript-Dumbways' ,
      durasi: '2 bulan' ,
      comment: 'Training Typescript by Dumbways' 
    }
  ]


  res.render('myproject' , {data})
}
function detail(req,res) {
  const {id} = req.params


  res.render('detail', {id})
}
function testimonial(req,res) {
  res.render('testimonial')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})