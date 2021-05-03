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
  indexdb: any;
  clearOnRefresh?: boolean;
  tables?: string[];
  data?: any;
  queryBy?: string | string[];
  onReady?: () => void;
  onUpdate?: () => void;
};

export const createDB = ({
  indexdb,
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
    clearOnRefresh,
    tables,
    data,
    onReady,
    onUpdate,
  };
};
