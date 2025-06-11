<script>
    import { notify } from "../global.svelte";
    import { push } from "svelte-spa-router";
    import Menu from "./menu.svelte";
    import Footer from "./footer.svelte";
    import { onMount } from "svelte";
    let header = null;
    let headerData = $state("");
    let font = $state("");
    let carosuelIndex = $state(0);
    let numOfImages = 5;
    let fonts = ["", "odin", "impact", "glitch", "graffiti", "eroded", "old"];
    let fontIndex = 0;
    function rand(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const init = async () => {
        await pause(250);
        for(let i of "George Eggers"){
            headerData += i;
            await pause(100);
        }
    }

    const forward = () => {
        carosuelIndex++;
        if(carosuelIndex >= 5){
            carosuelIndex = 0;
        }
    }

    setInterval(() => {
        forward();
    }, 10000);

    setInterval(async () => {
        for(let i = headerData.length - 1; i >= 0; i--){
            headerData = headerData.slice(0, i);
            await pause(50);
        }
        fontIndex++;
        if(fontIndex > 6){
            fontIndex = 0;
        }
        font = fonts[fontIndex];
        await pause(250);
        for(let i of "George Eggers"){
            headerData += i;
            await pause(100);
        }
    }, 6000);

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
        } else if (carosuelIndex == pos - 1 || carosuelIndex == numOfImages - 1&& pos == 0){
            sty += "scale: 0.8; opacity: 0.2; z-index: 1; transform: translateX(-400px);";
        } else if (carosuelIndex == pos + 1 || carosuelIndex == 0 && pos == numOfImages - 1) {
            sty += "scale: 0.8; opacity: 0.2; z-index: 1; transform: translateX(400px);";
        } else {
            sty += "opacity: 0; z-index: 0; transform: translateX(-400px); scale: 0;";
        }
        return sty;
    }


</script>

<Menu />
<div class="row typeWriter">
    <h1 id="header" class="headerText"><i style="font-family: {font};">{headerData}</i>_</h1>
</div>
<div class="row" style='min-height: 100px'>
    <div class="textRow">
        <p1>Hi! Im George Eggers. My interests include <i style="color: var(--main-color);">Computer Science</i> and <i style="color: var(--highlight-color);">Music.</i> I am currently a student at <i style="color: var(--highlight-color)">Stephen Decatur High School,</i> and I take <i style="color: var(--main-color);">Computer Science</i> classes at <i style="color: var(--main-color)">Worcester County Technical High School</i></p1>
    </div>
</div>
<button id="forward" style="position: fixed; visibility: hidden;" onclick={forward}>Forward</button>
<label for="forward" class="row scroll">
    <img style="{calcStyle(0)}" src="src/assets/SU_comp.jpg" alt="placeholder">
    <img style="{calcStyle(1)}" src="src/assets/cookin_up.jpg" alt="placeholder">
    <img style="{calcStyle(2)}" src="src/assets/number1.jpg" alt="placeholder">
    <img style="{calcStyle(3)}" src="src/assets/idk_we_hustelers.jpg" alt="placeholder">
    <img style="{calcStyle(4)}" src="src/assets/first_place.jpg" alt="placeholder">
</label>

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
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        min-height: 450px;
    }

    h1 {
        width: auto;
        max-width: 700px;
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
        font-size: 20px;
    }
    .textRow {
       text-align: left;
       padding-left: 50px;
       padding-right: 50px;
    }

    .typeWriter {
        place-content: center;
        align-items: center;
        min-height: 250px;
        display: flex;
    }

    @media screen and (min-width: 687px){

        .scroll img {
            max-width: min(80%, 800px);
            max-height: 450px;
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
