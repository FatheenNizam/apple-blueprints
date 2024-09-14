const productIcons = {};

const assignIcons = (iconMap, keys, icon) => {
  keys.forEach((key) => {
    iconMap[key] = icon;
  });
};

assignIcons(productIcons, ["iPhone", "iPhone Pro", "iPhone SE"], "smartphone");
assignIcons(productIcons, ["MacBook", "MacBook Air", "MacBook Pro"], "laptop_mac");
assignIcons(productIcons, ["iPad", "iPad Air", "iPad Pro", "iPad mini"], "tablet");
assignIcons(productIcons, ["Apple Pencil"], "draw");
assignIcons(productIcons, ["Magic Keyboard for iPad Pro", "Magic Keyboard"], "keyboard");
assignIcons(productIcons, ["Apple Watch", "Apple Watch Series", "Apple Watch SE", "Apple Watch Ultra"], "watch");
assignIcons(productIcons, ["AirPods", "AirPods Pro", "AirPods Max"], "headphones");
assignIcons(productIcons, ["iMac"], "desktop_mac");
assignIcons(productIcons, ["Mac mini", "Mac Pro", "Mac Studio"], "storage");
assignIcons(productIcons, ["Apple TV 4K", "Apple TV HD"], "tv_remote");
assignIcons(productIcons, ["HomePod"], "speaker");
assignIcons(productIcons, ["Accessory"], "stars");
assignIcons(productIcons, ["AirTag"], "location_on");
assignIcons(productIcons, ["Magic Mouse"], "mouse");
assignIcons(productIcons, ["Magic Trackpad"], "touch_app");
assignIcons(productIcons, ["Studio Display"], "desktop_windows");
assignIcons(productIcons, ["Apple Vision Pro"], "head_mounted_device");

const noFillProductLines = new Set([
  "MacBook",
  "MacBook Air",
  "MacBook Pro",
  "iMac",
  "Studio Display",
  "Apple Vision Pro",
  "Magic Keyboard for iPad Pro",
  "Apple Pencil",
  "AirTag",
]);

export { productIcons, noFillProductLines };
