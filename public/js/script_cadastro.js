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
    
    $('#form-cadastro').on('submit', function (e) {
        e.preventDefault();
    
        const nome = $('#inome').val();
        const email = $('#iemail').val();
        const senha = $('#isenha').val();
    
        $.ajax({
            url: 'http://localhost:3500/api/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ nome, email, senha }),
            success: function (response) {
                alert(response.message); // Exibe mensagem de sucesso

                //Apaga os campos preenchidos
                $('#inome').val('');
                $('#iemail').val('');
                $('#isenha').val('');
            },
            error: function (xhr, status, error) {
                const response = xhr.responseJSON || { error: 'Erro desconhecido' };
                alert(response.error); // Exibe mensagem de erro
            },
        });
    });
        
    
    $('#login-button').on('click', function () {
        window.location.href = '/';
    });
});