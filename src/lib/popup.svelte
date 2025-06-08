<script>
    import { n } from "../global.svelte";
</script>


<button id="close" onclick={() => {n.status = "hidden"}} style="visibility: hidden; position: fixed;" aria-label="jifgifgsd"></button>
<label for="close" class="notification {n.status}">
    <span>
        <h1>{n.name}</h1>
    </span>
    <p1>{n.value}</p1>
</label>

<style>

  .notification {
    position: fixed;
    top: 2vh;
    left: calc((100vw - max(40vw, 400px)) / 2);
    width: max(40vw, 400px);
    padding: 1em;
    height: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 200;
    box-sizing: border-box;
    background-color: #1a1a1a;
    border: 2px solid var(--main-color);
    transition: 
        opacity 500ms,
        transform 1000ms
    ;
  }

  .hidden {
    opacity: 0;
    transform: translateY(-25vh);
  }

  .notification p1 {
    font-size: 16px;
  }

  .notification h1 {
    font-size: 20px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 2px solid transparent;
    background-color: var(--main-color);
  }

</style>