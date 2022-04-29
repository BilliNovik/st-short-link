const form = document.querySelector('.form')

form.onsubmit = function (e) {
    e.preventDefault();

    const link = form.querySelector('.form__input')
    const data = JSON.stringify({ link: link.value })

    fetch('/links/short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    })
        .then((res) => res.json())
        .then((res) => {
            const ul = document.querySelector('.links');
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`Short link: ${res.short}, originals: ${res.source}`));
            ul.appendChild(li)
        })
        .catch(e => console.log(e))
}