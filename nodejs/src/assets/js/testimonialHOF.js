const testimonials = [
    {
        image: "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600",
        quote: "''Stay Foolish, Stay Hungry bro''",
        author: "-Stevani Jobs",
        rating: 3
    },
    {
        image: "https://images.pexels.com/photos/1009949/pexels-photo-1009949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        quote: "''Good job!, Failure is Succes in Progress''",
        author: "-Dio Hasbi",
        rating: 4
    },
    {
        image: "https://images.pexels.com/photos/3375210/pexels-photo-3375210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        quote: "''Keep going! 😁''",
        author: "-Fany Soegi",
        rating: 5
    },
    {
        image: "https://images.pexels.com/photos/7319480/pexels-photo-7319480.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        quote: "''Such a great job! 😎''",
        author: "-Peaky Blinder",
        rating: 5
    },
    {
        image: "https://images.pexels.com/photos/3697829/pexels-photo-3697829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        quote: "''Too much! Sorry''",
        author: "-Nana onana",
        rating: 1
    }
]

function testimonialAll() {
    let testimonialsHTML = ''

    testimonials.forEach((value) => {
        testimonialsHTML += `<div> <img src="${value.image}" alt="Person Picture" class="img-testi">
        <p class="quote">${value.quote}</p>
        <p class="author">${value.author}</p>
        </div>`;
    
    })
        document.getElementById('testimonialContent').innerHTML = testimonialsHTML
    
    
}

function testimonialButton(rating) {

    const filterTestimonial = testimonials.filter((value) => value.rating === rating)

    const filtertestimonialHTML = filterTestimonial.map((value) => {
        return `<div> <img src="${value.image}" alt="Person Picture" class="img-testi">
    <p class="quote">${value.quote}</p>
    <p class="author">${value.author}</p>
    </div>`;
    })

    document.getElementById('testimonialContent').innerHTML = filtertestimonialHTML.join(" ");
}

testimonialAll()