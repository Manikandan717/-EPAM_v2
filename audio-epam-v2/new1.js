/* Contents of audio-epam-v2/new1.js */

// Assume recorder.js and audiodisplay.js are loaded and Recorder is available
// Assume jQuery is available ($)

// --- Recorder Variables (Keep these global within this script's scope if needed by multiple functions here) ---
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = null; // Initialize later
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0; // If needed for filename uniqueness
var analyserNode = null; // Make analyserNode accessible
var zeroGain = null; // Make zeroGain accessible

// --- Timer Variables ---
var timerInterval = null;
var seconds = 0;
var minutes = 0;

// --- Helper Functions from original block ---

function saveAudio() {
    // audioRecorder.exportWAV( doneEncoding );
    // Exporting Mono is generally preferred for speech
    if (audioRecorder) {
        audioRecorder.exportMonoWAV( doneEncoding );
    } else {
        console.error("saveAudio called but audioRecorder is not initialized.");
    }
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );
    if (canvas && canvas.getContext('2d') && buffers && buffers[0]) {
         // You might want drawBuffer from an external lib or implement it
         // drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );
         console.log("Buffers received, waveform display logic would go here.");
    } else {
        console.warn("Could not draw buffer: canvas or buffers missing.");
    }

    // Setup the download/preview link
    if (audioRecorder) {
        audioRecorder.exportMonoWAV( doneEncoding ); // Or exportWAV
    }
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds % 1) * 1000); // Use 1000 for milliseconds
    return `${padZero(mins)}:${padZero(secs)}.${String(millis).padStart(3, '0')}`;
}

function parseWAVInfo(blob) {
    // This function remains useful for debugging
    const reader = new FileReader();
    reader.onload = function() {
        try {
            const buffer = new DataView(reader.result);
            const numChannels = buffer.getUint16(22, true);
            const sampleRate = buffer.getUint32(24, true);
            const bitsPerSample = buffer.getUint16(34, true);
            const dataSize = buffer.getUint32(40, true);
            const durationSec = dataSize / (sampleRate * numChannels * (bitsPerSample / 8));

            const duration = formatDuration(durationSec);
            const fileSizeKB = (blob.size / 1024).toFixed(1);
            // Correct bitrate calculation for PCM: (SampleRate * BitsPerSample * NumChannels) / 8 bytes/sample / 1000 KBps
            const bitrate = ((sampleRate * bitsPerSample * numChannels) / 8 / 1000).toFixed(1);
            const sampleEncoding = `${bitsPerSample}-bit Signed Integer PCM`;

            console.log(`--- WAV Info ---`);
            console.log(` Channels       : ${numChannels}`);
            console.log(` Sample Rate    : ${sampleRate} Hz`);
            console.log(` Precision      : ${bitsPerSample}-bit`);
            console.log(` Duration       : ${duration} (${durationSec.toFixed(3)}s)`); // Show raw seconds too
            console.log(` File Size      : ${fileSizeKB} KB`);
            console.log(` Bit Rate       : ${bitrate} kB/s`); // Kilobytes per second
            console.log(` Sample Encoding: ${sampleEncoding}`);
            console.log(` Data Size      : ${dataSize} bytes`);
            console.log(`----------------`);
        } catch (e) {
            console.error("Error parsing WAV header:", e);
        }
    };
    reader.onerror = () => {
        console.error("FileReader error reading blob for WAV info.");
    };
    reader.readAsArrayBuffer(blob.slice(0, 44)); // Read only the header initially
}
// Generates a random 32-character hexadecimal UID
function generateEvaluationUid() {
    const hexChars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
    }
    return result;
}

function doneEncoding( blob ) {
    console.log("Encoding complete. Blob size:", blob.size, "type:", blob.type);
    parseWAVInfo(blob); // Log details for debugging

    // Create a Data URI for the blob
    // Note: Large blobs might cause issues with Data URIs in some browsers.
    // Using Object URLs is generally better for large files.
    const reader = new FileReader();
    reader.onloadend = function() {
        window.dataURI = reader.result; // Store the Data URI globally for sendAudio
        console.log("Data URI created (length approx):", window.dataURI ? window.dataURI.length : 0);

         // Also store the blob itself, might be more robust
         window.testBlob = blob;

         // --- Update UI: Show playback ---
         // Clear previous audio element in #media
         $('#media').empty(); // Use jQuery empty()

        // Create object URL for playback (more efficient than data URI for src)
         var audioUrl = URL.createObjectURL(blob);

         // Create audio element for review
         var $audio = $('<audio controls>') // Use jQuery to create element
             .attr('src', audioUrl)
             .attr('type', blob.type || 'audio/wav') // Use blob type
             .addClass('audio'); // Add class for styling

         $('#media').append($audio); // Append to the media div

         // Call the function in index.html to enable the submit button etc.
         if (typeof window.handleRecordingComplete === 'function') {
             window.handleRecordingComplete();
         } else {
             console.warn("handleRecordingComplete function not found in main script.");
             // Fallback: Manually enable submit button if function missing
             $('#submitRecording').removeClass('hidden').prop('disabled', false);
         }
    };
    reader.onerror = function(e) {
        console.error("FileReader error generating Data URI:", e);
        alert("Error processing recorded audio.");
         // Re-enable submit button? Or guide user to record again?
         $('#submitRecording').addClass('hidden').prop('disabled', true); // Hide submit if processing failed
         $('#recordControlButton').text('Record Again').removeClass('btn-danger').addClass('btn-primary'); // Allow re-record
    }
    reader.readAsDataURL(blob); // Read blob as Data URI


    // Optionally, generate a temporary download link (useful for debugging)
    // Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav");
    // recIndex++;
}

// --- Main Functions Exposed to index.html ---

/**
 * Sends the recorded audio and user data.
 * @param {Function} successCallback - The function to call from index.html upon successful submission.
 */
function sendAudio(successCallback) {
    console.log("sendAudio called");

    // 1. Get User Info from DOM (ensure IDs match index.html)
    var name = $('#userName').val()?.trim();
    var speakerid = $('#userId').val()?.trim();
    var gender = $('#userGender').val()?.trim();
    var ageInput = $('#userAge').val();
    var age = ageInput ? parseInt(ageInput, 10) : null;
    var selectedLanguage = $('#userCountry').val()?.trim(); // This is the language/locale like "en-US"
    // var proficiency = $('#proficiencyLevel').val()?.trim();
    // var nativeLang = $('#nativeLanguage').val()?.trim();

    // 2. Get Sentence Info from DOM (set by displayText in index.html)
    var textDisplayDiv = document.getElementById('texttorec');
    var currentSentenceUid = textDisplayDiv ? textDisplayDiv.dataset.sentenceuid : null;
    var currentText = textDisplayDiv ? textDisplayDiv.textContent : null;

    // 3. Get Audio Data (set by doneEncoding)
    var data = window.dataURI; // Use the Data URI

    // 4. --- VALIDATION (moved from index.html submit handler for clarity, but could be there too) ---
     if (!speakerid || !name || !gender || !age || isNaN(age) || age <= 0 || age > 120 || !selectedLanguage  || !currentSentenceUid) {
        console.error("Validation Failed:", { speakerid, name, gender, age, selectedLanguage,  currentSentenceUid });
        alert('Please ensure all user information fields (ID, Name, Gender, Age and language selection are complete.');
        // Re-enable submit button immediately on validation failure
        $('#submitRecording').prop('disabled', false).text('Submit Recording');
        return; // Stop processing
    }
     if (!data) {
         alert('No recorded audio data found. Please record the sentence first.');
         $('#submitRecording').prop('disabled', false).text('Submit Recording');
         return;
     }
     // --- End Validation ---


    // 5. Determine Age Range (using the provided logic)
    var ageRange;
    if (age < 18) ageRange = 'A';
    else if (age >= 18 && age <= 24) ageRange = 'B';
    else if (age >= 25 && age <= 29) ageRange = 'C';
    else if (age >= 30 && age <= 35) ageRange = 'D';
    else if (age >= 36 && age <= 39) ageRange = 'E';
    else if (age >= 40 && age <= 45) ageRange = 'F';
    else if (age >= 46 && age <= 49) ageRange = 'G';
    else if (age >= 50 && age <= 55) ageRange = 'H';
    else if (age > 55) ageRange = 'I';
    else ageRange = 'J'; // Fallback


    // 6. Prepare Payload for POST request
    var payload = {
        speakerId: speakerid, // e.g., G0001_S0001
        format_Id: speakerid, // Assuming this is same as speakerId based on example? Or extract G0001?
        name: name,
        gender: gender,
        age: ageRange, // Send the calculated range
        jsonCountry: selectedLanguage, // Using the language/locale code
        country: selectedLanguage, // Redundant? Check API requirements
        // proficiency: proficiency,
        // nativeLanguage: nativeLang,
        id: currentSentenceUid, // Use sentenceUid as 'id'
        sentenceUid: currentSentenceUid, // Explicitly send sentenceUid
        // Example voiceCode generation: G0001_S0001-EN-M
        voiceCode: speakerid + '-' + selectedLanguage.substring(0, 2).toUpperCase() + '-' + gender.charAt(0).toUpperCase(),
        // speakerId_sequence: speakerId_sequence, // Where does this come from? Add if needed.
        speed: selectedLanguage, // Using language code as 'speed'? Check API requirements. Seems unusual.
        text: currentText, // Send the actual sentence text
        dataURI: data // The base64 encoded audio data URI
    };

    console.log("Submitting Payload:", JSON.stringify(payload, null, 2).substring(0, 500) + "... }"); // Log part of payload, excluding full dataURI

    // 7. Show Loading/Modal (using Bootstrap modal from index.html)
    $('#mymodal .modal-body').html('<div class="spinner-border text-secondary spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div> Sending Audio File...');
    $('#mymodal .modal-footer').hide();
    $('#mymodal .modal-header').show(); // Show header
    $('#mymodal').modal({ backdrop: 'static', keyboard: false }); // Show modal, prevent closing

    // 8. Perform AJAX POST Request
    $.post('https://service.tensoract.com/audio_EPAM', payload)
        .done(function(res) {
            console.log('Submission response:', res);
            $('#mymodal').modal('hide'); // Hide modal on success

            if (res && res.status) { // Check for a successful status in the response
                console.log('Submission successful.');
                // IMPORTANT: Call the success callback passed from index.html
                if (typeof successCallback === 'function') {
                    successCallback(); // This will trigger nextAudio() in index.html
                } else {
                    console.error("Success callback is not a function!");
                    // Should not happen, but if it does, manually update UI? Risky.
                }
            } else {
                // Handle cases where the request succeeded but the server reported an error
                console.error('Submission failed (server status):', res ? res.message : 'Unknown error');
                alert('Error saving audio: ' + (res ? res.message : 'Please try again.'));
                // Re-enable the submit button on failure
                $('#submitRecording').prop('disabled', false).text('Submit Recording');
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Handle AJAX request failures (network error, server error 500, etc.)
            console.error('AJAX Error:', textStatus, errorThrown, jqXHR.responseText);
            $('#mymodal').modal('hide'); // Hide modal on failure
            alert('Network or server error occurred while saving the audio. Please check connection and try again. Details: ' + textStatus);
            // Re-enable the submit button on failure
            $('#submitRecording').prop('disabled', false).text('Submit Recording');
        });
}


// --- Timer Functions ---
function startTimer() {
    console.log("Starting timer");
    seconds = 0;
    minutes = 0;
    updateTimerDisplay(); // Initial display
    clearInterval(timerInterval); // Clear any existing interval
    timerInterval = setInterval(updateTimer, 1000);
    $('#timer').removeClass('hidden'); // Show timer
}

function stopTimer() {
    console.log("Stopping timer");
    clearInterval(timerInterval);
    timerInterval = null; // Reset interval variable
}

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    }
}

function hideTimer() {
    console.log("Hiding timer");
    const timerElement = document.getElementById('timer');
     if (timerElement) {
        timerElement.classList.add('hidden');
     }
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

// --- Recording Control ---

function toggleRecording(buttonElement) {
    // Ensure AudioContext is initialized (usually requires user interaction)
    if (!audioContext) {
        console.log("Initializing Audio Context for the first time.");
        initAudio(); // Attempt initialization
        // It might take a moment, so check recorder status again
        setTimeout(() => toggleRecording(buttonElement), 200); // Retry shortly
        return;
    }
     // Check if recorder is ready after init attempt
     if (!audioRecorder) {
         console.warn("Audio recorder not ready yet. Please try again.");
         // Optionally provide feedback to the user
         // alert("Audio system not ready. Please click 'Start Recording' again.");
         return;
     }


    var $button = $(buttonElement); // Use jQuery for easier manipulation

    if ($button.text().match(/Stop/)) {
        // --- Stop Recording ---
        console.log('Stopping recording...');
        audioRecorder.stop();
        stopTimer();
        // hideTimer(); // Timer is hidden by displayText/nextAudio

        $button.removeClass("btn-danger").addClass("btn-primary").text('Processing...'); // Indicate processing
        $button.prop('disabled', true); // Disable button while processing

        $('#analyser').addClass('hidden'); // Hide analyser
        $('#wavedisplay').removeClass('hidden'); // Show wave display area (if used)

        // Get buffers and trigger doneEncoding which handles UI updates (enable submit etc.)
        audioRecorder.getBuffers(gotBuffers);

    } else {
        // --- Start or Restart Recording ---
        console.log('Starting recording...');

        // Clear previous recording review/data
        $('#media').empty();
        $('#wavedisplay').addClass('hidden'); // Hide old wave display
        window.dataURI = null; // Clear previous data URI
        window.testBlob = null; // Clear previous blob

        // Hide Submit button, Show Analyser
        $('#submitRecording').addClass('hidden').prop('disabled', true);
        $('#analyser').removeClass('hidden');
        $('#alert').addClass('hidden'); // Hide instructions while recording

        // Update button style and text
        $button.removeClass("btn-primary").addClass("btn-danger").text('Stop Recording');
        $button.prop('disabled', false); // Ensure enabled

        // Start recording process
        audioRecorder.clear(); // Clear previous buffers in recorder
        audioRecorder.record();
        startTimer(); // Start the timer
        // updateAnalysers should be called once in initAudio/gotStream
    }
}


// --- Audio Initialization and Stream Handling ---

function cancelAnalyserUpdates() {
    if (rafID) {
        window.cancelAnimationFrame(rafID);
    }
    rafID = null;
}

function updateAnalysers(time) {
    // Only run if analyserNode exists and is connected
    if (!analyserNode || !analyserContext) {
        // Ensure context is fetched if canvas exists
        if (!analyserContext) {
            var canvas = document.getElementById("analyser");
            if(canvas && canvas.getContext('2d')) {
                 canvasWidth = canvas.width;
                 canvasHeight = canvas.height;
                 analyserContext = canvas.getContext('2d');
            }
        }
        // If still no node or context, exit
        if(!analyserNode || !analyserContext) {
             // console.log("Analyser node or context not ready.");
             cancelAnalyserUpdates(); // Stop trying if not ready
             return;
        }
    }


    var SPACING = 3;
    var BAR_WIDTH = 1;
    var numBars = Math.round(canvasWidth / SPACING);
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

    analyserNode.getByteFrequencyData(freqByteData);

    analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
    // analyserContext.fillStyle = '#F6D565'; // Optional background fill
    analyserContext.lineCap = 'round';
    var multiplier = analyserNode.frequencyBinCount / numBars;

    for (var i = 0; i < numBars; ++i) {
        var magnitude = 0;
        var offset = Math.floor(i * multiplier);
        for (var j = 0; j < multiplier; j++) {
            magnitude += freqByteData[offset + j];
        }
        magnitude = magnitude / multiplier;
        magnitude = magnitude * (canvasHeight / 256); // Scale magnitude to canvas height

        // Example coloring:
        analyserContext.fillStyle = "hsl(" + Math.round((i * 360) / numBars) + ", 80%, 50%)";
        analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude); // Draw bars from bottom
    }

    // Request next frame
    rafID = window.requestAnimationFrame(updateAnalysers);
}


function gotStream(stream) {
    console.log("Media stream obtained.");
    // Create nodes within the existing audioContext
    inputPoint = audioContext.createGain();

    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048; // Or 1024, 512 etc.
    inputPoint.connect(analyserNode);

    // Create the Recorder instance
    audioRecorder = new Recorder(inputPoint);
    console.log("Recorder initialized.");

    // Create a GainNode for routing audio to destination (speakers/headphones)
    // Set gain to 0 to prevent feedback loop during recording by default
    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0; // Set to 0 to mute playback during recording
    inputPoint.connect(zeroGain);
    zeroGain.connect(audioContext.destination);

    // Start analyser visualization
    requestAnimationFrame(updateAnalysers);

    // Indicate readiness (optional)
    // alert("Audio system ready. You can start recording.");

    return true; // Indicate success
}

function initAudio() {
    try {
        if (!audioContext) { // Only create context once
            audioContext = new AudioContext();
            console.log("AudioContext created. State:", audioContext.state);

             // Handle state changes (e.g., if context gets suspended/closed)
             audioContext.onstatechange = () => {
                console.log("AudioContext state changed to:", audioContext.state);
             };
        }

         // Resume context if suspended (required after user interaction in some browsers)
         if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log("AudioContext resumed.");
                // Now attempt to get user media
                requestMedia();
            }).catch(e => {
                 console.error("Error resuming AudioContext:", e);
                 alert("Could not activate audio system. Please check browser permissions.");
            });
        } else {
            // Context is running or closed, attempt to get media directly
            requestMedia();
        }

    } catch (e) {
        alert('Error initializing Web Audio API: ' + e);
        console.error("Error initializing AudioContext:", e);
    }
}

function requestMedia() {
    // Check for getUserMedia support
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         alert('getUserMedia not supported on your browser!');
         console.error("getUserMedia not supported.");
         return;
    }


    console.log("Requesting User Media (audio)...");
    navigator.mediaDevices.getUserMedia({
        audio: {
            // Standard constraints (check browser compatibility)
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
             // Optional: Specify sampleRate, channelCount if needed, but often best left default
             // sampleRate: 44100,
             // channelCount: 1
        }
    })
    .then(gotStream) // Success -> Call gotStream
    .catch(function(e) { // Failure -> Log error and inform user
        alert('Error getting audio stream: ' + e.name);
        console.error('Error accessing microphone:', e);
    });
}


// Expose necessary functions globally if they need to be called from HTML attributes (like onclick)
// It's generally better practice to add event listeners using JavaScript (as done in index.html script)
// window.toggleRecording = toggleRecording; // Make toggleRecording globally accessible
// window.sendAudio = sendAudio; // Make sendAudio globally accessible
// window.initAudio = initAudio; // Make initAudio globally accessible if needed externally

// Note: If initAudio should only be called on first interaction,
// the toggleRecording function handles calling it.

console.log("new1.js loaded.");