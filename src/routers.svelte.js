import Main from "./lib/main.svelte"
import Aboutme from "./lib/aboutme.svelte"
import Projects from "./lib/projects.svelte"
import Comps from "./lib/comps.svelte"
export const routes = {
    '/': Main,
    "/about": Aboutme,
    "/comp": Comps,
    "/projects": Projects
}