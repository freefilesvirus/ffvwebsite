const defaultYlwthemeCookie="-734721 -3909121 -399105 -1409793 255";

function intToRGB(int)
{
    int>>>=0;
    var b=(int&0x0000FF00)>>>8,
        g=(int&0x00FF0000)>>>16,
        r=(int&0xFF000000)>>>24;
    return "rgb("+[r,g,b].join(",")+")";
}

function resetYlwtheme()
{
    const themeBox=document.getElementById("themeBox");
    if (themeBox)
    {
        themeBox.remove();
    }

    document.cookie="ylwtheme=;path=/";
    loadYlwtheme(defaultYlwthemeCookie);
}

function getYlwthemeFromCookie()
{
    if (document.cookie=="")
    {
        //no cookies
        return;
    }

    let ylwthemeCookie;

    const cookies=document.cookie.split(";");
    for (let i=0;i<cookies.length;i++)
    {
        if (cookies[i].startsWith("ylwtheme="))
        {
            ylwthemeCookie=cookies[i].substring(9,cookies[i].length);
            break;
        }
    }

    return ylwthemeCookie;
}

function addThemeInfoToSidebar()
{
    if (document.readyState!=="complete")
    {
        window.addEventListener("load",addThemeInfoToSidebar);
        return;
    }

    const ylwthemeCookie=getYlwthemeFromCookie();

    if (!ylwthemeCookie || ylwthemeCookie.startsWith(defaultYlwthemeCookie))
    {
        return;
    }

    const sidebar=document.getElementById("sidebar");

    let themeInfo=document.getElementById("themeInfo");
    if (!themeInfo)
    {
        const themeBox=document.createElement("div");
        themeBox.className="subbox";
        sidebar.appendChild(themeBox);

        themeBox.id="themeBox";
        themeBox.style.width="100%";

        themeInfo=document.createElement("b");
        themeInfo.id="themeInfo";
        themeBox.appendChild(themeInfo);

        themeBox.appendChild(document.createElement("br"));

        const resetButton=document.createElement("button");
        themeBox.appendChild(resetButton);

        resetButton.style.fontSize="12";
        resetButton.textContent="clear theme";
        resetButton.addEventListener("click",resetYlwtheme);
    }

    themeInfo.textContent=
    `
        theme: ${ylwthemeCookie.split(" ")[5]}
    `;
}

function loadYlwtheme(theme)
{
    const result=theme.split(" ");
    if (result.length<5)
    {
        return;
    }

    document.documentElement.style.setProperty("--menu-color",intToRGB(result[0]));
    document.documentElement.style.setProperty("--border-color",intToRGB(result[1]));
    document.documentElement.style.setProperty("--submenu-color",intToRGB(result[3]));
    document.documentElement.style.setProperty("--link-color",intToRGB(result[4]));
    document.documentElement.style.setProperty("--text-color",intToRGB(result[4]));
}

function loadYlwthemeFromCookie()
{
    const ylwthemeCookie=getYlwthemeFromCookie();
    if (!ylwthemeCookie)
    {
        return;
    }

    loadYlwtheme(ylwthemeCookie);
    addThemeInfoToSidebar()
}
loadYlwthemeFromCookie();

let attemptedYlwthemeName="";

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

        attemptedYlwthemeName=event.dataTransfer.files[0].name.substring(0,event.dataTransfer.files[0].name.length-9);

        //try load
        const fileReader=new FileReader();
        fileReader.onload=()=>
        {
            //good read, check if its valid
            const result=fileReader.result.replaceAll("\r","").replaceAll("\n"," ");
            if (result.split(" ").length<5)
            {
                return;
            }

            if (result==defaultYlwthemeCookie)
            {
                //default theme
                resetYlwtheme();
                return;
            }

            document.cookie="ylwtheme="+result+" "+attemptedYlwthemeName+";path=/";
            loadYlwthemeFromCookie();
        };
        fileReader.readAsText(event.dataTransfer.files[0]);
    }
})