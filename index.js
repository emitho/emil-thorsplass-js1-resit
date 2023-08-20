function fetchJokes(type) {
    // Show loading indicator
    document.getElementById('loading').style.display = 'flex';

    return fetch('https://api.noroff.dev/api/v1/jokes')
        .then(response => response.json())
        .then(jokes => {
            if (type) {
                jokes = jokes.filter(joke => joke.type.toLowerCase() === type);
            }
            return displayJokes(jokes);
        })
        .catch(error => {
            console.error('An error occurred:', error);
            document.getElementById('jokes').innerHTML = '<p>An error occurred while fetching jokes. Please try again later.</p>';
        })
        .finally(() => {
            // Hide loading indicator
            document.getElementById('loading').style.display = 'none'; 
        });
}


document.getElementById('all').addEventListener('click', () => {
    activateButton('all');
    fetchJokes();
});

function displayJokes(jokes) {
    const jokesDiv = document.getElementById('jokes');
    jokesDiv.innerHTML = ''; // Clear jokes
    jokes.forEach(joke => {
        const jokeDiv = document.createElement('div');
        jokeDiv.innerHTML = `<p>${joke.setup} (<a href="joke.html?id=${joke.id}">View Punchline</a>)</p>`;
        jokesDiv.appendChild(jokeDiv);
    });
}

function activateButton(id) {
    document.getElementById('all').classList.remove('active');
    document.getElementById('general').classList.remove('active');
    document.getElementById('programming').classList.remove('active');
    document.getElementById(id).classList.add('active');
}

function filterJokes(type) {
    activateButton(type);
    fetchJokes(type);
}

document.getElementById('general').addEventListener('click', () => filterJokes('general'));
document.getElementById('programming').addEventListener('click', () => filterJokes('programming'));

fetchJokes(); // Initial fetch