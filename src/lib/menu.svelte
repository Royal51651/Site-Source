<script>
    import { push} from "svelte-spa-router";
    let visibile = $state(false);
</script>
<button class="toggle icon highlight"
onclick={() => {visibile = !visibile}}
>
H
</button>
<div style="position: fixed; visibility: hidden">
    <button id="goHome" onclick={() => {push("/")}}>Home</button>
    <button id="goAbout" onclick={() => {push("/about")}}>About Me</button>
    <button id="goComp" onclick={() => {push("/comps")}}>Competitions</button>


</div>
<div class="controlBar {visibile}">
    <h1>George Eggers</h1>
    <div class="spacer"></div>
    <label for="goHome" class='highlight'><i class="icon">a</i> Home</label>
    <div class="spacer"></div>
    <label for="goAbout" class='highlight'><i class="icon">u</i> About Me</label>
    <div class="spacer"></div>
    <label for="goAbout" class='highlight'><i class="icon">8</i> Competitions</label>
    <div class="spacer"></div>
</div>

<style>


    .controlBar {
        position: fixed;
        left: min(-30vw, -300px);
        top: 0;
        display: flex;
        flex-direction: column;
        width: max(30vw, 300px);
        min-width: max(30vw, 300px);
        height: 100vh;
        opacity: 0;
        gap: 20px;
        padding: 20px;

        background-color: #1a1a1a;
        transition:
            opacity 1s ease,
            transform 1s ease
        ;
    }

    .controlBar * {
        font-size: 32px; 
    }

    .toggle {
        font-size: 32px;
        position: fixed;
        left: calc(100vw - 90px);
        top: 1vw;
    }

    .true {
        transform: translateX(max(30vw, 300px));
        opacity: 1;
    }

    .spacer {
        width: 60%;
        border: 1px solid var(--main-color);
        margin-left: 20%;
        margin-right: 20%;
    }
</style>