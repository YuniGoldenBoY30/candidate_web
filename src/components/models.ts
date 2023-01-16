export interface ITechRequest {
  title: string;
  content: string;
}

export interface ITechResponse {
  id: string;
  title: string;
  content: string;
}

export interface ITechsResponse {
  status: string;
  data: {
    techs: ITechResponse[];
  };
}

export interface ICandidateRequest {
  name: string;
  lastname: string;
  ci: string;
  address: string;
  age: string;
  gender: string;
}
export type ErrorResponse = {
  status: number;
  message: string;
};

export interface ITechResponse {
  id: string;
  title: string;
  content: string;
}

export interface ITechsResponse {
  status: string;
  data: {
    techs: ITechResponse[];
  };
}
