/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

// var audioContext = new AudioContext();
// var audioInput = null,
//     realAudioInput = null,
//     inputPoint = null,
//     audioRecorder = null;
// var rafID = null;
// var analyserContext = null;
// var canvasWidth, canvasHeight;
// var recIndex = 0;

/* TODO:

- offer mono option
- "Monitor input" switch
*/

function saveAudio() {
    // audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );

    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed -
    // so here's where we should set up the download.
    // audioRecorder.exportWAV( doneEncoding );
    audioRecorder.exportMonoWAV( doneEncoding );
}
function parseWAVInfo(blob) {
    const reader = new FileReader();
    reader.onload = function() {
        const buffer = new DataView(reader.result);

        // Extract WAV header info
        const numChannels = buffer.getUint16(22, true);
        const sampleRate = buffer.getUint32(24, true);
        const bitsPerSample = buffer.getUint16(34, true);
        const dataSize = buffer.getUint32(40, true);
        const durationSec = dataSize / (sampleRate * numChannels * (bitsPerSample / 8));

        const duration = formatDuration(durationSec);
        const fileSizeKB = (blob.size / 1024).toFixed(1);
        const bitrate = ((sampleRate * bitsPerSample * numChannels) / 1000).toFixed(2); // in kbps
        const sampleEncoding = `${bitsPerSample}-bit Signed Integer PCM`;

        // Log in the format you want
        console.log(`Channels       : ${numChannels}`);
        console.log(`Sample Rate    : ${sampleRate}`);
        console.log(`Precision      : ${bitsPerSample}-bit`);
        console.log(`Duration       : ${duration} = ${dataSize} samples`);
        console.log(`File Size      : ${fileSizeKB}k`);
        console.log(`Bit Rate       : ${bitrate}k`);
        console.log(`Sample Encoding: ${sampleEncoding}`);
    };
    reader.readAsArrayBuffer(blob);
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds % 1) * 100);
    return `${padZero(mins)}:${padZero(secs)}.${padZero(millis)}`;
}

function doneEncoding( blob ) {
    parseWAVInfo(blob);
    Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav", function(durl){
        window.dataURI = durl;
        fetch(durl)
        .then(res => res.blob())
        .then(blob => {
            window.testBlob = blob;
            $('.audio').remove();
            var aurl = (window.URL || window.webkitURL).createObjectURL(testBlob);
            var audio = $('<AUDIO controls>').prop('src',aurl).prop('type',"audio/wav").addClass('audio');

            $('#media').html();
            $('#media').append(audio);
        })

    } );

    recIndex++;
}

function sendAudio()
{
    var name = $('#userName').val().trim();
    var speakerid=  $('#userId').val().trim();
    var gender = $('#userGender').val().trim();
    var age = $('#userAge').val().trim()*1;
    var country = $('#userCountry').val()?.trim();
    // var audioId = countryTexts[currentAudio].id;

    var selectedCountry = $('#userCountry').val(); // Get selected country

    // Ensure country is selected and index is valid
    if (!selectedCountry || !countryTexts[selectedCountry] || currentIndex >= countryTexts[selectedCountry].length) {
        alert('Invalid selection. Please select a valid country and text.');
        return;
    }
    var proficiency = $('#proficiencyLevel').val()?.trim();
   var nativeLang = $('#nativeLanguage').val()?.trim();

    if (!proficiency) {
    alert('Please select your proficiency level');
    return $('#proficiencyLevel').focus();
    }
     if (!nativeLang) {
    alert('Please enter your native language');
    return $('#nativeLanguage').focus();
   }

    var ageRange;

    // if (age >= 18 && age <= 30) {
    //     ageRange = 'Young';
    // } else if (age >= 31 && age <= 60) {
    //     ageRange = 'Middle-aged';
    // }else{
    //     ageRange = 'adults';
    // }
    if (age < 18) {
        ageRange = 'A';
    } else if (age >= 18 && age <= 24) {
        ageRange = 'B';
    } else if (age >= 25 && age <= 29) {
        ageRange = 'C';
    } else if (age >= 30 && age <= 35) {
        ageRange = 'D';
    } else if (age >= 36 && age <= 39) {
        ageRange = 'E';
    } else if (age >= 40 && age <= 45) {
        ageRange = 'F';
    } else if (age >= 46 && age <= 49) {
        ageRange = 'G';
    } else if (age >= 50 && age <= 55) {
        ageRange = 'H';
    } else if (age > 55) {
        ageRange = 'I';
    } else {
        ageRange = 'J';
    }
    

    if (speakerid === '') {
        alert('Please fill in your Speaker Id');
        return $('#userId').focus();
    }
    if( selectedCountry == '' )
        {
            alert( 'Please select your country' );
            return $('#userCountry').focus();
        }
    var textToSend = countryTexts[selectedCountry][currentIndex].text; // Get current text
    var audioId = countryTexts[selectedCountry][currentIndex].id; // Get current audio ID
    var data = dataURI;
    if( name == '' )
    {
        alert( 'Please fill in your name' );
        return $('#userName').focus();
    }
    if( gender == '' )
    {
        alert( 'Please select your gender' );
        return $('#userGender').focus();
    }
    if( !age || age > 100 )
    {
        alert( 'Please fill in your age' );
        return $('#userAge').focus();
    }
    // const countryLanguageMap = {"UK": "en-UK", "US": "en-US","RU":"ru-RU","HR":"hr-HR","CZ":"sk-CZ","XK":"sr-XK","AL":"sq-AL"};
    // const languageCode = countryLanguageMap[country] || country;

    $('#mymodal').modal({backdrop:'static'}).find('.modal-footer').hide();
    $('#mymodal').find('.modal-header').hide();

    $('#mymodal').find('.modal-body').html('<div class="spinner-border text-secondary spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div> Sending Audio File...');
   
    // $.post( 'http://localhost:8088/audio_upload', {
    // $.post( 'https://service.tensoract.com/audio_epam_v2', {
        $.post( 'https://service.tensoract.com/audio_EPAM', {
            // $.post('http://54.87.91.147:8088/audio_upload', {
        // name:name,
        // gender:gender,
        // age:age,
        // id: audioId,
        // dataURI: data,
        speakerId: speakerid,//G0001_S0001
        format_Id: speakerid,//G0001
        name: name,//Loganathan
        gender: gender,//Male
        age: ageRange,//C
        jsonCountry:selectedCountry,
        country: selectedCountry,//India
        proficiency: proficiency,
        nativeLanguage: nativeLang,
        id: audioId,
        sentenceUid:audioId,
        voiceCode: speakerid + '-' + selectedCountry.substring(0, 2).toUpperCase() + '-' + gender.charAt(0).toUpperCase(),
        // speakerId_sequence:speakerId_sequence,
        speed: selectedCountry,//Cofrtable_slow
        text: textToSend,//Wake_word
        dataURI: data,
    }, function( res ){
        console.log( 'post......................', res.status )
        if( !res.status ) return alert( 'Some error occurred while saving the audio. Please try again.' );
        $('#mymodal').modal('hide');
        $('#save').hide();
    $('#analyser').hide();
    $('#wavedisplay').hide();
    $('#alert').show();
    $('.audio').remove();
    $('#record').text('Start Recording');
        nextAudio();
    })
}

// var currentAudio = -1;
// function nextAudio()
// {
//     $('#save').hide();
//     $('#analyser').hide();
//     $('#wavedisplay').hide();
//     $('#alert').show();
//     $('.audio').remove();
//     $('#record').text('Start Recording');
//     currentAudio++;
//     if( currentAudio >= countryTexts.length ) return audioDone();
//     $('#title').html( ['countryTexts',currentAudio+1,'of',countryTexts.length,'-','please record the following sentence:'].join(' ') );
//     $('#texttorec').html(texts[currentAudio].text);
// }

// function audioDone()
// {
//     $('#record').hide();
//     $('#save').hide();
//     $('#analyser').hide();
//     $('#wavedisplay').hide();
//     $('.audio').remove();
//     $('#title').hide();
//     $('#texttorec').hide();
//     $('#done').show();
// }
// function nextAudio() {
//     $('#save').hide();
//     $('#analyser').hide();
//     $('#wavedisplay').hide();
//     $('#alert').show();
//     $('.audio').remove();
//     $('#record').text('Start Recording');

//     var selectedCountry = $('#userCountry').val(); // Get selected country
//     if (!selectedCountry || !countryTexts[selectedCountry]) {
//         alert("Please select a valid country.");
//         return;
//     }

//     var audioList = countryTexts[selectedCountry]; // Get the correct array
//     if (currentAudio >= audioList.length - 1) return audioDone(); // Check correctly

//     currentAudio++; // Move to the next text
//     $('#title').html(['Sentence', currentAudio + 1, 'of', audioList.length, '- Please record the following sentence:'].join(' '));
//     $('#texttorec').html(audioList[currentAudio].text);
// }

// function audioDone() {
//     $('#record').hide();
//     $('#save').hide();
//     $('#analyser').hide();
//     $('#wavedisplay').hide();
//     $('.audio').remove();
//     $('#title').hide();
//     $('#texttorec').hide();
//     $('#done').show();
// }
function startTimer() {
    seconds = 0;
    minutes = 0;
    updateTimerDisplay();
    timerInterval = setInterval(updateTimer, 1000);
}
 
function stopTimer() {
    clearInterval(timerInterval);
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
    timerElement.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
}
function nextAudio() {
    $('#save').hide();
    $('#analyser').hide();
    $('#wavedisplay').hide();
    $('#alert').show();
    $('.audio').remove();
    $('#record').text('Start Recording');

    var selectedCountry = $('#userCountry').val(); // Get selected country
    if (!selectedCountry || !countryTexts[selectedCountry]) {
        alert("Please select a valid country.");
        return;
    }

    var audioList = countryTexts[selectedCountry]; // Get the correct array of texts

    // Check if we have completed all the texts for the selected country
    if (currentAudio >= audioList.length) {
        // All texts are completed
        return audioDone();
    }

    // Show the current sentence to record
    $('#title').html(['Sentence', currentAudio + 1, 'of', audioList.length, '- Please record the following sentence:'].join(' '));
    $('#texttorec').html(audioList[currentAudio].text);
    
    // Increment the currentAudio index for the next text
    currentAudio++;
}

function audioDone() {
    $('#record').hide();
    $('#save').hide();
    $('#analyser').hide();
    $('#wavedisplay').hide();
    $('.audio').remove();
    $('#title').hide();
    $('#texttorec').hide();
    $('#done').show(); // Show the "done" element after all texts are recorded
}


function toggleRecording(e) {
    if (!window.audioInit) initAudio();
    // console.log('audioRecorder', audioRecorder);
    if (!audioRecorder) {
        return setTimeout(function() { toggleRecording(e) }, 100);
    }
    console.log('tEXT', $('#record').text());
    if ($('#record').text().match(/Stop/)) {
        // stop recording
        console.log('stop');
        audioRecorder.stop();
        $('#record').removeClass("btn-danger");
        $('#record').text('Record Again');
        $('#save').show();
        $('#analyser').hide();
        $('#wavedisplay').show();
        stopTimer();
        hideTimer(); // Add this line to hide the timer
        audioRecorder.getBuffers(gotBuffers);
    } else {
        // start recording
        if (!audioRecorder)
            return;
        console.log('record');
        $('#save').hide();
        $('#analyser').show();
        $('#wavedisplay').hide();
        $('.audio').remove();
        $('#record').addClass("btn-danger");
        $('#alert').hide();
        $('#record').text('Stop Recording');
        audioRecorder.clear();
        audioRecorder.record();
        showAudioControls();
        startTimer();
    }
}

function hideTimer() {
    document.getElementById('timer').classList.add('hidden');
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}
function showAudioControls() {
    // document.getElementById('audioPlayback').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
}
 
function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }

    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData);

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }

    rafID = window.requestAnimationFrame( updateAnalysers );
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    updateAnalysers();
    return true;
}

function initAudio() {
    window.audioContext = new AudioContext();
    window.audioInput = null;
    window.realAudioInput = null;
    window.inputPoint = null;
    window.audioRecorder = null;
    window.rafID = null;
    window.analyserContext = null;
    window.canvasWidth;
    window.canvasHeight;
    window.recIndex = 0;
    window.audioInit = true;

        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

    