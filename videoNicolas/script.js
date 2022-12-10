// To know in what video we are right now, the first video is the 0
let videoActual = 0;
/** To count the mistakes of the user */
let mistakes = 0;
/* List of correct answers for each video, being the value the position of the answer */
const answers = [];
answers[0] = 1;
answers[1] = 0;
answers[2] = 1;
/** Questions for each video */
const questions = ['Whats the kid doing?', 'What are they discussing for?', 'Whats the drawing about?']
/** Answers for each video */
const textAnswers = [];
textAnswers[0] = ['Read a book', 'Use virtual reality', 'Cook', 'Sleep'];
textAnswers[1] = ['Material of a wall', 'Colors', 'Politics', 'Football match'];
textAnswers[2] = ['Rocks', 'Plants', 'Fish', 'Bugs'];

/** Timeline */
const video = document.querySelector('#video');
const timeline = document.querySelector('.timeline');
video.addEventListener('timeupdate', () => {
    // Calculate the percentage of the video that has played
    const percentPlayed = video.currentTime / video.duration;
  
    // Update the timeline's width with the calculated percentage
    timeline.style.width = `${percentPlayed * 100}%`;
  });



/**
 * Loads the question and the answers for the current video.
 */
function loadTitleAndAnswers() {
    // Set the caption text to the current question
    document.getElementById('caption').textContent = questions[videoActual];

    // Set the text of the options to the current answer choices
    const options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].textContent = textAnswers[videoActual][i];
    }
}

/**
 * Called when an option is clicked.
 * @param {number} optionNumber - The number of the option that was clicked (1, 2, 3, or 4)
 */
function optionClicked(optionNumber) {
    // If we are not on the last video, check the answer
    if (videoActual < 3) {
        checkAnswer(optionNumber);
    }
}

/**
 * Checks whether the selected option is correct for the current video.
 * @param {number} optionNumber - The number of the option that was clicked (1, 2, 3, or 4)
 */
function checkAnswer(optionNumber) {
    // If the selected option is the correct answer for the current video, handle success
    if (answers[videoActual] === optionNumber) {
        handleSuccess();
    } else {
        // Otherwise, handle the mistake
        handleMistake();
    }
}

/**
 * Handles a successful answer. Plays the correct sound, shows the success notification,
 * and advances to the next video if applicable.
 */
function handleSuccess() {
    // Hide the wrong notification
    const notificationContainerWrong = document.getElementsByClassName("wrong")[0];
    notificationContainerWrong.style.visibility = "hidden";

    // Show the success notification
    const notificationContainer = document.getElementsByClassName("success")[0];
    notificationContainer.style.visibility = "visible";

    // Advance to the next video
    videoActual++;

    // If we have reached the last video, show the final success message and play the winning sound
    if (videoActual === 3) {
        notificationContainer.innerHTML = `You win!<br> You have made ${mistakes} mistakes`
        let audioElement = document.getElementById("winning-sound");
        audioElement.play();
    } else {
        // Otherwise, play the correct sound and advance to the next video
        let audioElement = document.getElementById("correct-sound");
        audioElement.play();
        const videoElement = document.getElementById("video");
        videoElement.src = `./videos/${videoActual}.mp4`;
        videoElement.play();

        // Hide the success notification after 1 second
        setTimeout(() => {
            notificationContainer.style.visibility = "hidden";
        }, 1000)

        // Load the new question and answer choices
        this.loadTitleAndAnswers();
    }
}

/**
 * Handles an incorrect answer. Plays the incorrect sound and shows the wrong notification.
 */
function handleMistake() {
    // Increment the mistake counter
    mistakes++;

    // Show the wrong notification
    const notificationContainer = document.getElementsByClassName("wrong")[0];
    notificationContainer.style.visibility = "visible";

    // Play the incorrect sound
    let audioElement = document.getElementById("incorrect-sound");
    audioElement.play();

    // Hide the wrong notification after 2 seconds
    setTimeout(() => {
        notificationContainer.style.visibility = "hidden";
    }, 2000)
}

/**
 * Restarts the game by reloading the page.
 */
function restart() {
    location.reload()
}

/**
 * Pauses or resumes the video depending on its current state.
 * Updates the text of the pause button accordingly.
 */
 function pause() {
    // Get the video and pause/resume button elements
    const videoElement = document.getElementById("video");
    const button = document.getElementById("buttonPause");

    if (videoElement.paused) {
        // If the video is paused, play it and update the button text
        videoElement.play();
        button.textContent = "Pause";
    } else {
        // If the video is playing, pause it and update the button text
        videoElement.pause();
        button.textContent = "Resume";
    }
}

// Load the initial question and answer choices
loadTitleAndAnswers();