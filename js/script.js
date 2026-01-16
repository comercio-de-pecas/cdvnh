// Script base – CDV Peças

document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso");

  function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Seu navegador não suporta reconhecimento de voz.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.start();

    recognition.onresult = function(event) {
        const texto = event.results[0][0].transcript;
        const mensagem = encodeURIComponent(
            "Olá, gostaria de saber sobre a seguinte peça: " + texto
        );

        window.location.href =
            "https://wa.me/555199319733?text=" + mensagem;
    };

    recognition.onerror = function() {
        alert("Não foi possível captar o áudio.");
    };
}

});
