/* Cleytão Vans — interações leves */

(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const yearEl = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const quickQuoteForm = document.getElementById("quickQuoteForm");
  const corporateForm = document.getElementById("corporateForm");
  const WA_NUMBER = "551120182421";

  const openWhatsApp = (lines) => {
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WA_NUMBER}?text=${text}`;
    const openUrl = () => window.open(url, "_blank", "noopener");

    if (typeof window.gtag === "function") {
      window.gtag("event", "contato", {
        event_callback: openUrl,
        event_timeout: 2000,
      });
      return;
    }

    openUrl();
  };

  /* Ano no rodapé */
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Header com scroll */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        document.body.style.overflow = "";
      });
    });
  }

  /* Formulário → WhatsApp */
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = (form.nome.value || "").trim();
      const telefone = (form.telefone.value || "").trim();
      const perfil = (form.perfil && form.perfil.value || "").trim();
      const servico = (form.servico.value || "").trim();
      const mensagem = (form.mensagem.value || "").trim();

      if (!nome || !telefone || !servico) {
        form.reportValidity();
        return;
      }

      const lines = [
        "Olá! Gostaria de um orçamento de locação de van com motorista:",
        "",
        `*Nome:* ${nome}`,
        `*Telefone:* ${telefone}`,
      ];

      if (perfil) lines.push(`*Perfil:* ${perfil}`);
      lines.push(`*Serviço:* ${servico}`);
      if (mensagem) lines.push(`*Trajeto / detalhes:* ${mensagem}`);

      openWhatsApp(lines);
    });
  }

  /* Orçamento rápido na primeira dobra */
  if (quickQuoteForm) {
    quickQuoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = (quickQuoteForm.data.value || "").trim();
      const trajeto = (quickQuoteForm.trajeto.value || "").trim();
      const passageiros = (quickQuoteForm.passageiros.value || "").trim();

      if (!data || !trajeto || !passageiros) {
        quickQuoteForm.reportValidity();
        return;
      }

      openWhatsApp([
        "Olá! Quero um orçamento expresso da Cleytão Vans:",
        "",
        `*Data:* ${data}`,
        `*Trajeto:* ${trajeto}`,
        `*Passageiros:* ${passageiros}`,
      ]);
    });
  }

  /* Proposta corporativa */
  if (corporateForm) {
    corporateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const empresa = (corporateForm.empresa.value || "").trim();
      const responsavel = (corporateForm.responsavel.value || "").trim();
      const necessidade = (corporateForm.necessidade.value || "").trim();
      const rota = (corporateForm.rota.value || "").trim();

      if (!empresa || !responsavel || !necessidade) {
        corporateForm.reportValidity();
        return;
      }

      const lines = [
        "Olá! Gostaria de uma proposta corporativa da Cleytão Vans:",
        "",
        `*Empresa:* ${empresa}`,
        `*Responsável:* ${responsavel}`,
        `*Necessidade:* ${necessidade}`,
      ];
      if (rota) lines.push(`*Rota / detalhes:* ${rota}`);
      openWhatsApp(lines);
    });
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(
    ".service-card, .pillar, .gallery-item, .testimonial, .contact-form, .spec-badge, .trust-item, .persona-card, .price-factor, .diff-card, .fleet-feature, .amenity, .stat-card, .faq-item"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.06}s`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
