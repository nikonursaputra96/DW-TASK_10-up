const express = require('express')
const app = express()
const port = 3000

const dbPool = require('./src/connection/index')
const upload = require ('./src/middleware/uploadFile')
const bcrypt = require('bcrypt');
const session = require('express-session')
const flash = require('express-flash')

// Sequelize config
const { development } = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const SequelizePool = new Sequelize(development)

// use handlebars
app.set('view engine', 'hbs')
app.set('views', 'src/views')

// Middleware express-session
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 60 * 60 * 1000
  },
  resave: false,
  store: session.MemoryStore(),
  secret: 'session-storage',
  saveUninitialized: true,
}))
app.use(flash())

app.use('/assets', express.static('src/assets'))
app.use('/upload', express.static('src/upload'))
app.use(express.urlencoded({ extended: false })) //body parser

app.get('/', home)
app.get('/contact', contact)
app.get('/myproject', myproject)
app.get('/detail/:id', handleDetailProject)
app.get('/testimonial', testimonial)
app.post('/myproject', upload.single('image'), handlePostProject)
app.get('/delete/:id', handleDeleteProject)
app.get('/updatemyproject/:id', updateMyProject)
app.post('/updatemyproject/:id',upload.single('image'), postMyProject)
app.get('/register', formRegister)
app.post('/register', addRegister)
app.get('/login', formLogin)
app.post('/login', isLogin)
app.get('/logout', isLogout)



const data = []

// function home (req,res) {
//   dbPool.connect((err, client, done) => {
//     if (err) throw err
//     client.query(`SELECT * FROM "Authors"`, (err, result) => {
//       done()
//       if (err) throw err

//       res.status(200).json(result)
//     })
//   })
// }


function home(req, res) {
  res.render('index' , {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

// REGISTER MENU
function formRegister(req, res) {
  res.render('register')
}

async function addRegister(req, res) {

  try {
    const { nama, email, password } = req.body
    const salt = 10
    bcrypt.hash(password, salt, async (err, hasPassword) => {
      await SequelizePool.query(`INSERT INTO "Users" ("nama", "email", "password", "createdAt" , "updatedAt") VALUES ('${nama}', '${email}', '${hasPassword}', NOW() , NOW())`)
      res.redirect('/login')

    })
  } catch (error) {
    throw error
  }
}

// LOGIN MENU
function formLogin(req, res) {
  res.render('login', {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}

async function isLogin(req, res) {

  try {
    const { email, password } = req.body

    const checkEmail = await SequelizePool.query(`SELECT * FROM "Users" WHERE "email"= '${email}'`, { type: QueryTypes.SELECT })

    if (!checkEmail.length) {
      req.flash('failed', 'Email is not registered')
      return res.redirect('/login')
    }

    bcrypt.compare(password, checkEmail[0].password, function (err, result) {
      if (!result) {
        return res.redirect('/login')
      } else {
        req.session.isLogin = true
        req.session.user = checkEmail[0].nama
        req.session.idUser = checkEmail[0].id
        req.flash('success', `Welcome ' ${checkEmail[0].nama} ' !!`)
        return res.redirect('/')
      }
    });

  } catch (error) {
    console.log(error)
  }

}


// LOGOUT
function isLogout(req, res) {
  req.session.destroy()
  res.redirect('/login')
}


// CONTACT ME
function contact(req, res) {
  res.render('contact' , {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
}


// RENDER MYPROJECT
async function myproject(req, res) {

  try {
    const title = 'Add My Project'

    let data;
  
    if (req.session.isLogin) {
      data = await SequelizePool.query(`SELECT "Projects".*, "Authors"."name" AS author_name, "Users"."nama" AS user_name FROM "Projects" INNER JOIN "Authors" ON "Projects"."authorId" = "Authors"."id" INNER JOIN "Users" ON "Projects"."userid"="Users"."id" WHERE "Projects"."userid" = ${req.session.idUser} ORDER BY "Projects"."authorId" DESC`)
    } else {
      data = await SequelizePool.query(`SELECT "Projects".*, "Authors"."name" AS author_name, "Users"."nama" AS user_name FROM "Projects" INNER JOIN "Authors" ON "Projects"."authorId" = "Authors"."id" INNER JOIN "Users" ON "Projects"."userid"="Users"."id" ORDER BY "Projects"."authorId" DESC`)
    }

    const projectData = data[0].map( res => ({
      ...res,
      totalMonth: durationMonth(res.startDate, res.endDate),
      isLogin: req.session.isLogin
    }))

    res.render('myproject', { 
      projectData,
      title,
      isLogin: req.session.isLogin,
      user: req.session.user 
    })
  } catch (error) {
    throw error
  }
}

// POST MYPROJECT
async function handlePostProject(req, res) {
  try {
    const { name, description, startdate, enddate} = req.body
    const program = reqProgram(req.body)
    const image = req.file.filename
    const userid = req.session.idUser



    const authorsGetId = await SequelizePool.query(`INSERT INTO "Authors" ("name") VALUES ('${name}') RETURNING "id"`)
    const authorsId = authorsGetId[0][0].id

    await SequelizePool.query(`INSERT INTO "Projects" ("startDate","endDate","description","technologies","uploadImage","authorId","createdAt","updatedAt","userid") 
    VALUES ('${startdate}','${enddate}','${description}','${JSON.stringify(program)}', '${image}' ,'${authorsId}' , NOW (), NOW(),
    '${userid}')`)

    
    res.redirect('/myproject')
  } catch (error) {
    throw error
  }

}




// Detail Data
async function handleDetailProject(req, res) {

  try {
    const { id } = req.params;
    const projectsQuery = await SequelizePool.query(`SELECT "Projects".*, "Authors"."name" FROM "Projects" INNER JOIN "Authors" ON "Projects"."authorId" = "Authors"."id" WHERE "authorId" = ${id}`, { type: QueryTypes.SELECT })

    const dataDetail = projectsQuery[0]


    const totalMonth = durationMonth(dataDetail.startDate, dataDetail.endDate)
    dataDetail.formattedStartDate = dataDetail.startDate.toISOString().split('T')[0];
    dataDetail.formattedEndDate = dataDetail.endDate.toISOString().split('T')[0];
    const formatStartDate = formatDate(dataDetail.formattedStartDate)
    const formatEndDate = formatDate(dataDetail.formattedEndDate)

    res.render('detail', { 
      data: dataDetail, 
      totalMonth, 
      formatStartDate, 
      formatEndDate,
      isLogin: req.session.isLogin,
      user: req.session.user
    })
  } catch (error) {
    throw error
  }

}

function testimonial(req, res) {
  res.render('testimonial' , {
    isLogin: req.session.isLogin,
    user: req.session.user
  })
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



// Delete Data
async function handleDeleteProject(req, res) {
  try {

  const { id } = req.params
  await SequelizePool.query(`DELETE FROM "Projects" WHERE "authorId"=${id}`)
  await SequelizePool.query(`DELETE FROM "Authors" WHERE "id"=${id}`)
  
    res.redirect('/myproject')
  } catch (error) {
    throw error
  }
}




// Edit & Post Data
async function updateMyProject(req, res) {
  try {
    
    const { id } = req.params;
    const projectsQuery = await SequelizePool.query(`SELECT "Projects".*, "Authors"."name" FROM "Projects" INNER JOIN "Authors" ON "Projects"."authorId" = "Authors"."id" WHERE "authorId" = ${id}`, { type: QueryTypes.SELECT })

    const editData = projectsQuery[0]
    
    editData.formattedStartDate = editData.startDate.toISOString().split('T')[0];
    editData.formattedEndDate = editData.endDate.toISOString().split('T')[0];

    res.render('updatemyproject', {
      id, 
      data: editData,
      isLogin: req.session.isLogin,
      user: req.session.user
     })
  } catch (error) {
    throw error
  }
}




// POST AFTER EDIT
async function postMyProject(req, res) {
  const { id } = req.params
  const { name, description, startdate, enddate } = req.body
  const program = reqProgram(req.body)
  const image = req.file.filename
  const userid = req.session.idUser

  await SequelizePool.query(`UPDATE "Authors" SET "name"='${name}' WHERE "id" = ${id}`)
  await SequelizePool.query(`UPDATE "Projects" SET "startDate"='${startdate}', "endDate"='${enddate}', "description"='${description}', "technologies"='${JSON.stringify(program)}',"uploadImage"='${image}', "userid"='${userid}' WHERE "authorId"= ${id}`)
  
  res.redirect('/myproject')
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})