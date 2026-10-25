// add the "clear tags? button"
const navigator = document.getElementById("navigator");
const clearTagsContainer = document.createElement("div");
navigator.appendChild(clearTagsContainer);
clearTagsContainer.appendChild(document.createElement("br"));
clearTagsContainer.appendChild(document.createElement("br"));
const clearTagsButton = document.createElement("a");
clearTagsContainer.appendChild(clearTagsButton);
clearTagsButton.href = "/blog/#";
clearTagsButton.textContent = "clear tags?";

function fixTagStuff()
{
	let hashtagSelection = location.hash;
	// hide unrelated blogs
	let mainDivs = document.getElementById("main-content").getElementsByClassName("box2");
	Array.from(mainDivs).forEach(element =>
	{
		// fix display property
		let blogShouldShow = hashtagSelection === "";
		
		// check for matching tags
		if (!blogShouldShow)
		{
			Array.from(element.getElementsByClassName("blog-link")).forEach(tag =>
			{
				if (tag.textContent.toLowerCase() === hashtagSelection.toLowerCase())
				{
					blogShouldShow = true;
				}
			});
		}

		element.style.display = blogShouldShow ? "inline-block" : "none";
	});

	// unbold all the fake tags
	let fakeTags = document.getElementsByClassName("fake-blog-link");
	Array.from(fakeTags).forEach(element =>
	{
		// check if tag is matching
		if (element.textContent.toLowerCase() !== hashtagSelection.toLowerCase())
		{
			// switcher-und-oo
			let newTag = document.createElement("a");
			newTag.className = "blog-link";
			newTag.href = "/blog/" + element.textContent;
			newTag.textContent = element.textContent;
			element.parentNode.replaceChild(newTag, element);
		}
	});

	// bold all the selected tags
	let tags = document.getElementsByClassName("blog-link");
	Array.from(tags).forEach(element =>
	{
		// check if tag is matching
		if (element.textContent.toLowerCase() === hashtagSelection.toLowerCase())
		{
			// switcheroo
			let newTag = document.createElement("b");
			newTag.className = "fake-blog-link";
			newTag.textContent = element.textContent;
			element.parentNode.replaceChild(newTag, element);
		}
	});

	clearTagsContainer.style.display = hashtagSelection != "" ? "inline" : "none";
}

window.onhashchange = fixTagStuff;
fixTagStuff();
