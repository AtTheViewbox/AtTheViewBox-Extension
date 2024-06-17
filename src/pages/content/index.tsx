function injectScript(file_path:string, tag:string) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}

let a = injectScript(chrome.runtime.getURL("src/pages/content/inject.js"), "body");

function f(message:any){
  console.log(message.data)
  let metadata = message.data.data.map((x) => ({
    label: x.label,
    modality: x.modality,
    id: x._id,
    images: x.instances.map((y) => y.url),
  }));
  chrome.storage.local.set({ PAC_DATA: generateMetaData(metadata,message.data.url) });
  if(message.data){
  window.removeEventListener("message", f, false);
  }
}
window.addEventListener(
  "message",
  f,
  { once: false }
);

function generateMetaData(list:[any],url:string) {
  
  var objs = list.map((x) => ({
    thumbnail: x.images[0],
    label: x.label,
    modality: x.modality,
    id: x.id,
    prefix: longestCommonPrefix(x.images),
    suffix: longestCommonSuffix(x.images),
    start_slice: Number(x.images[0].split("/").pop().split(".")[0]),
    end_slice: Number(x.images[x.images.length-1].split("/").pop().split(".")[0]),
    max_slice: Number(x.images[x.images.length-1].split("/").pop().split(".")[0]),
    min_slice: Number(x.images[0].split("/").pop().split(".")[0]),
    ww: checkUrlQuery(x.id,url,"ww")?Number(checkUrlQuery(x.id,url,"ww")):1400,
    //ww: 1400,
    //wc: checkUrlQuery(x.id,url,"wc")?Number(checkUrlQuery(x.id,url,"wc"))+1000:1040,
    wc: checkUrlQuery(x.id,url,"wc")?
    (x.modality=="CT"?Number(checkUrlQuery(x.id,url,"wc"))+1000:Number(checkUrlQuery(x.id,url,"wc"))):
    (x.modality=="CT"?1040:40),
    //wc: 1200,
    ci: Number(x.images[0].split("/").pop().split(".")[0]),
    z: 1,
    px: "0",
    py: "0",
    r: 0,
    pad: x.images[0].split("/").pop()?.split(".")[0].length || 0,
    cord: [-1, -1],
    url:url,
    intLoad:true

  }));
  return objs;
}
function checkUrlQuery(id:string,url:string, search:string){
    const urlParams = new URLSearchParams(url.split("?")[1]);
    for (const [key, value] of urlParams.entries()) {
    }
    if (((urlParams.get("s")==id) && urlParams.has(search))){
        return urlParams.get(search)
    }
    return 0

}
function longestCommonPrefix(strs:string[]) {
  if (strs.length === 0) return "";

  strs.sort();

  let prefix = "";
  let first = strs[0];
  let last = strs[strs.length - 1];

  for (let i = 0; i < first.length; i++) {
    if (first[i] === last[i]) {
      prefix += first[i];
    } else {
      break;
    }
  }

  return prefix;
}
function longestCommonSuffix(strs:string[]) {
  const reversedStrs = strs.map((str:string) => str.split("").reverse().join(""));
  const suffix = longestCommonPrefix(reversedStrs);
  return suffix.split("").reverse().join("");
}
