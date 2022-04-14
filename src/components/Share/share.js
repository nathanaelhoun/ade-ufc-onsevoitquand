function shareWithOS(url) {
	try {
		navigator.share({
			title: document.title,
			text: "Quand est-ce qu'on peut se croiser ?",
			url: url,
		});
	} catch (error) {
		console.error("Error sharing:", error);
	}
}

function shareWithClipboard(url) {
	navigator.clipboard.writeText(url);
	alert("URL copiée dans le presse-papier");
}

export function shareGroupsUrl(groups) {
	const url =
		window.location.href.replace(/[?]$/, "") + "?ids=" + Object.keys(groups).join("&ids=");

	if (navigator.share) {
		shareWithOS(url);
		return;
	}

	if ("clipboard" in navigator) {
		shareWithClipboard(url);
		return;
	}

	console.error("Impossible de partager l'URL, aucune méthode supportée.");
}
