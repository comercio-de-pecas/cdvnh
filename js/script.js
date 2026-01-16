const micBtn = document.getElementById("micBtn");

function startVoice() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta pedido por voz. Use o Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
        const texto = event.results[0][0].transcript;

        const mensagem = encodeURIComponent(
            "Olá, gostaria de consultar a seguinte peça: " + texto
        );

        window.location.href =
            "https://wa.me/555199319733?text=" + mensagem;
    };

    recognition.onerror = () => {
        alert("Erro ao capturar o áudio. Tente novamente.");
    };
}

micBtn.addEventListener("click", async () => {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        startVoice();
    } catch (err) {
        alert("Permissão de microfone negada.");
    }
});
