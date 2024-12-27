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

    // Função para carregar o cadastro dinamicamente
    $('#cadastro-button').on('click', function () {
        $('#main-content').load('/cadastro.html', function (response, status, xhr) {
            if (status === "error") {
                console.error("Erro ao carregar cadastro:", xhr.status, xhr.statusText);
            } else {
                console.log("Cadastro carregado com sucesso!");
            }
        });
    });

    // Armazena os dados inseridos pelo usuário
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
    
        const email = $('#iemail').val();
        const password = $('#isenha').val();
    
        $.post('/api/login', { email, password })
        .done((response) => {
            alert(response.message);
            window.location.href = '/';
        })
        .fail((error) => {
            alert(error.responseJSON.error);
        });
    });
    
    $('#cadastro-button').on('click', function () {
        window.location.href = '/cadastro.html';
    });
});