const STORAGE_KEY = 'rd-council-operator-notes-v1';

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function saveNotes() {
  const value = document.getElementById('operatorNotes').value.trim();
  localStorage.setItem(STORAGE_KEY, value);
}

function restoreNotes() {
  document.getElementById('operatorNotes').value = localStorage.getItem(STORAGE_KEY) || '';
  document.getElementById('saveNotesBtn').onclick = saveNotes;
}

function renderConfig(config) {
  document.getElementById('cadence').textContent = config.cadence;
  document.getElementById('modelCount').textContent = config.models.length;
  document.getElementById('missionText').textContent = config.mission;
  document.getElementById('workflowList').innerHTML = config.workflow.map((step, idx) => `
    <div class="workflow-step"><strong>${idx + 1}.</strong> ${step}</div>
  `).join('');
  document.getElementById('focusAreas').innerHTML = config.focusAreas.map(area => `
    <div class="tag">${area}</div>
  `).join('');
  document.getElementById('modelsGrid').innerHTML = config.models.map(model => `
    <div class="model-card">
      <h3>${model.name}</h3>
      <div class="model-role">${model.role}</div>
      <ul class="model-list">${model.focus.map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function setupFilters(memos) {
  const projectFilter = document.getElementById('projectFilter');
  const search = document.getElementById('memoSearch');
  const projects = ['All projects', ...new Set(memos.map(m => m.project))];
  projectFilter.innerHTML = projects.map(project => `<option value="${project}">${project}</option>`).join('');

  const apply = () => {
    const selectedProject = projectFilter.value;
    const q = search.value.trim().toLowerCase();
    const filtered = memos.filter(memo => {
      const matchProject = selectedProject === 'All projects' || memo.project === selectedProject;
      const haystack = [
        memo.title,
        memo.project,
        memo.summary,
        ...(memo.scoutIdeas || []),
        ...(memo.criticResponse || []),
        ...(memo.finalRecommendations || []),
        ...(memo.revenueAngles || []),
        ...(memo.nextActions || [])
      ].join(' ').toLowerCase();
      return matchProject && (!q || haystack.includes(q));
    });
    renderMemos(filtered);
  };

  projectFilter.onchange = apply;
  search.oninput = apply;
  apply();
}

function renderMemos(memos) {
  const root = document.getElementById('memosList');
  document.getElementById('memoCount').textContent = memos.length;
  if (!memos.length) {
    root.innerHTML = '<div class="empty-state">No memos match the current filter.</div>';
    return;
  }
  root.innerHTML = memos.map(memo => `
    <article class="memo-card">
      <div class="memo-top">
        <div>
          <h3>${memo.title}</h3>
          <div class="memo-project">${memo.project}</div>
        </div>
        <span class="status ${memo.status}">${memo.status}</span>
      </div>
      <p class="body-text">${memo.summary}</p>
      <h3>Scout ideas</h3>
      <ul class="memo-list-ul">${memo.scoutIdeas.map(item => `<li>${item}</li>`).join('')}</ul>
      <h3>Critic response</h3>
      <ul class="memo-list-ul">${memo.criticResponse.map(item => `<li>${item}</li>`).join('')}</ul>
      <h3>Final recommendations</h3>
      <ul class="memo-list-ul">${memo.finalRecommendations.map(item => `<li>${item}</li>`).join('')}</ul>
      <h3>Revenue angles</h3>
      <ul class="memo-list-ul">${memo.revenueAngles.map(item => `<li>${item}</li>`).join('')}</ul>
      <h3>Next actions</h3>
      <ul class="memo-list-ul">${memo.nextActions.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>
  `).join('');
}

async function init() {
  restoreNotes();
  const [config, memoData] = await Promise.all([
    loadJson('./data/config.json'),
    loadJson('./data/memos.json')
  ]);
  renderConfig(config);
  setupFilters(memoData.memos || []);
}

init().catch(err => {
  document.getElementById('memosList').innerHTML = `<div class="empty-state">Dashboard failed to load: ${err.message}</div>`;
});
