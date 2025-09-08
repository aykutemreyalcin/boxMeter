(() => {
  // Utilities
  function parseBoxes(str) {
    try { return JSON.parse(str); } catch (_) { return []; }
  }

  function fitPerBox(box, prod) {
    // Axis-aligned fit for a given orientation
    const fitX = Math.floor(box.L / prod.L);
    const fitY = Math.floor(box.W / prod.W);
    const fitZ = Math.floor(box.H / prod.H);
    return Math.max(fitX, 0) * Math.max(fitY, 0) * Math.max(fitZ, 0);
  }

  function orientations({ L, W, H }) {
    // All 6 right-angle orientations of a rectangular prism
    return [
      { L, W, H },
      { L, W: H, H: W },
      { L: W, W: L, H },
      { L: W, W: H, H: L },
      { L: H, W, H: L },
      { L: H, W: L, H: W },
    ];
  }

  function bestFit(box, product, allowRotation) {
    if (!allowRotation) return { count: fitPerBox(box, product), orient: product };
    let best = { count: 0, orient: product };
    for (const o of orientations(product)) {
      const count = fitPerBox(box, o);
      if (count > best.count) best = { count, orient: o };
    }
    return best;
  }

  function mmToIn(mm) { return mm / 25.4; }
  function mmToCm(mm) { return mm / 10; }

  function fmtPairInCm(mm) {
    const inch = mmToIn(mm).toFixed(2);
    const cm = mmToCm(mm).toFixed(1);
    return `${inch}\" / ${cm} cm`;
  }

  function getInnerMm(b) {
    const asNumber = (v) => Number(v);
    const valid = (o) => o && isFinite(o.L) && isFinite(o.W) && isFinite(o.H) && o.L > 0 && o.W > 0 && o.H > 0;
    if (b && b.inner_mm) {
      const mm = { L: asNumber(b.inner_mm.L), W: asNumber(b.inner_mm.W), H: asNumber(b.inner_mm.H) };
      if (valid(mm)) return mm;
    }
    if (b && (b.inner_in || b.inner_inches)) {
      const i = b.inner_in || b.inner_inches;
      const inch = { L: asNumber(i.L), W: asNumber(i.W), H: asNumber(i.H) };
      if (valid(inch)) return { L: inch.L * 25.4, W: inch.W * 25.4, H: inch.H * 25.4 };
    }
    return null;
  }

  function renderSingle(root) {
    const data = root.querySelector('[data-role="bm-data"]');
    const out = root.querySelector('[data-role="bm-output"]');
    if (!data || !out) return;

    const L = parseFloat(data.dataset.len) || 0;
    const W = parseFloat(data.dataset.wid) || 0;
    const H = parseFloat(data.dataset.hei) || 0;
    const G = parseFloat(data.dataset.wgt) || 0; // grams
    const allowRotation = data.dataset.rotate === 'true';

    if (!(L && W && H && G)) {
      out.innerHTML = '<p class="bm-note bm-error">Missing dimensions or weight. Provide metafields: length_mm, width_mm, height_mm, weight_g.</p>';
      return;
    }

    const boxes = parseBoxes(root.dataset.boxes);
    if (!Array.isArray(boxes) || boxes.length === 0) {
      out.innerHTML = '<p class="bm-note">No boxes defined.</p>';
      return;
    }

    // Ensure boxes have max_weight_g; default to Infinity if absent
    boxes.forEach(b => { if (typeof b.max_weight_g !== 'number') b.max_weight_g = Infinity; });

    // Selected index state kept on the element.
    // If not set yet, prefer a "Medium" box by default.
    let idx;
    const selectedAttr = root.getAttribute('data-selected-idx');
    if (selectedAttr === null) {
      let mediumIdx = boxes.findIndex(b => {
        const name = String(b.name || '').toLowerCase();
        const code = String(b.code || '').toLowerCase();
        return name.includes('medium') || code.includes('medium') || code === 'b2';
      });
      if (mediumIdx < 0) mediumIdx = Math.floor(boxes.length / 2);
      idx = mediumIdx;
      root.setAttribute('data-selected-idx', String(idx));
    } else {
      const selectedIdx = Number(selectedAttr) || 0;
      idx = Math.min(Math.max(selectedIdx, 0), boxes.length - 1);
    }
    const box = boxes[idx];

    const inner = getInnerMm(box);
    if (!inner) {
      out.innerHTML = '<div class="bm-simple"><div class="bm-simple-line">Selected box has no valid dimensions.</div></div>';
      return;
    }
    const volFit = bestFit(inner, { L, W, H }, allowRotation).count;
    const weightFit = G > 0 ? Math.floor(box.max_weight_g / G) : Infinity;
    const actualFit = Math.min(volFit, weightFit);

    const limiting = (function() {
      if (actualFit === Infinity) return '—';
      if (volFit < weightFit) return 'Volume';
      if (weightFit < volFit) return 'Weight';
      return 'Volume & Weight';
    })();

    // Build minimal UI: sentence + chooser
    const reason = limiting.toLowerCase();
    const label = box.name || box.code || '';
    const msg = `${Number.isFinite(actualFit) ? actualFit : '—'} can fit in ${label}${reason !== '—' ? ` (limited by ${reason})` : ''}.`;

    out.innerHTML = `
      <div class="bm-simple">
        <div class="bm-simple-line">${msg}</div>
        <div class="bm-chooser">
          <label for="bm-select-${root.id}" class="bm-muted">Select box:</label>
          <select id="bm-select-${root.id}" class="bm-select" aria-label="Select box">
            ${boxes.map((b, i) => `<option value="${i}" ${i === idx ? 'selected' : ''}>${b.name || b.code || 'Box'}</option>`).join('')}
          </select>
        </div>
      </div>
    `;

    const sel = out.querySelector('.bm-select');
    if (sel) {
      sel.addEventListener('change', (e) => {
        const v = Number(e.target.value || 0);
        root.setAttribute('data-selected-idx', String(v));
        renderSingle(root);
      });
    }
  }

  function initAll() {
    document.querySelectorAll('[data-block="box-meter"]').forEach(renderSingle);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
