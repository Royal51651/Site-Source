export const notify = (header, body, timeout) => {
    n.name = header;
    n.value = body;
    n.status = "";
    setTimeout(() => {
        n.status = "hidden";
    }, timeout);
};

export let n = $state({name: "", value: "", status: "hidden"});