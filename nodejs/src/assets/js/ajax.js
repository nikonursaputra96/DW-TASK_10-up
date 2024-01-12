function getDataTestimonial() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', 'https://api.npoint.io/ab6b6ba6241ff04b4938', true)

        xhr.onload = () => {
            if(xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            } else {
                reject('Error Loading Data')
            }

        }

        xhr.onerror = () => {
            reject('Your Network Error!')
        }

        xhr.send()
    })
}

async function testimonialAll() {
    document.getElementById('testimonialContent').innerHTML = `<div id="loading"></div>`
    const testimonials = await getDataTestimonial()
    let testimonialsHTML = ''

    testimonials.forEach((value) => {
        testimonialsHTML += `<div> <img src="${value.image}" alt="Person Picture" class="img-testi">
        <p class="quote">${value.quote}</p>
        <p class="author">${value.author}</p>
        </div>`;

    })
    document.getElementById('testimonialContent').innerHTML = testimonialsHTML


}

async function testimonialButton(rating) {
    document.getElementById('testimonialContent').innerHTML = `<div id="loading"></div>`
    const testimonials = await getDataTestimonial()

    const filterTestimonial = testimonials.filter((value) => value.rating === rating)

    if(filterTestimonial.length === 0) {
        document.getElementById('testimonialContent').innerHTML = 'Sorry, Data Not Found !'
    } else {
        const filtertestimonialHTML = filterTestimonial.map((value) => {
            return `<div> <img src="${value.image}" alt="Person Picture" class="img-testi">
        <p class="quote">${value.quote}</p>
        <p class="author">${value.author}</p>
        </div>`;
        })
    
        document.getElementById('testimonialContent').innerHTML = filtertestimonialHTML.join(" ");
    }

   
}

testimonialAll()