
walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false);

while(walker.nextNode()) {
    var currentNode = walker.currentNode;
    if (currentNode != null){
        console.log(currentNode.textContent);
    }
}
