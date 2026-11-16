const topic = document.querySelector('#topic');
const whatsapp = document.querySelector('#whatsapp');
const generalMessage = 'Olá! Gostaria de informações sobre o atendimento da Sahium Advogados.';

function whatsappUrl(message) {
  const url = new URL(whatsapp.href);
  url.searchParams.set('text', message);
  return url.href;
}

function updateWhatsApp() {
  const subject = topic.value;
  const message = subject && subject !== 'Outros assuntos'
    ? `Olá! Gostaria de informações sobre o atendimento em ${subject}.`
    : generalMessage;
  whatsapp.href = whatsappUrl(message);
}

topic.addEventListener('change', updateWhatsApp);
document.querySelectorAll('[data-topic]').forEach((link) => {
  link.addEventListener('click', () => {
    topic.value = link.dataset.topic;
    updateWhatsApp();
  });
});
updateWhatsApp();

const work = {
  condominios: {
    title: 'Assessoria para síndicos e administradoras',
    text: 'Apoio em assembleias, convenções, regimentos internos e cobrança de taxas condominiais.',
    topic: 'Direito Condominial',
  },
  imoveis: {
    title: 'Contratos e regularização de imóveis',
    text: 'Orientação em compra, venda, locação e regularização de imóveis, além de apoio na resolução de disputas.',
    topic: 'Direito Imobiliário',
  },
  empresas: {
    title: 'Assessoria jurídica para empresas',
    text: 'Apoio na elaboração e revisão de contratos, na prevenção de conflitos e na representação em questões empresariais.',
    topic: 'Advocacia de Negócios',
  },
};

const workButtons = [...document.querySelectorAll('[data-work]')];
const workHeading = document.querySelector('#work-heading');
const workDescription = document.querySelector('#work-description');
const workContact = document.querySelector('#work-contact');

workButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = work[button.dataset.work];
    workButtons.forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
    workHeading.textContent = item.title;
    workDescription.textContent = item.text;
    workContact.dataset.topic = item.topic;
  });
});

const messages = {
  geral: generalMessage,
  condominios: 'Olá! Sou síndico(a) ou represento um condomínio e gostaria de informações sobre a assessoria condominial.',
  imoveis: 'Olá! Gostaria de informações sobre atendimento para uma questão relacionada a um imóvel.',
  empresas: 'Olá! Gostaria de informações sobre assessoria jurídica para minha empresa ou revisão de um contrato.',
  debitos: 'Olá! Gostaria de saber como posso tratar da negociação de um débito condominial.',
  acompanhamento: 'Olá! Já estou em atendimento com o escritório e gostaria de falar com a equipe sobre o andamento.',
};

const widget = document.querySelector('#mensagens');
const widgetSummary = widget.querySelector('summary');
const messageTopic = document.querySelector('#message-topic');
const messagePreview = document.querySelector('#message-preview');
const messageLink = document.querySelector('#message-link');
let widgetOpener = widgetSummary;

function updateMessage() {
  const message = messages[messageTopic.value];
  messagePreview.textContent = message;
  messageLink.href = whatsappUrl(message);
}

function closeWidget() {
  widget.open = false;
  widgetOpener.focus();
}

widget.querySelector('.message-close').addEventListener('click', closeWidget);
widgetSummary.addEventListener('click', () => { widgetOpener = widgetSummary; });
widget.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && widget.open) closeWidget();
});
document.querySelectorAll('[data-open-message]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    widgetOpener = link;
    messageTopic.value = link.dataset.openMessage;
    updateMessage();
    widget.open = true;
    messageTopic.focus();
  });
});
messageTopic.addEventListener('change', updateMessage);
updateMessage();
