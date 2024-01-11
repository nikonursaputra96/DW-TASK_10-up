
function sendEmail() {

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let tel = document.getElementById('tel').value
    let option = document.getElementById('option').value
    let textarea = document.getElementById('textarea').value


   let send = "mailto:nikonursaputra@gmail.com" + "?subject=" + " Halo my name is " + encodeURIComponent(name) + " let's Talk " + "&body=" + "Let me introduce myself: " + "I'm " + encodeURIComponent(name) + "  My email  " + encodeURIComponent(email) + "  My phone number " + encodeURIComponent(tel) + "We are  " + encodeURIComponent(option)+ " account " + "  I think you're  "+ encodeURIComponent(textarea);


    window.location.href = send
}
