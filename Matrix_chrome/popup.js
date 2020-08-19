console.log('ran pop up');
let togl;
let btn;
function setup()
{
    
    noCanvas();
    btn = createButton("Matrix");
    btn.mousePressed(greet);
}

function greet()
{
    let params = {
        active: true,
        currentWindow: true
    }
    chrome.tabs.query(params, gotTabs);
    function gotTabs(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "pressed");
    }
}