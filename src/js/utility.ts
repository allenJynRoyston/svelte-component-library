import chroma from "chroma-js";

type ChannelDataType = {
  content?: any;
  id?: string;
  title?: string;
  render?: boolean;
  active?: boolean;
  props?: any;
};

type CreateChannelType = {
  sort?: boolean;
  sortBy?: string;
  data?: ChannelDataType[];
  current?: number;
  easing?: string;
  duration?: number;
  onReady?: (val: number) => void;
  onUpdate?: () => void;
};

export const createChannel = ({
  data = [],
  sort = false,
  sortBy = "id",
  current = null,
  easing = "cubicOut",
  duration = 400,
  onReady,
  onUpdate,
}: CreateChannelType) => {
  if (sort) {
    data = data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }

  const channelReady = (index) => {
    data = data.map((x, i) => {
      x.active = false;
      if (i === index) {
        x.active = true;
        x.render = true;
      }
      return x;
    });

    onReady && onReady(index);
  };

  const afterUpdate = !!onUpdate ? onUpdate : () => {};

  return {
    data,
    current,
    easing,
    duration,
    channelReady,
    afterUpdate,
  };
};

type CreateDBType = {
  indexdb: any;
  createIfEmpty?: boolean;
  clearOnRefresh?: boolean;
  tables?: string[];
  data?: any;
  queryBy?: string | string[];
  onReady?: () => void;
  onUpdate?: () => void;
};

export const createDB = ({
  indexdb,
  createIfEmpty = false,
  clearOnRefresh = false,
  tables = [],
  data = {},
  queryBy = "_id",
  onReady = () => {},
  onUpdate = () => {},
}: CreateDBType) => {
  return {
    indexdb,
    queryBy,
    createIfEmpty,
    clearOnRefresh,
    tables,
    data,
    onReady,
    onUpdate,
  };
};

export const capitalizeStr = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createColorPallete = (range = 10) => {
  const colors = {
    black: [],
    white: [],
    primary: [],
    secondary: [],
    success: [],
    warning: [],
    danger: [],
  };

  const scales = {
    black: chroma.scale(["#111", "#999"]).mode("lch").colors(range),
    white: chroma.scale(["white", "#bdc3c7"]).mode("lch").colors(range),
    success: chroma.scale(["#2ecc71", "green"]).mode("lch").colors(range),
    primary: chroma.scale(["#3498db", "blue"]).mode("lch").colors(range),
    secondary: chroma.scale(["#9b59b6", "purple"]).mode("lch").colors(range),
    warning: chroma.scale(["#e67e22", "orange"]).mode("lch").colors(range),
    danger: chroma.scale(["#ff073a", "red"]).mode("lch").colors(range),
  };

  for (const [key] of Object.entries(scales)) {
    scales[key].forEach((color, index) => {
      let colorName = `--${key}-${index}`;
      let textName = `--${key}-${index}-text`;

      const whiteContrast = chroma.contrast(color, "#eee");
      const blackContrast = chroma.contrast(color, "#333");

      document.documentElement.style.setProperty(colorName, color);
      document.documentElement.style.setProperty(
        textName,
        whiteContrast > blackContrast ? "#eee" : "#333"
      );

      colors[key].push({ name: colorName, textColor: textName, color });
    });
  }

  return colors;
};
