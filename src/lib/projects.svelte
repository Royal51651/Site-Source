<script>
    import Menu from "./menu.svelte";
    import Footer from "./footer.svelte";
    import { onMount } from "svelte";
    let header = $state(null);
    let headerData = $state("");
    let carosuelIndex = $state(0);
    let splashOpacity = $state(0);
    let link = $state("https://github.com/Royal51651/AIDiot");
    let links = [
        "https://github.com/Royal51651/AIDiot",
        "https://github.com/Royal51651/Uplink",
        "https://github.com/Royal51651/Conifer",
        "https://github.com/Royal51651/SimpleCalc"        
    ]
    
    let splashTexts = [
        "AIDiot",
        "Uplink",
        "Conifer",
        "SimpleCalc"
    ]

    let descriptions = [
        "AIDiot is a simple frontend for the Ollama framework. It allows anyone to run AI locally, and provides a good looking GUI with easy access to system prompts and other important things. In addition, it uses a JSON save format, allowing users to quickly save and load different system settings with ease",
        "When I'm making music, I often have to export songs to very large .WAV files. If I want to send these songs to my phone, or any other device for that matter, I have to go through the trouble of uploading it so some LFT service. Uplink addresses that. It's a dead simple file server, offering QR codes and embedded thumbnails. In fact, it's so lightweight, that it's running on a Rasberry Pi 4, with only 4 GB of ram.",
        "Every year, the House of Congress puts on an app development challenge, aptly named the Congressional App Challenge. Those participating are given no guidelines on what to make, other than to make it related to America. Conifer is my take on this. Conifer is a free-speech centered chat platform, which offers both a chat feature and a more standard social media-like UI. In addition, it's very easy to self-host Conifer using it's server utility, and even easier to switch between servers, letting citizens reclaim control over free speech",
        "Every year, the Worcester County Public School System holds a media-expo. Students are allowed to submit any creative work, ranging from photography to music, and of course, apps. SimpleCalc was my submission to the 2025 Media Expo. Despite the name, it's anything but simple, featuring advanced auditory and visual effects, making it the most dramatic calulator ever. Due to it's easy-to-use UI, and speedy backend made in Rust, SimpleCalc ended up winning first place in the expo."
    ]

    let description = $state(descriptions[0]);


    function rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const init = async () => {
        await pause(250);
        splashOpacity = 1;
        let time = 500 / splashTexts[0].length;
        for(let i of splashTexts[0]){
            headerData += i;
            await pause(time);
        }
    }

    const forward = async () => {
        carosuelIndex++;
        if(carosuelIndex >= 4){
            carosuelIndex = 0;
        }
        splashOpacity = 0;
        // delete
        let time = 500 / headerData.length;
        let startIndex = carosuelIndex;
        for(let i = headerData.length - 1; i >= 0; i--){
            headerData = headerData.slice(0, i);
            await pause(time);
            if(startIndex != carosuelIndex){
                headerData = "";
                break;
            }
        }
        startIndex = carosuelIndex;
        description = descriptions[carosuelIndex];
        link = links[carosuelIndex];
        await pause(250);
        splashOpacity = 1;
        time = 1000 / splashTexts[carosuelIndex].length;
        for(let i of splashTexts[carosuelIndex]){
            headerData += i;
            await pause(time);
            if(startIndex != carosuelIndex){
                break;
            }
        }
    }

    setInterval(() => {
        forward();
    }, 20000);

    const pause = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    var mouse_monitor = function(e) {
        const percent = (e.pageX / window.innerWidth * 100).toFixed(2);
        header.style.backgroundImage = `linear-gradient(90deg, var(--highlight-color), var(--main-color) ${percent}%)`;
    };
    
    onMount(() => {
        header = document.getElementById('header');
        init();
        window.addEventListener('mousemove', mouse_monitor);
    });

    const calcPos = (pos) => {
        if(carosuelIndex == pos){
            return 0;
        } else if (carosuelIndex == pos - 1 || carosuelIndex == 3 && pos == 0){
            return -50;
        } else {
            return 50;
        }
    }
</script>
<Menu />

<div class="row" style="min-height: 100px; background-color: #111111;">
    <h1 id="header" style="text-align: left" class="headerText">{headerData}_</h1>
</div>
<button id="forward" style="position: fixed; visibility: hidden;" onclick={forward}>Forward</button>
<label for="forward" class="row scroll" style="min-height: 400px;">
    <img style="transform: translateX({calcPos(0)}vw); opacity: {carosuelIndex == 0 ? 1 : 0.5}" src="src/assets/aidiot.png" alt="placeholder">
    <img style="transform: translateX({calcPos(1)}vw); opacity: {carosuelIndex == 1 ? 1 : 0.5}" src="src/assets/uplink.png" alt="placeholder">
    <img style="transform: translateX({calcPos(2)}vw); opacity: {carosuelIndex == 2 ? 1 : 0.5}" src="src/assets/conifer.png" alt="placeholder">
    <img style="transform: translateX({calcPos(3)}vw); opacity: {carosuelIndex == 3 ? 1 : 0.5}" src="src/assets/simplecalc.png" alt="placeholder">
</label>
<div class="row" style="min-height: 260px; background-color: #111111;">
    <p1 style="opacity: {splashOpacity}">{description}</p1>
    <a style="opacity: {splashOpacity}" href="{link}">{link}</a>
</div>
<Footer />

<style>
     .headerText {
        background-image: linear-gradient(90deg, var(--highlight-color), var(--main-color) 50%);
        color: transparent;
        background-clip: text;
        margin: 0;
        align-items: center;
        justify-content: center;
        font-size: 4em;
    }

    .scroll {
        background-color: #111111;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    .scroll img {
        position: absolute;
        max-width: min(80%, 600px);
        max-height: 350px;
        transition:
            transform 2s ease,
            opacity 2s ease
        ;
    }

    .container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
    }

    p1, a {
        text-align: left;
        font-size: 16px;
        transition: opacity 500ms ease;
    }

    a {
        cursor: pointer;
        font-size: 20px;
        color: var(--main-color);
    }
    .textRow {
       text-align: left;
    }

    .typeWriter {
        place-content: center;
        min-height: 140px;
        display: flex;
    }
</style>