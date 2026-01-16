const micBtn = document.getElementById("micBtn");
const voiceStatus = document.getElementById("voiceStatus");

micBtn.addEventListener("click", () => {

    // UI PROFISSIONAL
    micBtn.classList.add("listening");
    voiceStatus.classList.add("show");

    // EVENTO DE CONVERSÃO (Google Ads / GA4)
    if (typeof gtag === "function") {
        gtag('event', 'pedido_por_voz', {
            event_category: 'conversao',
            event_label: 'botao_microfone'
        });
    }

    // TENTATIVA DE VOZ (se funcionar, ótimo)
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        try {
            const recognition = new SpeechRecognition();
            recognition.lang = "pt-BR";
            recognition.interimResults = false;

            recognition.start();

            recognition.onresult = (event) => {
                const texto = event.results[0][0].transcript;
                redirectWhats(texto);
            };

            recognition.onerror = () => {
                fallbackRedirect();
            };

        } catch {
            fallbackRedirect();
        }
    } else {
        fallbackRedirect();
    }

    // FALLBACK AUTOMÁTICO
    function fallbackRedirect() {
        setTimeout(() => {
            redirectWhats("Gostaria de consultar uma peça");
        }, 1200);
    }

    function redirectWhats(texto) {
        const msg = encodeURIComponent(
            "Olá, " + texto
        );
        window.location.href =
            "https://wa.me/555199319733?text=" + msg;
    }
});
