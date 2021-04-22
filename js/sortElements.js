let parent=document.querySelector("parent_node");
if (parent){
  Array.from(parent.children)
    .sort((a,b) => a.innerText>=b.innerText? 1: -1)
    .forEach(child => parent.insertBefore(child,parent.firstElementChild) )
}
