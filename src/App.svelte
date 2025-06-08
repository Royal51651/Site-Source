<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routers.svelte";
  import Popup from "./lib/popup.svelte";
</script>

<Popup />
<Router {routes}></Router>

