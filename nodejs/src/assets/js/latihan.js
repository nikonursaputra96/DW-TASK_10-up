// const blogs = []

// function addBlog(e) {
//     e.preventDefault()

//     const title = document.getElementById("input-blog-title").value
//     const content = document.getElementById("input-blog-content").value
//     let image = document.getElementById("input-blog-image").files
//     image = URL.createObjectURL(image[0])

//     const createdAt = new Date()

//     // localStorage.setItem("blog", JSON.stringify({
//     //     title,
//     //     content,
//     //     imageLink
//     // }))

//     const blog = {
//         title,
//         content,
//         image,
//         createdAt
//     }

//     blogs.unshift(blog)
//     renderBlog()

//     console.log("blogs", blogs)
// }

// function renderBlog() {
//     let html = ''

//     for (let index = 0; index < blogs.length; index++) {
//         html += `
//         <div class="blog-list-item">
//             <div class="blog-image">
//                 <img src="${blogs[index].image}" alt="" />
//             </div>
//             <div class="blog-content">
//                 <div class="btn-group">
//                     <button class="btn-edit">Edit Post</button>
//                     <button class="btn-post">Delete Post</button>
//                 </div>
//                 <h1>
//                     <a href="blog-detail.html" target="_blank">${blogs[index].title}</a>
//                 </h1>
//                 <div class="detail-blog-content">
//                     ${blogs[index].createdAt} | Ichsan Emrald Alamsyah
//                 </div>
//                 <p>
//                   ${blogs[index].content}
//                 </p>
//             </div>
//         </div>
// `
//     }

//     document.getElementById("contents").innerHTML = html
// }

// renderBlog()


// icon nextjs dll ditambahkan berkaitan dengan checkbox, date di update input date, tambahkan local storage(untuk knowledge), pake font awesome,, soal tugas
const blogs = [{
    title: "Title 1",
    content: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem",
    image: "default.jpg",
    tech: ["reactjs"],
    createdAt: new Date()
}]

function addBlog(e) {
    e.preventDefault()

    const title = document.getElementById("input-blog-title").value
    const content = document.getElementById("input-blog-content").value
    let image = document.getElementById("input-blog-image").files
    // const nodejs = document.getElementById("nodejs").checked // checked = true
    // const python = document.getElementById("python").checked

    // let tech = []

    // for (let x = 0; x < technologies.length; x++) {
    //     if (technologies[x].checked) {
    //         tech.push(technologies[x].value)
    //     }
    // }

    image = URL.createObjectURL(image[0])

    const createdAt = new Date()

    // localStorage.setItem("blog", JSON.stringify({
    //     title,
    //     content,
    //     imageLink
    // }))

    const blog = {
        title,
        content,
        image,
        nodejs,
        python,
        createdAt
    }

    blogs.unshift(blog)
    renderBlog()

    console.log("blogs", blogs)
}

function renderBlog() {
    let html = ''


    for (let index = 0; index < blogs.length; index++) {
        // let renderTechIcons = ''

        // if (blogs[index].nodejs) {
        //     renderTechIcons += `<i class="fa-brands fa-node"></i>`
        // }

        // if (blogs[index].python) {
        //     renderTechIcons += `<i class="fa-brands fa-python"></i>`
        // }

        html += `
        <div class="blog-list-item">
            <div class="blog-image">
                <img src="${blogs[index].image}" alt="" />
            </div>
            <div class="blog-content">
                <div class="btn-group">
                    <button class="btn-edit">Edit Post</button>
                    <button class="btn-post">Delete Post</button>
                </div>
                <h1>
                    <a href="blog-detail.html" target="_blank">${blogs[index].title}</a>
                </h1>
                <div class="detail-blog-content">
                    ${getFullTime(blogs[index].createdAt)} | Ichsan Emrald Alamsyah
                </div>
                <p>
                  ${blogs[index].content}
                </p>

                <div> 
                    <p>${getDistanceTime(blogs[index].createdAt)}</p>
                </div>
            </div>
        </div>
`
    }

    document.getElementById("contents").innerHTML = html
}

function getFullTime(dates) { // date formatter
    let minutes = dates.getMinutes()
    let hours = dates.getHours()
    const date = dates.getDate()
    const month = dates.getMonth();
    const year = dates.getFullYear();

    // solusi 1 : bikin condition

    // if(bulan == 0) bulan = "January"
    // if(bulan == 1) bulan = "February"
    // if(bulan == 2) bulan = "March"

    // solusi 2 : bikin array, isinya January - December
    if (hours < 10) {
        hours = "0" + hours
    }

    if (minutes < 10) {
        minutes = "0" + minutes
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return `${date} ${months[month]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(timePost) { // fungsi untuk menghitung jarak antara waktu ketika kita posting blog dengan waktu sekarang
    let timeNow = new Date()

    let distance = timeNow - timePost // hasilnya miliseconds -> 1 detik = 1000ms

    // Math.floor() // membulatkan ke bawah, ex : 1.3 -> 1
    // Math.round() // membulatkan ke terdekat, ex : 1.3 -> 1 OR 1.7 -> 2
    // Math.ceil() // membulatkan ke atas, ex : 1.3 -> 2
    const seconds = Math.floor(distance / 1000)
    const minutes = Math.floor(distance / 1000 / 60)
    const hours = Math.floor(distance / 1000 / 60 / 60)
    const day = Math.floor(distance / 1000 / 60 / 60 / 24)

    if (seconds < 60) {
        return seconds + " seconds ago"
    } else if (minutes < 60) {
        return minutes + " minutes ago"
    } else if (hours < 60) {
        return hours + " hours ago"
    } else if (day < 24) {
        return day + " day ago"
    }
}

renderBlog()

setInterval(() => {
    renderBlog()
}, 1000)










// TESTIMONIAL LATIHAN
class Testimonial {
    #author = ""
    #image = ""
    #content = ""

    constructor(author, image, content) {
        this.#author = author
        this.#image = image
        this.#content = content
    }

    set author(val) {
        this.#author = val
    }

    set image(val) {
        this.#image = val
    }

    set content(val) {
        this.#content = val
    }

    get author() {
        return this.#author
    }

    get image() {
        return this.#image
    }

    get content() {
        return this.#content
    }

    html() {
        throw new Error('You must choose as author or company')
    }
}

class AuthorTestimonial extends Testimonial {

    html() {
        return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author}</p>
        </div>`
    }
}

class CompanyTestimonial extends Testimonial {

    html() {
        return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author} Company</p>
        </div>`
    }
}

const testimonial1 = new AuthorTestimonial("Surya Elidanto", "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Mantap sekali jasanya!")
const testimonial2 = new AuthorTestimonial("Renaldi", "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600", "Apasih bang?!")
const testimonial3 = new CompanyTestimonial("Jafar", "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600", "Okelah bang")

const testimonials = [testimonial1, testimonial2, testimonial3] // length => 3
let testimonialsHTML = ""

for (let index = 0; index < testimonials.length; index++) {
    testimonialsHTML += testimonials[index].html()
}

document.getElementById("testimonials").innerHTML = testimonialsHTML



















// HOF & CALLBACK

// built in HOF array -> bawaan dari javascript
// forEach, map, filter, reduce

// forEach
// const arr = [1,2,3,4,5]

// arr.forEach((x, y) => {
//     arr[y] = x * 2
// })

// const newArr = arr.forEach((item, index) => {
//     arr[index] = item * 2
// })

// console.log(newArr)
// console.log("ini array aslinya",arr)

// map
// const arr = [1,2,3,4,5,6,7,8,9,10]

// const newArr = arr.map((item, index) => {
//     if(item % 2 === 0) {
//         return item
//     }
// }) // array baru

// console.log(newArr)

// filter
// const arr = [1,2,3,4,5,6,7,8,9,10]

// 1 % 2 = 1
// 2 % 2 = 0
// 3 % 2 = 1
// 4 % 2 = 0 

// const filteredArray = arr.filter((item, index) => {
//     if(item % 2 === 0) {
//         return true
//     }
//     // mengembalikan boolean : true OR false
// })

// console.log(filteredArray)

// reduce
// const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]

// const sum = arr.reduce((total, current) => {
//     return total + current
// }, 100)

// console.log(sum)

// const obj1 = { a: 1, b: 2 };
// const obj2 = { c: 3, d: 4 };
// const obj3 = { e: 5, f: 6 };

// const arr = [obj1, obj2, obj3]

// const mergedObj = arr.reduce((acc, curr) => {
//     return { ...acc, ...curr };
// }, {});
// console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }






// latihan 2
function callbackFunction() {
    console.log("Halo saya adalah callback function")
}

function higherOrderFunction(callback) {
    console.log("Ini adalah console dari higher order function")
    callback()
}

higherOrderFunction(callbackFunction)

// custom HOF

const radius = [1, 2, 3, 4, 5]
const radius2 = [10, 20, 30]

const area = function (radius) {
    return Math.PI * radius * radius
}

const diameter = function (radius) {
    return 2 * radius
}

const kelilinglingkaran = function (radius) {
    return 2 * Math.PI * radius * radius
}

const calculate = function (radius, logic) {
    const output = []
    for (let index = 0; index < radius.length; index++) {
        output.push(logic(radius[index]))
    }
    return output
}

console.log(calculate(radius, area))
console.log(calculate(radius2))




// CONTOH 
const testimonialss = [
    {
        author: "Surya Elidanto",
        content: "Siplah oke",
        image: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 3
    },
    {
        author: "Renaldi",
        content: "Apasih bang",
        image: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4,
    },
    {
        author: "Fandi",
        content: "Mantap bro",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 3,
    },
    {
        author: "Orang baru",
        content: "Mantap bro",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 1
    },
    {
        author: "Orang baru",
        content: "Mantap bro",
        image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 2
    }
]

function allTestimonial() {
    const testimonialHTML = testimonials.map((value) => {
        return `<div class="testimonial">
                <img src="${value.image}" class="profile-testimonial" />
                <p class="quote">"${value.content}"</p>
                <p class="author">- ${value.author}</p>
            </div>`
    })
    
    document.getElementById("testimonials").innerHTML = testimonialHTML.join(" ")
}

function filterTestimonial(rating) {
    const filteredTestimonial = testimonials.filter((value) => value.rating === rating)

    const filteredTestimonialHTML = filteredTestimonial.map((value) => {
        return `<div class="testimonial">
                <img src="${value.image}" class="profile-testimonial" />
                <p class="quote">"${value.content}"</p>
                <p class="author">- ${value.author}</p>
            </div>`
    })

    document.getElementById("testimonials").innerHTML = filteredTestimonialHTML.join(" ")
}

allTestimonial()