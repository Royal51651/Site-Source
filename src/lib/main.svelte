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
    }, 5000);

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

    window.onload = function() {

    };

    onMount(() => {
        header = document.getElementById('header');
        init();
        window.addEventListener('mousemove', mouse_monitor);
    });

    const calcPos = (pos) => {
        if(carosuelIndex == pos){
            return 0;
        } else if (carosuelIndex == pos - 1 || carosuelIndex == 4 && pos == 0){
            return -100;
        } else {
            return 100;
        }
    }


</script>

<Menu />
<div class="row typeWriter">
    <h1 id="header" class="headerText"><i style="font-family: {font};">{headerData}</i>_</h1>
</div>
<div class="row" style='min-height: 25vh;'>
    <div class="textRow">
        <p1>Hi! Im George Eggers, and I like <i style="color: var(--main-color);">Computer Science</i> and <i style="color: var(--highlight-color);">Music.</i> I am currently a student at <i style="color: var(--highlight-color)">Stephen Decatur High School,</i> and I take <i style="color: var(--main-color);">Computer Science</i> classes at <i style="color: var(--main-color)">Worcester County Technical High School</i></p1>
    </div>
</div>
<button id="forward" style="position: fixed; visibility: hidden;" onclick={forward}>Forward</button>
<label for="forward" class="row scroll" style="min-height: 400px;">
    <img style="transform: translateX({calcPos(0)}vw); opacity: {carosuelIndex == 0 ? 1 : 0}" src="src/assets/placeholder.png" alt="placeholder">
    <img style="transform: translateX({calcPos(1)}vw); opacity: {carosuelIndex == 1 ? 1 : 0}" src="src/assets/placeholder.png" alt="placeholder">
    <img style="transform: translateX({calcPos(2)}vw); opacity: {carosuelIndex == 2 ? 1 : 0}" src="src/assets/placeholder.png" alt="placeholder">
    <img style="transform: translateX({calcPos(3)}vw); opacity: {carosuelIndex == 3 ? 1 : 0}" src="src/assets/placeholder.png" alt="placeholder">
    <img style="transform: translateX({calcPos(4)}vw); opacity: {carosuelIndex == 4 ? 1 : 0}" src="src/assets/placeholder.png" alt="placeholder">
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

    .hidden {
        opacity: 0;
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
        width: min(80%, 500px);
        max-height: 300px;
        transition:
            transform 2s ease,
            opacity 2s ease
        ;
    }

    p1 {
        text-align: left;
        font-size: 20px;
    }
    .textRow {
       text-align: left;
    }

    .typeWriter {
        place-content: center;
        min-height: 320px;
        display: flex;
    }

    @media screen and (min-width: 687px){
        .typeWriter {
            min-height: 170px;
        }
    }
</style>
