document.addEventListener("DOMContentLoaded",(event)=>
{
    document.querySelectorAll("a").forEach((text)=>
    {
        if (text.href.includes(window.location.hostname))
        {
            return;
        }

        const texts=[...text.childNodes].filter(n=>(n.nodeName=="A" || n.nodeName=="B") && n.textContent.trim().length>0);
        if (texts.length>0)
        {
            texts[texts.length-1].innerHTML+="&#8599";
        }
        else
        {
            text.innerHTML+="&#8599";
        }
    });
});