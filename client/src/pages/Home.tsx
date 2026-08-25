/**
 * Diseño: Archivo en materia — editorialismo arquitectónico contemporáneo.
 * Principios: composición diagonal, caliza y grafito, acento arcilla, tipografía escultórica y movimiento sobrio.
 */
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Map,
  Menu,
  MoveDown,
  PanelsTopLeft,
  Smartphone,
  X,
} from "lucide-react";

const isGitHubPagesBuild = import.meta.env.VITE_GITHUB_PAGES === "true";
const projectAsset = (fileName: string, manusPath: string) =>
  isGitHubPagesBuild ? `${import.meta.env.BASE_URL}media/${fileName}` : manusPath;

const assets = {
  portrait: projectAsset("retrato-arquitecta.webp", "/manus-storage/retrato-arquitecta_1eba31a6.webp"),
  buildingMain: projectAsset("edificaciones-localizacion-sotano.webp", "/manus-storage/edificaciones-localizacion-sotano_2da61153.webp"),
  buildingPlanOne: projectAsset("edificaciones-plantas-01.webp", "/manus-storage/edificaciones-plantas-01_7ffbabfc.webp"),
  buildingPlanTwo: projectAsset("edificaciones-plantas-02.webp", "/manus-storage/edificaciones-plantas-02_724a74d9.webp"),
  buildingSection: projectAsset("edificaciones-cortes.webp", "/manus-storage/edificaciones-cortes_03d3c36e.webp"),
  buildingFacade: projectAsset("edificaciones-fachadas.webp", "/manus-storage/edificaciones-fachadas_6e8a21d7.webp"),
  kitchenSpecs: projectAsset("cocina-especificaciones.png", "/manus-storage/cocina-especificaciones_7281611e.png"),
  kitchenRenderOne: projectAsset("cocina-render-01.png", "/manus-storage/cocina-render-01_a37e6637.png"),
  kitchenRenderTwo: projectAsset("cocina-render-02.png", "/manus-storage/cocina-render-02_d10342c3.png"),
  urbanism: projectAsset("tercer-proyecto-urbanismo.png", "/manus-storage/tercer-proyecto-urbanismo_96baaa07.png"),
  market: projectAsset("branding-gran-escala.webp", "/manus-storage/branding-gran-escala_60a9df4c.webp"),
  app: projectAsset("app-experiencia-digital.png", "/manus-storage/app-experiencia-digital_f5990bda.png"),
  backyardPlan: projectAsset("backyard-lamina.png", "/manus-storage/backyard-lamina_229c38d2.png"),
  backyardMood: projectAsset("backyard-moodboard.png", "/manus-storage/backyard-moodboard_31a2774f.png"),
  tierraAccess: projectAsset("tierra-mia-acceso.png", "/manus-storage/tierra-mia-acceso_62fec537.png"),
  tierraPackaging: projectAsset("tierra-mia-empaque.png", "/manus-storage/tierra-mia-empaque_72475af4.png"),
  tierraMobility: projectAsset("tierra-mia-movilidad.png", "/manus-storage/tierra-mia-movilidad_c661d5eb.png"),
  tierraFacade: projectAsset("tierra-mia-fachada.png", "/manus-storage/tierra-mia-fachada_9ac40ee1.png"),
};

const projectCards = [
  {
    code: "01",
    name: "Edificaciones",
    discipline: "Diseño arquitectónico · Láminas técnicas",
    scope: "Edificio / planimetría",
    scale: "Escala 1:75",
    image: assets.buildingMain,
    target: "edificaciones",
    icon: Building2,
  },
  {
    code: "02",
    name: "Cocina",
    discipline: "Interiorismo · Especificación de producto",
    scope: "Interior / especificación",
    scale: "Escala doméstica",
    image: assets.kitchenRenderOne,
    target: "cocina",
    icon: PanelsTopLeft,
  },
  {
    code: "03",
    name: "Urbanismo",
    discipline: "Estrategia territorial · Espacio público",
    scope: "Territorio / estrategia",
    scale: "Escala urbana",
    image: assets.urbanism,
    target: "urbanismo",
    icon: Map,
  },
  {
    code: "04",
    name: "Project Backyard",
    discipline: "Remodelación · Diagnóstico y materialidad",
    scope: "Vivienda / remodelación",
    scale: "Preexistencia + materia",
    image: assets.backyardPlan,
    target: "backyard",
    icon: Building2,
  },
  {
    code: "05",
    name: "Tierra Mía",
    discipline: "Restaurante · Identidad y branding",
    scope: "Marca / puntos de contacto",
    scale: "Espacio + servicio",
    image: assets.tierraFacade,
    target: "tierra-mia",
    icon: PanelsTopLeft,
  },
  {
    code: "06",
    name: "New Covent Garden Market",
    discipline: "Branding a gran escala · Experiencia digital",
    scope: "Mercado / identidad",
    scale: "Marca + aplicación",
    image: assets.market,
    target: "new-covent",
    icon: Smartphone,
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    targets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 55}ms`);
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollTo(id), 80);
  };

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => scrollTo("inicio")} aria-label="Volver al inicio">
          <span className="brand-monogram" aria-hidden="true"><span /></span>
          <span>
            <b>ALEJANDRA</b>
            <em>GÓMEZ GUTIÉRREZ</em>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <button onClick={() => scrollTo("obras")}>Obras</button>
          <button onClick={() => scrollTo("perfil")}>Perfil</button>
          <button onClick={() => scrollTo("contacto")}>Contacto</button>
        </nav>

        <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menú">
          {menuOpen ? <X size={23} /> : <Menu size={24} />}
          <span>Índice</span>
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <button onClick={() => navigate("obras")}>01 <span>Obras</span><ChevronRight size={20} /></button>
        <button onClick={() => navigate("perfil")}>02 <span>Perfil</span><ChevronRight size={20} /></button>
        <button onClick={() => navigate("contacto")}>03 <span>Contacto</span><ChevronRight size={20} /></button>
      </div>

      <main>
        <section id="inicio" className="hero-section">
          <div className="hero-gridline hero-gridline--one" />
          <div className="hero-gridline hero-gridline--two" />
          <div className="hero-copy reveal-up">
            <p className="eyebrow"><span /> Alejandra Gómez Gutiérrez · Arquitectura y diseño</p>
            <h1>Arquitectura,<br />diseño y<br /><i>tecnología.</i></h1>
            <div className="hero-copy-bottom">
              <p>Arquitecta en formación de la Pontificia Universidad Javeriana, actualmente en octavo semestre.</p>
              <button className="text-link text-link--accent" onClick={() => scrollTo("obras")}>
                Explorar obras <ArrowDownRight size={20} />
              </button>
            </div>
          </div>
          <figure className="hero-image-wrap reveal-right">
            <img src={assets.kitchenRenderTwo} alt="Render de cocina diseñado por la autora" className="hero-image" />
            <figcaption><span>Portafolio / 2026</span> Luz, escala y materialidad</figcaption>
          </figure>
          <div className="hero-rail">
            <span>AJGG</span>
            <span className="hero-rail-line" />
            <span>Arquitectura y diseño</span>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo("obras")} aria-label="Ir a obras">
            <MoveDown size={19} />
            <span>Desplazar</span>
          </button>
        </section>

        <section className="statement-section" data-reveal>
          <div className="section-index"><span>00</span><i> / Declaración</i></div>
          <div className="statement-copy">
            <p className="statement-lead">Diseño en las escalas del <em>territorio, el espacio y la interfaz.</em></p>
            <p className="statement-body">Mi trabajo reúne arquitectura, interiorismo, urbanismo y experiencia digital. Me interesa convertir las necesidades reales de las personas y los lugares en soluciones claras, sensibles y contemporáneas.</p>
          </div>
          <figure className="statement-image statement-image--one"><img src={assets.buildingFacade} alt="Fachadas desarrolladas para el proyecto de edificaciones" /></figure>
          <figure className="statement-image statement-image--two"><img src={assets.backyardMood} alt="Moodboard aportado para Project Backyard" /></figure>
        </section>

        <section id="obras" className="archive-section" data-reveal>
          <div className="archive-heading">
            <div className="section-index"><span>01—06</span><i> / Archivo de obras</i></div>
            <div>
              <p className="eyebrow"><span /> Selección</p>
              <h2>Proyectos en<br /><i>distintas escalas.</i></h2>
            </div>
            <p className="archive-note">Cinco expedientes que registran decisiones de territorio, edificio, interior, materia y experiencia de marca.</p>
          </div>

          <div className="project-cards">
            {projectCards.map((project, index) => {
              const Icon = project.icon;
              return (
                <button className={`project-card project-card--${index + 1}`} key={project.code} onClick={() => scrollTo(project.target)}>
                  <div className="project-card-image"><img src={project.image} alt={project.name} /></div>
                  <div className="project-card-meta">
                    <span className="project-number">{project.code}</span>
                    <div><h3>{project.name}</h3><p>{project.discipline}</p><div className="project-filing"><span>{project.scope}</span><span>{project.scale}</span></div></div>
                    <span className="project-arrow"><Icon size={18} /><ArrowUpRight size={16} /></span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section id="edificaciones" className="case-section case-section--building" data-reveal>
          <div className="case-kicker"><span>01</span><span>Edificaciones</span><span>Diseño arquitectónico</span></div>
          <div className="case-intro">
            <h2>Una arquitectura que se <i>lee</i> en planta, sección y fachada.</h2>
            <p>Desarrollo de un proyecto de edificaciones presentado como un sistema coherente: implantación, estacionamientos, plantas tipo, cortes y fachada. La claridad técnica acompaña una lectura espacial de conjunto.</p>
          </div>
          <figure className="drawing-feature">
            <img src={assets.buildingMain} alt="Lámina técnica con localización, sótano y volumetría del proyecto de edificaciones" />
            <figcaption><span>A-001</span> Localización y sótano <b>1:75</b></figcaption>
          </figure>
          <div className="drawing-rack">
            <figure><img src={assets.buildingPlanOne} alt="Plantas de primer piso y pisos tipo" /><figcaption>Plantas / A-002</figcaption></figure>
            <figure><img src={assets.buildingPlanTwo} alt="Plantas de niveles superiores" /><figcaption>Plantas / A-003</figcaption></figure>
            <figure><img src={assets.buildingSection} alt="Cortes longitudinal y transversal" /><figcaption>Cortes / A-004</figcaption></figure>
            <figure><img src={assets.buildingFacade} alt="Fachadas del proyecto de edificaciones" /><figcaption>Fachadas / A-005</figcaption></figure>
          </div>
        </section>

        <section id="cocina" className="case-section case-section--kitchen" data-reveal>
          <div className="case-kicker case-kicker--light"><span>02</span><span>Cocina</span><span>Interiorismo y especificación</span></div>
          <div className="kitchen-header">
            <div><p className="eyebrow eyebrow--light"><span /> Espacio gastronómico</p><h2>El detalle cotidiano,<br /><i>llevado a escala.</i></h2></div>
            <p>Un interior gastronómico articulado por altura, luz natural y superficies de trabajo. La propuesta reúne materialidad, equipamiento y una atmósfera doméstica de gran presencia espacial.</p>
          </div>
          <div className="kitchen-gallery">
            <figure className="kitchen-main"><img src={assets.kitchenRenderOne} alt="Render de cocina con isla y gran altura" /><figcaption>Vista principal / render de interior</figcaption></figure>
            <figure className="kitchen-detail"><img src={assets.kitchenRenderTwo} alt="Render de cocina con grandes ventanas verticales" /><figcaption>Luz, altura y material</figcaption></figure>
            <figure className="kitchen-spec"><img src={assets.kitchenSpecs} alt="Especificación de zona de lavado y productos" /><figcaption>Zona de lavado / especificaciones</figcaption></figure>
          </div>
        </section>

        <section id="urbanismo" className="case-section case-section--urbanism" data-reveal>
          <div className="urbanism-title-block">
            <div className="case-kicker"><span>03</span><span>Urbanismo</span><span>Espacio público y territorio</span></div>
            <h2>La ciudad como<br /><i>infraestructura viva.</i></h2>
            <p>Una aproximación territorial que vincula movilidad, áreas verdes, centralidades y vida pública para hacer legible la complejidad urbana.</p>
          </div>
          <figure className="urbanism-map"><img src={assets.urbanism} alt="Plano urbano de intervención territorial y espacio público" /><figcaption><span>Estudio territorial</span> Estructura urbana, paisaje y conectividad</figcaption></figure>
        </section>

        <section id="backyard" className="case-section case-section--backyard" data-reveal>
          <div className="case-kicker"><span>04</span><span>Project Backyard</span><span>Remodelación</span></div>
          <div className="backyard-intro">
            <div><p className="eyebrow"><span /> Intervención de vivienda</p><h2>Transformar lo existente para <i>volver a habitar.</i></h2></div>
            <p>Una remodelación que comienza con el diagnóstico de la preexistencia y se desarrolla desde la demolición, la nueva organización espacial y una materialidad cálida de piedra, madera y metal.</p>
          </div>
          <div className="backyard-layout">
            <figure className="backyard-drawing"><img src={assets.backyardPlan} alt="Planta, sección y axonometría de Project Backyard" /><figcaption><span>A-002</span> Demolición, planta, sección y vista axonométrica</figcaption></figure>
            <div className="backyard-materials">
              <div className="backyard-material-copy"><span className="case-label">Moodboard de materialidad</span><h3>Grano, textura<br />y luz <i>clara.</i></h3><p>Una paleta doméstica de madera oscura y clara, piedra natural, superficies blancas y accesorios metálicos para dar continuidad entre función y atmósfera.</p></div>
              <figure className="backyard-mood"><img src={assets.backyardMood} alt="Moodboard de madera, piedra, sanitarios y grifería para Project Backyard" /><figcaption>Referencias de acabado / Project Backyard</figcaption></figure>
            </div>
          </div>
        </section>

        <section id="tierra-mia" className="case-section case-section--tierra" data-reveal>
          <div className="case-kicker"><span>05</span><span>Tierra Mía</span><span>Restaurante e identidad aplicada</span></div>
          <div className="tierra-intro">
            <div><p className="eyebrow"><span /> Branding de restaurante</p><h2>Una identidad que acompaña el <i>recorrido.</i></h2></div>
            <p>Tierra Mía es una propuesta de restaurante de comida típica donde la marca se expande más allá del logo: acceso, servicio, empaques y movilidad construyen una experiencia cercana, cálida y reconocible.</p>
          </div>
          <figure className="tierra-facade"><img src={assets.tierraFacade} alt="Fachada intervenida con identidad visual de Tierra Mía" /><figcaption><span>TM-00</span> Fachada / marca, horario e identidad espacial</figcaption></figure>
          <div className="tierra-grid">
            <figure className="tierra-card tierra-card--access"><img src={assets.tierraAccess} alt="Tapete de acceso con identidad Tierra Mía" /><figcaption><span>TM-01</span> Acceso / bienvenida</figcaption></figure>
            <figure className="tierra-card"><img src={assets.tierraPackaging} alt="Portavasos y empaque Tierra Mía" /><figcaption><span>TM-02</span> Servicio / empaque</figcaption></figure>
            <figure className="tierra-card"><img src={assets.tierraMobility} alt="Mochila de reparto con identidad Tierra Mía" /><figcaption><span>TM-03</span> Movilidad / visibilidad</figcaption></figure>
          </div>
        </section>

        <section id="new-covent" className="case-section case-section--market" data-reveal>
          <div className="market-topline"><span>06</span><span>New Covent Garden Market</span><span>Identidad y experiencia digital</span></div>
          <div className="market-intro">
            <div><p className="eyebrow"><span /> Caso integrado</p><h2>Una marca que<br />ocupa la <i>ciudad.</i></h2></div>
            <p>Un caso que conecta branding a gran escala con diseño de interfaz: la identidad acompaña desde la llegada al mercado hasta la compra de producto en una aplicación móvil.</p>
          </div>
          <div className="market-showcase">
            <figure className="market-photo"><img src={assets.market} alt="Branding de gran escala en New Covent Garden Market" /><figcaption>Branding a gran escala / acceso a New Covent Garden Market</figcaption></figure>
            <div className="market-application">
              <div className="market-copy"><span className="case-label">Diseño de aplicación</span><h3>La misma experiencia,<br />en la mano.</h3><p>Una interfaz móvil enfocada en catálogo, favoritos y compra rápida de producto fresco.</p><span className="market-rule" /></div>
              <figure className="app-image"><img src={assets.app} alt="Diseño de aplicación móvil para productos frescos" /><figcaption><span>A-05.2</span> Flujo de compra y selección de producto</figcaption></figure>
            </div>
          </div>
        </section>

        <section className="process-section">
          <figure><img src={assets.kitchenSpecs} alt="Especificación de diseño para la zona de lavado" /></figure>
          <div className="process-copy">
            <div className="section-index"><span>Proceso</span><i> / Mirada de trabajo</i></div>
            <h2>Entre el concepto y el <i>detalle.</i></h2>
            <p>La intención se prueba en la materia, se revisa en la escala y se comunica con precisión. Cada encargo es una oportunidad para construir relaciones duraderas entre personas, objetos y lugares.</p>
          </div>
        </section>

        <section id="perfil" className="profile-section" data-reveal>
          <div className="profile-copy">
            <p className="eyebrow"><span /> Sobre mí</p>
            <h2>Alejandra<br /><i>Gómez Gutiérrez.</i></h2>
            <p>Soy arquitecta en formación de la Pontificia Universidad Javeriana y actualmente curso octavo semestre. Me interesa diseñar espacios, identidades y experiencias que respondan con sensibilidad a las personas y a su contexto.</p>
            <p>He participado en la remodelación de un jardín en España y en el desarrollo de un restaurante de comida típica, aportando al diseño espacial, el branding del local y el levantamiento arquitectónico.</p>
            <p className="profile-small">Me encanta la tecnología y exploro cómo las herramientas digitales, la experiencia de usuario y la arquitectura contemporánea pueden encontrarse en un mismo proyecto.</p>
          </div>
          <figure className="portrait-frame"><img src={assets.portrait} alt="Retrato de la autora del portafolio" /><figcaption><span>Retrato / 2026</span><span>Arquitectura &amp; Diseño</span></figcaption></figure>
        </section>
      </main>

      <footer id="contacto" className="site-footer" data-reveal>
        <div className="footer-top"><span>07</span><span>Contacto</span><span>Colaboraciones, oportunidades y proyectos</span></div>
        <div className="footer-main">
          <h2>Conversemos sobre<br /><i>el próximo espacio.</i></h2>
          <a className="footer-action" href="mailto:tu-correo@ejemplo.com">Escríbeme <ArrowUpRight size={23} /></a>
        </div>
        <div className="footer-bottom"><span>Portafolio de Arquitectura &amp; Diseño</span><span>Actualiza aquí tu correo profesional</span><button onClick={() => scrollTo("inicio")}>Volver arriba ↑</button></div>
      </footer>
    </div>
  );
}
