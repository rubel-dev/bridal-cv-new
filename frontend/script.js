const form = document.getElementById('bridalForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        height: document.getElementById('height').value,
        education: document.getElementById('education').value,
        occupation: document.getElementById('occupation').value,
        hobbies: document.getElementById('hobbies').value,
        languages: document.getElementById('languages').value
    };

    // Sending data to backend
    const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);
    form.reset();
});
