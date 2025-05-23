function injectScript(file_path:string, tag:string) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}

let a = injectScript(chrome.runtime.getURL("src/pages/content/inject.js"), "body");

function f(message:any){

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

  var objs = list.map((x) => (
    {
    thumbnail: x.images[0],
    label: x.label,
    modality: x.modality,
    id: x.id,
    prefix: longestCommonPrefix(x.images),
    suffix: longestCommonSuffix(x.images),
    start_slice: 0,
    end_slice: x.images.length-1,
    max_slice: maxSlice(x.images),
    min_slice:  minSlice(x.images),
    ww: checkUrlQuery(x.id,url,"ww")?Number(checkUrlQuery(x.id,url,"ww")):1400,
    wc: checkUrlQuery(x.id,url,"wc")?Number(checkUrlQuery(x.id,url,"wc")):40,
    ci: 0,
    z: 1,
    px: "0",
    py: "0",
    r: 0,
    pad: x.images[0].split("/").pop()?.split(".")[0].length || 0,
    cord: [-1, -1],
    url:url,
    intLoad:true,
    rescaleIntercept:0,
    rescaleSlope:1,
    step:getStep(x.images)

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

  if (strs.length==1){
    return strs[0].split("/").slice(0,strs[0].split("/").length-1).join("/") + "/"
  }

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
  if (strs.length==1){
 
    return "."+strs[0].split("/")[strs[0].split("/").length-1].split(".").slice(1).join(".")
  }
  const reversedStrs = strs.map((str:string) => str.split("").reverse().join(""));
  const suffix = longestCommonPrefix(reversedStrs);
  return suffix.split("").reverse().join("");
}

function maxSlice(strs:string[]) {
  var m = 0
  for (const x of strs) {
    m = Math.max(m,Number(x?.split("/")?.pop()?.split(".")[0]))
  }
 return m
}
function getStep(strs:string[]) {
  var slices=[]
 
  for (let i = 0; i < strs.length; i++) {
    slices.push(Number(strs[i]?.split("/")?.pop()?.split(".")[0]))
  }
  slices.sort(function(a, b) {return a - b;})
  var steps=[]
  for (let i = 1; i < slices.length; i++) {
    steps.push(slices[i]-slices[i-1])
  }
  var set = new Set(steps);
  if (set.size==1){
    return steps[0]
  }
 return 1
}

function minSlice(strs:string[]) {
  var m = Number.POSITIVE_INFINITY
  for (const x of strs) {
    m = Math.min(m,Number(x?.split("/")?.pop()?.split(".")[0]))
  }
 return m
  
}

