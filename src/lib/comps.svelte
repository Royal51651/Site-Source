<script>
    import Menu from "./menu.svelte";
    import Footer from "./footer.svelte";
    import { onMount } from "svelte";
    let header = $state(null);
    let headerData = $state("");
    let carosuelIndex = $state(0);
    let splashOpacity = $state(0);
    let link = $state("https://github.com/Royal51651/AIDiot");
    
    let splashTexts = [
        "CyberPatriot",
        "Skills USA",
        "SU ESPC",
        "Media Expo"
    ]

    let descriptions = [
        "In January of 2025, me and 3 of my friends decided to compete the the USAFA CyberPatriot competition. Due to the nature of the competition, we each had to secure different operating systems. I was tasked with securing Ubuntu Linux, ensuring things like the firewall were enabled and that it was clear of viruses. Throughout this competition, I learned much about defensive cyber security, and Linux",
        "In March of 2025, I competed in a CyberSecurity contest for SkillsUSA. I was tasked with various different security problems, all from the perspective of a system administrator. I did various things, including securing a theoretical network, and analyzing hidden image metadata to track down a virtual threat-actor. Throughout this competition, I learned much about the CyberSecurity industry, and how to effectively manage time and delagate tasks",
        "In 2025, I represented the Worcester Technical High School for the 4th annual Salisbury University Eastern Shore Programming Competition. The competition consisted of a group portion, which I competed in with other students, and an individual portion. The individual section was set up like a timed LeetCode challenge, as I was tasked with solving as many problems as I could as fast as I could. I ended up winning second place in the individuals category, making me the top finisher from Worcester County",
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
    <img style="{calcStyle(0)}" src="src/assets/afa_logo.png" alt="placeholder">
    <img style="{calcStyle(1)}" src="src/assets/skills.webp" alt="placeholder">
    <img style="{calcStyle(2)}" src="src/assets/SU_comp.jpg" alt="placeholder">
    <img style="{calcStyle(3)}" src="src/assets/simplecalc.png" alt="placeholder">
</label>
<div class="row textRow" style="min-height: 300px; background-color: #111111;">
    <p1 style="opacity: {splashOpacity}">{description}</p1>
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

    p1 {
        text-align: left;
        transition: opacity 250ms ease;
        font-size: 20px;
    }

    .textRow {
       text-align: left;
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

        p1 {
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

        p1 {
            font-size: 30px;
        }
    }
</style>