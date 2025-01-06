$(document).ready(() => {
    $('input').click((e) => {
        e.preventDefault();
        let dataLinha = $(e.target).data('linha'); // Pega o valor do respectivo data-linha
        $('#' + dataLinha).addClass('linha_destaque'); // Transforma o valor do data-linha no id da tag <hr> e adiciona o estilo
    });

    $('input').blur((e) => {
        e.preventDefault();
        let dataLinha = $(e.target).data('linha'); 
        $('#' + dataLinha).removeClass('linha_destaque'); 
    });

    // Função para mostrar a senha ao clicar no ícone de olho
    $('#toggle-visibility').on('click', function () {
        const passwordInput = $('#isenha');
        const icon = $(this).find('img');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text'); // Torna a senha visível
            icon.attr('src', '/imagens/olho-aberto.png'); // Atualiza para o ícone de "olho fechado"
        } else {
            passwordInput.attr('type', 'password'); // Torna a senha invisível
            icon.attr('src', '/imagens/olho-fechado.png'); // Atualiza para o ícone de "olho aberto"
        }
    });

    // Função para exibir mensagens de sucesso ou erro na tela
    function showMessage(type, message) {
        const $message = type === 'success' ? $('#success-message') : $('#error-message');
        const duration = type === 'success' ? 5000 : 20000; // Tempo em ms

        // Define o texto, aplica estilos e exibe o elemento com fade-in
        $message.text(message).css('opacity', 1).fadeIn(500);

        // Desaparece automaticamente para mensagens de sucesso
        if (type === 'success') {
            setTimeout(() => {
                $message.fadeOut(500, function () {
                    $(this).css('opacity', 0).text('');
                });
            }, duration);
        } else {
            setTimeout(() => {
                $message.fadeOut(2000, function () {
                    $(this).css('opacity', 0).text('');
                });
            }, duration);
        }
    }

    // Função para enviar os dados do formulário de cadastro para o servidor
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
    
        const email = $('#iemail').val().trim();
        const senha = $('#isenha').val().trim();
    
        // Faz a requisição para o servidor
        $.ajax({
            url: 'http://localhost:3500/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, senha }),
            success: function (response) {
                // Exibe mensagem de sucesso
                $('#form-login').find('input').css('border-color', 'green');
                showMessage('success', response.message);

                // window.location.href = '/home.html'; // Redireciona para a página de destino
            },
            error: function (xhr, status, error) {
                // Processa erros retornados pelo servidor
                const errorResponse = xhr.responseJSON;
                if (errorResponse && errorResponse.error) {
                    $('#form-login').find('input').css('border-color', 'red');
                    showMessage('error', errorResponse.error);
                };
            },
        });
    });
    
    
    // Função para carregar a tela de cadastro
    $('#cadastro-button').on('click', function () {
        window.location.href = '/cadastro.html';
    });
});