const popupLayer0 = () => {
    var modal = document.getElementById("layer0popup");
    var btn = document.getElementById("layer0Btn");
    var close = document.getElementById("clos");

    btn.onclick = function() {
        modal.style.display = "block";
    };
    close.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

export { popupLayer0 }