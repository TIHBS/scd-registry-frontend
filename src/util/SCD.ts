export interface Parameter {
  Name: string;
  Type: string;
  IsIndexed?: boolean;
}

export interface Function {
  Name: string;
  Description?: string;
  Scope: number;
  HasSideEffects: boolean;
  Dispatcher?: string;
  Inputs: Parameter[];
  Outputs: Parameter[];
  Events?: string[];
}

export interface Event {
  Name: string;
  Description?: string;
  Outputs: Parameter[];
}

export interface SCD {
  ScdlVersion: string;
  Name: string;
  Version: string;
  LatestUrl?: string;
  Description?: string;
  Author: string;
  CreatedOn: string;
  UpdatedOn?: string;
  LifeCycle?: number;
  SclAddress?: string;
  BlockChainType: number;
  BlockChainVersion: string;
  InternalAddress: string;
  MetaData?: string;
  Hash?: string;
  IsStateful: boolean;
  ContractLanguage: string;
  ContractLanguageVersion: string;
  Functions: Function[];
  Events?: Event[];
}
