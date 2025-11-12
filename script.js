document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".progress");
    const easyProgressCircle = document.querySelector(".easy");
    const medProgressCircle = document.querySelector(".medium");
    const hardProgressCircle = document.querySelector(".hard");
    const easyLabel = document.getElementById("easyp");
    const medLabel = document.getElementById("medp");
    const hardLabel = document.getElementById("hardp");
    const cardStatsContainer = document.querySelector(".scards");


    function validateUsername(username) {
        if (username.trim() == "") {
            alert("Username cannot be empty");
            return false;
        }
        const regex = /^(?=[a-zA-Z])(?=.{3,20}$)[a-zA-Z0-9._-]*[a-zA-Z0-9]$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;

    }



    async function fetchuserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");

            }
            const parsedData = await response.json();
            console.log("Logging data:", parsedData);
            displayUserdata(parsedData);


        }
        catch (error) {
            statsContainer.innerHTML = error.message;


        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;

        }
    }
    function upadateProgress(solved, total, circle, label) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }
    function displayUserdata(parsedData) {
        const totalq = parsedData.totalQuestions;
        const easyq = parsedData.totalEasy;
        const medq = parsedData.totalMedium;
        const hardq = parsedData.totalHard;

        const totalSolved = parsedData.totalSolved;
        const easySolved = parsedData.easySolved;
        const medSolved = parsedData.mediumSolved;
        const hardSolved = parsedData.hardSolved;
        upadateProgress(easySolved, easyq, easyProgressCircle, easyLabel);
        upadateProgress(medSolved, medq, medProgressCircle, medLabel);
        upadateProgress(hardSolved, hardq, hardProgressCircle, hardLabel);


        const cardData = [
            { label: "Total questions solved", value: parsedData.totalSolved }, { label: "Acceptance Rate", value: parsedData.acceptanceRate+'%' }, { label: "Ranking", value:parsedData.ranking }
        ];
        cardStatsContainer.innerHTML=cardData.map(
          data=>  {
            return `
            <div class="card">
            <h4>${data.label}</h4>
            <p>${data.value}</p>
            </div>
            `

            }
        ).join("")


    }
    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        console.log("logging username: ", username);
        if (validateUsername(username)) {
            fetchuserDetails(username);
        }

    });









})
