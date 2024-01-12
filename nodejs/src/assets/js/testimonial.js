// class Testimonial {
//     #image = ''
//     #quote = ''
//     #author = ''

//     constructor(image, quote, author) {
//         this.#image = image
//         this.#quote = quote
//         this.#author = author
//     }

//     set image(val) {
//         this.#image = val
//     }
//     set quote(val) {
//         this.#quote = val
//     }
//     set author(val) {
//         this.#author = val
//     }

//     get image() {
//         return this.#image
//     }
//     get quote() {
//         return this.#quote
//     }
//     get author() {
//         return this.#author
//     }

//     html() {
//         throw new Error ('Choose Author or Company')
//     }
// }


// class AuthorTestimonial extends Testimonial {
    
//     html() {
//         return`<div> <img src="${this.image}" alt="Person Picture" class="img-testi">
//         <p class="quote">${this.quote}</p>
//         <p class="author">${this.author}</p>
//         </div>`;
//     }
// }
// class CompanyTestimonial extends Testimonial {
    
//     html() {
//         return`<div> <img src="${this.image}" alt="Person Picture" class="img-testi">
//         <p class="quote">${this.quote}</p>
//         <p class="author">${this.author} Company</p>
//         </div>`;
//     }
// }

// const testimonial1 = new AuthorTestimonial ("https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600", "''Stay Foolish, Stay Hungry bro''", "-Stevani Jobs")
// const testimonial2 = new AuthorTestimonial ("https://images.pexels.com/photos/1009949/pexels-photo-1009949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "''Good job!, Failure is Succes in Progress''", "-Dio Hasbi")
// const testimonial3 = new CompanyTestimonial ("https://images.pexels.com/photos/3375210/pexels-photo-3375210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "''Keep going! 😁''", "-Fany Soegi")

// const testimonials = [testimonial1,testimonial2,testimonial3]

// let testimonialsHTML = ''

// for(let i = 0 ; i < testimonials.length ; i++) {
//     testimonialsHTML += testimonials[i].html()
// }

// document.getElementById('testimonialContent').innerHTML = testimonialsHTML;

