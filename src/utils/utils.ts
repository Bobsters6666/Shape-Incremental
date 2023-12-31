export function nf(num: any) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "Qd" },
    { value: 1e18, symbol: "Qn" },
  ];

  if (num < 1000) return Math.round(num);
  else {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol
      : "0";
  }
}
