export type TErrorSource = {
  path: PropertyKey;
  message: string;
}[];

export type TGeneric_error_response = {
  status_code: number;
  message: string;
  errorSource: TErrorSource;
};
