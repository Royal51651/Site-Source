import Main from "./lib/main.svelte"
import Work from "./lib/work.svelte"
import Projects from "./lib/projects.svelte"
import Comps from "./lib/comps.svelte"
export const routes = {
    '/': Main,
    "/work": Work,
    "/comp": Comps,
    "/projects": Projects
}