<script>
    import { notify } from "../global.svelte";
    import { push } from "svelte-spa-router";
    import Menu from "./menu.svelte";
</script>

<Menu />
<div class="row" style='height: 100vh;'>
    <h1>George Eggers</h1>
    <p1>Im george Eggers, and I like to code</p1>
    <p1>Click on this button for a really cool popup</p1>
    <button onclick={() => notify("Look at this notification", "Actually pretty good??", 5000)}>Notify</button>

</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        flex: 1;
        box-sizing: border-box;
        gap: 10px;
    }
</style>
