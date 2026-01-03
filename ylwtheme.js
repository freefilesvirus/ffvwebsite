function intToRGB(int)
{
    int>>>=0;
    var b=(int&0x0000FF00)>>>8,
        g=(int&0x00FF0000)>>>16,
        r=(int&0xFF000000)>>>24;
    return "rgb("+[r,g,b].join(",")+")";
}

function loadYlwtheme(file)
{
    const fileReader=new FileReader();
    fileReader.onload=()=>
    {
        //good read, check if its valid
        const results=fileReader.result.replaceAll("\r","").split("\n");
        if (results.length<2)
        {
            return;
        }

        document.documentElement.style.setProperty("--menu-color",intToRGB(results[0]));
        document.documentElement.style.setProperty("--border-color",intToRGB(results[1]));
        document.documentElement.style.setProperty("--submenu-color",intToRGB(results[3]));
        document.documentElement.style.setProperty("--link-color",intToRGB(results[4]));
        document.documentElement.style.setProperty("--text-color",intToRGB(results[4]));
    };
    fileReader.readAsText(file);
}

document.addEventListener("dragover",(event)=>
{
    event.preventDefault();
})
document.addEventListener("drop",(event)=>
{
    if (event.dataTransfer.files[0].name.endsWith(".ylwtheme"))
    {
        //got theme file
        event.preventDefault();

        //try load
        loadYlwtheme(event.dataTransfer.files[0]);
    }
})