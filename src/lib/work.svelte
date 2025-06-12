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
        "https://berlinmainstreet.com/farmersmarket/",
        "https://www.taylorhousemuseum.org/",
        "https://www.littlegreenwitchapothecary.com/"
    ]
    
    let splashTexts = [
        "Berlin Farmers Market",
        "Taylor House Museum",
        "Little Green Witch Apothecary"    
    ]

    let descriptions = [
        "Since 2024, I've worked as the market manager for the Berlin Farmers Market. My duties include answering questions from customers and vendors alike, and setting up / tearing down the market materials",
        "During the summer, I work for the Taylor House Museum in Berlin, Maryland. My duties include general IT work, and ensuring that all tech-related questions were answered",
        "Since early 2020, I've beem working for the Little Green Witch Apothecary, a small tea business. I do things such as website development and maintainment, and setup / teardown during farmers markets"
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
        if(carosuelIndex >= 3){
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

    const calcStyle = (pos) => {
        let sty = "";
        if(carosuelIndex == pos){
            sty += "scale: 1; opacity: 1; z-index: 2;";
        } else if (carosuelIndex == pos - 1 || carosuelIndex == 2 && pos == 0){
            sty += "scale: 0.7; opacity: 0.3; z-index: 1; transform: translateX(-400px);";
        } else if (carosuelIndex == pos + 1 || carosuelIndex == 0 && pos == 2) {
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
    <img style="{calcStyle(0)}" src="src/assets/berlin_fm.webp" alt="placeholder">
    <img style="{calcStyle(1)}" src="src/assets/taylor_house.jpg" alt="placeholder">
    <img style="{calcStyle(2)}" src="src/assets/lgwa_logo.jpg" alt="placeholder">
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