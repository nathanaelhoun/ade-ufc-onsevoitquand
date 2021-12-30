function shareWithOS(url) {
	navigator
		.share({
			title: document.title,
			text: "Quand est-ce qu'on peut se croiser ?",
			url: url,
		})
		.catch((error) => console.error("Error sharing:", error));
}

export function shareGroupsUrl(groups) {
	const url =
		window.location.href.replace(/[?]$/, "") + "?ids=" + Object.keys(groups).join("&ids=");

	if (navigator.share) {
		shareWithOS(url);
		return;
	}

	if ("clipboard" in navigator) {
		navigator.clipboard.writeText(url);
		alert("URL copiée dans le presse-papier");
		return;
	}

	// setUrl(url);
}
