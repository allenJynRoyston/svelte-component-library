type ChannelDataType = {
  content?: any;
  title?: string;
  render?: boolean;
  active?: boolean;
};

type CreateChannelType = {
  data?: ChannelDataType[];
  current?: number;
  easing?: string;
  duration?: number;
  onReady?: (val: number) => void;
  onUpdate?: () => void;
};

export const createChannel = ({
  data = [],
  current = null,
  easing = "cubicOut",
  duration = 400,
  onReady,
  onUpdate,
}: CreateChannelType) => {
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
  version?: number;
  name: string;
  clearOnRefresh?: boolean;
  tables?: string[];
  data?: any;
  onReady?: () => void;
  onUpdate?: () => void;
};

export const createDB = ({
  version = 1,
  name,
  clearOnRefresh = false,
  tables = [],
  data = {},
  onReady = () => {},
  onUpdate = () => {},
}: CreateDBType) => {
  return {
    version,
    name,
    clearOnRefresh,
    tables,
    data,
    onReady,
    onUpdate,
  };
};
