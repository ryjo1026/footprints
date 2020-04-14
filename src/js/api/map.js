const API_KEY = 'AIzaSyCOzeOHT1tovidiIL9uVNODS0REn9Ciy-s';

const snappedPointToPlaceId = (sp) => sp.location;

function deduplicatePoints(data) {
  // The nearestRoads API returns 2 points for bidirectional roads, we just want the first

  const res = [];
  const { snappedPoints } = data;
  let nextIdx = 0;
  for (let i = 0; i < snappedPoints.length; i++) {
    if (snappedPoints[i].originalIndex === nextIdx) {
      res.push(snappedPoints[i]);
      nextIdx++;
    }
  }

  return res;
}

const getNearestRoads = async (points) => {
  console.log(points);
  const pointsStr = points
    .map((latLng) => `${latLng.lat()},${latLng.lng()}`)
    .reduce((a, b) => `${a}|${b}`);

  const res = await fetch(
    `https://roads.googleapis.com/v1/nearestRoads?points=${pointsStr}&key=${API_KEY}`
  );
  let data = await res.json();

  data = deduplicatePoints(data);

  return data.map((d) => snappedPointToPlaceId(d));
};

const getNearestRoad = async (point) => {
  return getNearestRoads([point]).then((d) => d[0]);
};

export { getNearestRoad, getNearestRoads };
