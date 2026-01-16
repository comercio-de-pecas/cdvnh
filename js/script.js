const micBtn = document.getElementById("micBtn");

micBtn.addEventListener("click", startVoice);

function startVoice() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Seu navegador não suporta comando de voz. Use o Chrome.");
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
            const recognition = new SpeechRecognition();
            recognition.lang = "pt-BR";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onstart = () => {
                console.log("Microfone ativado 🎤");
            };

            recognition.onresult = (event) => {
                const texto = event.results[0][0].transcript;

                const mensagem = encodeURIComponent(
                    "Olá, gostaria de consultar a seguinte peça: " + texto
                );

                window.location.href =
                    "https://wa.me/555199319733?text=" + mensagem;
            };

            recognition.onerror = (event) => {
                alert("Erro no reconhecimento de voz. Tente novamente.");
                console.error(event.error);
            };
        })
        .catch((err) => {
            alert("Permissão de microfone negada ❌");
            console.error(err);
        });
}
