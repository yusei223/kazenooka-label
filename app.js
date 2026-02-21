const productInput = document.getElementById("productInput");
const productName = document.getElementById("productName");
const pdfBtn = document.getElementById("pdfBtn");
const themeSelect = document.getElementById("themeSelect");
const themeStylesheet = document.getElementById("themeStylesheet");
const label = document.getElementById("label");
const cowImg = document.getElementById("cowImg");
const cowContainer = document.querySelector(".cow-image-container");

const companyName = document.querySelector(".company-name");
const tagline = document.querySelector(".tagline");
const footerTag = document.querySelector(".footer-tag");

// カスタマイズ用要素
const companyColor = document.getElementById("companyColor");
const productColor = document.getElementById("productColor");
const footerColor = document.getElementById("footerColor");

const resetBtn = document.getElementById("resetBtn");

// 入力 → ラベル反映
productInput.addEventListener("input", () => {
  productName.textContent = productInput.value.trim() || " ";
});

// サイズ変更
const updateSize = () => {
  const w = 500;
  const h = 500;
  label.style.width = `${w}px`;
  label.style.height = `${h}px`;

  // 自動スキャリング
  const scaleBase = Math.min(w, h);

  // もとのベース設計に基づく比率 (Step 422)
  const newCompanySize = Math.round(scaleBase * 0.064); // 32/500
  const newProductSize = Math.round(scaleBase * 0.064); // 32/500
  const newFooterSize = Math.round(scaleBase * 0.026);  // 13/500

  // 画像サイズの自動計算 (280/500 = 56%)
  if (cowContainer) {
    const imgSize = Math.round(scaleBase * 0.56);
    cowContainer.style.width = `${imgSize}px`;
    cowContainer.style.height = `${imgSize}px`;
  }

  // 余白・配置の自動計算 (Step 422ベース)
  label.style.padding = `${Math.round(scaleBase * 0.08)}px`; // 40/500
  label.style.borderRadius = `${Math.round(scaleBase * 0.08)}px`; // 40/500

  const labelBorder = document.querySelector(".label-border");
  if (labelBorder) {
    const pos = Math.round(scaleBase * 0.04); // 20/500
    labelBorder.style.top = `${pos}px`;
    labelBorder.style.left = `${pos}px`;
    labelBorder.style.right = `${pos}px`;
    labelBorder.style.bottom = `${pos}px`;
    labelBorder.style.borderRadius = `${Math.round(scaleBase * 0.06)}px`; // 30/500

    labelBorder.style.borderWidth = `${Math.max(1, Math.round(scaleBase * 0.006))}px`;
  }

  // 商品情報のマージン
  const productInfo = document.querySelector(".product-info");
  if (productInfo) {
    productInfo.style.marginTop = `${Math.round(scaleBase * 0.03)}px`; // 15/500
  }

  // 最下部タグの絶対配置
  if (footerTag) {
    footerTag.style.bottom = `${Math.round(scaleBase * 0.052)}px`; // 26/500
  }

  // 即時適用
  applyTextCustomization();
};

// 初期サイズ設定 (イベントリスナーは不要になったため削除)
// widthInput.addEventListener("input", updateSize);
// heightInput.addEventListener("input", updateSize);

// テキスト・画像カスタマイズ
const applyTextCustomization = () => {
  // 会社名
  companyName.style.color = companyColor.value;
  companyName.style.fontSize = `32px`;
  // 商品名
  productName.style.color = productColor.value;
  productName.style.fontSize = `32px`;
  // 説明文
  footerTag.style.color = footerColor.value;
  footerTag.style.fontSize = `13px`;

  const subFontSize = `14px`;
  tagline.style.fontSize = subFontSize;
  tagline.style.color = footerColor.value;

  // 牛の名前タグのフォントサイズも調整
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

  companyColor.value = "#333333";
  productColor.value = "#333333";
  footerColor.value = "#666666";

  updateSize();
};

resetBtn.addEventListener("click", resetAll);

// テーマ切替
themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  themeStylesheet.href = `./themes/${theme}.css`;
});

// PDF書き出し
const tiledMode = document.getElementById("tiledMode");

pdfBtn.addEventListener("click", async () => {
  pdfBtn.disabled = true;

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    if (cowImg && cowImg.decode) {
      try { await cowImg.decode(); } catch (_) { }
    }

    label.classList.add("exporting");

    const w = 500;
    const h = 500;

    const canvas = await html2canvas(label, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      width: w,
      height: h
    });

    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;

    if (tiledMode.checked) {
      // A4用紙に並べる [210mm x 297mm]
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const a4W = 210;
      const a4H = 297;
      const margin = 10; // mm
      const availableW = a4W - margin * 2;
      const availableH = a4H - margin * 2;

      const cols = 2;
      const rows = 5;

      const cellW = availableW / cols;
      const cellH = availableH / rows;

      // ラベルのアスペクト比を維持してセルに収まるようにスケール計算
      const labelAspect = w / h;
      let drawW, drawH;

      if (labelAspect > cellW / cellH) {
        // 横幅基準で合わせる
        drawW = cellW * 0.95; // 少しマージンを持たせる
        drawH = drawW / labelAspect;
      } else {
        // 高さ基準で合わせる
        drawH = cellH * 0.95;
        drawW = drawH * labelAspect;
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // 各セルの中央に配置
          const x = margin + c * cellW + (cellW - drawW) / 2;
          const y = margin + r * cellH + (cellH - drawH) / 2;
          pdf.addImage(imgData, "PNG", x, y, drawW, drawH);
        }
      }
      const safeName = (productInput.value.trim() || "labels").replace(/[\\\/:*?"<>|]/g, "_");
      pdf.save(`風の丘_${safeName}_A4_10pcs.pdf`);
    } else {
      // 単体保存
      const pdf = new jsPDF({
        orientation: w > h ? "landscape" : "portrait",
        unit: "px",
        format: [w, h],
      });
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      const safeName = (productInput.value.trim() || "label").replace(/[\\\/:*?"<>|]/g, "_");
      pdf.save(`風の丘_${safeName}.pdf`);
    }
  } catch (e) {
    console.error(e);
    alert("PDF出力に失敗しました。");
  } finally {
    label.classList.remove("exporting");
    pdfBtn.disabled = false;
  }
});
