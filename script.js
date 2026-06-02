function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function checkEligibility() {
    const dob = document.getElementById('dobInput').value;
    const isCitizen = document.getElementById('citizenCheck').checked;
    const voterIdStatus = document.getElementById('voterIdStatus').value;
    const resultElement = document.getElementById('resultMessage');

    resultElement.className = 'result';
    
    if (!dob) {
        showResult('Please select your Date of Birth.', 'invalid');
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (!isCitizen) {
        showResult('You must be a citizen to be eligible to vote.', 'ineligible');
        return;
    }

    if (age >= 18) {
        if (voterIdStatus === 'has_id') {
            showResult('Success! You are fully eligible and ready to vote.', 'eligible');
        } else {
            showResult('You are of voting age, but you must apply for a Voter ID to cast your ballot.', 'invalid');
        }
    } else {
        const yearsLeft = 18 - age;
        showResult(`You are not eligible yet. You need to wait ${yearsLeft} more year(s).`, 'ineligible');
    }
}

function showResult(message, statusClass) {
    const resultElement = document.getElementById('resultMessage');
    
    setTimeout(() => {
        resultElement.textContent = message;
        resultElement.classList.add(statusClass, 'show');
    }, 50);
}