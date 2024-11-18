async function loadCVs() {
    const response = await fetch('http://localhost:3000/api/cv');
    const cvs = await response.json();
    const cvList = document.getElementById('cvList');

    cvs.forEach(cv => {
        const cvDiv = document.createElement('div');
        cvDiv.className = 'cv-item';
        cvDiv.innerHTML = `
            <h3>${cv.name}</h3>
            <p><strong>DOB:</strong> ${new Date(cv.dob).toLocaleDateString()}</p>
            <p><strong>Height:</strong> ${cv.height}</p>
            <p><strong>Education:</strong> ${cv.education}</p>
            <p><strong>Occupation:</strong> ${cv.occupation || 'N/A'}</p>
            <p><strong>Hobbies:</strong> ${cv.hobbies || 'N/A'}</p>
            <p><strong>Languages:</strong> ${cv.languages || 'N/A'}</p>
        `;
        cvList.appendChild(cvDiv);
    });
}

window.onload = loadCVs;
