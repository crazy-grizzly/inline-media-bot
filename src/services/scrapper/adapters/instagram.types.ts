export interface InstagramScrapperOptions {
  cookie: string;
  userAgent: string;
  xIgAppId: string;
}

export interface IgResponseImageVersion {
  width: number;
  height: number;
  url: string;
}

export interface IgResponseVideoVersion {
  type: number;
  width: number;
  height: number;
  url: string;
  id: string;
}

export interface IgResponseItem {
  image_versions2?: {
    candidates?: IgResponseImageVersion[];
    additional_candidates?: {
      igtv_first_frame?: IgResponseImageVersion;
      first_frame?: IgResponseImageVersion;
    }
  };
  number_of_qualities?: number;
  video_versions?: IgResponseVideoVersion[];
  video_duration?: number;
  caption?: {
    text?: string;
  };
}

export interface IgResponse {
  items?: IgResponseItem[];
  num_results?: number;
  more_available?: boolean;
  auto_load_more_enabled?: boolean;
  showQRModal?: boolean;
}