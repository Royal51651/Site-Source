import Main from "./lib/main.svelte"
import Aboutme from "./lib/aboutme.svelte"
import Comps from "./lib/comps.svelte"
import Projects from "./lib/projects.svelte"
export const routes = {
    '/': Main,
    "/about": Aboutme,
    "/comps": Comps,
    "/projects": Projects
}