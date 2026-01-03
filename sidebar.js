document.addEventListener("DOMContentLoaded",(event)=>
{
    document.body.innerHTML=
    `
        <div class="sidebar" style="width:220px; display:inline-block;">
            <div class="box" style="width:100%;">
                <img src="/images/logo.png"><br>
                welcome to <a href="">freefilesvirus.com</a>
            </div>
            <div class="box" style="width:100%;">
                <b>links</b><br>
                <div id="linksholder" style="width:100%; text-align:left;"></div>
            </div>
            <div class="subbox" id="motpholder" style="width:100%;">
                someones where they shouldnt be
            </div>
        </div>
    `+document.body.innerHTML;

    //fix main
    const main=document.getElementsByTagName("main")[0];
    if (main)
    {
        main.style.width="calc(100% - 235px)";
    }

    //fix motp
    const motp=document.getElementById("motp");
    if (motp)
    {
        document.getElementById("motpholder").innerHTML="<b>MESSAGE OF THE PAGE</b><br>"+motp.innerHTML;
        motp.remove();
    }
    else
    {
        document.getElementById("motpholder").remove()
    }

    //fix links
    const linksholder=document.getElementById("linksholder");
    function buildLinksRecursive(path,links)
    {
        let indent=(path.split("/").length-2)*8;

        for (let i in links)
        {
            linkData=links[i];

            const linkIsHere=window.location.pathname==path+linkData.path || window.location.pathname==path+linkData.path+"/";

            const link=document.createElement(linkIsHere?"b":"a");
            link.style.paddingLeft=indent;
            linksholder.appendChild(link);
            
            linksholder.appendChild(document.createElement("br"));

            linkData.alias=("alias" in linkData)?linkData.alias:linkData.path;
            link.innerHTML=linkData.alias;
            
            if (!linkIsHere)
            {
                link.href=linkData.fullPath?linkData.path:path+linkData.path;
            }

            if (window.location.pathname.startsWith(path+linkData.path))
            {
                if ("links" in linkData)
                {
                    buildLinksRecursive(path+linkData.path+"/",linkData.links);
                }
            }
        }
    }
    buildLinksRecursive("/",sidebarLinks);
});

const sidebarLinks=
[
    {
        path:"",
        alias:"home"
    },
    {
        path:"games",
        links:
        [
            {
                path:"gmod",
                alias:"garrys mod"
            },
        ]
    },
    {
        path:"devlogs",
        links:
        [
            {
                path:"clubofutility",
                alias:"CLUB OF UTILITY"
            },
            {
                path:"bulletheli",
                alias:"BULLETHELI"
            },
            {
                path:"daveyvs",
                alias:"DAVEY vs THE BIG GUY"
            },
        ]
    },
    {
        path:"filedump",
        alias:"file dump",
        links:
        [
            {
                path:"probots",
                alias:"observation blog"
            },
        ]
    },
    {
        path:"https://www.youtube.com/@freefilesvirus/videos",
        alias:"youtube",
        fullPath:true
    },
    {
        path:"https://discord.gg/eH3qYRRpfS",
        alias:"discord",
        fullPath:true
    }
];