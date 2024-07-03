export function transformDate(data){
  var parts = data.split("/");
  var dt = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  return dt;
}
