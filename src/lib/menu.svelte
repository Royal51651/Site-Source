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
    <button id="goAbout" onclick={() => {push("/work")}}>About Me</button>
    <button id="goComp" onclick={() => {push("/comp")}}>Competitions</button>
    <button id="goProj" onclick={() => {push("/projects")}}>Competitions</button>

</div>

<div class="controlBar {visibile}">
    <label for="goHome" class='highlight'><i class="icon">a</i> Home</label>
    <div class="spacer"></div>
    <label for="goProj" class='highlight'><i class="icon">7</i> Projects</label>
    <div class="spacer"></div>
    <label for="goComp" class='highlight'><i class="icon">8</i> Competitions</label>
    <div class="spacer"></div>
    <label for="goAbout" class='highlight2'><i class="icon">u</i> Work</label>
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
        padding-top: 30px;
        padding-bottom: 30px;
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
        font-size: 50px;
        position: fixed;
        left: calc(100vw - 150px);
        top: 1vw;
        z-index: 100;
    }

    .controlBar.true {
        transform: translateX(max(30vw, 300px));
        opacity: 1;
    }

    .blocker {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 5;
        left: 0;
        top: 0;
        visibility: hidden;
    }

    .blocker.true {
        visibility: visible;
    }

    .spacer {
        width: 60%;
        border: 1px solid var(--main-color);
        margin-left: 20%;
        margin-right: 20%;
    }

    
    @media screen and (min-width: 687px){

        h1 {
            font-size: 4em;
        }
 
    }
    @media screen and (min-width: 1200px){

        .scroll {
            min-height: 600px;
        }

    }
</style>