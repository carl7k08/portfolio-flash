import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    tagline: '',
    bio: '',
    bioLength: 'medium',
    tone: 'professionnel',
    archetype: 'creator',
    languages: '',
    location: '',
    availability: 'open',
    avatar: null,
    resume: null,

    logoType: 'emoji',
    logoEmoji: '⚡️',
    logoImage: null,
    heroStyle: 'typographic',
    heroAlign: 'left',
    navPosition: 'fixed-top',
    navLinkStyle: 'minimal',
    galleryLayout: 'bento',
    imageRatio: 'landscape',
    projectClickAction: 'new-tab',
    footerStyle: 'minimal',
    aboutLayout: 'profile',

    theme: 'dark',
    bgShade: 'pure-black',
    primaryColor: '#6366f1',
    secondaryColor: '#ec4899',
    designStyle: 'glassmorphism',
    fontPairing: 'modern',
    fontScale: 'standard',
    borderRadius: '16',
    radiusStyle: 'rounded',
    borderStyle: 'thin',
    shadow: 'medium',
    grainIntensity: '20',
    glassEffect: true,

    loaderStyle: 'none',
    cursorStyle: 'default',
    cursorTrail: 'none',
    scrollType: 'smooth',
    scrollAnimations: 'fade',
    page404: 'minimal',

    newsletter: false,
    newsletterUrl: '',
    skillsDisplay: 'pill',
    skillsColor: 'original',
    skillsCategories: ['Frameworks', 'Languages'],
    sections: { testimonials: false, timeline: false, stats: false, blog: false },
    modules: { techStack: true, pricing: false, spotify: false },
    
    seoKeywords: '',
    seoDesc: '',
    tabTitle: 'Portfolio',
    ctaType: 'email',
    ctaText: 'Me contacter',
    contactMethod: 'mailto',

    socials: {
      linkedin: '', twitter: '', instagram: '', github: '',
      youtube: '', discord: '', tiktok: '', spotify: '',
      email: '', phone: '', calendly: '', whatsapp: ''
    },
    projects: [{ name: '', link: '', stack: '', description: '', thumbnail: null }]
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (network, value) => {
    setFormData(prev => ({
      ...prev,
      socials: { ...prev.socials, [network]: value }
    }))
  }

  const handleSectionChange = (section) => {
    setFormData(prev => ({
      ...prev,
      sections: { ...prev.sections, [section]: !prev.sections[section] }
    }))
  }

  const handleModuleChange = (module) => {
    setFormData(prev => ({
      ...prev,
      modules: { ...prev.modules, [module]: !prev.modules[module] }
    }))
  }

  const handleSkillCategoryChange = (category) => {
    const currentCategories = [...formData.skillsCategories]
    if (currentCategories.includes(category)) {
      setFormData(prev => ({ ...prev, skillsCategories: currentCategories.filter(c => c !== category) }))
    } else {
      setFormData(prev => ({ ...prev, skillsCategories: [...currentCategories, category] }))
    }
  }

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects]
    newProjects[index][field] = value
    setFormData({ ...formData, projects: newProjects })
  }

  const addProject = () => setFormData({ ...formData, projects: [...formData.projects, { name: '', link: '', stack: '', description: '', thumbnail: null }] })
  
  const removeProject = (index) => setFormData({ ...formData, projects: formData.projects.filter((_, i) => i !== index) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formDataToSend = new FormData()
    
    if (formData.avatar) formDataToSend.append('avatar', formData.avatar)
    if (formData.logoImage) formDataToSend.append('logoImage', formData.logoImage)
    if (formData.resume) formDataToSend.append('resume', formData.resume)

    const dataPayload = {
      ...formData,
      avatar: null, logoImage: null, resume: null,
      projects: formData.projects.map(p => ({ ...p, thumbnail: null })) 
    }

    formDataToSend.append('portfolioData', JSON.stringify(dataPayload))

    try {
      const response = await axios.post('/generate', formDataToSend, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'portfolio_ultimate.zip')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      alert("Erreur serveur. Vérifiez que le terminal noir tourne.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="glass-card">
        <header>
          <div className="header-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <h1>BUILDER.AI ULTIMATE</h1>
          </div>
          <p>L'outil le plus complet pour créer votre portfolio.</p>
        </header>

        <form onSubmit={handleSubmit}>
          
          <section className="form-section">
            <h3>👤 1. Identité & Profil</h3>
            <div className="grid-2">
              <div className="input-wrapper">
                <label>Prénom & Nom</label>
                <input type="text" name="fullName" placeholder="Ex: Alex Cormier" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="input-wrapper">
                <label>Titre / Métier</label>
                <input type="text" name="title" placeholder="Ex: Architecte Web" value={formData.title} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="grid-2 mt-2">
               <div className="input-wrapper">
                 <label>Mantra / Slogan (Hero)</label>
                 <input type="text" name="tagline" placeholder="Ex: Construire le futur." value={formData.tagline} onChange={handleChange} />
               </div>
               <div className="input-wrapper">
                 <label>Localisation</label>
                 <input type="text" name="location" placeholder="Ex: Paris, France" value={formData.location} onChange={handleChange} />
               </div>
            </div>

            <div className="input-wrapper mt-2">
              <label>Votre Bio</label>
              <textarea name="bio" rows="3" placeholder="Parlez de vous, de votre parcours..." value={formData.bio} onChange={handleChange} required />
            </div>
            
            <div className="grid-3 mt-2">
               <div className="input-wrapper">
                 <label>Disponibilité</label>
                 <select name="availability" value={formData.availability} onChange={handleChange}>
                   <option value="open">🟢 Disponible (Job)</option>
                   <option value="freelance">🟣 Freelance</option>
                   <option value="student">🎓 Recherche Stage</option>
                   <option value="busy">🔴 En poste</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Votre style (Archétype)</label>
                 <select name="archetype" value={formData.archetype} onChange={handleChange}>
                   <option value="creator">Créatif / Artiste</option>
                   <option value="solver">Ingénieur / Logique</option>
                   <option value="futurist">Visionnaire / Tech</option>
                   <option value="minimalist">Essentialiste</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Longueur Bio générée</label>
                 <select name="bioLength" value={formData.bioLength} onChange={handleChange}>
                   <option value="short">Courte</option>
                   <option value="medium">Moyenne</option>
                   <option value="long">Longue</option>
                 </select>
               </div>
            </div>
            
            <div className="grid-2 mt-2">
               <div className="input-wrapper">
                  <label>Langues parlées</label>
                  <input type="text" name="languages" placeholder="Français, Anglais..." value={formData.languages} onChange={handleChange} />
               </div>
               <div className="input-wrapper">
                  <label>Photo de Profil</label>
                  <input type="file" onChange={(e) => setFormData({...formData, avatar: e.target.files[0]})} accept="image/*" />
               </div>
               <div className="input-wrapper">
                  <label>CV (PDF)</label>
                  <input type="file" onChange={(e) => setFormData({...formData, resume: e.target.files[0]})} accept=".pdf" />
               </div>
            </div>
          </section>

          <section className="form-section">
            <h3>🏗️ 2. Structure & Logo</h3>

            <div className="input-wrapper mb-3" style={{background: 'rgba(255,255,255,0.03)', padding:'15px', borderRadius:'8px', border:'1px solid var(--border)'}}>
              <label style={{marginBottom:'10px'}}>Emoji :</label>
              <div className="checkbox-group" style={{marginTop:0, marginBottom:'15px'}}>
                <label className="checkbox-label">
                  <input type="radio" name="logoType" value="emoji" checked={formData.logoType === 'emoji'} onChange={() => handleRadioChange('logoType', 'emoji')} />
                  Logo
                </label>
                <label className="checkbox-label">
                  <input type="radio" name="logoType" value="image" checked={formData.logoType === 'image'} onChange={() => handleRadioChange('logoType', 'image')} />
                  Image Perso
                </label>
              </div>
              {formData.logoType === 'emoji' ? (
                <div className="input-wrapper">
                  <label>Emoji</label>
                  <input type="text" name="logoEmoji" value={formData.logoEmoji} onChange={handleChange} style={{fontSize:'1.5rem', textAlign:'center', width:'80px'}} maxLength="2"/>
                </div>
              ) : (
                 <div className="input-wrapper">
                  <label>Fichier Logo</label>
                  <input type="file" onChange={(e) => setFormData({...formData, logoImage: e.target.files[0]})} accept="image/*" />
               </div>
              )}
            </div>

            <div className="grid-3">
               <div className="input-wrapper">
                 <label>Style du Hero</label>
                 <select name="heroStyle" value={formData.heroStyle} onChange={handleChange}>
                   <option value="typographic">Typographique (Gros Texte)</option>
                   <option value="immersive">Immersif (Image Fond)</option>
                   <option value="split">Écran Divisé</option>
                   <option value="minimal">Minimaliste</option>
                   <option value="video">Vidéo Background</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Navigation</label>
                 <select name="navPosition" value={formData.navPosition} onChange={handleChange}>
                   <option value="fixed-top">Barre Fixe Haut</option>
                   <option value="dock">Dock Flottant (Mac)</option>
                   <option value="sidebar-left">Barre Latérale Gauche</option>
                   <option value="burger">Menu Burger Fullscreen</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Galerie Projets</label>
                 <select name="galleryLayout" value={formData.galleryLayout} onChange={handleChange}>
                   <option value="bento">Bento Grid (Moderne)</option>
                   <option value="masonry">Masonry (Pinterest)</option>
                   <option value="horizontal">Scroll Horizontal</option>
                   <option value="vertical-list">Liste Verticale (Luxe)</option>
                   <option value="carousel">Carousel 3D</option>
                 </select>
               </div>
            </div>
            <div className="grid-3 mt-2">
               <div className="input-wrapper">
                 <label>Layout "À Propos"</label>
                 <select name="aboutLayout" value={formData.aboutLayout} onChange={handleChange}>
                   <option value="profile">Classique (Profil + Texte)</option>
                   <option value="story">Storytelling (Texte centré)</option>
                   <option value="timeline">Timeline (Chronologie)</option>
                   <option value="stats">Avec Statistiques</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Footer</label>
                 <select name="footerStyle" value={formData.footerStyle} onChange={handleChange}>
                   <option value="minimal">Minimal (Copyright)</option>
                   <option value="complete">Complet (Sitemap)</option>
                   <option value="big">Big Footer (Gros CTA)</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Format Images</label>
                 <select name="imageRatio" value={formData.imageRatio} onChange={handleChange}>
                   <option value="landscape">Paysage (16:9)</option>
                   <option value="portrait">Portrait (4:5)</option>
                   <option value="square">Carré (1:1)</option>
                   <option value="original">Original</option>
                 </select>
               </div>
            </div>
          </section>

          <section className="form-section">
            <h3>🎨 3. Design System</h3>
            <div className="grid-3">
               <div className="input-wrapper">
                 <label>Ambiance Visuelle</label>
                 <select name="designStyle" value={formData.designStyle} onChange={handleChange}>
                   <option value="glassmorphism">Glassmorphism (Verre)</option>
                   <option value="minimalist">Suisse Minimaliste</option>
                   <option value="neobrutalism">Neo-Brutalism (Pop)</option>
                   <option value="cyberpunk">Cyberpunk (Néon)</option>
                   <option value="bento">Clean Bento (Apple)</option>
                   <option value="retro">Rétro 90s</option>
                   <option value="claymorphism">Claymorphism (3D)</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Typographie</label>
                 <select name="fontPairing" value={formData.fontPairing} onChange={handleChange}>
                   <option value="modern">Moderne (Sans-Serif)</option>
                   <option value="classic">Classique (Serif)</option>
                   <option value="tech">Technique (Monospace)</option>
                   <option value="retro">Rétro (Bold Serif)</option>
                   <option value="brutalist">Brutalist (Gras)</option>
                   <option value="futuristic">Futuriste (Wide)</option>
                   <option value="handwritten">Manuscrit</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Thème Couleur</label>
                 <select name="theme" value={formData.theme} onChange={handleChange}>
                   <option value="dark">Sombre</option>
                   <option value="light">Clair</option>
                   <option value="system">Auto</option>
                 </select>
               </div>
            </div>
            
            <div className="grid-2 mt-2">
               <div className="input-wrapper">
                  <label>Couleur Primaire</label>
                  <input type="color" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="color-picker" />
               </div>
               <div className="input-wrapper">
                  <label>Couleur Secondaire</label>
                  <input type="color" name="secondaryColor" value={formData.secondaryColor} onChange={handleChange} className="color-picker" />
               </div>
            </div>

            <div className="grid-3 mt-2">
               <div className="input-wrapper">
                 <label>Formes (Arrondis)</label>
                 <select name="radiusStyle" value={formData.radiusStyle} onChange={handleChange}>
                   <option value="sharp">Carrés (0px)</option>
                   <option value="soft">Doux (8px)</option>
                   <option value="round">Ronds (16px)</option>
                   <option value="pill">Gélules (Max)</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Ombres</label>
                 <select name="shadow" value={formData.shadow} onChange={handleChange}>
                   <option value="none">Aucune (Plat)</option>
                   <option value="small">Légère</option>
                   <option value="medium">Moyenne</option>
                   <option value="large">Forte (Relief)</option>
                   <option value="glow">Néon (Brillant)</option>
                 </select>
               </div>
               <div className="input-wrapper">
                  <label>Grain Photo: {formData.grainIntensity}%</label>
                  <input type="range" name="grainIntensity" min="0" max="100" value={formData.grainIntensity} onChange={handleChange} />
               </div>
            </div>
          </section>

          <section className="form-section">
            <h3>⚡️ 4. Expérience</h3>
            <div className="grid-3">
              <div className="input-wrapper">
                 <label>Loader (Intro)</label>
                 <select name="loaderStyle" value={formData.loaderStyle} onChange={handleChange}>
                   <option value="none">Aucun</option>
                   <option value="counter">Compteur 0-100%</option>
                   <option value="curtain">Rideau</option>
                   <option value="logo">Logo Battant</option>
                 </select>
              </div>
              <div className="input-wrapper">
                 <label>Curseur Souris</label>
                 <select name="cursorStyle" value={formData.cursorStyle} onChange={handleChange}>
                   <option value="default">Normal</option>
                   <option value="dot">Point</option>
                   <option value="circle">Cercle</option>
                   <option value="blend">Négatif</option>
                 </select>
              </div>
              <div className="input-wrapper">
                 <label>Animations Scroll</label>
                 <select name="scrollAnimations" value={formData.scrollAnimations} onChange={handleChange}>
                   <option value="none">Aucune</option>
                   <option value="fade">Apparition (Fade)</option>
                   <option value="parallax">Parallaxe</option>
                   <option value="premium">Cinématique</option>
                 </select>
              </div>
            </div>
            <div className="grid-2 mt-2">
               <div className="input-wrapper">
                 <label>Type de Scroll</label>
                 <select name="scrollType" value={formData.scrollType} onChange={handleChange}>
                   <option value="native">Normal</option>
                   <option value="smooth">Lissé (Smooth)</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Page 404</label>
                 <select name="page404" value={formData.page404} onChange={handleChange}>
                   <option value="minimal">Minimale</option>
                   <option value="glitch">Effet Glitch</option>
                   <option value="humour">Humoristique</option>
                 </select>
               </div>
            </div>
          </section>

          <section className="form-section">
            <h3>🛠️ 5. Compétences & Modules</h3>
            <div className="grid-2">
               <div className="input-wrapper">
                 <label>Affichage Skills</label>
                 <select name="skillsDisplay" value={formData.skillsDisplay} onChange={handleChange}>
                   <option value="pill">Bulles</option>
                   <option value="progress">Barres</option>
                   <option value="icon">Icônes</option>
                   <option value="cloud">Nuage</option>
                   <option value="tag">Tags</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Couleur Skills</label>
                 <select name="skillsColor" value={formData.skillsColor} onChange={handleChange}>
                   <option value="original">Couleurs Officielles</option>
                   <option value="mono">Monochrome</option>
                   <option value="gradient">Dégradé</option>
                   <option value="adaptive">Adaptatif</option>
                 </select>
               </div>
            </div>
            
            <div className="checkbox-group mt-2">
              <label style={{width: '100%', marginBottom:'10px'}}>Catégories à afficher :</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("Languages")} onChange={() => handleSkillCategoryChange("Languages")} /> Languages</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("Frameworks")} onChange={() => handleSkillCategoryChange("Frameworks")} /> Frameworks</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("Outils")} onChange={() => handleSkillCategoryChange("Outils")} /> Outils</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("CMS")} onChange={() => handleSkillCategoryChange("CMS")} /> CMS</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("Design")} onChange={() => handleSkillCategoryChange("Design")} /> Design</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("DevOps")} onChange={() => handleSkillCategoryChange("DevOps")} /> DevOps</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("Cloud")} onChange={() => handleSkillCategoryChange("Cloud")} /> Cloud</label>
              <label className="checkbox-label"><input type="checkbox" checked={formData.skillsCategories.includes("Soft Skills")} onChange={() => handleSkillCategoryChange("Soft Skills")} /> Soft Skills</label>
            </div>

            <div className="checkbox-group mt-2">
               <label style={{width: '100%', marginBottom:'10px'}}>Sections supplémentaires :</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.sections.testimonials} onChange={() => handleSectionChange('testimonials')} /> Témoignages</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.sections.timeline} onChange={() => handleSectionChange('timeline')} /> Timeline XP</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.sections.stats} onChange={() => handleSectionChange('stats')} /> Statistiques</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.sections.blog} onChange={() => handleSectionChange('blog')} /> Blog</label>
            </div>

            <div className="checkbox-group mt-2">
               <label style={{width: '100%', marginBottom:'10px'}}>Modules spéciaux :</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.modules.techStack} onChange={() => handleModuleChange('techStack')} /> Tech Stack Visuel</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.modules.pricing} onChange={() => handleModuleChange('pricing')} /> Section Tarifs</label>
               <label className="checkbox-label"><input type="checkbox" checked={formData.modules.spotify} onChange={() => handleModuleChange('spotify')} /> Widget Spotify</label>
            </div>
            
             <div className="input-group mt-2">
               <label className="checkbox-label" style={{background: 'transparent', border:'none', paddingLeft:0}}>
                 <input type="checkbox" checked={formData.newsletter} onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })} />
                 &nbsp;Activer la Newsletter
               </label>
               {formData.newsletter && (
                 <input type="text" placeholder="Lien d'inscription (ex: Substack)" value={formData.newsletterUrl} onChange={(e) => setFormData({ ...formData, newsletterUrl: e.target.value })} />
               )}
            </div>
          </section>

          <section className="form-section">
            <h3>⚙️ 6. Tech & SEO</h3>
            <div className="grid-2">
               <div className="input-wrapper">
                 <label>Mots-clés SEO</label>
                 <input type="text" name="seoKeywords" placeholder="Ex: Développeur, React, Freelance" value={formData.seoKeywords} onChange={handleChange} />
               </div>
               <div className="input-wrapper">
                 <label>Description Google</label>
                 <input type="text" name="seoDesc" placeholder="Apparaît dans les résultats de recherche" value={formData.seoDesc} onChange={handleChange} />
               </div>
            </div>
            <div className="grid-3 mt-2">
               <div className="input-wrapper">
                 <label>Titre de l'onglet</label>
                 <input type="text" name="tabTitle" placeholder="Ex: Mon Portfolio" value={formData.tabTitle} onChange={handleChange} />
               </div>
               <div className="input-wrapper">
                 <label>Action du Bouton (CTA)</label>
                 <select name="ctaType" value={formData.ctaType} onChange={handleChange}>
                   <option value="email">Envoyer un Email</option>
                   <option value="cv">Télécharger CV</option>
                   <option value="calendly">Calendly</option>
                   <option value="link">Lien Externe</option>
                 </select>
               </div>
               <div className="input-wrapper">
                 <label>Méthode de Contact</label>
                 <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
                   <option value="mailto">Mailto (Simple)</option>
                   <option value="formspree">Formulaire (Actif)</option>
                 </select>
               </div>
            </div>
          </section>

          <section className="form-section">
            <h3>🚀 7. Projets & Réseaux</h3>
            
            {formData.projects.map((project, index) => (
              <div key={index} className="project-row">
                <div className="grid-2" style={{marginBottom:0}}>
                   <div className="input-wrapper">
                     <label>Nom du projet</label>
                     <input type="text" value={project.name} onChange={(e) => handleProjectChange(index, "name", e.target.value)} required />
                   </div>
                   <div className="input-wrapper">
                     <label>Lien (URL)</label>
                     <input type="url" value={project.link} onChange={(e) => handleProjectChange(index, "link", e.target.value)} required />
                   </div>
                </div>
                <div className="input-wrapper">
                   <label>Technologies (Stack)</label>
                   <input type="text" placeholder="Ex: React, Node.js..." value={project.stack} onChange={(e) => handleProjectChange(index, "stack", e.target.value)} />
                </div>
                <div className="input-wrapper">
                   <label>Miniature (Image)</label>
                   <input type="file" onChange={(e) => handleProjectChange(index, "thumbnail", e.target.files[0])} />
                </div>
                <div className="input-wrapper">
                   <label>Description</label>
                   <textarea rows="2" value={project.description} onChange={(e) => handleProjectChange(index, "description", e.target.value)} />
                </div>
                
                {index > 0 && <button type="button" className="btn-remove" onClick={() => removeProject(index)}>Supprimer ce projet</button>}
              </div>
            ))}
            <button type="button" className="btn-add" onClick={addProject}>+ Ajouter un projet</button>

            <h4 style={{marginTop:'30px', marginBottom:'15px', color:'#888', fontSize:'0.9rem', textTransform:'uppercase', letterSpacing:'1px'}}>Vos Réseaux Sociaux</h4>
            
            <div className="social-grid mt-2">
               <div className="input-wrapper"><label>LinkedIn</label><input type="text" value={formData.socials.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} /></div>
               <div className="input-wrapper"><label>Twitter / X</label><input type="text" value={formData.socials.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} /></div>
               <div className="input-wrapper"><label>Instagram</label><input type="text" value={formData.socials.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} /></div>
               <div className="input-wrapper"><label>GitHub</label><input type="text" value={formData.socials.github} onChange={(e) => handleSocialChange('github', e.target.value)} /></div>
               <div className="input-wrapper"><label>YouTube</label><input type="text" value={formData.socials.youtube} onChange={(e) => handleSocialChange('youtube', e.target.value)} /></div>
               <div className="input-wrapper"><label>Discord</label><input type="text" value={formData.socials.discord} onChange={(e) => handleSocialChange('discord', e.target.value)} /></div>
               <div className="input-wrapper"><label>TikTok</label><input type="text" value={formData.socials.tiktok} onChange={(e) => handleSocialChange('tiktok', e.target.value)} /></div>
               <div className="input-wrapper"><label>Spotify</label><input type="text" value={formData.socials.spotify} onChange={(e) => handleSocialChange('spotify', e.target.value)} /></div>
               <div className="input-wrapper"><label>Email</label><input type="text" value={formData.socials.email} onChange={(e) => handleSocialChange('email', e.target.value)} /></div>
               <div className="input-wrapper"><label>Téléphone</label><input type="text" value={formData.socials.phone} onChange={(e) => handleSocialChange('phone', e.target.value)} /></div>
               <div className="input-wrapper"><label>Calendly</label><input type="text" value={formData.socials.calendly} onChange={(e) => handleSocialChange('calendly', e.target.value)} /></div>
               <div className="input-wrapper"><label>WhatsApp</label><input type="text" value={formData.socials.whatsapp} onChange={(e) => handleSocialChange('whatsapp', e.target.value)} /></div>
            </div>
          </section>

          <button type="submit" className="btn-generate" disabled={loading}>
            {loading ? '/// CONSTRUCTION DU SITE...' : '✨ GÉNÉRER LE PORTFOLIO'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App