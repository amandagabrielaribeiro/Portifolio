document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('botao-tema');
  const body = document.body;

  // Se o botão não existir, para a execução para evitar erros
  if (!botao) return;

  // Função para alternar o visual do tema e o ícone
  function temaEscuro(tipo) {
    if (tipo === true) {
      body.classList.add('escuro');
      botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove('escuro');
      botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  // Carrega a persistência do tema ao abrir a página
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    temaEscuro(true);
  } else {
    temaEscuro(false);
  }

  // Evento de clique no botão de alternar tema
  botao.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do link (#)
    const isEscuro = body.classList.toggle('escuro');
    temaEscuro(isEscuro);
    localStorage.setItem('tema', isEscuro ? 'escuro' : 'claro');
  });

  // Scroll suave para links de navegação válidos
  const navLinks = document.querySelectorAll('#menu ul a.link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignora links vazios, com apenas '#' ou que sejam o botão de tema
      if (!href || href === '#' || this.id === 'botao-tema') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});