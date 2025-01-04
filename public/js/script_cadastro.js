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
        }
    }

    $('#cadastrar').on('click', function (event) {
        event.preventDefault(); // Evita comportamento padrão do botão

        // Coleta os dados do formulário
        const nome = $('#inome').val();
        const email = $('#iemail').val();
        const senha = $('#isenha').val();

        // Envia a requisição para o servidor
        $.ajax({
            url: 'http://localhost:3500/api/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nome, email, senha }),
            success: function (response) {
                // Exibe mensagem de sucesso
                $('#form-cadastro').find('input').css('border-color', 'green');
                showMessage('success', response.message);

                // Limpa os campos do formulário
                $('#inome').val('');
                $('#iemail').val('');
                $('#isenha').val('');
            },
            error: function (xhr) {
                // Processa erros retornados pelo servidor
                const errorResponse = xhr.responseJSON;
                if (errorResponse && errorResponse.error) {
                    $('#form-cadastro').find('input').css('border-color', 'red');
                    showMessage('error', errorResponse.error);
                }
            },
        });
    });
    
    // Oculta mensagens de erro ao começar a digitar
    $('#form-cadastro input').on('input', function () {
        $('#error-message').fadeOut(500, function () {
            $(this).css('opacity', 0).text('');
        });
    });
    
    // Função para carregar a tela de login
    $('#login-button').on('click', function () {
        window.location.href = '/';
    });

});