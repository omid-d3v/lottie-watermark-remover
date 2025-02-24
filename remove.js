document.getElementById("jsonFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            const targetInd = 12345679;
            const targetDdd = 0;
            const targetNm = "Group Layer 8";

            if (data.layers) {
                data.layers = data.layers.filter(layer => 
                    !(layer.ind === targetInd && layer.ddd === targetDdd && layer.nm === targetNm)
                );
            }

            downloadJSON(data, "cleaned_lottie.json");
        } catch (error) {
            alert("Invalid JSON file");
        }
    };
    reader.readAsText(file);
});

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 4)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
