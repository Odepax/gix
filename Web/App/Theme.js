window.addEventListener("load", () => {
	const currentTime = new Date().getHours()

	if (currentTime < 7 || 17 <= currentTime) {
		document.body.classList.add('Theme--dark')
	}
})
