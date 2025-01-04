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

    $('#form-login').on('submit', function (e) {
        e.preventDefault();
    
        const email = $('#iemail').val().trim();
        const senha = $('#isenha').val().trim();

        // Verifica se os campos não estão vazios
        if (!email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    
        // Faz a requisição para o servidor
        $.ajax({
            url: 'http://localhost:3500/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, senha }),
            success: function (response) {
                alert(response.message); // Exibe mensagem de sucesso
                // window.location.href = '/home.html'; // Redireciona para a página de destino
            },
            error: function (xhr, status, error) {
                const response = xhr.responseJSON || { error: 'Erro desconhecido' };
                alert(response.error); // Exibe mensagem de erro
            },
        });
    });
    
    
    // Função para carregar a tela de cadastro
    $('#cadastro-button').on('click', function () {
        window.location.href = '/cadastro.html';
    });
});