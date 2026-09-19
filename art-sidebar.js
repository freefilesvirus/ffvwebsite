const artSidebar=document.getElementById("artSidebarArt");
const commonArts=[
	"/images/decotiles/stars.png","/images/decotiles/worms.png","/images/decotiles/fly.png",
	"/images/decotiles/eyergyle.png","/images/decotiles/pipes.png","/images/decotiles/qte.png",
	"/images/decotiles/probots.png","/images/decotiles/fish-shirt.png"
];
const rareArts=[
	"/images/decotiles/skinny-stripping.png","/images/decotiles/skinny-leo-cat.png"
];
let artArray=Math.random()*200<1?rareArts:commonArts; // 1 in 200 chance
artSidebar.style.backgroundImage=`url("${artArray[Math.floor(Math.random()*artArray.length)]}")`;