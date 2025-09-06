import { TErrorSource, TGeneric_error_response } from '../interface/error';

const duplicate_error_handler = (err: any): TGeneric_error_response => {
  const match = err.message.match(/dup key.*\{ name: "(.*?)" \}/);
  const customized_message = match && match[1];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${customized_message} is already exist`,
    },
  ];
  const status_code = 400;
  return {
    status_code,
    message: 'Invalid Id',
    errorSource,
  };
};

export default duplicate_error_handler;
