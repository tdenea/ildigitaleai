const navTree = document.querySelector('.nav-tree');
const contentPanels = Array.from(document.querySelectorAll('.card'));
const workspaceTitle = document.getElementById('workspace-title');
const workspaceDescription = document.getElementById('workspace-description');
const dynamicPanel = document.getElementById('dynamic-panel');
const dynamicTitle = document.getElementById('dynamic-title');
const dynamicDescription = document.getElementById('dynamic-description');
const dynamicList = document.getElementById('dynamic-list');
const contentDescriptions = {
  overview: "Benvenuto nel pannello di controllo centrale. Seleziona una voce dal menu per iniziare.",
  stats: "Statistiche aggregate per comprendere l'andamento dei contenuti pubblicati.",
  performance: "Metriche approfondite per ottimizzare articoli e contenuti video.",
  tasks: "Lista aggiornata delle attività e delle notifiche principali.",
  media: "Gestisci e organizza gli asset multimediali della tua libreria.",
  exports: "Automatizza esportazioni e pubblicazioni verso tutti i canali.",
  projects: "Supervisiona campagne, progetti e deliverable del team.",
  team: "Assegna permessi e coordina i membri del team editoriale.",
  analytics: "Approfondisci le performance con report e insight mirati.",
  settings: "Configura integrazioni, template e parametri di sicurezza.",
  help: "Consulta la documentazione e contatta il supporto quando necessario."
};

const leafContent = {
  'articles-new': {
    description: "Avvia un nuovo articolo impostando titolo, categoria e obiettivi SEO.",
    list: ['Template editor avanzato', 'Workflow approvazioni multi-step', 'Suggerimenti AI per titoli']
  },
  'articles-drafts': {
    description: "Gestisci tutte le bozze in corso e monitora lo stato di avanzamento.",
    list: ['Filtri per autore e categoria', 'Cronologia modifiche', 'Commenti in-linea']
  },
  'articles-review': {
    description: "Organizza il processo di revisione con feedback strutturati e checklist.",
    list: ['Notifiche automatiche ai revisori', 'Checklist di qualità personalizzabile', 'Pannello di confronto versioni']
  },
  'articles-published': {
    description: "Consulta gli articoli già pubblicati e monitora le loro performance.",
    list: ['Statistiche in tempo reale', 'Opzioni di ripubblicazione', 'Storico delle promozioni social']
  },
  'videos-new': {
    description: "Crea script o storyboard video con supporto collaborativo e versionamento.",
    list: ['Libreria clip e asset grafici', 'Trascrizioni generate automaticamente', 'Workflow produzione video']
  },
  'videos-drafts': {
    description: "Coordina la pre-produzione con note, bozze e materiali allegati.",
    list: ['Tagging dei materiali sorgente', 'Calendario produzione', 'Revisioni frame-by-frame']
  },
  'videos-production': {
    description: "Supervisiona lo stato della produzione video e le dipendenze del team.",
    list: ['Checklist di produzione', 'Assegnazione risorse audio/video', 'Integrazione strumenti di montaggio']
  },
  'videos-published': {
    description: "Rivedi i video pubblicati e le metriche di visualizzazione.",
    list: ['Performance per canale', 'Sottotitoli multilingua', 'Download asset ottimizzati']
  },
  'dialogs-new': {
    description: "Configura nuovi dialoghi multimediali con branching e localizzazione.",
    list: ['Editor conversazionale visuale', 'Supporto multilingua', 'Pre-visualizzazione real-time']
  },
  'dialogs-drafts': {
    description: "Controlla lo stato dei dialoghi in bozza e assegna revisori dedicati.",
    list: ['Timeline interattiva', 'Checklist QA audio', 'Storico feedback team']
  },
  'dialogs-review': {
    description: "Revisiona i dialoghi con strumenti di annotazione testuale e audio.",
    list: ['Note vocali', 'Thread di discussione contestuali', 'Approfondimenti UX']
  },
  'dialogs-published': {
    description: "Gestisci i dialoghi pubblicati e monitora le performance cross-canale.",
    list: ['Analytics interattivo', 'Download asset compressi', 'Integrazione chatbot']
  },
  templates: {
    description: "Archivio di template editoriali e grafici riutilizzabili.",
    list: ['Template newsletter', 'Format per social', 'Linee guida brand']
  },
  'shared-resources': {
    description: "Repository di risorse condivise per copywriter, designer e videomaker.",
    list: ['Brief creativi', 'Libreria font', 'Asset audio royalty free']
  },
  'media-images': {
    description: "Catalogo immagini ottimizzato con tag, licenze e metadata.",
    list: ['Ricerca avanzata', 'Filtri per licenza', 'Integrazione con DAM esterni']
  },
  'media-videos': {
    description: "Gestisci clip video, trailer e contenuti RAW.",
    list: ['Preview streaming', 'Supporto 4K HDR', 'Conversioni automatiche']
  },
  'media-audio': {
    description: "Organizza voice-over, brani musicali e effetti sonori.",
    list: ['Libreria musicale integrata', 'Normalizzazione livelli audio', 'Metadati BPM e tonalità']
  },
  'media-docs': {
    description: "Documenti e PDF a supporto delle campagne e dei clienti.",
    list: ['Versioning con commenti', 'Esportazione in più formati', 'Controllo accessi granulari']
  },
  'auto-select': {
    description: "Seleziona i contenuti da pubblicare automaticamente sul sito.",
    list: ['Filtri per target', 'Suggerimenti AI', 'Anteprima multi-device']
  },
  'auto-schedule': {
    description: "Programma le pubblicazioni su base calendario editoriali.",
    list: ['Calendario drag & drop', 'Notifiche di conflitto', 'Sincronizzazione con CMS esterni']
  },
  'auto-preview': {
    description: "Verifica l'aspetto finale del contenuto prima della messa online.",
    list: ['Preview mobile/desktop', 'Verifica accessibilità', 'Validazione SEO']
  },
  'custom-pdf': {
    description: "Genera presentazioni e PDF personalizzati a partire dai contenuti.",
    list: ['Template brandizzati', 'Immagini ad alta risoluzione', 'Indice automatico']
  },
  letterhead: {
    description: "Personalizza carta intestata con loghi, font e palette aziendale.",
    list: ['Editor visuale', 'Varianti multilingua', 'Download immediato']
  },
  'graphic-templates': {
    description: "Accedi a template grafici preimpostati pronti per la distribuzione.",
    list: ['Formati social', 'Slide deck', 'Mockup device']
  },
  'client-select': {
    description: "Scegli i destinatari per l'invio automatico ai clienti.",
    list: ['Rubrica centralizzata', 'Segmentazione avanzata', 'Sync CRM']
  },
  'client-schedule': {
    description: "Imposta la programmazione di invio e i reminder.",
    list: ['Pianificazione timezone', 'A/B test subject', 'Statistiche deliverability']
  },
  'client-tracking': {
    description: "Analizza aperture e download dei materiali inviati.",
    list: ['Notifiche in tempo reale', 'Integrazione analytics', 'Report esportabili']
  },
  'project-management': {
    description: "Supervisiona i progetti in corso con dashboard dedicate.",
    list: ['Kanban team', 'Report avanzamento', 'Automazioni task']
  },
  'task-assignment': {
    description: "Assegna attività ai membri del team con priorità e scadenze.",
    list: ['Smart suggestions', 'Carico lavoro', 'Notifiche Slack/Teams']
  },
  timeline: {
    description: "Visualizza timeline e diagrammi di Gantt per le campagne.",
    list: ['Dipendenze attività', 'Baseline progetto', 'Condivisione stakeholder']
  },
  roles: {
    description: "Gestisci ruoli e permessi granulari per i membri del team.",
    list: ['Ruoli personalizzati', 'Audit log', 'SSO e SCIM']
  },
  assignments: {
    description: "Distribuisci i contenuti tra i membri del team con visibilità chiara.",
    list: ['Dashboard personale', 'Automazione assegnazioni', 'Reminder email']
  },
  activity: {
    description: "Monitora le attività recenti e gli eventi chiave della redazione.",
    list: ['Feed in tempo reale', 'Filtri per progetto', 'Esportazione CSV']
  },
  'article-traffic': {
    description: "Analizza il traffico degli articoli per fonte e conversioni.",
    list: ['Grafici multi-canale', 'Analisi SEO', 'Conversioni contenuto']
  },
  'video-views': {
    description: "Metriche di visualizzazione video per piattaforma e durata.",
    list: ['Retention curve', 'Analisi AB test', 'Heatmap interazione']
  },
  'social-engagement': {
    description: "Misura l'engagement social con insight comparativi.",
    list: ['Sentiment analysis', 'Classifica contenuti', 'Benchmark competitor']
  },
  'custom-reports': {
    description: "Crea report personalizzati con widget drag & drop.",
    list: ['Esportazione automatica', 'Scheduler email', 'Condivisione link sicuri']
  },
  'site-config': {
    description: "Gestisci configurazioni generali del sito web e dei domini.",
    list: ['Impostazioni DNS', 'Tema front-end', 'Monitoraggio uptime']
  },
  categories: {
    description: "Organizza categorie e tag per ottimizzare la tassonomia.",
    list: ['Drag & drop categorie', 'Merge tag duplicati', 'Suggerimenti AI']
  },
  integrations: {
    description: "Configura integrazioni con strumenti esterni e API.",
    list: ['Webhook personalizzati', 'Integrazione CRM', 'Sincronizzazione newsletter']
  },
  'export-templates': {
    description: "Definisci template di esportazione standard per i contenuti.",
    list: ['Placeholder dinamici', 'Anteprima formattata', 'Versioning template']
  },
  backup: {
    description: "Imposta policy di backup e controlli di sicurezza.",
    list: ['Backup incrementali', 'Cifratura end-to-end', 'Piano di disaster recovery']
  },
  documentation: {
    description: "Accedi alla knowledge base e alle guide operative.",
    list: ['Guide passo-passo', 'FAQ aggiornate', 'Video tutorial']
  },
  support: {
    description: "Contatta il supporto dedicato via chat, email o telefono.",
    list: ['Ticket prioritari', 'SLA garantiti', 'Formazione onboarding']
  }
};

if (navTree) {
  navTree.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.classList.contains('nav-node') || button.classList.contains('nav-node--child')) {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', (!expanded).toString());
      return;
    }

    if (button.classList.contains('nav-leaf')) {
      const targetSection = button.dataset.target;
      updateActiveLeaf(button);
      updateWorkspace(targetSection, button.textContent.trim());
    }
  });
}

function updateActiveLeaf(activeButton) {
  document.querySelectorAll('.nav-leaf').forEach((leaf) => {
    leaf.classList.toggle('is-active', leaf === activeButton);
  });
}

function updateWorkspace(sectionId, label) {
  const baseSection = sectionId.split('-')[0];
  let matchFound = false;

  contentPanels.forEach((panel) => {
    if (panel.id === 'dynamic-panel') return;
    const isMatch = panel.dataset.section === sectionId || panel.dataset.section === baseSection;
    panel.toggleAttribute('hidden', !isMatch);
    if (isMatch) {
      matchFound = true;
    }
  });

  if (!matchFound && dynamicPanel) {
    const config = leafContent[sectionId];
    dynamicTitle.textContent = label;
    dynamicDescription.textContent = config?.description || contentDescriptions[baseSection] || contentDescriptions.overview;

    if (config?.list?.length) {
      dynamicList.innerHTML = config.list.map((item) => `<li>${item}</li>`).join('');
      dynamicList.hidden = false;
    } else {
      dynamicList.innerHTML = '';
      dynamicList.hidden = true;
    }

    dynamicPanel.hidden = false;
  } else if (dynamicPanel) {
    dynamicPanel.hidden = true;
  }

  workspaceTitle.textContent = label;
  workspaceDescription.textContent = contentDescriptions[baseSection] || contentDescriptions.overview;
  document.getElementById('workspace').focus();
}

// Imposta sezione iniziale
const initialLeaf = document.querySelector('.nav-sublist button.nav-leaf');
if (initialLeaf) {
  updateActiveLeaf(initialLeaf);
  updateWorkspace(initialLeaf.dataset.target, initialLeaf.textContent.trim());
}
