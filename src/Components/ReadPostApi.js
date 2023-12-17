const GLOBAL = require("./Global");
export async function readOnlineApi (Url){
  console.log(GLOBAL.OrgAppLink_value + Url,'Url')
    return (
      fetch(GLOBAL.OrgAppLink_value + Url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      }).then(resp => {
        console.log(resp,'Url:resp')
        return resp.json();})
        .catch(error => console.log("dd", error)));
  }
