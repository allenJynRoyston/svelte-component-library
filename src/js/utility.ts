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
