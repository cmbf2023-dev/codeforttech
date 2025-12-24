// ALTERNATIVE: If you still get blank pages, add this AFTER body content
;(() => {
  // Protect DOM from being cleared
  const bodyContent = document.body.innerHTML
  let cleared = false

  // Watch for DOM clearing
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
        const bodyEmpty = document.body.children.length === 0
        if (bodyEmpty && !cleared) {
          cleared = true
          console.log("[Protected] Restoring cleared content")
          document.body.innerHTML = bodyContent
          observer.disconnect() // Stop watching after restore
        }
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })

  console.log("[DOM Protector] Active")
})()
