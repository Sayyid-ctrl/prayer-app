// Prayer App - Qibla Direction Calculation & Compass Utilities

const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

function degToRad(deg) { return (deg * Math.PI) / 180.0; }
function radToDeg(rad) { return (rad * 180.0) / Math.PI; }

export function calculateQiblaDirection(lat, lng) {
  let phi = degToRad(lat);
  let lambda = degToRad(lng);
  let phiK = degToRad(KAABA_LAT);
  let lambdaK = degToRad(KAABA_LNG);

  let deltaLambda = lambdaK - lambda;

  let y = Math.sin(deltaLambda);
  let x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = radToDeg(qiblaRad);

  return (qiblaDeg + 360) % 360;
}

export function getQiblaCompassCardinal(bearing) {
  const directions = ['U', 'UTL', 'TL', 'TTL', 'T', 'TTG', 'TG', 'BDG', 'B', 'BDB', 'BD', 'BLB', 'BL', 'UBL', 'UBD', 'U'];
  const index = Math.round(bearing / 22.5) % 16;
  return directions[index];
}
