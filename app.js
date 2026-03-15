const productInput = document.getElementById("productInput");
const productName = document.getElementById("productName");
const pdfBtn = document.getElementById("pdfBtn");
const themeSelect = document.getElementById("themeSelect");
const themeStylesheet = document.getElementById("themeStylesheet");
const label = document.getElementById("label");
const foodLabel1 = document.getElementById("foodLabel1");
const foodLabel2 = document.getElementById("foodLabel2");
const cowImg = document.getElementById("cowImg");
const cowContainer = document.querySelector(".cow-image-container");

const companyName = document.querySelector(".company-name");
const tagline = document.querySelector(".tagline");
const footerTag = document.querySelector(".footer-tag");

// 食品ラベル1 入力要素
const foodNameInput = document.getElementById("foodNameInput");
const ingredientsInput = document.getElementById("ingredientsInput");
const expiryInput = document.getElementById("expiryInput");

// 食品ラベル2 入力要素
const additiveInput = document.getElementById("additiveInput");
const storageInput = document.getElementById("storageInput");
const manufacturerInput = document.getElementById("manufacturerInput");

// 食品ラベル1 単一反映用
const previewFoodName = document.getElementById("previewFoodName");
const previewIngredients = document.getElementById("previewIngredients");
const previewExpiry = document.getElementById("previewExpiry");

// 食品ラベル2 単一反映用
const previewAdditive = document.getElementById("previewAdditive");
const previewStorage = document.getElementById("previewStorage");
const previewManufacturer = document.getElementById("previewManufacturer");

// カスタマイズ用要素
const companyColor = document.getElementById("companyColor");
const productColor = document.getElementById("productColor");
const footerColor = document.getElementById("footerColor");

const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const resetBtn = document.getElementById("resetBtn");

// タブ切り替え
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const previewLabels = [label, foodLabel1, foodLabel2];

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetTab = btn.dataset.tab;

    // ボタンの切り替え
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // コンテンツの切り替え
    tabContents.forEach(content => {
      content.classList.remove("active");
      if (content.id === `${targetTab}Tab`) {
        content.classList.add("active");
      }
    });

    // プレビューの切り替え
    previewLabels.forEach(lbl => lbl.classList.remove("active"));
    if (targetTab === "product") {
      label.classList.add("active");
    } else if (targetTab === "food1") {
      foodLabel1.classList.add("active");
    } else if (targetTab === "food2") {
      foodLabel2.classList.add("active");
    }
  });
});

// デザイン更新
productInput.addEventListener("input", () => {
  productName.textContent = productInput.value.trim() || " ";
});

// 食品ラベル1 更新
const syncFoodLabel1 = () => {
  previewFoodName.textContent = foodNameInput.value;
  previewIngredients.textContent = ingredientsInput.value;
  previewExpiry.textContent = expiryInput.value;
};

// 食品ラベル2 更新
const syncFoodLabel2 = () => {
  previewAdditive.textContent = additiveInput.value;
  previewStorage.textContent = storageInput.value;
  previewManufacturer.innerHTML = manufacturerInput.value.replace(/\n/g, "<br>");
};

[foodNameInput, ingredientsInput, expiryInput].forEach(input => {
  input.addEventListener("input", syncFoodLabel1);
});

[additiveInput, storageInput, manufacturerInput].forEach(input => {
  input.addEventListener("input", syncFoodLabel2);
});

// サイズ変更
const updateSize = () => {
  const w = 500;
  const h = 500;
  const foodW = 525;
  const foodH = 297;
  label.style.width = `${w}px`;
  label.style.height = `${h}px`;
  foodLabel1.style.width = `${foodW}px`;
  foodLabel1.style.height = `${foodH}px`;
  foodLabel2.style.width = `${foodW}px`;
  foodLabel2.style.height = `${foodH}px`;

  // 自動スキャリング
  const scaleBase = Math.min(w, h);

  // もとのベース設計に基づく比率
  if (cowContainer) {
    const imgSize = Math.round(scaleBase * 0.56);
    cowContainer.style.width = `${imgSize}px`;
    cowContainer.style.height = `${imgSize}px`;
  }

  label.style.padding = `${Math.round(scaleBase * 0.08)}px`;
  label.style.borderRadius = `${Math.round(scaleBase * 0.08)}px`;

  const labelBorder = document.querySelector(".label-border");
  if (labelBorder) {
    const pos = Math.round(scaleBase * 0.04);
    labelBorder.style.top = `${pos}px`;
    labelBorder.style.left = `${pos}px`;
    labelBorder.style.right = `${pos}px`;
    labelBorder.style.bottom = `${pos}px`;
    labelBorder.style.borderRadius = `${Math.round(scaleBase * 0.06)}px`;
    labelBorder.style.borderWidth = `${Math.max(1, Math.round(scaleBase * 0.006))}px`;
  }

  const productInfo = document.querySelector(".product-info");
  if (productInfo) {
    productInfo.style.marginTop = `${Math.round(scaleBase * 0.03)}px`;
  }

  if (footerTag) {
    footerTag.style.bottom = `${Math.round(scaleBase * 0.052)}px`;
  }

  applyTextCustomization();
};

// テキスト・画像カスタマイズ
const applyTextCustomization = () => {
  companyName.style.color = companyColor.value;
  companyName.style.fontSize = `32px`;
  productName.style.color = productColor.value;
  productName.style.fontSize = `32px`;
  footerTag.style.color = footerColor.value;
  footerTag.style.fontSize = `13px`;

  const subFontSize = `14px`;
  tagline.style.fontSize = subFontSize;
  tagline.style.color = footerColor.value;

  const cowNameTag = document.querySelector(".cow-name-tag");
  if (cowNameTag) {
    cowNameTag.style.fontSize = subFontSize;
  }
};

[companyColor, productColor, footerColor].forEach(input => {
  input.addEventListener("input", applyTextCustomization);
});

// リセット機能
const resetAll = () => {
  if (!confirm("設定を初期状態に戻しますか？")) return;

  productInput.value = "手作りキャラメル";
  productName.textContent = "手作りキャラメル";

  companyColor.value = "#4a6741";
  productColor.value = "#1a1a1a";
  footerColor.value = "#2c2c2c";

  foodNameInput.value = "クリーミーバター(100g)";
  ingredientsInput.value = "牛乳、塩";
  expiryInput.value = "";
  additiveInput.value = "無添加";
  storageInput.value = "要冷凍（10℃以下）";
  manufacturerInput.value = "風の丘\n玉名市中坂門出883";

  syncFoodLabel1();
  syncFoodLabel2();
  updateSize();
};

resetBtn.addEventListener("click", resetAll);

// テーマ切替
themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  themeStylesheet.href = `./themes/${theme}.css`;
});

// PDF書き出し
const printMode = document.getElementById("printMode");

pdfBtn.addEventListener("click", async () => {
  pdfBtn.disabled = true;

  // 現在アクティブなラベルを選択
  const activeLabel = document.querySelector(".label-container.active");
  const labelId = activeLabel.id;
  const isFoodLabel = labelId === "foodLabel1" || labelId === "foodLabel2";

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    if (!isFoodLabel && cowImg && cowImg.decode) {
      try { await cowImg.decode(); } catch (_) { }
    }

    activeLabel.classList.add("exporting");

    const selectedMode = printMode.value;
    const isCircleExport = selectedMode === "a4_24_circle";

    if (isCircleExport) {
      activeLabel.classList.add("circular-export");
    }

    const isFoodLabelExport = labelId === "foodLabel1" || labelId === "foodLabel2";
    const w = isFoodLabelExport ? 525 : 500;
    const h = isFoodLabelExport ? 297 : 500;

    const canvas = await html2canvas(activeLabel, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      width: w,
      height: h
    });

    if (isCircleExport) {
      activeLabel.classList.remove("circular-export");
    }

    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;

    if (selectedMode !== "single") {
      const layouts = {
        "a4_10": { cols: 2, rows: 5, margin: 10, suffix: "A4_10pcs" },
        "a4_40": { cols: 4, rows: 10, margin: 0, suffix: "A4_40pcs_Panda" },
        "a4_24_circle": {
          cols: 4,
          rows: 6,
          topMargin: 13.5,
          leftMargin: 16.0,
          hPitch: 46.0,
          vPitch: 46.0,
          drawSize: 40.0,
          suffix: "A4_24pcs_Circle"
        }
      };

      const config = layouts[selectedMode];
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const isAveryCircle = selectedMode === "a4_24_circle";

      for (let r = 0; r < config.rows; r++) {
        for (let c = 0; c < config.cols; c++) {
          let x, y, drawW, drawH;

          if (isAveryCircle) {
            // 精密レイアウト（ミリ単位）
            x = config.leftMargin + (c * config.hPitch);
            y = config.topMargin + (r * config.vPitch);
            drawW = config.drawSize;
            drawH = config.drawSize;
          } else {
            // 自動算出レイアウト（10面, 40面）
            const margin = config.margin;
            const availableW = 210 - margin * 2;
            const availableH = 297 - margin * 2;
            const cellW = availableW / config.cols;
            const cellH = availableH / config.rows;
            const labelAspect = w / h;

            if (selectedMode === "a4_40") {
              drawW = 52.5;
              drawH = 29.7;
              x = margin + c * cellW;
              y = margin + r * cellH;
            } else {
              if (labelAspect > cellW / cellH) {
                drawW = cellW * 0.98;
                drawH = drawW / labelAspect;
              } else {
                drawH = cellH * 0.98;
                drawW = drawH * labelAspect;
              }
              x = margin + c * cellW + (cellW - drawW) / 2;
              y = margin + r * cellH + (cellH - drawH) / 2;
            }
          }

          pdf.addImage(imgData, "PNG", x, y, drawW, drawH);
        }
      }

      let labelName = labelId === "foodLabel1" ? foodNameInput.value : (labelId === "foodLabel2" ? "食品ラベル2" : productInput.value);
      const safeName = (labelName.trim() || "labels").replace(/[\\\/:*?"<>|]/g, "_");
      pdf.save(`風の丘_${safeName}_${config.suffix}.pdf`);
    } else {
      const pdf = new jsPDF({ orientation: w > h ? "landscape" : "portrait", unit: "px", format: [w, h] });
      pdf.addImage(imgData, "PNG", 0, 0, w, h);

      let labelName = labelId === "foodLabel1" ? foodNameInput.value : (labelId === "foodLabel2" ? "食品ラベル2" : productInput.value);
      const safeName = (labelName.trim() || "label").replace(/[\\\/:*?"<>|]/g, "_");
      pdf.save(`風の丘_${safeName}.pdf`);
    }
  } catch (e) {
    console.error(e);
    alert("PDF出力に失敗しました。");
  } finally {
    activeLabel.classList.remove("exporting");
    activeLabel.classList.remove("circular-export");
    pdfBtn.disabled = false;
  }
});

updateSize();
syncFoodLabel1();
syncFoodLabel2();
