import tripOptionsJSON from 'assets/json/trip-options.json';

export default function() {
  let tripOptions = {};
  for (var key of Object.keys(tripOptionsJSON)) {
      tripOptions[key] = tripOptionsJSON[key].reduce( (acc, cur) => {
        acc[cur.code] = cur;
        return acc;
      }, {} );
  }
  return tripOptions;
}
