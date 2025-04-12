document.getElementById("navigate").addEventListener("click", function(event) {
    event.preventDefault(); // يمنع التنقل الفوري
    gsap.to("body", { opacity: 0, duration: 0.5, onComplete: () => {
        window.location.href = "page2.html"; // انتقال بعد التأثير
    }});
});