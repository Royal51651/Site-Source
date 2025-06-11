<script>
    import { push} from "svelte-spa-router";
    let visibile = $state(false);
</script>
<button id="toggle" class="toggle icon highlight"
onclick={() => {visibile = !visibile}}
>
H
</button>
<div style="position: fixed; visibility: hidden">
    <button id="goHome" onclick={() => {push("/")}}>Home</button>
    <button id="goAbout" onclick={() => {push("/about")}}>About Me</button>
    <button id="goComp" onclick={() => {push("/comp")}}>Competitions</button>
    <button id="goProj" onclick={() => {push("/projects")}}>Competitions</button>

</div>

<div class="controlBar {visibile}">
    <h1>George Eggers</h1>
    <div class="spacer"></div>
    <label for="goHome" class='highlight'><i class="icon">a</i> Home</label>
    <div class="spacer"></div>
    <label for="goProj" class='highlight'><i class="icon">7</i> Projects</label>
    <div class="spacer"></div>
    <label for="goComp" class='highlight'><i class="icon">8</i> Competitions</label>
    <div class="spacer"></div>
    <label for="goAbout" class='highlight2'><i class="icon">u</i> About Me</label>
    <div class="spacer"></div>
</div>

<label for="toggle" class="blocker {visibile}"></label>

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
        z-index: 10;
        background-color: #2f2f2f;
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
        z-index: 100;
    }

    .controlBar.true {
        transform: translateX(max(30vw, 300px));
        opacity: 1;
    }

    .blocker {
        width: 100vw;
        height: 100vh;
        scale: 0;
        position: fixed;
        left: 0;
        top: 0;
        border-radius: 200px;
        opacity: 0;
        scale: 0;
    }

    .blocker.true {
        scale: 1;
    }

    .spacer {
        width: 60%;
        border: 1px solid var(--main-color);
        margin-left: 20%;
        margin-right: 20%;
    }
</style>