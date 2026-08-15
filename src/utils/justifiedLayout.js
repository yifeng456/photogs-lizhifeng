/**
 * 等高行布局（justified layout）算法
 *
 * 参照 Google Photos / Flickr 的布局：每一行照片高度统一，按各自原图宽高比
 * 缩放以填满整行宽度，不裁剪、不变形。横向照片自然显示为宽图，竖向照片自然
 * 显示为竖图，且所有行整齐对齐。
 *
 * @param {Array} photos - 照片列表（每项含 width/height）
 * @param {number} containerWidth - 容器宽度（px）
 * @param {Object} options - { targetRowHeight, gap }
 * @returns {Array<{photos: Array, height: number}>} 行列表
 */
export function computeJustifiedLayout(photos, containerWidth, options = {}) {
  const {
    targetRowHeight = 260, // 目标行高（px）
    gap = 12,              // 照片间距（px）
  } = options

  if (!containerWidth || containerWidth <= 0 || !photos?.length) return []

  const rows = []
  const n = photos.length
  let i = 0

  while (i < n) {
    let j = i
    let arSum = 0
    let chosenEnd = i
    let chosenHeight = targetRowHeight

    // 依次把照片加入当前行，直到行高降到目标值以下
    while (j < n) {
      arSum += aspect(photos[j])
      const available = containerWidth - (j - i) * gap
      const h = available / arSum

      chosenEnd = j
      chosenHeight = h

      if (h <= targetRowHeight) {
        // 微调：若不含当前这张、行高更接近目标，则回退一张，让各行高度更均匀
        if (j > i) {
          const prevSum = arSum - aspect(photos[j])
          const prevAvailable = containerWidth - (j - i - 1) * gap
          const prevH = prevAvailable / prevSum
          if (Math.abs(prevH - targetRowHeight) <= Math.abs(h - targetRowHeight)) {
            chosenEnd = j - 1
            chosenHeight = prevH
          }
        }
        break
      }
      j++
    }

    // 末行照片不足、行高超过目标时，统一压到目标行高，保持整体一致
    if (chosenEnd === n - 1 && chosenHeight > targetRowHeight) {
      chosenHeight = targetRowHeight
    }

    rows.push({
      photos: photos.slice(i, chosenEnd + 1),
      height: chosenHeight,
    })

    i = chosenEnd + 1
  }

  return rows
}

/** 照片宽高比，缺尺寸时按方形兜底 */
function aspect(photo) {
  const w = photo?.width
  const h = photo?.height
  return w && h ? w / h : 1
}
