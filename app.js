const costDefaults = {
  "Structural materials": 850000,
  "Masonry": 320000,
  "Painting": 150000,
  "Doors & windows": 210000,
  "Electrical": 180000,
  "Plumbing": 140000,
  "Flooring": 200000,
  "Kitchen": 150000,
  "Furniture": 250000,
  "Labour": 500000,
  "Other expenses": 100000
};

const products = [
  ["Cement — OPC/PPC", "Structural", "₹430 / bag", "Indicative demo rate", "🧱"],
  ["TMT Steel", "Structural", "₹68 / kg", "Indicative demo rate", "▤"],
  ["AAC Blocks", "Masonry", "₹55 / block", "Indicative demo rate", "▦"],
  ["Vitrified Tile", "Flooring", "₹55 / sq.ft", "Indicative demo rate", "◈"],
  ["Ceramic Tile", "Flooring", "₹45 / sq.ft", "Indicative demo rate", "◇"],
  ["Interior Emulsion", "Painting", "₹32 / sq.ft", "Indicative demo rate", "◐"],
  ["uPVC Window", "Doors & Windows", "₹650 / sq.ft", "Indicative demo rate", "▣"],
  ["CPVC Pipe", "Plumbing", "₹95 / metre", "Indicative demo rate", "◌"],
  ["Modular Switch", "Electrical", "₹120 / unit", "Indicative demo rate", "⚡"]
];

const stages = [
  "Project details","Floor & room planning","Structural materials","Wall & masonry",
  "Flooring & tiles","Painting","Doors & windows","Electrical","Plumbing",
  "Sanitary fittings","Kitchen","Furniture","External works","Labour","Transport & other expenses",
  "Contingency","Final cost dashboard"
];

let costs = {...costDefaults};
let project = {builtUpArea: 3600};

const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
function total(){return Object.values(costs).reduce((a,b)=>a+Number(b||0),0)}
function renderCosts(){
  const el=document.getElementById("costRows");
  el.innerHTML=Object.entries(costs).map(([k,v])=>`
    <div class="cost-row">
      <span>${k}</span>
      <input type="number" data-cost="${k}" value="${v}">
      <small>₹</small>
    </div>`).join("");
  el.querySelectorAll("[data-cost]").forEach(i=>i.addEventListener("input",e=>{
    costs[e.target.dataset.cost]=Number(e.target.value||0); updateDashboard(); renderCosts();
  }));
  document.getElementById("grandTotal").textContent=money(total());
  updateDashboard();
}
function updateDashboard(){
  const t=total(), area=Number(project.builtUpArea||0);
  document.getElementById("metricProject").textContent=project.name||"Not created";
  document.getElementById("metricArea").textContent=area?area.toLocaleString("en-IN"):"—";
  document.getElementById("metricTotal").textContent=money(t);
  document.getElementById("metricRate").textContent=area?money(t/area):"—";
  document.getElementById("estimateRate").textContent=area?money(t/area)+" / sq.ft":"—";
}
function renderTimeline(){
  document.getElementById("timeline").innerHTML=stages.map((s,i)=>`<div><b>${String(i+1).padStart(2,"0")}</b>${s}</div>`).join("");
}
function renderProducts(){
  const q=(document.getElementById("productSearch").value||"").toLowerCase();
  const c=document.getElementById("productCategory").value;
  const filtered=products.filter(p=>(c==="All categories"||p[1]===c)&&p.join(" ").toLowerCase().includes(q));
  document.getElementById("productGrid").innerHTML=filtered.map(p=>`
    <article class="product"><div class="product-icon">${p[4]}</div><span class="status">${p[1]}</span>
    <h3>${p[0]}</h3><p>${p[3]}</p><div class="price">${p[2]}</div></article>`).join("");
}
function go(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===view));
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===view));
  const titles={dashboard:"Construction command center",project:"Project setup",estimate:"Cost estimation dashboard",products:"Materials & products",assistant:"AI Construction Assistant"};
  document.getElementById("pageTitle").textContent=titles[view]||"BuildWise AI";
  window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("click",e=>{
  const v=e.target.closest("[data-view]"); if(v) go(v.dataset.view);
  const q=e.target.closest("[data-question]"); if(q){go("assistant"); setTimeout(()=>send(q.dataset.question),80);}
});
function response(q){
  const s=q.toLowerCase();
  if(s.includes("document")||s.includes("registration")||s.includes("register")||s.includes("legal")){
    return `For property/construction documentation, start with a project-specific checklist rather than relying on a generic list.\n\nTypical document groups to verify:\n• Identity and ownership/title records\n• Property and survey details\n• Approved plan / permission records where applicable\n• Tax / utility records where relevant\n• Sale/transfer documents and supporting declarations\n• Registration-office requirements and applicable fees\n\nFor production, the assistant should ask for the state, local authority and transaction type, then retrieve the current official requirements and cite each source. This prototype intentionally avoids presenting a generic checklist as legal advice.`;
  }
  if(s.includes("labour")||s.includes("wage")){
    return `Labour cost can be modeled transparently as:\nworkers × daily wage × estimated working days.\n\nExample: 5 workers × ₹700/day × 20 days = ₹70,000.\n\nThe production version should allow separate trades such as mason, helper, carpenter, plumber, electrician, painter, tile worker and steel fixer, with location-specific approved rates.`;
  }
  if(s.includes("cost")||s.includes("estimate")||s.includes("price")||s.includes("material")){
    return `A construction estimate should combine project inputs, quantities and approved unit rates.\n\nCore flow:\n1. Capture plot/building details.\n2. Determine built-up area and scope.\n3. Break work into cost heads.\n4. Calculate quantity × rate for measurable items.\n5. Calculate labour from workers × wage × days.\n6. Add transport/temporary works/other expenses.\n7. Apply the selected contingency percentage.\n8. Show category totals, total estimate and cost per sq.ft.\n\nThe current prototype uses demo values so the client can validate the workflow before rate-data integration.`;
  }
  if(s.includes("masonry")||s.includes("brick")||s.includes("block")){
    return `For masonry planning, the estimator should capture block/brick type, dimensions, wall area, openings, mortar assumptions and approved unit rates.\n\nThe workflow can then estimate quantity, material cost and labour while showing the assumptions used. Final wall specifications should follow the approved drawing and applicable engineering requirements.`;
  }
  if(s.includes("construction")||s.includes("stage")||s.includes("build")){
    return `A practical high-level workflow is:\n1. Project details and requirements\n2. Floor/room planning\n3. Structural materials\n4. Wall & masonry\n5. Flooring & tiles\n6. Painting\n7. Doors & windows\n8. Electrical\n9. Plumbing\n10. Sanitary fittings\n11. Kitchen\n12. Furniture\n13. External works\n14. Labour\n15. Transport & other expenses\n16. Contingency\n17. Final cost dashboard\n\nThe production system should treat this as a dependency-aware workflow and prevent later-stage tasks from being treated as complete before required inputs are available.`;
  }
  return `I can help you with:\n• construction stages and checklists\n• material/product selection\n• quantity and cost estimation\n• labour and other expense calculations\n• project budgeting\n• documentation and registration guidance\n\nFor legal or safety-sensitive questions, production should retrieve current official sources and clearly identify when professional advice is required.`;
}
function addMessage(text,type){
  const el=document.createElement("div"); el.className=`message ${type}`; el.textContent=text;
  const box=document.getElementById("chatMessages"); box.appendChild(el); box.scrollTop=box.scrollHeight;
}
function send(q){
  if(!q)return;
  document.getElementById("chatInput").value="";
  addMessage(q,"user");
  setTimeout(()=>{const r=response(q); addMessage(r,"bot"); document.getElementById("miniReply").textContent=r.split("\n")[0]},250);
}
document.getElementById("sendChat").addEventListener("click",()=>send(document.getElementById("chatInput").value));
document.getElementById("chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")send(e.target.value)});
document.querySelectorAll("[data-question]").forEach(()=>{});
document.getElementById("productSearch").addEventListener("input",renderProducts);
document.getElementById("productCategory").addEventListener("change",renderProducts);
document.getElementById("resetCosts").addEventListener("click",()=>{costs={...costDefaults};renderCosts()});
document.getElementById("applyContingency").addEventListener("click",()=>{
  const pct=Number(document.getElementById("contingency").value);
  const base=total();
  if(pct>0) costs["Other expenses"]=Number(costs["Other expenses"]||0)+base*pct/100;
  renderCosts();
});
document.getElementById("saveProject").addEventListener("click",()=>{
  const name=document.getElementById("projectName").value.trim()||"Untitled project";
  const plot=Number(document.getElementById("plotArea").value||0);
  const floors=Number(document.getElementById("floors").value||1);
  project={name,location:document.getElementById("location").value, builtUpArea:plot?Math.round(plot*floors*.90):3600};
  updateDashboard(); go("estimate");
});
renderTimeline();renderCosts();renderProducts();updateDashboard();
