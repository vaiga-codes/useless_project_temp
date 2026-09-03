/* ==========================================
   KEYBOARD RAGE DETECTOR™
   Totally legitimate scientific software.
========================================== */


/* ==========================================
   DOM ELEMENTS
========================================== */

const homeScreen =
    document.getElementById("home-screen");

const testScreen =
    document.getElementById("test-screen");

const resultScreen =
    document.getElementById("result-screen");


const startBtn =
    document.getElementById("start-btn");

const finishBtn =
    document.getElementById("finish-btn");

const retryBtn =
    document.getElementById("retry-btn");

const newSentenceBtn =
    document.getElementById("new-sentence-btn");


const typingInput =
    document.getElementById("typing-input");

const textDisplay =
    document.getElementById("text-display");


const timerDisplay =
    document.getElementById("timer");


const wpmDisplay =
    document.getElementById("wpm");

const accuracyDisplay =
    document.getElementById("accuracy");

const backspacesDisplay =
    document.getElementById("backspaces");

const capsDisplay =
    document.getElementById("caps");


const liveRageDisplay =
    document.getElementById("live-rage");

const rageFill =
    document.getElementById("rage-fill");

const liveMessage =
    document.getElementById("live-message");

const rageStatus =
    document.getElementById("rage-status");


const commentary =
    document.getElementById("commentary");

const typingStatus =
    document.getElementById("typing-status");


const finalRageDisplay =
    document.getElementById("final-rage");

const rageTitleDisplay =
    document.getElementById("rage-title");

const diagnosisDisplay =
    document.getElementById("diagnosis");


const finalWpmDisplay =
    document.getElementById("final-wpm");

const finalAccuracyDisplay =
    document.getElementById("final-accuracy");

const finalBackspacesDisplay =
    document.getElementById("final-backspaces");

const finalCapsDisplay =
    document.getElementById("final-caps");


const keyboardHealthDisplay =
    document.getElementById("keyboard-health");

const healthFill =
    document.getElementById("health-fill");

const healthMessage =
    document.getElementById("health-message");


const achievementDisplay =
    document.getElementById("achievement");


const trustDisplay =
    document.getElementById("trust");

const grassDisplay =
    document.getElementById("grass");

const rageReasonDisplay =
    document.getElementById("rage-reason");


const toast =
    document.getElementById("toast");


/* ==========================================
   SENTENCE DATABASE
========================================== */

const sentences = [

    "I absolutely love debugging code at 3 AM.",

    "My code works perfectly when nobody is watching.",

    "I have no idea what this button does but I am clicking it anyway.",

    "The compiler is not angry with me, we simply disagree.",

    "I definitely remembered to save my code this time.",

    "There is no bug here, only an undocumented feature.",

    "I enjoy fixing problems that I accidentally created myself.",

    "Why does deleting one line of code break seventeen other things?",

    "I am calm, focused, productive, and definitely not lying.",

    "My laptop fan is louder than my academic confidence.",

    "One more error message and this keyboard is going outside.",

    "I opened my laptop to study and somehow ended up here.",

    "Everything is under control. This statement has been verified by nobody.",

    "I understand recursion because I understand recursion because I understand recursion.",

    "My project has absolutely no unnecessary features whatsoever.",

    "This sentence exists solely because somebody thought it would be funny.",

    "I shall remain calm even when the program refuses to compile.",

    "The deadline is approaching and my productivity is walking in the opposite direction.",

    "I have successfully replaced sleep with caffeine and questionable decisions.",

    "If it works, do not touch it, do not breathe near it, and definitely do not refactor it."

];


/* ==========================================
   VARIABLES
========================================== */

let targetText = "";

let startTime = null;

let timerInterval = null;

let backspaceCount = 0;

let capsCount = 0;

let totalKeystrokes = 0;

let lastKeyTime = null;

let burstCount = 0;

let rageHistory = [];

let lastCommentaryTime = 0;


/* ==========================================
   RANDOM SENTENCE
========================================== */

function chooseRandomSentence() {

    const randomIndex =
        Math.floor(
            Math.random() * sentences.length
        );

    targetText =
        sentences[randomIndex];

    textDisplay.textContent =
        targetText;
}


/* ==========================================
   START
========================================== */

startBtn.addEventListener(
    "click",
    startTest
);


function startTest() {

    homeScreen.classList.remove("active");

    resultScreen.classList.remove("active");

    testScreen.classList.add("active");

    resetTest();

    chooseRandomSentence();

    typingInput.focus();

    startTime =
        Date.now();

    timerInterval =
        setInterval(
            updateTimer,
            1000
        );

}


/* ==========================================
   RESET
========================================== */

function resetTest() {

    clearInterval(timerInterval);

    typingInput.value = "";

    backspaceCount = 0;

    capsCount = 0;

    totalKeystrokes = 0;

    lastKeyTime = null;

    burstCount = 0;

    rageHistory = [];

    startTime = null;

    timerDisplay.textContent =
        "00:00";

    wpmDisplay.textContent =
        "0";

    accuracyDisplay.textContent =
        "100%";

    backspacesDisplay.textContent =
        "0";

    capsDisplay.textContent =
        "0%";

    liveRageDisplay.textContent =
        "0%";

    rageFill.style.width =
        "0%";

    liveMessage.textContent =
        "Suspiciously calm...";

    commentary.textContent =
        "System is observing you.";

    typingStatus.textContent =
        "Waiting for violence...";

    rageStatus.textContent =
        "Monitoring...";

    document.body.classList.remove(
        "raging"
    );

}


/* ==========================================
   TIMER
========================================== */

function updateTimer() {

    if (!startTime) {
        return;
    }

    const elapsedSeconds =
        Math.floor(
            (Date.now() - startTime) / 1000
        );

    const minutes =
        Math.floor(
            elapsedSeconds / 60
        );

    const seconds =
        elapsedSeconds % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}


/* ==========================================
   KEYBOARD TRACKING
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            !testScreen.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (
            document.activeElement !==
            typingInput
        ) {
            return;
        }


        totalKeystrokes++;


        /* Backspace */

        if (
            event.key ===
            "Backspace"
        ) {

            backspaceCount++;

            showToast(
                getBackspaceMessage()
            );

        }


        /* CAPS */

        if (
            event.key.length === 1 &&
            event.key >= "A" &&
            event.key <= "Z"
        ) {

            capsCount++;

        }


        /* Burst detection */

        const currentTime =
            Date.now();

        if (
            lastKeyTime !== null
        ) {

            const difference =
                currentTime -
                lastKeyTime;

            if (
                difference < 120
            ) {

                burstCount++;

            }

        }

        lastKeyTime =
            currentTime;


        updateLiveStats();

    }
);


/* ==========================================
   INPUT
========================================== */

typingInput.addEventListener(
    "input",
    function() {

        updateLiveStats();

        updateTypingStatus();

        if (
            typingInput.value ===
            targetText
        ) {

            setTimeout(
                finishTest,
                300
            );

        }

    }
);


/* ==========================================
   ACCURACY
========================================== */

function calculateAccuracy() {

    const typedText =
        typingInput.value;

    if (
        typedText.length === 0
    ) {
        return 100;
    }

    let correct =
        0;

    for (
        let i = 0;
        i < typedText.length;
        i++
    ) {

        if (
            typedText[i] ===
            targetText[i]
        ) {

            correct++;

        }

    }

    return Math.round(
        (
            correct /
            typedText.length
        ) * 100
    );

}


/* ==========================================
   WPM
========================================== */

function calculateWPM() {

    if (!startTime) {
        return 0;
    }

    const minutes =
        (
            Date.now() -
            startTime
        ) / 60000;

    if (
        minutes <= 0
    ) {
        return 0;
    }

    const words =
        typingInput.value.trim().length /
        5;

    return Math.round(
        words / minutes
    );

}


/* ==========================================
   CAPS
========================================== */

function calculateCapsUsage() {

    if (
        totalKeystrokes === 0
    ) {
        return 0;
    }

    return Math.round(
        (
            capsCount /
            totalKeystrokes
        ) * 100
    );

}


/* ==========================================
   RAGE
========================================== */

function calculateRage() {

    const wpm =
        calculateWPM();

    const accuracy =
        calculateAccuracy();

    const caps =
        calculateCapsUsage();

    let rage = 0;


    /* SPEED */

    if (wpm >= 110) {

        rage += 25;

    } else if (wpm >= 90) {

        rage += 20;

    } else if (wpm >= 70) {

        rage += 15;

    } else if (wpm >= 50) {

        rage += 8;

    }


    /* BACKSPACES */

    if (
        backspaceCount >= 20
    ) {

        rage += 25;

    } else if (
        backspaceCount >= 12
    ) {

        rage += 20;

    } else if (
        backspaceCount >= 7
    ) {

        rage += 14;

    } else if (
        backspaceCount >= 3
    ) {

        rage += 6;

    }


    /* CAPS */

    if (caps >= 40) {

        rage += 20;

    } else if (caps >= 20) {

        rage += 15;

    } else if (caps >= 10) {

        rage += 8;

    }


    /* ACCURACY */

    if (
        accuracy < 55
    ) {

        rage += 20;

    } else if (
        accuracy < 70
    ) {

        rage += 15;

    } else if (
        accuracy < 85
    ) {

        rage += 8;

    }


    /* BURSTS */

    if (
        burstCount >= 35
    ) {

        rage += 10;

    } else if (
        burstCount >= 20
    ) {

        rage += 7;

    } else if (
        burstCount >= 8
    ) {

        rage += 3;

    }


    return Math.min(
        100,
        rage
    );

}


/* ==========================================
   LIVE STATS
========================================== */

function updateLiveStats() {

    const wpm =
        calculateWPM();

    const accuracy =
        calculateAccuracy();

    const caps =
        calculateCapsUsage();

    const rage =
        calculateRage();


    wpmDisplay.textContent =
        wpm;

    accuracyDisplay.textContent =
        `${accuracy}%`;

    backspacesDisplay.textContent =
        backspaceCount;

    capsDisplay.textContent =
        `${caps}%`;


    liveRageDisplay.textContent =
        `${rage}%`;

    rageFill.style.width =
        `${rage}%`;


    rageHistory.push(rage);

    updateLiveMessage(
        rage
    );

    updateCommentary(
        rage
    );

    updateRageEffects(
        rage
    );

}


/* ==========================================
   LIVE RAGE MESSAGE
========================================== */

function updateLiveMessage(
    rage
) {

    if (rage <= 20) {

        liveMessage.textContent =
            "Suspiciously calm...";

        rageStatus.textContent =
            "NO THREAT";

    }

    else if (rage <= 40) {

        liveMessage.textContent =
            "Minor irritation detected.";

        rageStatus.textContent =
            "MILD";

    }

    else if (rage <= 60) {

        liveMessage.textContent =
            "Your patience is buffering.";

        rageStatus.textContent =
            "IRRITATED";

    }

    else if (rage <= 80) {

        liveMessage.textContent =
            "Your keyboard is getting nervous.";

        rageStatus.textContent =
            "DANGEROUS";

    }

    else if (rage <= 95) {

        liveMessage.textContent =
            "PLEASE STOP ATTACKING THE KEYS.";

        rageStatus.textContent =
            "CRITICAL";

    }

    else {

        liveMessage.textContent =
            "THE KEYBOARD HAS CONTACTED HR.";

        rageStatus.textContent =
            "EVACUATE";

    }

}


/* ==========================================
   COMMENTARY
========================================== */

function updateCommentary(
    rage
) {

    const now =
        Date.now();

    if (
        now - lastCommentaryTime <
        1800
    ) {
        return;
    }

    lastCommentaryTime =
        now;


    let messages = [];


    if (backspaceCount >= 15) {

        messages.push(
            "You've used backspace enough to qualify as an editor."
        );

    }


    if (
        calculateCapsUsage() >= 20
    ) {

        messages.push(
            "Why are we SHOUTING?"
        );

    }


    if (
        calculateWPM() >= 100
    ) {

        messages.push(
            "WHY ARE YOU TYPING LIKE THE POLICE ARE COMING?"
        );

    }


    if (
        calculateAccuracy() < 70
    ) {

        messages.push(
            "Your fingers and your brain appear to be working for different companies."
        );

    }


    if (
        burstCount >= 20
    ) {

        messages.push(
            "Keyboard abuse detected."
        );

    }


    if (
        rage >= 80
    ) {

        messages.push(
            "Please remember that the keyboard is innocent."
        );

    }


    if (
        messages.length === 0
    ) {

        messages = [

            "System is observing you.",
            "Everything appears normal. Suspicious.",
            "Your keyboard remains emotionally stable.",
            "Continue typing. We need more evidence.",
            "The algorithm is judging you silently.",
            "This is definitely useful technology.",
            "No emotional damage detected... yet."

        ];

    }


    commentary.textContent =
        messages[
            Math.floor(
                Math.random() *
                messages.length
            )
        ];

}


/* ==========================================
   TYPING STATUS
========================================== */

function updateTypingStatus() {

    const length =
        typingInput.value.length;

    const targetLength =
        targetText.length;


    if (
        length === 0
    ) {

        typingStatus.textContent =
            "Waiting for violence...";

    }

    else if (
        length < targetLength * 0.25
    ) {

        typingStatus.textContent =
            "Warm-up detected.";

    }

    else if (
        length < targetLength * 0.5
    ) {

        typingStatus.textContent =
            "Evidence accumulating...";

    }

    else if (
        length < targetLength * 0.8
    ) {

        typingStatus.textContent =
            "Keyboard under investigation.";

    }

    else {

        typingStatus.textContent =
            "THE END IS NEAR.";

    }

}


/* ==========================================
   RAGE EFFECT
========================================== */

function updateRageEffects(
    rage
) {

    if (
        rage >= 90
    ) {

        document.body.classList.add(
            "raging"
        );

    }

    else {

        document.body.classList.remove(
            "raging"
        );

    }

}


/* ==========================================
   BACKSPACE MESSAGES
========================================== */

function getBackspaceMessage() {

    const messages = [

        "Backspace abuse detected.",

        "Regret detected.",

        "You meant to type that, didn't you?",

        "Character deletion violence recorded.",

        "The backspace key is exhausted.",

        "That's another one for the evidence folder.",

        "Your keyboard remembers your mistakes.",

        "Maybe slow down, genius.",

        "Backspace is doing overtime."

    ];

    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];

}


/* ==========================================
   TOAST
========================================== */

let toastTimeout;

function showToast(
    message
) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimeout
    );

    toastTimeout =
        setTimeout(
            function() {

                toast.classList.remove(
                    "show"
                );

            },
            1400
        );

}


/* ==========================================
   FINISH
========================================== */

finishBtn.addEventListener(
    "click",
    finishTest
);


function finishTest() {

    if (!startTime) {
        return;
    }

    clearInterval(
        timerInterval
    );

    document.body.classList.remove(
        "raging"
    );


    const wpm =
        calculateWPM();

    const accuracy =
        calculateAccuracy();

    const caps =
        calculateCapsUsage();

    const rage =
        calculateRage();


    showResults(
        wpm,
        accuracy,
        caps,
        rage
    );

}


/* ==========================================
   RESULTS
========================================== */

function showResults(
    wpm,
    accuracy,
    caps,
    rage
) {

    testScreen.classList.remove(
        "active"
    );

    resultScreen.classList.add(
        "active"
    );


    finalRageDisplay.textContent =
        rage;

    finalWpmDisplay.textContent =
        wpm;

    finalAccuracyDisplay.textContent =
        `${accuracy}%`;

    finalBackspacesDisplay.textContent =
        backspaceCount;

    finalCapsDisplay.textContent =
        `${caps}%`;


    const result =
        getRageResult(
            rage,
            wpm,
            accuracy,
            caps
        );


    rageTitleDisplay.textContent =
        result.title;

    diagnosisDisplay.textContent =
        result.message;


    /* Keyboard health */

    const health =
        Math.max(
            0,
            100 - rage
        );

    keyboardHealthDisplay.textContent =
        `${health}%`;

    healthFill.style.width =
        `${health}%`;


    if (
        health >= 80
    ) {

        healthMessage.textContent =
            "Your keyboard has survived another day.";

    }

    else if (
        health >= 50
    ) {

        healthMessage.textContent =
            "Your keyboard is reconsidering this friendship.";

    }

    else if (
        health >= 25
    ) {

        healthMessage.textContent =
            "Your keyboard has contacted customer support.";

    }

    else {

        healthMessage.textContent =
            "Your keyboard has requested witness protection.";

    }


    /* Achievement */

    achievementDisplay.textContent =
        getAchievement(
            rage,
            wpm,
            accuracy,
            backspaceCount
        );


    /* Useless statistics */

    trustDisplay.textContent =
        `${Math.max(
            0,
            100 - rage * 2
        )}%`;

    grassDisplay.textContent =
        `${Math.max(
            1,
            Math.round(
                20 - rage / 6
            )
        )}%`;

    rageReasonDisplay.textContent =
        getRageReason(
            wpm,
            accuracy,
            caps,
            backspaceCount
        );

}


/* ==========================================
   RAGE RESULT
========================================== */

function getRageResult(
    rage,
    wpm,
    accuracy,
    caps
) {

    if (
        rage <= 20
    ) {

        return {

            title:
                "KEYBOARD MONK",

            message:
                "You appear suspiciously calm. Either you're peaceful or you're hiding something."

        };

    }


    if (
        rage <= 40
    ) {

        return {

            title:
                "MILDLY IRRITATED",

            message:
                "Something mildly inconvenienced you. Probably a loading spinner."

        };

    }


    if (
        rage <= 60
    ) {

        return {

            title:
                "KEYCAP MENACE",

            message:
                "You have entered the dangerous zone of mildly aggressive productivity."

        };

    }


    if (
        rage <= 80
    ) {

        return {

            title:
                "KEYBOARD DESTROYER",

            message:
                "Your keyboard is beginning to question the terms of your relationship."

        };

    }


    if (
        rage <= 95
    ) {

        return {

            title:
                "RAGE INCARNATE",

            message:
                "You are no longer typing. You are personally attacking the English language."

        };

    }


    return {

        title:
            "THE KEYBOARD'S FINAL BOSS",

        message:
            "Your keyboard has contacted HR, legal counsel, and possibly a priest."

    };

}


/* ==========================================
   ACHIEVEMENTS
========================================== */

function getAchievement(
    rage,
    wpm,
    accuracy,
    backspaces
) {

    if (
        rage >= 95
    ) {

        return "Keyboard Annihilator";

    }

    if (
        wpm >= 110
    ) {

        return "Human Typewriter";

    }

    if (
        backspaces >= 20
    ) {

        return "Professional Regretter";

    }

    if (
        accuracy < 60
    ) {

        return "Fingers Have Left The Chat";

    }

    if (
        rage >= 75
    ) {

        return "Keycap Menace";

    }

    if (
        rage >= 50
    ) {

        return "Certified Keyboard Problem";

    }

    if (
        accuracy >= 98
    ) {

        return "Suspiciously Competent";

    }

    return "Keyboard Intern";

}


/* ==========================================
   RAGE REASON
========================================== */

function getRageReason(
    wpm,
    accuracy,
    caps,
    backspaces
) {

    if (
        caps >= 30
    ) {

        return "LOUD";

    }

    if (
        backspaces >= 15
    ) {

        return "REGRET";

    }

    if (
        accuracy < 65
    ) {

        return "CONFUSION";

    }

    if (
        wpm >= 100
    ) {

        return "PANIC";

    }

    if (
        wpm < 40
    ) {

        return "EXISTENTIAL CRISIS";

    }

    return "UNDETERMINED";

}


/* ==========================================
   RANDOM SENTENCE BUTTON
========================================== */

newSentenceBtn.addEventListener(
    "click",
    function() {

        if (
            startTime
        ) {

            showToast(
                "You abandoned the previous sentence."
            );

        }

        chooseRandomSentence();

        typingInput.value = "";

        updateLiveStats();

    }
);


/* ==========================================
   RETRY
========================================== */

retryBtn.addEventListener(
    "click",
    function() {

        resultScreen.classList.remove(
            "active"
        );

        testScreen.classList.add(
            "active"
        );

        resetTest();

        chooseRandomSentence();

        typingInput.focus();

        startTime =
            Date.now();

        timerInterval =
            setInterval(
                updateTimer,
                1000
            );

    }
);