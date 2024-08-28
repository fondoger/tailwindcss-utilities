

(function () {
    function insertStylesheet(cssText) {
        const blob = new Blob([cssText], { type: "text/css" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url
        document.head.appendChild(link);
    }
    function addPrefix(cssText, prefix) {
        if (!cssText.startsWith(".")) return '';
        return '.' + prefix + "\\:" + cssText.slice(1);
    }
    function addPseudo(cssText, pseudo) {
        if (!cssText.startsWith(".")) return '';
        return cssText.replace(/\.[_a-zA-Z0-9-]+/, (match) => {
            return "." + pseudo + "\\:" + match.slice(1) + ":" + pseudo;
        });
    }
    const tailwindUtilitiesSheet = Array.from(document.styleSheets).find((s) => s.href?.includes("tailwind-utilities.min.css" || "tailwind-utilities.css"));
    if (tailwindUtilitiesSheet) {
        const addDarkPrefix = Array.from(tailwindUtilitiesSheet.cssRules).map(t => addPrefix(t.cssText, "dark")).join(' ');
        const darkCSS = `@media (prefers-color-scheme: dark) {${addDarkPrefix}}`;
        const pseudoCSS = Array.from(tailwindUtilitiesSheet.cssRules).map(t => {
            return addPseudo(t.cssText, "active") + ' ' + addPseudo(t.cssText, "focus") + ' ' + addPseudo(t.cssText, "hover");
        }).join(' ');
        insertStylesheet(darkCSS + ' ' + pseudoCSS);
    }
})();