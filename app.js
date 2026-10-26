const nav = document.querySelector('#main-nav');
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); }));
const booking = document.querySelector('#booking-dialog');
const service = document.querySelector('#service-dialog');
document.querySelectorAll('.booking').forEach(button => button.addEventListener('click', () => { if (service.open) service.close(); booking.showModal(); }));
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }); });
document.querySelector('#booking-form').addEventListener('submit', event => { event.preventDefault(); const reason = document.querySelector('#reason').value; const text = 'Olá, gostaria de marcar uma consulta na Clínica Cyrne. Motivo: ' + reason + '. Podem indicar-me a disponibilidade e o valor da consulta? Obrigado/a.'; window.open('https://wa.me/351932465905?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer'); });
const treatments = {
  implantes: { title: 'Implantologia digital', description: 'Soluções para substituir dentes perdidos, com planeamento digital adaptado à sua situação clínica.', points: ['Avaliação e planeamento tridimensional', 'Cirurgia guiada por computador, quando indicada', 'Soluções de reabilitação fixa, incluindo All-on-4', 'Acompanhamento e manutenção dos implantes'] },
  alinhadores: { title: 'Alinhadores invisíveis', description: 'Alinhar os dentes com uma solução discreta, removível e acompanhada pela equipa clínica. Trabalhamos com Invisalign® e outras soluções de alinhadores.', points: ['Avaliação do alinhamento e da mordida', 'Planeamento digital dos movimentos dentários', 'Alinhadores adaptados ao plano de tratamento', 'Consultas de acompanhamento regulares'] },
  reabilitacao: { title: 'Reabilitação oral', description: 'Um plano para recuperar a função mastigatória e a estética do sorriso, de acordo com as necessidades de cada pessoa.', points: ['Avaliação global da saúde oral', 'Opções com coroas, pontes e próteses', 'Reabilitação sobre dentes ou implantes', 'Plano com etapas e orçamento explicados'] },
  higiene: { title: 'Higiene oral & GBT', description: 'Cuidados preventivos e acompanhamento da saúde gengival. O protocolo Guided Biofilm Therapy integra tecnologia para identificar e remover o biofilme bacteriano.', points: ['Avaliação da saúde oral e gengival', 'Remoção profissional de biofilme', 'Orientação dos cuidados de higiene em casa', 'Manutenção de dentes, próteses e implantes'] }
};
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => { const item = treatments[button.dataset.service]; document.querySelector('#service-title').textContent = item.title; document.querySelector('#service-description').textContent = item.description; const list = document.querySelector('#service-points'); list.replaceChildren(...item.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; })); service.showModal(); }));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-review-dir]').forEach(button => button.addEventListener('click', () => {
  const track = button.closest('.reviews-layout').querySelector('.reviews-track');
  const card = track.querySelector('.google-review');
  const distance = card.getBoundingClientRect().width + 20;
  track.scrollBy({ left: Number(button.dataset.reviewDir) * distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}));
document.querySelectorAll('.appointment-form').forEach(form => {
  if (form.id === 'contact-form') return;
  const date = form.querySelector('input[type="date"]');
  if (date) { const now = new Date(); date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const message = `Olá, gostaria de marcar uma consulta na Clínica Cyrne.\nNome: ${data.get('nome')}\nTelefone: ${data.get('telefone')}\nEmail: ${data.get('email')}\nData pretendida: ${data.get('data') || 'A combinar'}\nPodem confirmar a disponibilidade?`;
    window.open('https://wa.me/351932465905?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
});
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = `Nome: ${data.get('nome')}\nEmail: ${data.get('email')}\nTelefone: ${data.get('telefone')}\n\n${data.get('mensagem')}\n\nAutorizo o tratamento dos dados para gerir este pedido de contacto.`;
  window.location.href = 'mailto:clinicacyrne@clinicacyrne.com?subject=' + encodeURIComponent('Contacto através do site — ' + data.get('nome')) + '&body=' + encodeURIComponent(body);
});
