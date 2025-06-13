<script>
    import Menu from "./menu.svelte";
    import Footer from "./footer.svelte";
    import { onMount } from "svelte";
    let header = $state(null);
    let headerData = $state("");
    let carosuelIndex = $state(0);
    let splashOpacity = $state(0);
    let link = $state("https://github.com/Royal51651/AIDiot");
    let scrolled = $state(false);
    let links = [
        "https://github.com/Royal51651/AIDiot",
        "https://github.com/Royal51651/Uplink",
        "https://github.com/Royal51651/Conifer",
        "https://github.com/Royal51651/Sowilo"        
    ]

    let splashTexts = [
        "AIDiot",
        "Uplink",
        "Conifer",
        "Sowilo"
    ]

    let descriptions = [
        "AIDiot is a simple frontend for the Ollama framework. It allows anyone to run AI locally, and provides a good looking GUI with easy access to system prompts and other important things. In addition, it uses a JSON save format, allowing users to quickly save and load different system settings with ease",
        "When I'm making music, I often have to export songs to very large .WAV files. If I want to send these songs to my phone, or any other device for that matter, I have to go through the trouble of uploading it so some LFT service. Uplink addresses that. It's a dead simple file server, offering QR codes and embedded thumbnails. In fact, it's so lightweight, that it's running on a Rasberry Pi 4, with only 4 GB of ram.",
        "Every year, the House of Congress puts on an app development challenge, aptly named the Congressional App Challenge. Those participating are given no guidelines on what to make, other than to make it related to America. Conifer is my take on this. Conifer is a free-speech centered chat platform, which offers both a chat feature and a more standard social media-like UI. In addition, it's very easy to self-host Conifer using it's server utility, and even easier to switch between servers, letting citizens reclaim control over free speech",
        "When I want to learn something new, I often find the best way to do so is to make an app that focuses on a specific topic. Sowilo was one of these apps. Sowilo is a local app that generates color palettes based on the most vibrant and commonly used colors in an image. By making Sowilo, I learned a lot about the HSV color space, and efficient ways to sort and classify large amounts of data"
    ]

    let description = $state(descriptions[0]);

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
        scrolled = true;
    }

    setInterval(() => {
        if(!scrolled){
            forward();
        }
        scrolled = true;
    }, 15000);

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

    const calcStyle = (pos) => {
        let sty = "";
        if(carosuelIndex == pos){
            sty += "scale: 1; opacity: 1; z-index: 2;";
        } else if (carosuelIndex == pos - 1 || carosuelIndex == 3 && pos == 0){
            sty += "scale: 0.7; opacity: 0.3; z-index: 1; transform: translateX(-400px);";
        } else if (carosuelIndex == pos + 1 || carosuelIndex == 0 && pos == 3) {
            sty += "scale: 0.7; opacity: 0.3; z-index: 1; transform: translateX(400px);";
        } else {
            sty += "opacity: 0; z-index: 0; transform: translateX(-400px); scale: 0;";
        }
        return sty;
    }
</script>
<Menu />

<div class="row" style="min-height: 100px; background-color: #111111;">
    <h1 id="header" style="text-align: left" class="headerText">{headerData}_</h1>
</div>
<button id="forward" style="position: fixed; visibility: hidden;" onclick={forward}>Forward</button>
<label for="forward" class="row scroll">
    <img style="{calcStyle(0)}" src="src/assets/aidiot.png" alt="placeholder">
    <img style="{calcStyle(1)}" src="src/assets/uplink.png" alt="placeholder">
    <img style="{calcStyle(2)}" src="src/assets/conifer.png" alt="placeholder">
    <img style="{calcStyle(3)}" src="src/assets/sowilo.png" alt="placeholder">
</label>
<div class="row textRow" style="min-height: 300px; background-color: #111111;">
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
    }

    .scroll {
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        min-height: 450px;
        overflow-x: hidden;
        position: relative;
    }

    .textRow {
       text-align: left;
       padding-left: 50px;
       padding-right: 50px;
    }

    h1 {
        width: auto;
        max-width: 700px;
        font-size: 3em;
    }

    .scroll img {
        position: absolute;
        max-height: 350px;
        max-width: min(80%, 600px);
        transition:
            transform 2s ease,
            opacity 250ms ease,
            scale 2s ease
        ;
    }

    p1, a {
        text-align: left;
        transition: opacity 250ms ease;
        font-size: 20px;
    }

    a {
        cursor: pointer;
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

    @media screen and (min-width: 687px){

        .scroll img {
            max-width: min(80%, 800px);
            max-height: 450px;
        }

        h1 {
            font-size: 4em;
        }

        .scroll {
            min-height: 500px;
        }

        p1, a {
            font-size: 24px;
        }
    }
    @media screen and (min-width: 1200px){

        .scroll img {
            max-width: min(80%, 1000px);
            max-height: 500px;
        }

        .scroll {
            min-height: 600px;
        }

        p1, a {
            font-size: 30px;
        }
    }
</style>