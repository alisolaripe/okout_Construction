const GLOBAL = require("./Global");
export async function readOnlineApi (Url){
    return (
      fetch(GLOBAL.OrgAppLink_value + Url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      }).then(resp => {
        return resp.json();})
        .catch(error => console.log("dd", error)));
  }
