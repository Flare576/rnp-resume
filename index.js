/**
 * Build/Set Demographics section
 */
document.title = `${demographics.name} Resume`;

let demographicsDisplay = document.getElementById('demographics');
demographicsDisplay.innerHTML = `<div id="full_name">${demographics.name}</div>`;

const title = document.createElement("div");
title.id = 'title';
title.innerHTML = `${demographics.title}`;
demographicsDisplay.appendChild(title);

/**
 * Build/Set Certs area
 */
if (demographics.certifications.length) {
let certificationsDisplay = document.createElement('div')
  demographics.certifications.forEach(({name, link, image}) => {
    const certificationLink = document.createElement("a")
    certificationLink.href = link;

    const certificationBlock = document.createElement("img")
    certificationBlock.classList.add('certification')
    certificationBlock.src = image;
    certificationBlock.title = name;

    certificationLink.appendChild(certificationBlock);
    demographicsDisplay.appendChild(certificationLink);
  })
}

let summaryDisplay = document.getElementById('summary')
summaryDisplay.innerHTML = demographics.summary

/**
 * Build/Set Skills section
 */
let skillsDisplay = document.getElementById('skills')
skills.forEach(type => {
  const skillBlock = document.createElement("div")
  skillBlock.classList.add('skill_block')
  const typeD = document.createElement("div")
  typeD.classList.add('skill_head')
  typeD.innerHTML = type.name
  // Add to skills, then use 'language' code to iterate through items
  skillBlock.appendChild(typeD)
  type.skills.forEach(({ name, level, secondary }) => {
    let subList = ""
    if (secondary) {
      subList = `<div class="skill_secondary">- ${secondary.join(', ')}</div>`
    }

    const skillD = document.createElement("div")
    skillD.classList.add("skill_entry")
    skillD.innerHTML = `
  <div class="skill">
    <div class="skill_name">${name}</div><div class="skill_level">${level||""}</div>
  </div>
  ${subList}`
    skillBlock.appendChild(skillD)
    skillsDisplay.appendChild(skillBlock)
  })
})

/**
 * Build/Set Experiences section
 */
let experiencesDisplay = document.getElementById('experiences')
experiences.forEach(experience => {
  const expD = document.createElement("div")
  expD.classList.add("experience")
  let details = ""
  if (experience?.accomplishments.length > 0) {
    details = '<ul>'
    details += experience.accomplishments.reduce((full,a) => `${full}<li>${a}</li>`, '')
    details += '<ul>'
  } else {
    details = experience.projects.reduce((full,p) => {
      full += `<div class="project_heading">${p.name} - ${p.start} - ${p.end}</div><ul>`
      p.accomplishments.forEach(a => full += `<li>${a}</li>`)
      full += "</ul>"
      return full
    },'')
  }

  expD.innerHTML = `
  <div class="experience_name">${experience.name}</div>
  <div class="experience_place_time">${experience.location} - ${experience.start} - ${experience.end}</div>
  <div class="experience_description">${experience.description}</div>
  <div class="accomplishments_section">
    <div class="accomplishments">Accomplishments</div>
    ${details}
  </div>
  `
  experiencesDisplay.appendChild(expD)
})
