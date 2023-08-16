const jokeId = new URLSearchParams(window.location.search).get('id');

function fetchJoke() {
    fetch(`https://api.noroff.dev/api/v1/jokes/${jokeId}`)
        .then(response => response.json())
        .then(joke => displayJoke(joke))
        .catch(error => console.error('An error occurred:', error));
}

function displayJoke(joke) {
    const jokeDiv = document.getElementById('joke');
    jokeDiv.innerHTML = `<p>Type: ${joke.type}</p><p>Setup: ${joke.setup}</p><p id="punchline" hidden>${joke.punchline}</p>`;
}

document.getElementById('reveal').addEventListener('click', () => {
    document.getElementById('punchline').removeAttribute('hidden');
});

fetchJoke(); // Initial fetch