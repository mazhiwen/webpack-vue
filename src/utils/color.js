const getGradientColorsByNum = function ({
  start,
  end,
  stops
}) {
  //start 
  let redS = start.red;
  let greenS = start.green;
  let blueS = start.blue;
  const redE = end.red;
  const greenE = end.green;
  const blueE = end.blue;
  const stepR = (redE - redS) / stops;
  const stepG = (greenE - greenS) / stops;
  const stepB = (blueE - blueS) / stops;
  const colors = [];

  while (stops > 0) {
    redS += stepR;
    greenS += stepG;
    blueS += stepB;
    colors.push(`rgb(${redS},${greenS},${blueS})`);
    stops--;
  }
  return colors;
}


const getGradientColorsByValues = function ({
  start,
  end,
  values
}) {
  const maxValue = Math.max(...values);
  const diffR = end.red - start.red;
  const diffG = end.green - start.green;
  const diffB = end.blue - start.blue;
  const colors = [];
  for (let value of values) {
    const ratio = value / maxValue;
    const resR = Math.ceil(diffR * ratio);
    const resG = Math.ceil(diffG * ratio);
    const resB = Math.ceil(diffB * ratio);
    colors.push(`rgb(${resR},${resG},${resB})`);
  }
  return colors;
}

const getLightDarkColor = function ({
  direction,
  level,
  start
}) {
  //direction  light dark
  //level 1-10

  let redS = start.red;
  let greenS = start.green;
  let blueS = start.blue;

  let redE, greenE, blueE;
  
  if (direction === 'light') {
    redE = 255;
    greenE = 255;
    blueE = 255;
  } else {
    redE = 0;
    greenE = 0;
    blueE = 0;
  }
  const resR = redS + (redE - redS) / 10 * level;
  const resG = greenS + (greenE - greenS) / 10 * level;
  const resB = blueS + (blueE - blueS) / 10 * level;

  return `rgb(${resR},${resG},${resB})`;
}


export {
  getGradientColorsByNum,
  getLightDarkColor,
  getGradientColorsByValues
}