import "./jspsych-audio-keyboard-response.js";
import "./jspsych-image-audio-response-with-animation.js";
import "./jspsych-image-audio-response.js";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var pracsequence = ["06a", "07a", "08a"];
var sequence = ["09a", "10a", "11a", "12a", "13a", "14a", "15a", "16a"];
//shuffle(sequence);
var experimentTimeline = [];

var getIdTrial = {
    type: "survey-text",
    questions: [{
        prompt: "Enter the ID you have been given.",
    }, ],
    preamble: "",
    button_label: "Click to enter ID",
};
experimentTimeline = experimentTimeline.concat(getIdTrial);

var pracstartScreen = {
    type: "html-button-response",
    stimulus: "Listen to each made up word and do your best to repeat what you heard. The green bar shows that recording is taking place. Click continue to begin three practice trials.",
    choices: ["Continue"],
};
experimentTimeline = experimentTimeline.concat(pracstartScreen);

var practrialIndex = 0;
for (
    practrialIndex = 0; practrialIndex < pracsequence.length; practrialIndex++
) {
    //sequence.length; trialIndex++) {
    var pracplaysoundTrial = {
        type: "audio-keyboard-response",
        stimulus: pracsequence[practrialIndex] + ".wav",
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        prompt: "<p></p>",
    };
    experimentTimeline = experimentTimeline.concat(pracplaysoundTrial);
    var pracrecordsoundTrial = {
        type: "image-audio-response-with-animation",
        stimulus: "empty.jpg",
        prompt: "<p>Repeat the made up word you just heard</p>",
        allow_playback: false,
        stimulus_duration: 6000,
        buffer_length: 6000,
        wait_for_mic_approval: true,
        // https://stackoverflow.com/a/15945825
        recording_light: `
          <div style="height:5px; position:relative; background:#666666; overflow:hidden;">
            <span style="display:block; width:100%; height:100%;">
              <span id="my-recording-light" style="background-color:#00ff00; display:block; height:100%; width:0%; animation-fill-mode:both;">
              </span>
            </span>
          </div>`,
        recording_animation_keyframes: [{ width: "0%" }, { width: "100%" }],
        recording_animation_id: "my-recording-light",
    };
    experimentTimeline = experimentTimeline.concat(pracrecordsoundTrial);
}

var startScreen = {
    type: "html-button-response",
    stimulus: "Listen to each made up word and do your best to repeat what you heard. The green bar shows that recording is taking place. Click continue to begin.",
    choices: ["Continue"],
};

experimentTimeline = experimentTimeline.concat(startScreen);

var trialIndex = 0;
for (trialIndex = 0; trialIndex < sequence.length; trialIndex++) {
    //sequence.length; trialIndex++) {
    var playsoundTrial = {
        type: "audio-keyboard-response",
        stimulus: sequence[trialIndex] + ".wav",
        choices: jsPsych.NO_KEYS,
        trial_ends_after_audio: true,
        prompt: "<p></p>",
    };
    experimentTimeline = experimentTimeline.concat(playsoundTrial);
    var recordsoundTrial = {
        type: "image-audio-response-with-animation",
        stimulus: "empty.jpg",
        prompt: "<p>Repeat the made up word you just heard</p>",
        allow_playback: false,
        stimulus_duration: 6000,
        buffer_length: 6000,
        wait_for_mic_approval: true,
        // https://stackoverflow.com/a/15945825
        recording_light: `
          <div style="height:5px; position:relative; background:#666666; overflow:hidden;">
            <span style="display:block; width:100%; height:100%;">
              <span id="my-recording-light" style="background-color:#00ff00; display:block; height:100%; width:0%; animation-fill-mode:both;">
              </span>
            </span>
          </div>`,
        recording_animation_keyframes: [{ width: "0%" }, { width: "100%" }],
        recording_animation_id: "my-recording-light",
    };
    experimentTimeline = experimentTimeline.concat(recordsoundTrial);
}

var sequenceFinishedText = {
    type: "html-keyboard-response",
    stimulus: "Thanks for participating! Hit any key to finish.",
};

experimentTimeline = experimentTimeline.concat(sequenceFinishedText);

jsPsych.init({
    timeline: experimentTimeline,
    preload: sequence,
});